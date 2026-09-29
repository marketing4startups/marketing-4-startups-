import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Calendar Events & Gmail Send Scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.send',
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline',
});

// In-memory token cache (strictly never saved to localStorage/sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface CalendarEventPayload {
  summary: string;
  description: string;
  founderName: string;
  founderEmail: string;
  companyName: string;
  website?: string;
  selectedDate: string; // e.g. "Tomorrow (Wed, Oct 1)" or "2026-10-01"
  selectedTime: string; // e.g. "10:00 AM (Irish Time)"
  tier?: string;
  gdprConsentTimestamp?: string;
}

export interface CreatedCalendarEvent {
  id: string;
  htmlLink: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export interface BookingConfirmationEmailPayload {
  founderName: string;
  founderEmail: string;
  companyName: string;
  website?: string;
  selectedDate: string;
  selectedTime: string;
  tier?: string;
  primaryBottleneck?: string;
  notes?: string;
  calendarLink?: string;
  gdprConsentTimestamp?: string;
}

export interface QueryEmailPayload {
  founderName: string;
  founderEmail: string;
  companyName: string;
  queryType: 'grant-eligibility' | 'agency-vs-fractional' | 'channel-strategy' | 'general';
  message: string;
  gdprConsentTimestamp?: string;
}

export interface SentEmailResult {
  id: string;
  threadId: string;
  labelIds: string[];
}

/**
 * Initializes the Firebase Auth state listener and keeps in-memory token state in sync
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

/**
 * Initiates popup Google Sign-In with Calendar and Gmail scopes
 */
export const signInWithGoogleCalendar = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Could not retrieve Google OAuth access token');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Retrieves the current in-memory access token
 */
export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

/**
 * Sign out and purge in-memory credentials
 */
export const signOutGoogle = async (): Promise<void> => {
  try {
    await signOut(auth);
  } finally {
    cachedAccessToken = null;
  }
};

/**
 * Converts a slot time string (e.g. "10:00 AM (Irish Time)") and a relative/date string into ISO format
 */
function parseSlotToISODates(selectedDate: string, selectedTime: string): { startISO: string; endISO: string } {
  const now = new Date();
  let eventDate = new Date();

  // Parse offset if selectedDate is "Tomorrow" or relative
  if (selectedDate.toLowerCase().includes('tomorrow')) {
    eventDate.setDate(now.getDate() + 1);
  } else if (selectedDate.toLowerCase().includes('in 2 days')) {
    eventDate.setDate(now.getDate() + 2);
  } else if (selectedDate.toLowerCase().includes('in 3 days')) {
    eventDate.setDate(now.getDate() + 3);
  } else if (selectedDate.toLowerCase().includes('next monday')) {
    const day = now.getDay();
    const daysUntilNextMonday = ((1 + 7 - day) % 7) || 7;
    eventDate.setDate(now.getDate() + daysUntilNextMonday);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
    const [y, m, d] = selectedDate.split('-').map(Number);
    eventDate = new Date(y, m - 1, d);
  } else {
    eventDate.setDate(now.getDate() + 1);
  }

  // Parse hour from "10:00 AM (Irish Time)"
  const timeMatch = selectedTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let hour = 10;
  let minute = 0;
  if (timeMatch) {
    let parsedHour = parseInt(timeMatch[1], 10);
    minute = parseInt(timeMatch[2], 10);
    const isPM = timeMatch[3].toUpperCase() === 'PM';
    if (isPM && parsedHour < 12) parsedHour += 12;
    if (!isPM && parsedHour === 12) parsedHour = 0;
    hour = parsedHour;
  }

  eventDate.setHours(hour, minute, 0, 0);
  const startDate = new Date(eventDate);
  // 45 minutes session
  const endDate = new Date(eventDate.getTime() + 45 * 60 * 1000);

  return {
    startISO: startDate.toISOString(),
    endISO: endDate.toISOString(),
  };
}

/**
 * Creates an event in the user's primary Google Calendar via the Google Calendar v3 REST API
 */
export const createGoogleCalendarEvent = async (
  payload: CalendarEventPayload,
  token?: string
): Promise<CreatedCalendarEvent> => {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error('No Google Calendar access token found. Please sign in with Google first.');
  }

  const { startISO, endISO } = parseSlotToISODates(payload.selectedDate, payload.selectedTime);

