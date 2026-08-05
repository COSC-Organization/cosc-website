'use client';

import { useState, useEffect } from 'react';
import HeroLogo from '@/components/HeroLogo';
import HeroSection from '@/components/HeroSection';
import { useAssetPreloader } from '@/hooks/useAssetPreloader';

export default function Home() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isOverlayMounted, setIsOverlayMounted] = useState(true);
  const { imagesReady } = useAssetPreloader();

  // Only dismiss the loading screen when BOTH the animation is done AND images are cached
  const readyToReveal = isAnimationComplete && imagesReady;

  useEffect(() => {
    if (readyToReveal) {
      // Fallback timer to remove overlay from DOM in case onTransitionEnd doesn't fire
      const timer = setTimeout(() => {
        setIsOverlayMounted(false);
      }, 1200); // 1000ms transition duration + 200ms buffer
      return () => clearTimeout(timer);
    }
  }, [readyToReveal]);

  // Prevent user from inspecting the page
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === 'I' ||
          e.key === 'i' ||
          e.key === 'J' ||
          e.key === 'j' ||
          e.key === 'C' ||
          e.key === 'c')
      ) {
        e.preventDefault();
        return;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return;
      }

      // Disable Cmd+Opt+I, Cmd+Opt+J, Cmd+Opt+C on Mac
      if (
        e.metaKey &&
        e.altKey &&
        (e.key === 'I' ||
          e.key === 'i' ||
          e.key === 'J' ||
          e.key === 'j' ||
          e.key === 'C' ||
          e.key === 'c')
      ) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans">
      {/* Loading Overlay */}
      {isOverlayMounted && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white transition-opacity duration-1000 ease-out ${
            readyToReveal ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
        <HeroSection isAnimationComplete={isAnimationComplete} />
        
      </main>
    </div>
  );
}