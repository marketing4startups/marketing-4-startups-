/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OutperformanceMatrix } from './components/OutperformanceMatrix';
import { Services } from './components/Services';
import { IrishEcosystem } from './components/IrishEcosystem';
import { CaseStudies } from './components/CaseStudies';
import { SafeHarborPledge } from './components/SafeHarborPledge';
import { AboutDavid } from './components/AboutDavid';
import { EngagementModels } from './components/EngagementModels';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

// Code-split heavy interactive modals to maintain ultra-fast initial page loads
const BookingModal = lazy(() =>
  import('./components/BookingModal').then((mod) => ({ default: mod.BookingModal }))
);

const QueryDeskModal = lazy(() =>
  import('./components/QueryDeskModal').then((mod) => ({ default: mod.QueryDeskModal }))
);

const GDPRPrivacyModal = lazy(() =>
  import('./components/GDPRPrivacyModal').then((mod) => ({ default: mod.GDPRPrivacyModal }))
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQueryOpen, setIsQueryOpen] = useState(false);
  const [isGDPROpen, setIsGDPROpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined);

  const handleOpenBooking = (tier?: string) => {
    setSelectedTier(tier);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedTier(undefined);
  };

  const handleOpenQuery = () => {
    setIsQueryOpen(true);
  };

  const handleCloseQuery = () => {
    setIsQueryOpen(false);
  };

  const handleOpenGDPR = () => {
    setIsGDPROpen(true);
  };

  const handleCloseGDPR = () => {
    setIsGDPROpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] selection:bg-[#C28B52]/30 selection:text-[#F8FAFC]">
      {/* Top Bar Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenQuery={handleOpenQuery}
      />

      <main>
        {/* Hero Section with Authentic Dublin Docklands */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* The Outperformance Matrix: Enterprise Flaws vs. Startup Edge */}
        <OutperformanceMatrix onOpenBooking={() => handleOpenBooking()} />

        {/* 4 Core Practical Services */}
        <Services onOpenBooking={() => handleOpenBooking()} />

        {/* Irish Ecosystem & Grant Alignment */}
        <IrishEcosystem onOpenBooking={() => handleOpenBooking()} />

        {/* Case Studies & Validated Irish Startup Benchmarks */}
        <CaseStudies onOpenBooking={() => handleOpenBooking()} />

        {/* Founder Safe Harbor Pledge: Confidentiality, Transparency & Legal Safety */}
        <SafeHarborPledge onOpenBooking={() => handleOpenBooking()} />

        {/* About David Murphy & Founder Pledge */}
        <AboutDavid onOpenBooking={() => handleOpenBooking()} />

        {/* Transparent Engagement Models */}
        <EngagementModels onSelectTier={(tierName) => handleOpenBooking(tierName)} />

        {/* Frequently Asked Questions */}
        <Faq onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenQuery={handleOpenQuery}
        onOpenGDPR={handleOpenGDPR}
      />

      {/* Consultation Booking & Calendar Modal (Loaded on Demand) */}
      {isBookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
            preselectedTier={selectedTier}
          />
        </Suspense>
      )}

      {/* Strategy Query & Advisory Desk Modal (Loaded on Demand) */}
      {isQueryOpen && (
        <Suspense fallback={null}>
          <QueryDeskModal
            isOpen={isQueryOpen}
            onClose={handleCloseQuery}
            onOpenBookingModal={() => handleOpenBooking()}
          />
        </Suspense>
      )}

      {/* Standalone GDPR Privacy Policy & Data Processing Modal (Loaded on Demand) */}
      {isGDPROpen && (
        <Suspense fallback={null}>
          <GDPRPrivacyModal
            isOpen={isGDPROpen}
            onClose={handleCloseGDPR}
          />
        </Suspense>
      )}
    </div>
  );
}
