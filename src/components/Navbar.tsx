import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Calendar, PhoneCall, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenQuery: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenQuery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open on phones
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Outperformance', href: '#outperformance' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Irish Ecosystem', href: '#irish-ecosystem' },
    { label: 'Founder Safety', href: '#safe-harbor' },
    { label: 'Engagement', href: '#models' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/95 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark strictly adhering to Top Bar Contract */}
        <a 
          href="/" 
          className="text-lg sm:text-xl font-bold tracking-tight text-white font-display hover:text-[#C28B52] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52] rounded py-1 whitespace-nowrap shrink-0"
        >
          Marketing<span className="text-[#C28B52]">4</span>Startups
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors py-1 hover:underline underline-offset-8 decoration-[#C28B52]/60 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Action buttons + Mobile/Tablet hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenQuery}
            className="hidden md:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] transition-all rounded-lg whitespace-nowrap active:scale-[0.98]"
          >
            <Mail className="w-3.5 h-3.5 text-[#C28B52]" aria-hidden="true" />
            <span>Ask a Question</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4.5 py-2.5 min-h-[40px] text-xs font-semibold tracking-wide uppercase text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] active:bg-[#9F6A35] transition-all rounded-lg shadow-sm whitespace-nowrap active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52]"
          >
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Book Consultation</span>
          </button>

          {/* Mobile & Tablet hamburger toggle (touch target >= 44px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C28B52] rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 bg-[#0B0F17]/95 backdrop-blur-xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto animate-in fade-in duration-200 border-t border-white/[0.08]">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#C28B52] font-semibold px-3 py-2">
              Menu
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3.5 min-h-[48px] text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.1] space-y-3 pb-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2.5 px-5 py-3.5 text-xs font-semibold tracking-wide uppercase text-[#0B0F17] bg-[#C28B52] hover:bg-[#E0A96D] transition-colors rounded-xl shadow-lg whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Consultation & Diagnostic</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuery();
              }}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-slate-200 border border-white/10 bg-white/[0.04] rounded-xl hover:bg-white/[0.08] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#C28B52]" />
              <span>Ask a Quick Strategy Query</span>
            </button>
            <div className="text-center text-xs text-slate-400">
              Direct founder session with David Murphy · Dublin, Ireland
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
