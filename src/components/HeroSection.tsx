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

      <div className="relative w-full h-full">
        <Image
          src="/building.png"
          alt="COSC Community Hero"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}