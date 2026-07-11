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
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Top Left Brand */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1">
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

      <p className="absolute top-[145px] left-[190px] z-20 text-white/80 font-geometric text-[10px] sm:text-xs tracking-[0.2em] uppercase whitespace-nowrap">
        Learn &bull; Build &bull; Share &bull; Contribute
      </p>


      {/* Top Right Navigation */}
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

      <div className="relative w-full h-full z-10">

        {/* Video 9 Background (between 2.mp4 and 3.mp4) */}
        <div className="absolute top-[42.5%] left-[52.5%] -translate-x-1/2 -translate-y-1/2 w-[39%] h-[35%] z-[-1] transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[60%] left-[50.5%] -translate-x-1/2 -translate-y-1/2 w-[18%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[44%] left-[66.6%] -translate-x-1/2 -translate-y-1/2 w-[16%] h-[18%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[44%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[10%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[44%] left-[42.5%] -translate-x-1/2 -translate-y-1/2 w-[6%] h-[24%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[65%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[62%] left-[34.95%] -translate-x-1/2 -translate-y-1/2 w-[12%] h-[15%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/5.gif"
            alt="Background Animation Middle"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* GIF 4 Background (below nav, left side) */}
        <div className="absolute top-[46%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/4.gif"
            alt="Background Animation Left"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* GIF 4 Background (below nav, right side) */}
        <div className="absolute top-[45%] left-[79.5%] -translate-x-1/2 -translate-y-1/2 w-[12%] h-[13%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
          <Image
            src="/4.gif"
            alt="Background Animation Right"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Video 6 Background (below 4.gif, right side) */}
        <div className="absolute top-[65%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
        <div className="absolute top-[61%] left-[66%] -translate-x-1/2 -translate-y-1/2 w-[12%] h-[14%] z-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
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
          src="/building2.png"
          alt="COSC Community Hero"
          fill
          priority
          className="object-cover relative z-10 pointer-events-none translate-y-26"
        />
      </div>
    </section>
  );
}