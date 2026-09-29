import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface GDPRPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GDPRPrivacyModal: React.FC<GDPRPrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0B0F17]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gdpr-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#101726] border border-white/[0.12] rounded-2xl shadow-2xl p-5 sm:p-7 md:p-8 my-auto max-h-[90vh] overflow-y-auto text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Close GDPR Notice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>EU GDPR (Regulation 2016/679) & Irish Data Protection Act 2018</span>
          </div>
          <h2 id="gdpr-modal-title" className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
            GDPR Compliance & Data Processing Declaration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Transparent, lawful, and confidential handling of Irish founder and corporate data.
          </p>
        </div>

        {/* Content sections */}
        <div className="mt-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* 1. Data Controller */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/[0.08] space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#C28B52]" />
              <span>1. Data Controller Identification</span>
            </h3>
            <p className="text-xs text-slate-400">
              The statutory Data Controller is <strong>Marketing4Startups Ltd</strong>, registered in the Republic of Ireland (Company Registration CRO #741920). Principal office located at Silicon Docks, Dublin 2, Ireland.
            </p>
            <p className="text-xs text-slate-400">
              Direct Data Protection Contact: <a href="mailto:privacy@marketing4startups.net" className="text-[#C28B52] underline">privacy@marketing4startups.net</a> or <a href="mailto:david.murphy@marketing4startups.net" className="text-[#C28B52] underline">david.murphy@marketing4startups.net</a>.
            </p>
          </div>

          {/* 2. Lawful Basis & Processing Scope */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C28B52]" />
              <span>2. Lawful Bases for Processing (Articles 6(1)(a), 6(1)(b), 6(1)(f))</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
              <li>
                <strong>Explicit Consent (Art. 6(1)(a)):</strong> Obtained when you submit a consultation booking or advisory query. Used solely to coordinate your session, deliver tailored strategic guidance, and confirm appointments.
              </li>
              <li>
                <strong>Pre-contractual Steps (Art. 6(1)(b)):</strong> Reviewing startup metrics, stage, and grant alignment in preparation for a commercial engagement.
              </li>
              <li>
                <strong>Legitimate Interests (Art. 6(1)(f)):</strong> Preventing fraud, ensuring security of digital communications, and keeping records of business consultations under mutual non-disclosure.
              </li>
            </ul>
          </div>

          {/* 3. Scope of Personal & Commercial Data */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C28B52]" />
              <span>3. Data Collected & Zero Third-Party Selling Policy</span>
            </h3>
            <p className="text-xs text-slate-300">
              We collect only the minimum necessary data to perform our advisory functions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-lg bg-[#141C2E] border border-white/[0.06]">
                <strong className="text-white block mb-1">Founder Identifiers:</strong>
                <span>Name, work email, phone number (if provided), and company role.</span>
              </div>
              <div className="p-3 rounded-lg bg-[#141C2E] border border-white/[0.06]">
                <strong className="text-white block mb-1">Commercial Context:</strong>
                <span>Startup name, website, funding stage, marketing spend bracket, and core growth bottlenecks.</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Strict Zero-Resale Pledge:</strong> We never sell, lease, or monetize your contact or commercial data to advertising networks, third-party recruiters, or brokers.
              </span>
            </div>
          </div>

          {/* 4. Data Subject Rights */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>4. Your Statutory GDPR Rights (Articles 15–22)</span>
            </h3>
            <p className="text-xs text-slate-300">
              As an EU/EEA or Irish data subject, you hold unequivocal legal rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-[#0B0F17] border border-white/[0.06]">
                <strong className="text-[#C28B52]">Right of Access:</strong> Obtain a complete copy of all personal data held.
              </div>
              <div className="p-2.5 rounded bg-[#0B0F17] border border-white/[0.06]">
                <strong className="text-[#C28B52]">Right to Erasure ("To Be Forgotten"):</strong> Request immediate permanent deletion of your records.
              </div>
              <div className="p-2.5 rounded bg-[#0B0F17] border border-white/[0.06]">
                <strong className="text-[#C28B52]">Right to Rectification:</strong> Correct any outdated or inaccurate details.
              </div>
              <div className="p-2.5 rounded bg-[#0B0F17] border border-white/[0.06]">
                <strong className="text-[#C28B52]">Right to Withdraw Consent:</strong> Revoke processing permission at any time without penalty.
              </div>
            </div>
          </div>

          {/* 5. Retention Period & Supervisory Authority */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/[0.08] space-y-2 text-xs text-slate-400">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              5. Retention & Irish Data Protection Commission (DPC)
            </h3>
            <p>
              Inquiry and consultation intake records are retained for a maximum of <strong>90 days</strong> post-completion unless a commercial contract is active or you request earlier deletion.
            </p>
            <p>
              You also have the right to lodge a formal complaint with the Irish Data Protection Commission (DPC Ireland) at <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer" className="text-[#C28B52] underline">www.dataprotection.ie</a>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Last updated: September 2026 · Marketing4Startups Ltd
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
