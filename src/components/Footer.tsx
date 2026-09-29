import React from 'react';
import { Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenQuery: () => void;
  onOpenGDPR?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenQuery, onOpenGDPR }) => {
  return (
    <footer className="bg-[#070A0F] border-t border-white/[0.08] text-slate-400 text-xs py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-5 space-y-3.5 sm:space-y-4">
            <a 
              href="/" 
              className="text-lg sm:text-xl font-bold tracking-tight text-white font-display hover:text-[#C28B52] transition-colors inline-block"
            >
              Marketing<span className="text-[#C28B52]">4</span>Startups
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Custom high-level marketing strategies engineered for Irish startups and small businesses. 
              Replacing bloated corporate agency retainers with agile, capital-efficient growth sprints.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C28B52] shrink-0" />
              <span>Silicon Docks, Dublin 2, Ireland</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 md:col-span-3 space-y-2.5">
            <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-2 sm:mb-3">
              Strategic Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#outperformance" className="hover:text-white transition-colors py-1 inline-block">
                  Outperformance Matrix
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors py-1 inline-block">
                  Core Strategic Pillars
                </a>
              </li>
              <li>
                <a href="#irish-ecosystem" className="hover:text-white transition-colors py-1 inline-block">
                  Irish Ecosystem & Grants
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors py-1 inline-block">
                  Founder Case Studies
                </a>
              </li>
              <li>
                <a href="#safe-harbor" className="hover:text-emerald-400 text-emerald-400/90 transition-colors py-1 inline-block">
                  Founder Safety Pledge
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-white transition-colors py-1 inline-block">
                  Engagement Models
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Founder Contact */}
          <div className="sm:col-span-1 md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-1 sm:mb-2">
              Direct Advisory Inquiries
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every consultation and sprint is led directly by Principal Strategist David Murphy.
            </p>
            <a
              href="mailto:david.murphy@marketing4startups.net"
              className="inline-flex items-center gap-2 text-slate-200 hover:text-[#C28B52] transition-colors font-medium text-xs break-all py-1"
            >
              <Mail className="w-3.5 h-3.5 text-[#C28B52] shrink-0" />
              <span>david.murphy@marketing4startups.net</span>
            </a>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] text-xs font-semibold uppercase tracking-wider text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded shadow-sm"
              >
                <span>Book Diagnostic</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
              <button
                onClick={onOpenQuery}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.04] transition-colors rounded"
              >
                <Mail className="w-3.5 h-3.5 text-[#C28B52]" />
                <span>Ask Quick Query</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Marketing4Startups Ltd. CRO #741920. Registered in Dublin, Ireland.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-400">
            <span className="text-emerald-400">100% Mutual NDA Protected</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            {onOpenGDPR ? (
              <button
                type="button"
                onClick={onOpenGDPR}
                className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GDPR & Privacy Policy</span>
              </button>
            ) : (
              <span>GDPR Compliant</span>
            )}
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Enterprise Ireland & LEO Ecosystem Fluent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
