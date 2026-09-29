import React from 'react';
import { ShieldCheck, Lock, HeartHandshake, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface SafeHarborPledgeProps {
  onOpenBooking: () => void;
}

export const SafeHarborPledge: React.FC<SafeHarborPledgeProps> = ({ onOpenBooking }) => {
  const pledges = [
    {
      icon: Lock,
      title: '100% Strict Confidentiality',
      subtitle: 'Mutual NDA Protected',
      description: 'Your trade secrets, financial runway, and business model are strictly private. We happily sign your NDA or provide our standard mutual confidentiality agreement before reviewing any numbers.'
    },
    {
      icon: HeartHandshake,
      title: 'Zero Judgment, Zero High-Pressure',
      subtitle: 'A Reassuring Space',
      description: 'Many of our clients come to us after losing money on expensive agencies or feeling overwhelmed by advice. There is zero judgment here—just calm, practical steps to get your sales back on track.'
    },
    {
      icon: ShieldCheck,
      title: 'No Long Lock-In Contracts',
      subtitle: 'Transparent Sprints',
      description: 'You are never trapped in an opaque 12-month retainer. We work in clear 4-week sprints or flexible monthly advisory arrangements that you can pause or adjust at any time.'
    },
    {
      icon: FileCheck,
      title: 'Registered Irish Business',
      subtitle: 'Compliant & Verified',
      description: 'We are an established Irish entity registered in Dublin, fully compliant with Irish corporate governance and EU GDPR data protection laws. Your information is never sold or shared.'
    }
  ];

  return (
    <section id="safe-harbor" className="py-16 sm:py-20 md:py-24 bg-[#0B0F17] border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle reassuring warm emerald & amber ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-emerald-500/5 via-[#C28B52]/5 to-transparent blur-3xl -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Our Safety & Trust Commitment</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
            A safe, transparent space for Irish founders & business owners
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Running an early-stage company or small business is demanding enough without having to worry about aggressive 
            sales tactics, hidden fees, or wasted cash. Here is our pledge to every founder who sits down with us:
          </p>
        </div>

        {/* 4 Pillars of Safety Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pledges.map((pledge, index) => {
            const Icon = pledge.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#101726] border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C28B52] font-mono block mb-1">
                    {pledge.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {pledge.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pledge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassuring Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#101726]/80 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-200">
              <strong className="text-white">Honest advice policy:</strong> If we genuinely don't believe we can help you grow sales, we will tell you upfront and point you to free Local Enterprise Office resources.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[40px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <span>Book a Safe, No-Pressure Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