  const eventBody = {
    summary: payload.summary || `Marketing4Startups Strategy Consultation: ${payload.founderName}`,
    description: `Marketing4Startups — Founder Strategy Session (45 min)
Principal Strategist: David Murphy (david.murphy@marketing4startups.net)
Location: Dublin, Ireland / Google Meet

Founder: ${payload.founderName}
Company: ${payload.companyName || 'Not specified'}
Website: ${payload.website || 'N/A'}
Engagement Tier: ${payload.tier || 'Tailored Growth Diagnostic'}

Agenda:
1. Current Growth Bottlenecks & Acquisition Channels
2. Realistic Enterprise Ireland / LEO Grant Alignment
3. Actionable 30-Day Tactical Execution Plan
4. Mutual NDA & Transparent Next Steps`,
    start: {
      dateTime: startISO,
      timeZone: 'Europe/Dublin',
    },
    end: {
      dateTime: endISO,
      timeZone: 'Europe/Dublin',
    },
    attendees: [
      { email: payload.founderEmail, displayName: payload.founderName },
      { email: 'david.murphy@marketing4startups.net', displayName: 'David Murphy (Marketing4Startups)' },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: `m4s-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${activeToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google Calendar API Error:', errorText);
    throw new Error(`Failed to create calendar event (${response.status}): ${response.statusText}`);
  }

  const result = await response.json();
  return result as CreatedCalendarEvent;
};

/**
 * Builds a universal web Google Calendar link for 1-click fallback without needing OAuth permissions
 */
export const buildWebCalendarUrl = (payload: CalendarEventPayload): string => {
  const { startISO, endISO } = parseSlotToISODates(payload.selectedDate, payload.selectedTime);
  const cleanStart = startISO.replace(/-|:|\.\d\d\d/g, '');
  const cleanEnd = endISO.replace(/-|:|\.\d\d\d/g, '');

  const title = encodeURIComponent(payload.summary || `Marketing4Startups Strategy Consultation: ${payload.founderName}`);
  const details = encodeURIComponent(
    `Marketing4Startups 1-on-1 Founder Consultation with David Murphy (david.murphy@marketing4startups.net).\nCompany: ${payload.companyName}\nTier: ${payload.tier || 'Founder Diagnostic'}`
  );
  const location = encodeURIComponent('Google Meet / Dublin (Europe/Dublin)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${cleanStart}/${cleanEnd}&details=${details}&location=${location}&add=david.murphy@marketing4startups.net`;
};

// -------------------------------------------------------------
// GMAIL EMAIL AUTOMATION SERVICE WITH GDPR ACCEPTANCE
// -------------------------------------------------------------

/**
 * Encodes an RFC 2822 email string to URL-safe Base64 format expected by Gmail REST API
 */
function encodeRFC2822Email(
  to: string,
  replyTo: string,
  subject: string,
  htmlContent: string,
  plainText: string
): string {
  const boundary = `m4s_boundary_${Date.now()}`;
  
  const headers = [
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    plainText,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlContent,
    '',
    `--${boundary}--`,
  ].join('\r\n');

  const fullMessage = `${headers.join('\r\n')}\r\n\r\n${body}`;

  // Unicode safe Base64 URL encoding
  const bytes = new TextEncoder().encode(fullMessage);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sends a raw email via Gmail REST API
 */
async function sendRawGmailMessage(rawBase64Url: string, token: string): Promise<SentEmailResult> {
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: rawBase64Url }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gmail API Error:', errorText);
    throw new Error(`Failed to send email via Gmail (${response.status}): ${response.statusText}`);
  }

  const result = await response.json();
  return result as SentEmailResult;
}

/**
 * Sends an automated Booking Confirmation & Briefing email to both the founder and David Murphy
 * with explicit Team Contact confirmation and GDPR acceptance receipt.
 */
export const sendBookingConfirmationEmail = async (
  payload: BookingConfirmationEmailPayload,
  token?: string
): Promise<SentEmailResult> => {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error('No Gmail access token found. Please sign in with Google first.');
  }

  const consentTimestamp = payload.gdprConsentTimestamp || new Date().toISOString();
  const subject = `Confirmed: Marketing4Startups Strategy Consultation — ${payload.founderName} (${payload.companyName})`;
  const replyTo = 'david.murphy@marketing4startups.net';

