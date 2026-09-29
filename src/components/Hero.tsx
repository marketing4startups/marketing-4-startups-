import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import docklandsImage from '../assets/images/dublin_docklands_hub.webp';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32 bg-[#0B0F17]">
      {/* Subtle warm atmospheric glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] lg:w-[1100px] h-[350px] sm:h-[450px] bg-gradient-to-b from-[#C28B52]/10 via-[#101726]/40 to-transparent blur-3xl -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Safety & Regional Trust Markers */}
        <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#C28B52] mb-5 sm:mb-6 font-medium">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Confidential & Mutual NDA Protected</span>
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Dublin Grand Canal Dock</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Cork & Galway Hubs</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="hidden sm:inline">Enterprise Ireland HPSU & LEO Aligned</span>
          <span className="sm:hidden">EI & LEO Aligned</span>
        </div>

        {/* Primary Editorial Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.12] sm:leading-[1.08] [text-wrap:balance]">
            Big-company marketing burns startup cash.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E0A96D] to-[#C28B52]">
              Practical, tailored strategy
            </span>{' '}
            wins real customers.
          </h1>

          <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
            Most marketing playbooks are built for massive corporations with endless budgets and 6-month approval committees. 
            We provide a calm, transparent, and proven growth advisory for Irish startups and small businesses—engineered to win paying 
            customers without expensive agency retainers, confusing jargon, or high-pressure tactics.
          </p>

          {/* Action Row - Mobile full width, tablet/desktop auto */}
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 min-h-[48px] text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] active:bg-[#9F6A35] transition-all rounded-lg shadow-lg shadow-[#C28B52]/10 whitespace-nowrap active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52]"
            >
              <Calendar className="w-4 h-4 text-[#0B0F17]" aria-hidden="true" />
              <span>Book Strategy Consultation & Diagnostic</span>
              <ArrowRight className="w-4 h-4 ml-1 hidden xs:inline" aria-hidden="true" />
            </button>

            <a
              href="#outperformance"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 min-h-[48px] text-xs sm:text-sm font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors whitespace-nowrap text-center"
            >
              <span>See Outperformance Matrix</span>
              <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
            </a>
          </div>

          {/* Founder Safety Assurance Note */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct, friendly 1-on-1 advice with David Murphy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% confidential under mutual NDA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero lock-in contracts or surprise costs</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Anchor: Authentic Dublin Docklands Landscape */}
        <div className="mt-10 sm:mt-14 relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.1] bg-[#101726] shadow-2xl">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] max-h-[520px] w-full overflow-hidden">
            {/* Fallback container if image loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#101726] flex items-center justify-center p-4 text-center">
                <span className="text-xs sm:text-sm text-slate-400">Grand Canal Dock & Silicon Docks · Dublin, Ireland</span>
              </div>
            )}
            <img
              src={docklandsImage}
              alt="Grand Canal Dock and Samuel Beckett Bridge tech district in Dublin, Ireland during warm afternoon light"
              width={1000}
              height={562}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-transparent" />

            {/* In-Hero Overlay Card: Reassuring Safe Harbor Note */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 md:left-8 md:right-auto md:max-w-xl p-3.5 sm:p-5 md:p-6 bg-[#0B0F17]/95 sm:bg-[#0B0F17]/90 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/[0.1]">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>A Safe Space for Founders</span>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-snug line-clamp-2 sm:line-clamp-none">
                "Whether you're starting from scratch or have burned cash on previous agencies, you won't find judgment here. Just honest numbers, clear roadmaps, and calm execution."
              </p>
              <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                <span>Grand Canal Dock, Dublin 2</span>
                <span className="text-emerald-400 font-medium font-mono tabular-nums">100% Confidential Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
