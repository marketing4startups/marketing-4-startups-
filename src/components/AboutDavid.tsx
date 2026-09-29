import React from 'react';
import { Mail, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface AboutDavidProps {
  onOpenBooking: () => void;
}

export const AboutDavid: React.FC<AboutDavidProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#101726]/30 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#101726] border border-white/[0.08] relative overflow-hidden">
          {/* Subtle background ambient tint */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#C28B52]/5 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Bio Details */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold">
                  Founder & Principal Strategist
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#C28B52]" />
                  Dublin, Ireland
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display">
                David Murphy
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                "I started Marketing4Startups because I watched too many Irish entrepreneurs burn through their hard-earned 
                cash on big corporate branding agencies. They received gorgeous color palettes and 60-page slide decks, 
                but six months later, their sales pipeline was empty."
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Early-stage businesses don't need a bloated marketing department. They need a simple, reliable way to find 
                paying customers. When you work with Marketing4Startups, you talk directly with me—no junior staff, 
                no corporate buzzwords, and no endless meetings.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C28B52] shrink-0" />
                  <span>10+ Years Helping Tech Startups & Irish SMEs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C28B52] shrink-0" />
                  <span>Experienced with Enterprise Ireland & LEO Grants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C28B52] shrink-0" />
                  <span>UK & European Export Experience</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg shadow-sm active:scale-[0.98]"
                >
                  <span>Book Consultation With David</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="mailto:david.murphy@marketing4startups.net"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C28B52]" />
                  <span className="truncate">david.murphy@marketing4startups.net</span>
                </a>
              </div>
            </div>

            {/* Quick Strategic Credentials Box */}
            <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#0B0F17]/80 border border-white/[0.08] space-y-3.5 sm:space-y-4">
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-[#C28B52] font-semibold">
                Our Guarantee to Irish Founders
              </h3>

              <ul className="space-y-2.5 sm:space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#C28B52] font-bold">01.</span>
                  <span>No junior handoffs. You work directly with David on every project.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#C28B52] font-bold">02.</span>
                  <span>No vanity clicks. Everything is focused on sales calls and paying customers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#C28B52] font-bold">03.</span>
                  <span>Full support preparing documents for Enterprise Ireland and LEO grants.</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-slate-400">
                Direct availability limited to 3 new startup partnerships per quarter to ensure senior executive focus.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