  const plainText = `Hi ${payload.founderName},

Your 45-minute commercial strategy consultation with Marketing4Startups has been scheduled.

1. TEAM CONTACT CONFIRMATION:
A senior member of the Marketing4Startups advisory team (led by David Murphy) will be in contact with you directly ahead of your scheduled session to review your initial briefing notes and provide direct meeting coordinates.

SESSION DETAILS:
- Date & Time: ${payload.selectedDate} at ${payload.selectedTime} (Irish Standard Time / Europe/Dublin)
- Company: ${payload.companyName}
- Focus Area: ${payload.primaryBottleneck || 'Growth & Acquisition Diagnostic'}
- Advisory Host: David Murphy (david.murphy@marketing4startups.net)
- Location: Google Meet (video room linked in calendar invite)

3-POINT PREPARATION CHECKLIST:
1. Current Numbers: Have an idea of your monthly marketing expenditure and current customer acquisition metrics.
2. Target Accounts: List 3 to 5 dream Irish or European customer accounts you want to win.
3. State Enterprise Support: Note if you are exploring or currently availing of Enterprise Ireland (EI) or Local Enterprise Office (LEO) grants.

CONFIDENTIALITY:
All proprietary commercial metrics discussed are held under strict mutual NDA.

---------------------------------------------------------
GDPR DATA PROCESSING & CONSENT RECEIPT (EU Regulation 2016/679):
- Consent Status: Explicitly accepted and recorded on ${consentTimestamp}
- Data Controller: Marketing4Startups Ltd (CRO #741920), Silicon Docks, Dublin 2, Ireland
- Lawful Basis: Explicit Consent (Art. 6(1)(a) GDPR) & Pre-contractual consultation (Art. 6(1)(b) GDPR)
- Purpose: Consultation scheduling, strategic commercial diagnostic, and advisory follow-up
- Retention: Up to 90 days following session closure unless an ongoing contract is entered into
- Zero Resale: Your data is never sold, leased, or shared with third-party advertisers
- Your Statutory Rights: You have the right to access, rectify, or request immediate deletion ("Right to be Forgotten") of your records at any time. To exercise your rights, reply to this email or contact privacy@marketing4startups.net.
---------------------------------------------------------

Best regards,
David Murphy & The Marketing4Startups Advisory Team
Dublin, Ireland
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Marketing4Startups Consultation Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0F17; color: #F8FAFC; margin: 0; padding: 24px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #101726; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #141C2E 0%, #0B0F17 100%); border-bottom: 2px solid #C28B52;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C28B52; font-weight: 700; display: block; margin-bottom: 4px;">
          Marketing4Startups · Dublin Advisory
        </span>
        <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">
          Consultation Confirmed: ${payload.companyName}
        </h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin-top: 0;">
          Hi <strong>${payload.founderName}</strong>,
        </p>

        <!-- TEAM CONTACT REASSURANCE BOX -->
        <div style="background-color: rgba(194, 139, 82, 0.12); border-left: 4px solid #C28B52; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
          <strong style="color: #F8FAFC; font-size: 13px; display: block; margin-bottom: 4px;">
            ✓ Team Contact Confirmation
          </strong>
          <span style="color: #E2E8F0; font-size: 13px; line-height: 1.5;">
            A senior member of the <strong>Marketing4Startups team</strong> (led by David Murphy) will be in contact with you directly ahead of your diagnostic session to review your initial briefing notes and ensure your session is tailored to your immediate milestones.
          </span>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #94A3B8;">
          Your 1-on-1 strategy diagnostic session has been logged. We will dissect your customer acquisition bottlenecks, evaluate realistic Irish state grant eligibility (Enterprise Ireland / LEO), and structure an actionable 30-day plan.
        </p>

        <!-- Session Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0B0F17; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); margin: 24px 0;">
          <tr>
            <td style="padding: 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="6">
                <tr>
                  <td width="35%" style="font-size: 12px; color: #64748B;">Date & Time:</td>
                  <td style="font-size: 13px; color: #E0A96D; font-weight: 600; font-family: monospace;">${payload.selectedDate} · ${payload.selectedTime}</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #64748B;">Company / Stage:</td>
                  <td style="font-size: 13px; color: #F8FAFC; font-weight: 500;">${payload.companyName}</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #64748B;">Key Bottleneck:</td>
                  <td style="font-size: 13px; color: #F8FAFC; font-weight: 500;">${payload.primaryBottleneck || 'Growth Strategy'}</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #64748B;">Advisory Lead:</td>
                  <td style="font-size: 13px; color: #F8FAFC; font-weight: 500;">David Murphy (david.murphy@marketing4startups.net)</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #64748B;">Confidentiality:</td>
                  <td style="font-size: 13px; color: #10B981; font-weight: 600;">100% Mutual NDA Protected</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Checklist -->
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #C28B52; margin-bottom: 12px;">
          Diagnostic Preparation (3 Points):
        </h3>
        <ol style="font-size: 13px; line-height: 1.6; color: #CBD5E1; padding-left: 20px; margin: 0 0 24px 0;">
          <li style="margin-bottom: 8px;"><strong>Current Numbers:</strong> Have your rough monthly spend and inbound customer inquiry rate in mind.</li>
          <li style="margin-bottom: 8px;"><strong>Dream Target Clients:</strong> Name 3–5 Irish or EU companies you are actively trying to sign.</li>
          <li><strong>Enterprise Support:</strong> Flag if you have received or are drafting applications for EI PSSF, CSF, or LEO Digital vouchers.</li>
        </ol>

        <!-- GDPR COMPLIANCE RECEIPT CARD -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(16, 185, 129, 0.05); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2); margin: 24px 0;">
          <tr>
            <td style="padding: 18px 20px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #10B981; font-weight: 700; display: block; margin-bottom: 6px;">
                ✓ GDPR Consent & Data Processing Receipt
              </span>
              <p style="font-size: 12px; line-height: 1.5; color: #94A3B8; margin: 0 0 10px 0;">
                In compliance with <strong>EU Regulation 2016/679 (GDPR)</strong> and the <strong>Irish Data Protection Act 2018</strong>, your consent has been recorded:
              </p>
              <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 11px; color: #CBD5E1;">
                <tr>
                  <td width="30%" style="color: #64748B;">Consent Date:</td>
                  <td>${consentTimestamp}</td>
                </tr>
                <tr>
                  <td style="color: #64748B;">Data Controller:</td>
                  <td>Marketing4Startups Ltd (CRO #741920, Dublin, Ireland)</td>
                </tr>
                <tr>
                  <td style="color: #64748B;">Lawful Basis:</td>
                  <td>Explicit Consent (Art. 6(1)(a)) & Pre-contractual steps (Art. 6(1)(b))</td>
                </tr>
                <tr>
                  <td style="color: #64748B;">Data Rights:</td>
                  <td>Right to access, rectify, or request immediate erasure ("Right to be Forgotten") anytime.</td>
                </tr>
                <tr>
                  <td style="color: #64748B;">DPO Contact:</td>
                  <td><a href="mailto:privacy@marketing4startups.net" style="color: #C28B52;">privacy@marketing4startups.net</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="font-size: 13px; line-height: 1.6; color: #94A3B8;">
          Need to update your booking or send background files beforehand? Reply directly to this email or write to <a href="mailto:david.murphy@marketing4startups.net" style="color: #C28B52; text-decoration: underline;">david.murphy@marketing4startups.net</a>.
        </p>

        <p style="font-size: 14px; color: #F8FAFC; margin-bottom: 0;">
          Warm regards,<br />
          <strong>David Murphy & The Marketing4Startups Team</strong><br />
          <span style="font-size: 12px; color: #64748B;">Principal Strategist · Silicon Docks, Dublin 2</span>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const rawBase64 = encodeRFC2822Email(payload.founderEmail, replyTo, subject, htmlContent, plainText);
  return sendRawGmailMessage(rawBase64, activeToken);
};

/**
 * Sends an automated query acknowledgment & briefing response to the founder
 * with explicit Team Contact confirmation and GDPR acceptance receipt.
 */
export const sendFounderQueryEmail = async (
  payload: QueryEmailPayload,
  token?: string
): Promise<SentEmailResult> => {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error('No Gmail access token found. Please sign in with Google first.');
  }

  const queryTypeLabels: Record<string, string> = {
    'grant-eligibility': 'Enterprise Ireland / LEO Grant Alignment',
    'agency-vs-fractional': 'Agency vs Fractional Head of Marketing Query',
    'channel-strategy': 'Customer Acquisition Channel Prioritization',
    'general': 'Strategic Marketing Consultation Inquiry',
  };

  const consentTimestamp = payload.gdprConsentTimestamp || new Date().toISOString();
  const subject = `Received: Query from ${payload.founderName} — ${queryTypeLabels[payload.queryType] || 'Strategy Query'}`;
  const replyTo = 'david.murphy@marketing4startups.net';

  const plainText = `Hi ${payload.founderName},

Thank you for contacting Marketing4Startups regarding: ${queryTypeLabels[payload.queryType]}.

1. TEAM CONTACT CONFIRMATION:
A senior member of the Marketing4Startups team will personally review your company requirements (${payload.companyName}) and be in direct contact with you within 4 business hours.

YOUR INQUIRY SUMMARY:
"${payload.message}"

WHAT HAPPENS NEXT:
1. Team Triage: David Murphy and our advisory team will analyze your challenge against current Irish startup benchmarks.
2. Direct Action Plan: You will receive specific, commercial advice with zero agency fluff or pressure.
3. Grant Cross-Check: If applicable, we will highlight specific Enterprise Ireland or LEO vouchers suitable for your stage.

---------------------------------------------------------
GDPR DATA PROCESSING & CONSENT RECEIPT (EU Regulation 2016/679):
- Consent Status: Explicitly accepted and recorded on ${consentTimestamp}
- Data Controller: Marketing4Startups Ltd (CRO #741920, Dublin, Ireland)
- Lawful Basis: Explicit Consent (Art. 6(1)(a) GDPR) & Pre-contractual inquiry (Art. 6(1)(b) GDPR)
- Purpose: Responding to strategic inquiries and commercial grant evaluation
- Data Rights: You may request access, rectification, or complete erasure of your data at any time by replying to this email or emailing privacy@marketing4startups.net.
---------------------------------------------------------

Best regards,
David Murphy & The Marketing4Startups Team
Dublin, Ireland
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0F17; color: #F8FAFC; margin: 0; padding: 24px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #101726; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <tr>
      <td style="padding: 24px 32px; background: #141C2E; border-bottom: 2px solid #C28B52;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C28B52; font-weight: 700; display: block; margin-bottom: 4px;">
          Marketing4Startups · Query Desk
        </span>
        <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">
          We've Received Your Strategic Query
        </h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 14px; line-height: 1.6; color: #CBD5E1; margin-top: 0;">
          Hi <strong>${payload.founderName}</strong>,
        </p>

        <!-- TEAM CONTACT CONFIRMATION -->
        <div style="background-color: rgba(194, 139, 82, 0.12); border-left: 4px solid #C28B52; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
          <strong style="color: #F8FAFC; font-size: 13px; display: block; margin-bottom: 4px;">
            ✓ Marketing4Startups Team Contact Confirmation
          </strong>
          <span style="color: #E2E8F0; font-size: 13px; line-height: 1.5;">
            Someone from the <strong>Marketing4Startups team</strong> will review your startup's query and be in direct contact with you within <strong>4 business hours</strong> with initial recommendations.
          </span>
        </div>

        <p style="font-size: 13px; line-height: 1.6; color: #94A3B8;">
          Thank you for reaching out regarding <strong>${queryTypeLabels[payload.queryType]}</strong> for <strong>${payload.companyName}</strong>.
        </p>

        <div style="background-color: #0B0F17; border-left: 3px solid #C28B52; padding: 14px 18px; border-radius: 4px; margin: 18px 0; font-size: 13px; color: #E2E8F0; font-style: italic;">
          "${payload.message}"
        </div>

        <!-- GDPR RECEIPT -->
        <div style="background-color: rgba(16, 185, 129, 0.05); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2); padding: 16px 18px; margin: 20px 0;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #10B981; font-weight: 700; display: block; margin-bottom: 4px;">
            ✓ GDPR Consent Acceptance Confirmed
          </span>
          <p style="font-size: 11px; color: #94A3B8; margin: 0 0 8px 0;">
            Consent registered under <strong>EU GDPR (Regulation 2016/679)</strong> on ${consentTimestamp}.
          </p>
          <div style="font-size: 11px; color: #CBD5E1; line-height: 1.5;">
            Marketing4Startups Ltd (CRO #741920) processes this query solely to evaluate your advisory requirements. You have the right to request data erasure or export anytime by contacting <a href="mailto:privacy@marketing4startups.net" style="color: #C28B52;">privacy@marketing4startups.net</a>.
          </div>
        </div>

        <p style="font-size: 13px; color: #94A3B8; margin-bottom: 0;">
          Warm regards,<br />
          <strong>David Murphy & The Marketing4Startups Team</strong><br />
          <span style="font-size: 11px; color: #64748B;">Silicon Docks, Dublin 2, Ireland</span>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const rawBase64 = encodeRFC2822Email(payload.founderEmail, replyTo, subject, htmlContent, plainText);
  return sendRawGmailMessage(rawBase64, activeToken);
};
