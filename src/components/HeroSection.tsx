import React from 'react';
import Image from 'next/image';

const navItems = [
  { id: '01', label: 'About Us' },
  { id: '02', label: 'Blogs' },
  { id: '03', label: 'Events' },
  { id: '04', label: 'Projects' },
  { id: '05', label: 'Workshops' },
  { id: '06', label: 'Team' },
  { id: '07', label: 'Get In Touch' },
];

interface HeroSectionProps {
  isAnimationComplete?: boolean;
}

export default function HeroSection({ isAnimationComplete = true }: HeroSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [showScrollPrompt, setShowScrollPrompt] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const centerScroll = () => {
      if (sectionRef.current) {
        const scrollWidth = sectionRef.current.scrollWidth;
        const clientWidth = sectionRef.current.clientWidth;
        sectionRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
      }
    };

    // Center immediately on mount
    centerScroll();

    // Re-center after a short delay to handle potential layout computation delays
    const timer = setTimeout(centerScroll, 100);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isAnimationComplete) return;

    // Hide prompt immediately if user scrolls horizontally
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollWidth = sectionRef.current.scrollWidth;
        const clientWidth = sectionRef.current.clientWidth;
        const initialScrollLeft = (scrollWidth - clientWidth) / 2;
        const currentScroll = sectionRef.current.scrollLeft;

        // If user has scrolled more than 30px from initial center, dismiss prompt
        if (Math.abs(currentScroll - initialScrollLeft) > 30) {
          setShowScrollPrompt(false);
        }
      }
    };

    const container = sectionRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isAnimationComplete]);

  // Convert vertical scroll gestures to horizontal scroll in responsive view (< 768px)
  React.useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let scrollStartX = 0;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768) return;
      // If the scroll is primarily vertical, redirect it to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 768) return;
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        scrollStartX = container.scrollLeft;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.innerWidth >= 768) return;
      if (e.touches.length > 0) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const diffX = touchX - touchStartX;
        const diffY = touchY - touchStartY;

        // If the scroll is primarily vertical, intercept and convert it to horizontal
        if (Math.abs(diffY) > Math.abs(diffX)) {
          if (e.cancelable) {
            e.preventDefault();
          }
          // Swiping up (negative diffY) moves the page right (increases scrollLeft)
          // Swiping down (positive diffY) moves the page left (decreases scrollLeft)
          container.scrollLeft = scrollStartX - diffY;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black md:overflow-hidden overflow-x-auto overflow-y-hidden no-scrollbar"
    >
      {/* Desktop Top Left Brand (hidden on mobile) */}
      <div className="hidden md:flex md:absolute top-3 left-3 z-20 items-center gap-1">
        <div className="relative w-48 h-48 flex-shrink-0 -translate-y-4">
          <Image
            src="/cosc logo.png"
            alt="Canara Open Source Community Logo"
            fill
            sizes="192px"
            className="object-contain scale-125"
            priority
          />
        </div>
        <div className="-ml-6">
          <h1 className="text-white text-5xl font-bold tracking-tighter uppercase font-canela leading-none -translate-y-[18%]">
            Canara Open Source<br></br> Community
          </h1>
        </div>
      </div>

      {/* Desktop Tagline (hidden on mobile) */}
      <p className="hidden md:block md:absolute top-[145px] left-[190px] z-20 text-white/80 font-geometric text-xs tracking-[0.2em] uppercase whitespace-nowrap">
        Learn &bull; Build &bull; Share &bull; Contribute
      </p>

      {/* Desktop Top Right Navigation (hidden on mobile) */}
      <div className="absolute top-12 right-12 z-20 hidden md:grid grid-cols-2 gap-x-16 gap-y-3">
        {navItems.map((item) => (
          <div key={item.id} className="flex items-baseline gap-4 group cursor-pointer">
            <span className="text-zinc-600 font-mono text-sm tracking-tighter group-hover:text-white transition-colors">
              {item.id}
            </span>
            <span className="text-zinc-300 text-[10px] sm:text-xs font-geometric font-medium tracking-[0.2em] uppercase group-hover:text-white transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Header (hidden on desktop) */}
      <div className="md:hidden block fixed top-0 left-0 w-full z-20 p-6 pointer-events-none">
        <div className="flex justify-between items-center w-full pointer-events-auto">
          {/* Top Left Circular Logo Badge */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/cosc logo.png"
              alt="Canara Open Source Community Logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>

          {/* Top Right Bento Grid Navigation Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-zinc-300 transition-colors p-1 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="4" height="4" rx="1" />
              <rect x="10" y="3" width="4" height="4" rx="1" />
              <rect x="17" y="3" width="4" height="4" rx="1" />
              <rect x="3" y="10" width="4" height="4" rx="1" />
              <rect x="10" y="10" width="4" height="4" rx="1" />
              <rect x="17" y="10" width="4" height="4" rx="1" />
              <rect x="3" y="17" width="4" height="4" rx="1" />
              <rect x="10" y="17" width="4" height="4" rx="1" />
              <rect x="17" y="17" width="4" height="4" rx="1" />
            </svg>
          </button>
        </div>

        {/* Left-Aligned Stacked Heading & Tagline */}
        <div className="mt-8 pointer-events-auto select-none">
          <h1 className="text-white text-3xl font-bold tracking-tight uppercase font-canela leading-tight">
            Canara Open Source<br />Community
          </h1>
          <p className="text-white/80 font-geometric text-[11px] tracking-[0.18em] uppercase mt-2">
            Learn &bull; Build &bull; Share &bull; Contribute
          </p>
        </div>
      </div>

      {/* Mobile Full-Screen Navigation Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-8 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header in mobile drawer */}
        <div className="flex justify-between items-center w-full">
          <div className="relative w-12 h-12">
            <Image
              src="/cosc logo.png"
              alt="Canara Open Source Community Logo"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Navigation Links */}
        <div className="flex flex-col gap-5 my-auto">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="flex items-baseline gap-4 group cursor-pointer border-b border-zinc-900 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-zinc-600 font-mono text-sm tracking-tighter">
                {item.id}
              </span>
              <span className="text-zinc-200 text-lg font-geometric font-medium tracking-[0.15em] uppercase group-hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Tagline in mobile drawer */}
        <div className="text-center pb-4">
          <p className="text-zinc-500 font-geometric text-[9px] tracking-[0.2em] uppercase">
            Learn &bull; Build &bull; Share &bull; Contribute
          </p>
        </div>
      </div>

      <div className="relative w-[1440px] md:w-full h-full z-10 flex-shrink-0">

        {/* Video 9 Background (between 2.mp4 and 3.mp4) */}
        <div className="absolute top-[42.5%] left-[52.9%] -translate-x-1/2 -translate-y-1/2 w-[39%] h-[35%] z-[-1] transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/9.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 1 Background (between 5.gif and 7.mp4) */}
        <div className="absolute top-[62%] left-[50.5%] -translate-x-1/2 -translate-y-1/2 w-[18%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 3 Background (left of 4.gif) */}
        <div className="absolute top-[45.5%] left-[66.6%] -translate-x-1/2 -translate-y-1/2 w-[16%] h-[18%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/3.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 8 Background (left of 2.mp4) */}
        <div className="absolute top-[45%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[10%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/8.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video Background */}
        <div className="absolute top-[45.5%] left-[42.5%] -translate-x-1/2 -translate-y-1/2 w-[6%] h-[24%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>


        {/* Video 6 Background (below 4.gif, left side) */}
        <div className="absolute top-[67%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/6.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* GIF 5 Background (below 2.mp4) */}
        <div className="absolute top-[62.5%] left-[35.5%] -translate-x-1/2 -translate-y-1/2 w-[11%] h-[13%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/5.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* GIF 4 Background (below nav, left side) */}
        <div className="absolute top-[46%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/4.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* GIF 4 Background (below nav, right side) */}
        <div className="absolute top-[45%] left-[79.5%] -translate-x-1/2 -translate-y-1/2 w-[12%] h-[13%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/4.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 6 Background (below 4.gif, right side) */}
        <div className="absolute top-[66%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/6.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 7 Background */}
        <div className="absolute top-[62.5%] left-[66%] -translate-x-1/2 -translate-y-1/2 w-[12%] h-[14%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/7.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Building Image */}
        <Image
          src="/building3.webp"
          alt="COSC Community Hero"
          fill
          priority
          className="object-cover relative z-10 pointer-events-none translate-y-26"
        />

        {/* Centered Black 30-60-90 Triangle */}
        <div className="absolute top-[23%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
          <svg
            width="260"
            height="150"
            viewBox="0 0 260 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-160"
          >
            <path
              d="M 0,0 L 0,150 L 260,150 Z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>

      {/* Scroll prompt for mobile */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-30 md:hidden transition-all duration-1000 ease-in-out ${
          showScrollPrompt ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 bg-black px-7 py-3 rounded-full shadow-2xl border border-zinc-900">
          <span className="text-white font-canela text-sm sm:text-base font-medium tracking-wide chromatic-text whitespace-nowrap">
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 text-white flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />
          </svg>
        </div>
      </div>
    </section>
  );
}