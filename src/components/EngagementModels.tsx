import React from 'react';
import { ENGAGEMENT_TIERS } from '../data/mockData';
import { Check, ArrowRight } from 'lucide-react';

interface EngagementModelsProps {
  onSelectTier: (tierName: string) => void;
}

export const EngagementModels: React.FC<EngagementModelsProps> = ({ onSelectTier }) => {
  return (
    <section id="models" className="py-16 sm:py-20 md:py-28 bg-[#0B0F17] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold mb-2">
            Transparent Engagement
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
            Flexible models designed for early-stage runway
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300">
            No indefinite 12-month lock-in contracts or murky hourly billables. Choose an agile sprint or an embedded executive partnership.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {ENGAGEMENT_TIERS.map((tier) => {
            const isPopular = tier.isPopular;

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'bg-[#101726] border-2 border-[#C28B52] shadow-xl shadow-[#C28B52]/10 md:scale-[1.02]'
                    : 'bg-[#101726]/70 border border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                {/* Popular Marker */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C28B52] text-[#0B0F17] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow whitespace-nowrap">
                    Most Popular with Irish Seed & Scale-Ups
                  </div>
                )}

                <div>
                  <div className="pb-4 sm:pb-5 border-b border-white/[0.06]">
                    <span className="text-xs text-[#C28B52] font-semibold uppercase tracking-wider block">
                      {tier.duration}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {tier.idealFor}
                    </p>
                  </div>

                  <div className="py-4 sm:py-5 border-b border-white/[0.06]">
                    <div className="text-xs text-slate-400 font-medium">Structure</div>
                    <div className="text-lg sm:text-xl font-bold text-[#E0A96D] font-mono mt-0.5">
                      {tier.priceModel}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Eligible for Enterprise Ireland / LEO co-funding
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      What is Included:
                    </span>
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#C28B52] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Deliverables */}
                  <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06]">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      Key Takeaways:
                    </span>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      {tier.deliverables.map((del, i) => (
                        <li key={i}>{del}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => onSelectTier(tier.name)}
                    className={`w-full py-3 sm:py-3.5 px-4 min-h-[44px] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      isPopular
                        ? 'bg-[#C28B52] text-[#0B0F17] hover:bg-[#E0A96D] shadow-md'
                        : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.1]'
                    }`}
                  >
                    <span>{tier.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
