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

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden pt-48">
      {/* Top Left Brand */}
      <div className="absolute top-12 left-12 z-20">
        <h1 className="text-white text-4xl font-bold tracking-tighter uppercase font-cormorant leading-none">
          Canara Open Source Community
        </h1>
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-12 right-12 z-20 hidden md:grid grid-cols-2 gap-x-16 gap-y-3">
        {navItems.map((item) => (
          <div key={item.id} className="flex items-baseline gap-4 group cursor-pointer">
            <span className="text-zinc-600 font-mono text-sm tracking-tighter">
              {item.id}
            </span>
            <span className="text-zinc-100 text-lg font-medium tracking-tight group-hover:text-white transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative w-full h-full z-10">
        {/* Video Background */}
        <div className="absolute top-[30.2%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[24%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/2.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* GIF 5 Background (below 2.mp4) */}
        <div className="absolute top-[53%] left-[34.95%] -translate-x-1/2 -translate-y-1/2 w-[16%] h-[17.5%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/5.gif"
            alt="Background Animation Middle"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* GIF 7 Background (next left to 4.gif) */}
        <div className="absolute top-[30.5%] left-[66%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[23%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/7.gif"
            alt="Background Animation Left"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* GIF 4 Background (below nav, right side) */}
        <div className="absolute top-[35%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/4.gif"
            alt="Background Animation Right"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Video 6 Background (below 4.gif, right side) */}
        <div className="absolute top-[60%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/6.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* GIF 1 Background */}
        <div className="absolute top-[53%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[26%] h-[17.9%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/1.gif"
            alt="Background Animation"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* GIF 3 Background */}
        <div className="absolute top-[86%] left-[61.3%] -translate-x-1/2 -translate-y-1/2 w-[12%] h-[16%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/3.gif"
            alt="Additional Animation"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Building Image */}
        <Image
          src="/building.png"
          alt="COSC Community Hero"
          fill
          priority
          className="object-cover relative z-10 pointer-events-none"
        />
      </div>
    </section>
  );
}