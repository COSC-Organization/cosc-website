'use client';

import { useState, useEffect } from 'react';
import HeroLogo from '@/components/HeroLogo';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isOverlayMounted, setIsOverlayMounted] = useState(true);

  useEffect(() => {
    if (isAnimationComplete) {
      // Fallback timer to remove overlay from DOM in case onTransitionEnd doesn't fire
      const timer = setTimeout(() => {
        setIsOverlayMounted(false);
      }, 1200); // 1000ms transition duration + 200ms buffer
      return () => clearTimeout(timer);
    }
  }, [isAnimationComplete]);

  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans">
      {/* Loading Overlay */}
      {isOverlayMounted && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white transition-opacity duration-1000 ease-out ${
            isAnimationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onTransitionEnd={(e) => {
            // Make sure we only react to the overlay's own opacity transition completing
            if (e.propertyName === 'opacity') {
              setIsOverlayMounted(false);
            }
          }}
          aria-hidden="true"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-zinc-100/50 via-zinc-50 to-white" />

          {/* Logo */}
          <div className="relative z-10">
            <HeroLogo
              onTransitionComplete={() => setIsAnimationComplete(true)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <HeroSection />
      </main>
    </div>
  );
}