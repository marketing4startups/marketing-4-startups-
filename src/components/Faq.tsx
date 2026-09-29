import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqProps {
  onOpenBooking: () => void;
}

export const Faq: React.FC<FaqProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#0B0F17] border-t border-white/[0.08]" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[#C28B52] font-semibold mb-2">
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display leading-tight [text-wrap:balance]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300">
            Straightforward answers about our marketing approach, Irish grant support, and how we work with you.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/[0.08] bg-[#101726]/60 transition-colors overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white font-display" itemProp="name">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C28B52] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div 
                    className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-4 animate-in fade-in duration-200"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 rounded-xl bg-[#101726] border border-white/[0.08]">
          <h3 className="text-base font-semibold text-white">Have a specific question about your startup?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Let's evaluate your commercial model on a 45-minute diagnostic call.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-lg"
          >
            <span>Book Strategy Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
