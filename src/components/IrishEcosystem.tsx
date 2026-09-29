import React, { useState } from 'react';
import { IRISH_SUPPORTS } from '../data/mockData';
import { Landmark, ArrowRight } from 'lucide-react';

interface IrishEcosystemProps {
  onOpenBooking: () => void;
}

export const IrishEcosystem: React.FC<IrishEcosystemProps> = ({ onOpenBooking }) => {
  const [activeSupportId, setActiveSupportId] = useState(IRISH_SUPPORTS[0].id);

  return (
    <section id="irish-ecosystem" className="py-16 sm:py-20 md:py-28 bg-[#0B0F17] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Context & Thesis */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold">
              Irish Grants & Practical Growth
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
              Built for Irish businesses, local hubs, and state grants
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Global agencies don't understand how business in Ireland actually works. Growing an Irish venture 
              requires local credibility in communities like Dublin, Cork, or Galway—paired with a realistic, 
              cost-effective plan to win customers in the UK and Europe.
            </p>

            <div className="p-4 sm:p-5 rounded-xl bg-[#101726] border border-white/[0.08] space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E0A96D] uppercase tracking-wider">
                <Landmark className="w-4 h-4 text-[#C28B52]" />
                <span>State Grant & Co-Funding Support</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our marketing plans, overseas market research, and website setups are prepared so you can submit them 
                directly for matching funding from Enterprise Ireland and your Local Enterprise Office (LEO).
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg active:scale-[0.98]"
              >
                <span>Check If Your Business Qualifies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Support Schemes & Strategic Relevance */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1 sm:mb-2">
              Irish Support Schemes & How We Help You Leverage Them:
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {IRISH_SUPPORTS.map((support) => {
                const isSelected = support.id === activeSupportId;
                return (
                  <div
                    key={support.id}
                    onClick={() => setActiveSupportId(support.id)}
                    className={`p-4 sm:p-6 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#101726] border-[#C28B52]/50 shadow-lg shadow-[#C28B52]/5'
                        : 'bg-[#101726]/40 border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                      <div>
                        <span className="text-[11px] sm:text-xs text-[#C28B52] font-mono tracking-wider uppercase block">
                          {support.agency} · {support.scope}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-display mt-0.5">
                          {support.name}
                        </h3>
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20 whitespace-nowrap self-start sm:self-auto">
                        {support.grantValue}
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="text-slate-400 block mb-1 font-medium">How Tailored Marketing Leverages This:</span>
                      {support.strategicRelevance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
