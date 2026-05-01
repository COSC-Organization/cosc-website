'use client';

import { useState } from 'react';
import HeroLogo from '@/components/HeroLogo';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black font-sans relative">
      
      {/* LOADING OVERLAY - Shown initially, removed after massive transition */}
      {!isAppLoaded && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden">
          <HeroLogo onTransitionComplete={() => setIsAppLoaded(true)} />
          
          {/* Decorative background grid behind the loading logo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-100/50 via-zinc-50 to-white z-0 pointer-events-none" />
        </div>
      )}

      {/* ACTUAL LANDING PAGE CONTENT - Unveiled once the orb explodes and transition finishes */}
      {isAppLoaded && (
        <main className="flex flex-1 w-full flex-col animate-in fade-in duration-1000">
          <HeroSection />
          <Features />
          <Footer />
        </main>
      )}

    </div>
  );
}
