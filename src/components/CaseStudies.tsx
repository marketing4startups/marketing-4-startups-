import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { ArrowUpRight, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import founderSessionImage from '../assets/images/irish_founder_consult.webp';

interface CaseStudiesProps {
  onOpenBooking: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenBooking }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const activeCase = CASE_STUDIES[activeCaseIndex];

  return (
    <section id="case-studies" className="py-16 sm:py-20 md:py-28 bg-[#101726]/40 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold mb-2">
              Performance Case Benchmarks
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
              Validated commercial outcomes across Irish sectors
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-300">
              Examining empirical growth shifts when startups replace generic corporate retainers with tailored, high-velocity sprints.
            </p>
          </div>

          {/* Case study selector buttons - horizontal scroll on small devices */}
          <div className="flex items-center gap-2 p-1 bg-[#101726] rounded-lg border border-white/[0.08] self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
            {CASE_STUDIES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`px-3.5 py-1.5 min-h-[38px] text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  idx === activeCaseIndex
                    ? 'bg-[#C28B52] text-[#0B0F17] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Case 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Case Study Detail Box */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Case Content */}
          <div className="lg:col-span-7 p-5 sm:p-7 md:p-9 rounded-2xl bg-[#101726] border border-white/[0.08] flex flex-col justify-between">
            <div>
              {/* Sector & Location Metadata */}
              <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs text-slate-400 pb-3.5 sm:pb-4 border-b border-white/[0.06]">
                <span className="text-[#C28B52] font-semibold uppercase tracking-wider">{activeCase.companySnippet}</span>
                <span aria-hidden="true">·</span>
                <span>{activeCase.sector}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {activeCase.location}
                </span>
              </div>

              {/* Marquee Metric */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E0A96D] font-mono tabular-nums">
                  {activeCase.metric}
                </span>
                <span className="text-xs sm:text-sm md:text-base text-slate-300 font-medium">
                  {activeCase.metricContext}
                </span>
              </div>

              {/* Headline & Comparison Context */}
              <h3 className="mt-3.5 sm:mt-4 text-lg sm:text-xl md:text-2xl font-bold text-white font-display">
                {activeCase.headline}
              </h3>

              <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
                <div className="p-3.5 sm:p-4 rounded-lg bg-rose-500/[0.06] border border-rose-500/20 text-xs sm:text-sm text-slate-300">
                  <span className="font-semibold text-rose-300 block mb-1">The Prior Enterprise Bottleneck:</span>
                  {activeCase.theBottleneck}
                </div>

                <div className="p-3.5 sm:p-4 rounded-lg bg-[#C28B52]/[0.08] border border-[#C28B52]/20 text-xs sm:text-sm text-slate-300">
                  <span className="font-semibold text-[#E0A96D] block mb-1">The Tailored Startup Strategy:</span>
                  {activeCase.theTailoredStrategy}
                </div>
              </div>

              {/* Concrete Outcomes */}
              <div className="mt-5 sm:mt-6">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2 sm:mb-2.5">
                  Validated Results:
                </span>
                <div className="space-y-2">
                  {activeCase.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantitative Impact Summary */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="text-slate-500">Validation Method:</span>
              <span className="text-slate-300 font-mono">14-Day Sprint Execution & Direct Commercial Data</span>
            </div>
          </div>

          {/* Right Visual Carrier: Strategy Session Image & Fast Consultation Card */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Visual Photo Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#101726] flex-1 min-h-[220px] sm:min-h-[260px]">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-xs text-slate-500">
                  Founder Strategy Session · Marketing4Startups
                </div>
              )}
              <img
                src={founderSessionImage}
                alt="A warm, reassuring strategy consultation between an Irish founder and advisor in Dublin"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-xs text-slate-300">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Confidential Advisory in Dublin</span>
                </span>
                Direct, friendly founder steering in a welcoming setting.
              </div>
            </div>

            {/* Diagnostic Prompt Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101726] border border-emerald-500/20 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                  Confidential Founder Review
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-display">
                  Tired of high marketing agency fees with poor results?
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Book a safe, 45-minute strategic review to diagnose what is holding back your sales without any sales pressure.
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className="mt-4 sm:mt-5 w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg active:scale-[0.98]"
              >
                <span>Book 1-on-1 Founder Diagnostic</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
