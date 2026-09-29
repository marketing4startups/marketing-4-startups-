import React from 'react';
import { SERVICE_PILLARS } from '../data/mockData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  return (
    <section id="capabilities" className="py-16 sm:py-20 md:py-28 bg-[#101726]/40 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold mb-2">
              Our Core Services
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
              Four practical services built for fast-moving Irish businesses
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-300">
              Everything is designed to cut out endless meetings, clarify your message, and bring in paying customers.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg whitespace-nowrap active:scale-[0.98]"
          >
            <span>Discuss Your Marketing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Numbered Service Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {SERVICE_PILLARS.map((service) => (
            <div
              key={service.id}
              className="p-5 sm:p-7 md:p-8 rounded-xl bg-[#101726] border border-white/[0.08] hover:border-[#C28B52]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Number & Kicker Header */}
                <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/[0.06]">
                  <span className="text-xl sm:text-2xl font-bold text-[#C28B52] font-mono tracking-tight">
                    {service.number}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                    {service.kicker}
                  </span>
                </div>

                {/* Title & Core Description */}
                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-bold text-white font-display group-hover:text-[#E0A96D] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Why Enterprise Fails Callout */}
                <div className="mt-4 sm:mt-5 p-3 sm:p-3.5 rounded-lg bg-rose-500/[0.06] border border-rose-500/20 text-xs text-rose-200">
                  <span className="font-semibold text-rose-300 block mb-1">The Big Agency Trap:</span>
                  {service.whyEnterpriseFailsHere}
                </div>

                {/* Key Deliverables */}
                <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    What You Get:
                  </span>
                  {service.startupDeliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C28B52] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Metadata & Action */}
              <div className="mt-6 sm:mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="text-slate-400">
                  <span className="text-slate-500">Timeline: </span>
                  <span className="text-slate-200 font-medium">{service.timeline}</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#C28B52] hover:text-[#E0A96D] transition-colors min-h-[36px] py-1"
                >
                  <span>Start This Service</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
