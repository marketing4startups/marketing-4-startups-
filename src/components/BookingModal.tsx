import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { BookingFormState } from '../types';
import { GoogleCalendarSync } from './GoogleCalendarSync';
import { GDPRPrivacyModal } from './GDPRPrivacyModal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTier?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedTier }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    companyName: '',
    website: '',
    stage: 'Seed Funded',
    location: 'Dublin',
    primaryBottleneck: 'Inconsistent Lead Generation',
    monthlyBudget: '€4k - €8k/mo',
    preferredDate: '2026-10-06',
    preferredTime: '10:00 AM (Irish Standard Time)',
    notes: preselectedTier ? `Interested in ${preselectedTier}` : '',
    gdprAccepted: false,
    gdprConsentTimestamp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please provide a valid business email.';
    if (!formData.companyName.trim()) errs.companyName = 'Please enter your company or startup name.';
    if (!formData.gdprAccepted) {
      errs.gdpr = 'Please confirm GDPR consent to proceed with scheduling.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const availableTimes = [
    '09:30 AM (Irish Time)',
    '11:00 AM (Irish Time)',
    '02:00 PM (Irish Time)',
    '04:00 PM (Irish Time)',
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0B0F17]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#101726] border border-white/[0.12] rounded-2xl shadow-2xl p-5 sm:p-7 md:p-8 my-auto max-h-[92vh] overflow-y-auto text-white">
        {/* Close Button with >= 44px tap area */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52]"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-4 sm:pb-5 border-b border-white/[0.08] pr-8 sm:pr-0">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#C28B52] font-semibold">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Strategy Consultation & Diagnostic</span>
          </div>
          <h2 id="booking-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold font-display mt-1 text-white">
            {step === 3 ? 'Consultation Confirmed' : 'Schedule Your Founder Strategy Session'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            {step === 3 
              ? 'Your diagnostic session with David Murphy is confirmed. Check details below.'
              : 'Direct 45-minute 1-on-1 strategic session with David Murphy. Zero sales pitch; purely commercial diagnostic.'
            }
          </p>

          {/* Safety & Mutual NDA Reassurance */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>Safe & Confidential · Mutual NDA Guaranteed · Zero Sales Pressure</span>
          </div>

          {/* Stepper progress */}
          {step !== 3 && (
            <div className="mt-3.5 sm:mt-4 flex items-center gap-2">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#C28B52]' : 'bg-slate-800'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#C28B52]' : 'bg-slate-800'}`} />
              <span className="text-[11px] text-slate-400 font-mono ml-1">Step {step} of 2</span>
            </div>
          )}
        </div>

        {/* Step 1: Founder & Company Profile */}
        {step === 1 && (
          <form onSubmit={handleNext} className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Full Name <span className="text-[#C28B52]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fiona O'Connor"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52] transition-colors"
                />
                {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Work Email <span className="text-[#C28B52]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="fiona@yourcompany.ie"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52] transition-colors"
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Company / Startup Name <span className="text-[#C28B52]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Novus Tech Ireland"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52] transition-colors"
                />
                {errors.companyName && <p className="text-xs text-rose-400 mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://novus.ie"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Venture Stage
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52] transition-colors"
                >
                  <option value="Pre-Seed / Ideation">Pre-Seed / Ideation</option>
                  <option value="Seed Funded">Seed Funded</option>
                  <option value="Series A / Scaling">Series A / Scaling</option>
                  <option value="Profitable SME / Established">Profitable SME / Established</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52] transition-colors"
                >
                  <option value="Dublin">Dublin / Silicon Docks</option>
                  <option value="Cork">Cork</option>
                  <option value="Galway">Galway</option>
                  <option value="Limerick / Shannon">Limerick / Shannon</option>
                  <option value="Regional Ireland">Regional Ireland</option>
                  <option value="UK & EU Operating">UK & EU Operating from Ireland</option>
                </select>
              </div>
            </div>

            {/* Explicit GDPR Consent Checkbox (EU 2016/679) */}
            <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-white/[0.08] space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={formData.gdprAccepted}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData({
                      ...formData,
                      gdprAccepted: checked,
                      gdprConsentTimestamp: checked ? new Date().toISOString() : '',
                    });
                    if (checked && errors.gdpr) {
                      const newErrors = { ...errors };
                      delete newErrors.gdpr;
                      setErrors(newErrors);
                    }
                  }}
                  className="mt-0.5 rounded bg-[#101726] border-white/20 text-[#C28B52] focus:ring-[#C28B52] w-4 h-4 shrink-0"
                />
                <div className="text-xs leading-relaxed text-slate-300">
                  <span>
                    I consent to <strong>Marketing4Startups Ltd</strong> processing my contact and commercial information in accordance with <strong>GDPR (EU 2016/679)</strong> to coordinate this consultation and provide tailored strategic advisory. I understand a senior team member will contact me, and I can withdraw consent or request complete data erasure at any time.{' '}
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
              {errors.gdpr && <p className="text-xs text-rose-400 pl-6.5">{errors.gdpr}</p>}
            </div>

            <div className="pt-3 sm:pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm active:scale-[0.98]"
              >
                <span>Continue to Diagnostic Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Diagnostic & Time Selection */}
        {step === 2 && (
          <form onSubmit={handleNext} className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Growth Bottleneck
              </label>
              <select
                value={formData.primaryBottleneck}
                onChange={(e) => setFormData({ ...formData, primaryBottleneck: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
              >
                <option value="Inconsistent Lead Generation">Not getting enough steady customer inquiries</option>
                <option value="Undefined ICP & Positioning">Unclear website messaging / people don't understand our value</option>
                <option value="Enterprise Playbook Cash Burn">Overpaying expensive marketing agencies with poor results</option>
                <option value="Entering UK/EU from Ireland">Expanding into the UK or European markets from Ireland</option>
                <option value="Need Fractional Marketing Leadership">Need senior marketing guidance without hiring full-time</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
                >
                  {availableTimes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Google Calendar sync: You can automatically add this session to your calendar on the next screen.</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Current Monthly Marketing Budget Scope
              </label>
              <select
                value={formData.monthlyBudget}
                onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
              >
                <option value="€2k - €4k/mo">€2,000 - €4,000 / month (Lean Seed)</option>
                <option value="€4k - €8k/mo">€4,000 - €8,000 / month (Scaling Startup / SME)</option>
                <option value="€8k+/mo">€8,000+ / month (Funded Scale-Up)</option>
                <option value="Project / Sprint Basis">Project / Sprint Basis (Fixed Scope)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Brief Context or Questions for David (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Tell us briefly about your current marketing setup or immediate targets..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-white/[0.1] text-base sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C28B52]"
              />
            </div>

            <div className="pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm active:scale-[0.98]"
              >
                <span>Confirm Diagnostic Session</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Instant Confirmation & Diagnostic Preparation Checklist */}
        {step === 3 && (
          <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-emerald-200">Session Confirmed with David Murphy</span>
                A calendar invitation and briefing questionnaire have been queued for <strong className="text-white">{formData.email}</strong>.
              </div>
            </div>

            {/* Session Summary Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0B0F17] border border-white/[0.08] space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-slate-300 pb-2 sm:pb-3 border-b border-white/[0.06]">
                <div>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">Date & Time:</span>
                  <span className="font-mono text-white font-medium">{formData.preferredDate} · {formData.preferredTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">Session Host:</span>
                  <span className="text-white font-medium">David Murphy (Principal Strategist)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">Company:</span>
                  <span className="text-white font-medium">{formData.companyName} ({formData.stage})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] sm:text-xs">Focal Bottleneck:</span>
                  <span className="text-[#C28B52] font-medium">{formData.primaryBottleneck}</span>
                </div>
              </div>
            </div>

            {/* Google Calendar Direct Sync Integration */}
            <GoogleCalendarSync
              payload={{
                summary: `Marketing4Startups Consultation: ${formData.fullName} (${formData.companyName})`,
                description: `Strategy consultation with David Murphy for ${formData.companyName}. Focus: ${formData.primaryBottleneck}.`,
                founderName: formData.fullName,
                founderEmail: formData.email,
                companyName: formData.companyName,
                website: formData.website,
                selectedDate: formData.preferredDate,
                selectedTime: formData.preferredTime,
                tier: preselectedTier || 'Custom Growth Diagnostic',
                gdprConsentTimestamp: formData.gdprConsentTimestamp || new Date().toISOString(),
              }}
            />

            {/* Founder Preparation Checklist */}
            <div className="space-y-2 sm:space-y-2.5">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                3-Step Diagnostic Preparation Checklist:
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-[#182338]/40 border border-white/[0.06] flex items-start gap-2.5">
                  <span className="font-mono text-[#C28B52] font-bold">1.</span>
                  <span><strong>Current Numbers:</strong> Have an idea of your monthly marketing spend and recent customer inquiry numbers on hand.</span>
                </div>
                <div className="p-3 rounded-lg bg-[#182338]/40 border border-white/[0.06] flex items-start gap-2.5">
                  <span className="font-mono text-[#C28B52] font-bold">2.</span>
                  <span><strong>Dream Clients:</strong> Note 3–5 Irish or European companies that you would love to win as clients.</span>
                </div>
                <div className="p-3 rounded-lg bg-[#182338]/40 border border-white/[0.06] flex items-start gap-2.5">
                  <span className="font-mono text-[#C28B52] font-bold">3.</span>
                  <span><strong>State Grants:</strong> Note if you are currently applying for or have received Enterprise Ireland or Local Enterprise Office grants.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 border-t border-white/[0.08]">
              <a 
                href="mailto:david.murphy@marketing4startups.net" 
                className="text-xs text-[#C28B52] hover:underline text-center sm:text-left"
              >
                Questions? Email david.murphy@marketing4startups.net
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg text-center"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Interactive GDPR Privacy & Data Processing Modal */}
        <GDPRPrivacyModal
          isOpen={isGDPRModalOpen}
          onClose={() => setIsGDPRModalOpen(false)}
        />
      </div>
    </div>
  );
};
