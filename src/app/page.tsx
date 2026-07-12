'use client';

import { useState } from 'react';
import HeroLogo from '@/components/HeroLogo';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans">
      {/* Loading Overlay */}
      {!isAppLoaded && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
          aria-hidden="true"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-zinc-100/50 via-zinc-50 to-white" />

          {/* Logo */}
          <div className="relative z-10">
            <HeroLogo
              onTransitionComplete={() => setIsAppLoaded(true)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col transition-opacity duration-700 ${
          isAppLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HeroSection />
      </main>
    </div>
  );
}