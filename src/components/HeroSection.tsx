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

        {/* Video 1 Background (between 5.gif and 7.mp4) */}
        <div className="absolute top-[53%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[18%] h-[22%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/1.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 3 Background (left of 4.gif) */}
        <div className="absolute top-[31%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[21%] h-[24.5%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/3.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video 8 Background (left of 2.mp4) */}
        <div className="absolute top-[30.2%] left-[34%] -translate-x-1/2 -translate-y-1/2 w-[10%] h-[24%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/8.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Video Background */}
        <div className="absolute top-[30.2%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[7%] h-[23.9%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[53%] left-[34.95%] -translate-x-1/2 -translate-y-1/2 w-[15%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/5.gif"
            alt="Background Animation Middle"
            fill
            unoptimized
            className="object-contain"
          />
        </div>



        {/* GIF 4 Background (below nav, right side) */}
        <div className="absolute top-[35%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-[15%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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

        {/* Video 7 Background */}
        <div className="absolute top-[53%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[13%] h-[17.9%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <video
            src="/7.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nopictureinpicture"
            className="w-full h-full object-contain pointer-events-none"
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