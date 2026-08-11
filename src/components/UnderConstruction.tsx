'use client';

import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Cabin_Sketch } from 'next/font/google';

const cabinSketch = Cabin_Sketch({ subsets: ['latin'], weight: ['400', '700'] });

interface UnderConstructionProps {
  pageTitle?: string;
  badge?: string;
  showBackHome?: boolean;
}

export default function UnderConstruction({
  pageTitle,
  showBackHome = true,
}: UnderConstructionProps) {
  const fullTitle = pageTitle || 'UNDER CONSTRUCTION';
  const words = fullTitle.trim().split(' ');
  const prefix = words.length > 1 ? words.slice(0, -1).join(' ') : '';
  const highlight = words.length > 1 ? words.slice(-1)[0] : words[0];

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-4 py-8 sm:py-12 select-none overflow-hidden font-sans">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes bobHat {
          0%, 100% { transform: rotate(-8deg) translateY(0px); }
          50% { transform: rotate(-4deg) translateY(-6px); }
        }
        @keyframes signWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1.5deg); }
          75% { transform: rotate(-1.5deg); }
        }
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-bob-hat {
          animation: bobHat 4s ease-in-out infinite;
          transform-origin: 450px 75px;
        }
        .animate-sign-wiggle {
          animation: signWiggle 5s ease-in-out infinite;
          transform-origin: 720px 380px;
        }
      `}</style>

      {/* Background Subtle Ambient Glow on Pure Black */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#1a1c24]/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[320px] bg-[#f59e0b]/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Main Illustration & Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-auto my-auto pt-2 sm:pt-4">
        
        {/* SVG Illustration Container - Scaled Bigger */}
        <div className="relative w-full max-w-[760px] md:max-w-[820px] aspect-[16/9.2] flex items-center justify-center">
          <svg
            viewBox="0 0 900 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-2xl overflow-visible"
          >
            <defs>
              {/* Pattern for Barricade Diagonal Stripes */}
              <pattern
                id="barrierStripes"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="14" height="28" fill="#F59E0B" />
                <rect x="14" width="14" height="28" fill="#14171F" />
              </pattern>

              {/* Hard Hat Gradient */}
              <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="55%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Warning Sign Gradient */}
              <linearGradient id="signGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              {/* Traffic Cone Gradient */}
              <linearGradient id="coneGrad" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* --- 1. Background Rounded Capsule / Cloud Shapes --- */}
            <g opacity="0.65" className="animate-float-slow">
              <rect x="140" y="75" width="580" height="42" rx="21" fill="#1E202B" />
              <rect x="90" y="130" width="680" height="52" rx="26" fill="#1A1C26" />
              <rect x="170" y="195" width="620" height="46" rx="23" fill="#171922" />
              <rect x="80" y="255" width="710" height="58" rx="29" fill="#14161E" />
              <rect x="150" y="325" width="620" height="46" rx="23" fill="#11131A" />
            </g>

            {/* --- 2. Ground Base Line --- */}
            <line x1="120" y1="388" x2="760" y2="388" stroke="#2D3140" strokeWidth="3" strokeLinecap="round" />
            <line x1="190" y1="395" x2="225" y2="395" stroke="#242733" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="390" y1="395" x2="430" y2="395" stroke="#242733" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="650" y1="395" x2="690" y2="395" stroke="#242733" strokeWidth="2.5" strokeLinecap="round" />

            {/* --- 3. Caution Warning Signpost (Right of 'B') --- */}
            <g className="animate-sign-wiggle">
              {/* Pole */}
              <line x1="720" y1="160" x2="720" y2="386" stroke="#5E6578" strokeWidth="6" strokeLinecap="round" />
              <line x1="708" y1="386" x2="732" y2="386" stroke="#2D3140" strokeWidth="4" strokeLinecap="round" />
              
              {/* Diamond Warning Sign */}
              <g transform="translate(720, 132)">
                {/* Outer Diamond */}
                <rect
                  x="-42"
                  y="-42"
                  width="84"
                  height="84"
                  rx="16"
                  transform="rotate(45)"
                  fill="url(#signGrad)"
                  stroke="#12141A"
                  strokeWidth="4"
                />
                {/* Inner Dashed/Border Diamond */}
                <rect
                  x="-33"
                  y="-33"
                  width="66"
                  height="66"
                  rx="11"
                  transform="rotate(45)"
                  fill="none"
                  stroke="#12141A"
                  strokeWidth="3"
                  strokeDasharray="5 2.5"
                  opacity="0.85"
                />
                {/* Bold Exclamation Mark */}
                <g fill="#12141A">
                  <path d="M -4.5 -18 L 4.5 -18 L 3.5 5 L -3.5 5 Z" />
                  <circle cx="0" cy="17" r="5" />
                </g>
              </g>
            </g>

            {/* --- 4. Main "WEB" Text (Top Row) with Cutout Glitch Lines --- */}
            <g>
              {/* Drop Shadow */}
              <text
                x="453"
                y="198"
                textAnchor="middle"
                fontSize="144"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="#0A0B0E"
                letterSpacing="16"
              >
                WEB
              </text>
              {/* Main Letters */}
              <text
                x="450"
                y="195"
                textAnchor="middle"
                fontSize="144"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="#EDEFE2"
                stroke="#12141A"
                strokeWidth="5"
                paintOrder="stroke fill"
                letterSpacing="16"
              >
                WEB
              </text>

              {/* Horizontal Glitch/Slice Lines through WEB */}
              <line x1="220" y1="105" x2="295" y2="105" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="240" y1="155" x2="280" y2="155" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="380" y1="120" x2="420" y2="120" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="390" y1="170" x2="445" y2="170" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="535" y1="95" x2="585" y2="95" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="550" y1="175" x2="625" y2="175" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* --- 5. Main "SITE" Text (Bottom Row) with Cutout Glitch Lines --- */}
            <g>
              {/* Drop Shadow */}
              <text
                x="453"
                y="348"
                textAnchor="middle"
                fontSize="144"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="#0A0B0E"
                letterSpacing="14"
              >
                SITE
              </text>
              {/* Main Letters */}
              <text
                x="450"
                y="345"
                textAnchor="middle"
                fontSize="144"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="#EDEFE2"
                stroke="#12141A"
                strokeWidth="5"
                paintOrder="stroke fill"
                letterSpacing="14"
              >
                SITE
              </text>

              {/* Horizontal Glitch/Slice Lines through SITE */}
              <line x1="225" y1="260" x2="275" y2="260" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="235" y1="310" x2="265" y2="310" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="365" y1="275" x2="415" y2="275" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="485" y1="270" x2="530" y2="270" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="595" y1="280" x2="655" y2="280" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="615" y1="325" x2="645" y2="325" stroke="#12141A" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* --- 6. Hard Hat Directly Above the 'E' in WEB --- */}
            <g className="animate-bob-hat">
              {/* Hat Shadow */}
              <ellipse cx="450" cy="74" rx="42" ry="9" fill="#0A0B0E" opacity="0.5" />
              
              {/* Helmet Dome */}
              <path
                d="M 420 70 C 420 38, 434 22, 450 22 C 466 22, 480 38, 480 70 Z"
                fill="url(#helmetGrad)"
                stroke="#12141A"
                strokeWidth="4"
              />
              {/* Helmet Vertical Ridge Lines */}
              <path d="M 436 28 C 433 42, 432 58, 432 70" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
              <path d="M 450 22 C 450 38, 450 54, 450 70" stroke="#FDE68A" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 464 28 C 467 42, 468 58, 468 70" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
              
              {/* Helmet Brim */}
              <path
                d="M 412 68 C 432 63, 468 63, 488 68 C 493 72, 489 77, 476 79 C 452 82, 432 82, 418 79 C 409 76, 409 72, 412 68 Z"
                fill="#F59E0B"
                stroke="#12141A"
                strokeWidth="4"
              />
              {/* White Stripe on Brim */}
              <path d="M 426 73 C 440 70, 460 70, 474 73" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
            </g>

            {/* --- 7. Traffic Cones (Lower Left under 'S') --- */}
            {/* Back Cone */}
            <g transform="translate(210, 290)">
              <ellipse cx="25" cy="94" rx="28" ry="7.5" fill="#0A0B0E" opacity="0.5" />
              {/* Base */}
              <rect x="0" y="86" width="50" height="9.5" rx="4" fill="#12141A" stroke="#12141A" strokeWidth="2.5" />
              {/* Cone Body */}
              <path d="M 20 16 L 6 86 L 44 86 L 30 16 Z" fill="url(#coneGrad)" stroke="#12141A" strokeWidth="3" />
              {/* Black Stripe */}
              <path d="M 15 38 L 10 60 L 40 60 L 35 38 Z" fill="#12141A" />
              {/* White Reflective Band */}
              <path d="M 14 43 L 11 54 L 39 54 L 36 43 Z" fill="#ECEEF2" />
              {/* Top Cap */}
              <ellipse cx="25" cy="16" rx="5" ry="2.5" fill="#FBBF24" />
            </g>

            {/* Front Cone (Offset right, larger) */}
            <g transform="translate(245, 305)">
              <ellipse cx="28" cy="94" rx="30" ry="8" fill="#0A0B0E" opacity="0.65" />
              {/* Base */}
              <rect x="0" y="85" width="56" height="10.5" rx="4.5" fill="#12141A" stroke="#12141A" strokeWidth="3" />
              {/* Cone Body */}
              <path d="M 23 12 L 7 85 L 49 85 L 33 12 Z" fill="url(#coneGrad)" stroke="#12141A" strokeWidth="3.5" />
              {/* Black Stripe */}
              <path d="M 17 36 L 11 59 L 45 59 L 39 36 Z" fill="#12141A" />
              {/* White Reflective Band */}
              <path d="M 16 42 L 13 53 L 43 53 L 40 42 Z" fill="#ECEEF2" />
              {/* Top Cap */}
              <ellipse cx="28" cy="12" rx="5.5" ry="3" fill="#FBBF24" />
            </g>

            {/* --- 8. Construction Barricade / Barrier (Center spanning I-T) --- */}
            <g transform="translate(415, 305)">
              {/* Legs Shadows */}
              <ellipse cx="24" cy="85" rx="14" ry="4" fill="#0A0B0E" opacity="0.5" />
              <ellipse cx="96" cy="85" rx="14" ry="4" fill="#0A0B0E" opacity="0.5" />

              {/* Metal Legs */}
              <line x1="24" y1="36" x2="24" y2="82" stroke="#5E6578" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="96" y1="36" x2="96" y2="82" stroke="#5E6578" strokeWidth="5.5" strokeLinecap="round" />
              
              {/* Left A-Frame Foot */}
              <path d="M 10 82 L 38 82" stroke="#2D3140" strokeWidth="4.5" strokeLinecap="round" />
              {/* Right A-Frame Foot */}
              <path d="M 82 82 L 110 82" stroke="#2D3140" strokeWidth="4.5" strokeLinecap="round" />

              {/* Barrier Board Shadow */}
              <rect x="3" y="6" width="116" height="34" rx="5" fill="#0A0B0E" opacity="0.5" />
              
              {/* Main Striped Barrier Board */}
              <rect
                x="0"
                y="3"
                width="120"
                height="34"
                rx="5"
                fill="url(#barrierStripes)"
                stroke="#12141A"
                strokeWidth="3.5"
              />

              {/* Corner Bolts */}
              <circle cx="8" cy="11" r="2.5" fill="#5E6578" />
              <circle cx="8" cy="29" r="2.5" fill="#5E6578" />
              <circle cx="112" cy="11" r="2.5" fill="#5E6578" />
              <circle cx="112" cy="29" r="2.5" fill="#5E6578" />
            </g>
          </svg>
        </div>

        {/* Text Section */}
        <div className="text-center mt-6 sm:mt-8 space-y-4 px-4">
          <h1 className={`${cabinSketch.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap`}>
            {prefix && <span>{prefix}</span>}
            <span className="text-[#F59E0B] drop-shadow-[0_0_24px_rgba(245,158,11,0.45)]">
              {highlight}
            </span>
          </h1>
          {showBackHome && (
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-black bg-[#F59E0B] hover:bg-[#FBBF24] rounded-md transition-colors font-sans"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
