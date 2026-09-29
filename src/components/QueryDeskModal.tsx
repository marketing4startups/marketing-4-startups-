import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Sparkles, 
  HelpCircle,
  ShieldCheck,
  Calendar,
  Lock
} from 'lucide-react';
import { 
  initAuth, 
  signInWithGoogleCalendar, 
  sendFounderQueryEmail,
  QueryEmailPayload 
} from '../services/googleCalendar';
import { GDPRPrivacyModal } from './GDPRPrivacyModal';

interface QueryDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingModal?: () => void;
}

export const QueryDeskModal: React.FC<QueryDeskModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenBookingModal 
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [queryType, setQueryType] = useState<QueryEmailPayload['queryType']>('grant-eligibility');
  const [message, setMessage] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [gdprConsentTimestamp, setGdprConsentTimestamp] = useState('');
  const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
        if (!email && user.email) setEmail(user.email);
        if (!fullName && user.displayName) setFullName(user.displayName);
      },
      () => setCurrentUser(null)
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      const { user } = await signInWithGoogleCalendar();
      setCurrentUser(user);
      if (user.email) setEmail(user.email);
      if (user.displayName) setFullName(user.displayName);
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(err?.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, business email, and query.');
      return;
    }

    if (!gdprAccepted) {
      setErrorMessage('Please accept the GDPR data processing consent to submit your query.');
      return;
    }

    if (currentUser) {
      // Show explicit confirmation dialog before sending email
      setShowConfirmDialog(true);
    } else {
      // Trigger sign in or direct mailto
      handleSignIn();
    }
  };

  const handleConfirmSend = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await sendFounderQueryEmail({
        founderName: fullName,
        founderEmail: email,
        companyName: companyName || 'Irish Startup/SME',
        queryType,
        message,
        gdprConsentTimestamp: gdprConsentTimestamp || new Date().toISOString(),
      });
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to send automated query email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Marketing Query: ${companyName || fullName}`);
    const body = encodeURIComponent(
      `Hi David,\n\nFounder: ${fullName}\nCompany: ${companyName}\nTopic: ${queryType}\n\nQuery:\n${message}\n\nBest regards,\n${fullName}`
    );
    window.location.href = `mailto:david.murphy@marketing4startups.net?subject=${subject}&body=${body}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0B0F17]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="query-desk-title"
    >
      <div className="relative w-full max-w-xl bg-[#101726] border border-white/[0.12] rounded-2xl shadow-2xl p-5 sm:p-7 md:p-8 my-auto text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Close query modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#C28B52] font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Direct Strategy & Query Desk</span>
          </div>
          <h2 id="query-desk-title" className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
            Ask a Growth or Funding Question
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Get practical advice on Irish enterprise grants, marketing budget allocation, or growth strategy.
          </p>
        </div>

        {isSuccess ? (
          <div className="mt-6 space-y-4">
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <h3 className="text-base font-bold text-white">Query Dispatched via Automated Gmail</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                An automated receipt and triage summary have been dispatched to <strong className="text-white">{email}</strong> confirming that a member of the <strong>Marketing4Startups team</strong> will review your details and reply directly within <strong>4 business hours</strong>.
              </p>
              <div className="pt-1 text-xs text-emerald-300/90 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official GDPR consent receipt confirmed and logged for your records.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/[0.08] text-xs space-y-2 text-slate-300">
              <span className="font-semibold text-white block">Need an immediate full deep-dive instead?</span>
              <p className="text-slate-400">
                You can book a 45-minute commercial diagnostic on David's calendar with Google Meet coordinates attached.
              </p>
              {onOpenBookingModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBookingModal();
                  }}
                  className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#C28B52] font-semibold hover:underline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Consultation on Google Calendar</span>
                </button>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg"
              >
                Close Desk
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Full Name <span className="text-[#C28B52]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Burke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Work Email <span className="text-[#C28B52]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="liam@startup.ie"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Company / Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Galway AI Labs"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Topic of Query
                </label>
                <select
                  value={queryType}
                  onChange={(e) => setQueryType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
                >
                  <option value="grant-eligibility">Enterprise Ireland / LEO Grant Alignment</option>
                  <option value="agency-vs-fractional">Agency vs Fractional Head of Marketing</option>
                  <option value="channel-strategy">Customer Acquisition & Lead Quality</option>
                  <option value="general">General Commercial Advisory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Question or Context <span className="text-[#C28B52]">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Ask specific questions about grant requirements, hiring timelines, or campaign budgets..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
              />
            </div>

            {/* Explicit GDPR Consent Checkbox (EU 2016/679) */}
            <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-white/[0.08] space-y-1.5">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={gdprAccepted}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setGdprAccepted(checked);
                    setGdprConsentTimestamp(checked ? new Date().toISOString() : '');
                    if (checked && errorMessage) setErrorMessage(null);
                  }}
                  className="mt-0.5 rounded bg-[#101726] border-white/20 text-[#C28B52] focus:ring-[#C28B52] w-4 h-4 shrink-0"
                />
                <div className="text-xs leading-relaxed text-slate-300">
                  <span>
                    I consent to <strong>Marketing4Startups Ltd</strong> processing my inquiry information under <strong>GDPR (EU 2016/679)</strong>. I understand someone from the team will contact me within 4 business hours, and I can withdraw consent or request complete data erasure at any time.{' '}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsGDPRModalOpen(true)}
                    className="text-[#C28B52] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <span>Read Privacy Declaration</span>
                  </button>
                </div>
              </label>
            </div>

            {/* Email Automation Notice */}
            <div className="p-3 rounded-lg bg-[#0D131F] border border-white/[0.08] flex items-start gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-[#C28B52] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Email Automation & Team Triage:</span>
                <span>Submitting sends an automated receipt and routes your query directly to the Marketing4Startups advisory team via Gmail.</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleMailtoFallback}
                className="text-xs text-slate-400 hover:text-white underline text-center sm:text-left"
              >
                Or compose in standard email app
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isSigningIn}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm disabled:opacity-50"
              >
                {isSubmitting || isSigningIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Query via Gmail</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Mandatory Confirmation Modal for sending query email */}
        {showConfirmDialog && (
          <div 
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-query-title"
          >
            <div className="max-w-md w-full p-5 sm:p-6 rounded-xl bg-[#141C2E] border border-white/[0.15] text-white shadow-2xl space-y-4">
              <div className="flex items-center gap-2.5 text-[#C28B52]">
                <Mail className="w-5 h-5 shrink-0" />
                <h3 id="confirm-query-title" className="text-base font-bold font-display text-white">
                  Confirm Sending Advisory Query
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                With your permission, an automated strategic query notification will be dispatched through Gmail.
              </p>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-white/[0.08] text-xs space-y-1.5 text-slate-300">
                <div><span className="text-slate-500">To:</span> <strong className="text-white">david.murphy@marketing4startups.net</strong></div>
                <div><span className="text-slate-500">Confirmation & GDPR Receipt To:</span> <span className="text-[#C28B52]">{email}</span></div>
                <div><span className="text-slate-500">Team SLA:</span> <span className="text-emerald-400">Direct contact within 4 business hours</span></div>
                <div><span className="text-slate-500">Topic:</span> <span className="text-slate-200">{queryType}</span></div>
                <div><span className="text-slate-500">Startup:</span> <span className="text-slate-200">{companyName || 'Not specified'}</span></div>
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
                  onClick={handleConfirmSend}
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm"
                >
                  <span>Confirm & Send via Gmail</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive GDPR Privacy Modal */}
        <GDPRPrivacyModal
          isOpen={isGDPRModalOpen}
          onClose={() => setIsGDPRModalOpen(false)}
        />
      </div>
    </div>
  );
};
