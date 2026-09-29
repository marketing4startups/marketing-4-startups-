import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  Download, 
  LogOut, 
  CalendarCheck,
  ShieldCheck,
  Mail,
  Send
} from 'lucide-react';
import { 
  initAuth, 
  signInWithGoogleCalendar, 
  signOutGoogle, 
  createGoogleCalendarEvent, 
  sendBookingConfirmationEmail,
  buildWebCalendarUrl,
  CalendarEventPayload, 
  CreatedCalendarEvent 
} from '../services/googleCalendar';

interface GoogleCalendarSyncProps {
  payload: CalendarEventPayload;
}

export const GoogleCalendarSync: React.FC<GoogleCalendarSyncProps> = ({ payload }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<CreatedCalendarEvent | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [sendEmailAutomation, setSendEmailAutomation] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleSignIn = async () => {
    setErrorMessage(null);
    setIsSigningIn(true);
    try {
      const { user } = await signInWithGoogleCalendar();
      setCurrentUser(user);
      setShowConfirmDialog(true);
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(err?.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOutGoogle();
    setCurrentUser(null);
    setCreatedEvent(null);
    setEmailSent(false);
    setShowConfirmDialog(false);
  };

  const handleConfirmAction = async () => {
    setShowConfirmDialog(false);
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create Google Calendar event
      const event = await createGoogleCalendarEvent(payload);
      setCreatedEvent(event);

      // 2. Dispatch automated briefing email via Gmail if enabled
      if (sendEmailAutomation) {
        try {
          await sendBookingConfirmationEmail({
            founderName: payload.founderName,
            founderEmail: payload.founderEmail,
            companyName: payload.companyName,
            website: payload.website,
            selectedDate: payload.selectedDate,
            selectedTime: payload.selectedTime,
            tier: payload.tier,
            primaryBottleneck: payload.description,
            calendarLink: event.htmlLink,
            gdprConsentTimestamp: payload.gdprConsentTimestamp || new Date().toISOString(),
          });
          setEmailSent(true);
        } catch (emailErr: any) {
          console.warn('Email dispatch warning:', emailErr);
          // Calendar succeeded even if email had a non-fatal warning
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to complete Google Calendar sync.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateICSFile = () => {
    const summary = payload.summary || `Marketing4Startups Strategy Consultation: ${payload.founderName}`;
    const description = `Marketing4Startups 1-on-1 Founder Consultation with David Murphy (david.murphy@marketing4startups.net)\\nCompany: ${payload.companyName}\\nTier: ${payload.tier || 'Founder Diagnostic'}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Marketing4Startups//IE',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'LOCATION:Google Meet / Dublin (Europe/Dublin)',
      `DTSTART:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, '')}`,
      `DTEND:${new Date(Date.now() + 45 * 60000).toISOString().replace(/-|:|\.\d\d\d/g, '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'marketing4startups-consultation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4 p-4 sm:p-5 rounded-xl bg-[#0D131F] border border-white/[0.1] space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[#C28B52]" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <span>Google Calendar & Email Automation</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected
              </span>
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Synchronize consultation into your calendar and dispatch automated briefing notes via Gmail.
            </p>
          </div>
        </div>

        {currentUser && (
          <button
            onClick={handleSignOut}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 shrink-0 p-1"
            title="Sign out from Google"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Disconnect</span>
          </button>
        )}
      </div>

      {/* Success Notification */}
      {(createdEvent || emailSent) && (
        <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm space-y-2.5">
          <div className="space-y-1.5">
            {createdEvent && (
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Successfully scheduled on your Google Calendar!</span>
              </div>
            )}
            {emailSent && (
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Automated briefing checklist dispatched via Gmail to <strong className="text-white">{payload.founderEmail}</strong></span>
              </div>
            )}
          </div>

          {createdEvent && (
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href={createdEvent.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 transition-colors font-medium"
              >
                <span>View in Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-400 text-[11px]">
                Host: david.murphy@marketing4startups.net
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block">Automation issue:</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Action Area: GSI button or 'Add to Calendar & Send Email' */}
      {!createdEvent && (
        <div className="space-y-3 pt-1">
          {/* Email Automation Checkbox */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendEmailAutomation}
              onChange={(e) => setSendEmailAutomation(e.target.checked)}
              className="rounded bg-[#0B0F17] border-white/20 text-[#C28B52] focus:ring-[#C28B52] w-4 h-4"
            />
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C28B52]" />
              <span>Send automated briefing checklist and calendar summary via Gmail</span>
            </span>
          </label>

          {currentUser ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#141C2E] border border-white/[0.08]">
              <div className="flex items-center gap-2.5 min-w-0">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Google User'}
                    className="w-7 h-7 rounded-full border border-white/20 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#C28B52]/20 text-[#C28B52] flex items-center justify-center font-bold text-xs">
                    {currentUser.email?.[0]?.toUpperCase() || 'G'}
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-[11px] text-slate-400 block truncate">Signed in as:</span>
                  <span className="text-xs text-white font-medium block truncate">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmDialog(true)}
                disabled={isProcessing}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-4 h-4" />
                    <span>Sync Calendar & Send Email</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#141C2E] border border-white/[0.08]">
              <div className="text-xs text-slate-300">
                <span className="font-medium text-white block">One-click Calendar & Email Automation:</span>
                Sign in with Google to automatically add this session to your calendar and send confirmation briefing notes.
              </div>

              {/* Official Google Sign-In Styled Button per skill guidelines */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 min-h-[42px] bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-60 shrink-0"
              >
                {isSigningIn ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                )}
                <span>Sign in with Google to Automate</span>
              </button>
            </div>
          )}

          {/* Alternative manual & fallback calendar export options */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Permission requested only for this calendar booking and confirmation</span>
            </span>

            <div className="flex items-center gap-3">
              <a
                href={buildWebCalendarUrl(payload)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline flex items-center gap-1"
              >
                <span>Add via Web Calendar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <button
                type="button"
                onClick={generateICSFile}
                className="hover:text-white transition-colors underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Download .ics</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory User Confirmation Dialog before Mutating Calendar or Sending Email */}
      {showConfirmDialog && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-action-title"
        >
          <div className="max-w-md w-full p-5 sm:p-6 rounded-xl bg-[#141C2E] border border-white/[0.15] text-white shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#C28B52]">
              <Calendar className="w-5 h-5 shrink-0" />
              <h3 id="confirm-action-title" className="text-base font-bold font-display text-white">
                Confirm Booking & Email Automation
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Please review the actions that will be performed with your permission:
            </p>

            <div className="p-3 rounded-lg bg-[#0B0F17] border border-white/[0.08] text-xs space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-[#C28B52] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Google Calendar Event:</strong>
                  <span>Marketing4Startups Strategy Consultation on {payload.selectedDate} at {payload.selectedTime} (Europe/Dublin).</span>
                </div>
              </div>

              {sendEmailAutomation && (
                <div className="flex items-start gap-2 pt-1 border-t border-white/[0.06]">
                  <Send className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Automated Email via Gmail:</strong>
                    <span>Dispatches booking confirmation to <strong>{payload.founderEmail}</strong>, confirms a Marketing4Startups team member will be in contact, and delivers your official GDPR data processing receipt.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 min-h-[38px] text-xs text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmAction}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm"
              >
                <span>Confirm & Automate</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
