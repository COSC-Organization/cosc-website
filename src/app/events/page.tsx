'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- Pure SVG Icons (Zero Extra NPM Packages) ---
const Icons = {
  Calendar: () => (
    <svg className="w-3.5 h-3.5 inline-block text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5 inline-block text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-3.5 h-3.5 inline-block text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Users: () => (
    <svg className="w-3.5 h-3.5 inline-block text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-4 h-4 inline-block text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Megaphone: () => (
    <svg className="w-4 h-4 inline-block text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  ScrollHand: () => (
    <svg className="w-4 h-4 inline-block text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  )
};

interface EventStop {
  id: string;
  date: string;
  title: string;
  category: string;
  status: 'COMPLETED' | 'REGISTER NOW' | 'COMING SOON' | 'CURRENT LOCATION';
  isCurrentLocation?: boolean;
  time: string;
  location: string;
  teamSize: string;
  description: string;
  badge?: string;
  imageUrl: string;
}

const EVENTS: EventStop[] = [
  {
    id: '1',
    date: '15 JUN 2026',
    title: 'OPEN SOURCE NIGHT',
    category: 'Community',
    status: 'COMPLETED',
    time: '06:00 PM onwards',
    location: 'CEC Seminar Hall',
    teamSize: 'Individual',
    description: 'An evening celebrating open source culture with lightning talks, code showcases, and project ideation.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    date: '05 JUL 2026',
    title: 'GIT & GITHUB WORKSHOP',
    category: 'Workshop',
    status: 'COMPLETED',
    time: '10:00 AM - 01:00 PM',
    location: 'CEC CS Lab 2',
    teamSize: 'Individual',
    description: 'Hands-on beginner to intermediate workshop mastering version control, PR workflows, and Git internals.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    date: '30 JUL 2026',
    title: 'DEV MEETUP MANGALORE',
    category: 'Meetup',
    status: 'COMPLETED',
    time: '02:00 PM onwards',
    location: 'CEC Auditorium',
    teamSize: 'Open for all',
    description: 'Connecting developers, creators, and open source enthusiasts across coastal Karnataka.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  },
  // --- TODAY'S DATE STAGNANT STOP (DEFAULT BUS LOCATION) ---
  {
    id: 'today',
    date: '14 AUG 2026',
    title: 'YOU ARE HERE (TODAY)',
    category: 'Journey Point',
    status: 'CURRENT LOCATION',
    isCurrentLocation: true,
    time: 'Live Today',
    location: 'Open Source Express Route',
    teamSize: 'All Community Members',
    description: 'You are currently parked at today’s timeline checkpoint! Scroll horizontally along the route to travel to upcoming hackathons and workshops.',
    badge: 'YOU ARE HERE',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    date: '24 AUG 2026',
    title: 'OPEN SOURCE HACKATHON',
    category: 'Hackathon',
    status: 'REGISTER NOW',
    time: '10:00 AM onwards',
    location: 'CEC Innovation Lab',
    teamSize: 'Teams of 2-4 members',
    description: 'Build. Break. Learn. Create something impactful at our biggest event of the season!',
    badge: 'NEXT STOP',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    date: '06 SEP 2026',
    title: 'AI & ML WORKSHOP',
    category: 'Workshop',
    status: 'REGISTER NOW',
    time: '11:00 AM onwards',
    location: 'CEC Seminar Hall',
    teamSize: 'Individual',
    description: 'Deep dive into practical machine learning pipelines, fine-tuning open weights, and deploying models.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    date: '20 SEP 2026',
    title: 'COMMUNITY MEETUP',
    category: 'Meetup',
    status: 'COMING SOON',
    time: '04:00 PM onwards',
    location: 'CEC Open Space',
    teamSize: 'Open for all',
    description: 'Catch up with the community, review quarterly open source progress, and demo upcoming side projects.',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
  },
];

const MEMORIES = [
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=300&q=80',
];

const TODAY_INDEX = 3; // Index of '14 AUG 2026'

export default function EventsPage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(TODAY_INDEX);
  const [busPositionX, setBusPositionX] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const selectedEvent = EVENTS[selectedIndex];

  // Track bus position as user scrolls horizontally
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    const currentCenter = container.scrollLeft + container.clientWidth / 2;
    setBusPositionX(currentCenter);

    let closestIndex = 0;
    let minDistance = Infinity;

    EVENTS.forEach((_, idx) => {
      const stopElement = document.getElementById(`bus-stop-${idx}`);
      if (stopElement) {
        const stopCenter = stopElement.offsetLeft + stopElement.offsetWidth / 2;
        const distance = Math.abs(stopCenter - currentCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      }
    });

    setSelectedIndex(closestIndex);
  }, []);

  const scrollToStop = (index: number) => {
    if (!scrollContainerRef.current) return;
    const stopElement = document.getElementById(`bus-stop-${index}`);
    if (stopElement) {
      const container = scrollContainerRef.current;
      const targetScroll =
        stopElement.offsetLeft - container.offsetWidth / 2 + stopElement.offsetWidth / 2;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // On page load, immediately park the bus on TODAY'S DATE (14 AUG 2026)
  useEffect(() => {
    scrollToStop(TODAY_INDEX);
    const timer = setTimeout(handleScroll, 80);
    return () => clearTimeout(timer);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-black text-amber-100 font-mono select-none flex flex-col justify-between overflow-x-hidden pt-28 md:pt-32">
      
      {/* ──────────────── 1. MAIN HORIZONTAL BUS TIMELINE ──────────────── */}
      <main className="relative py-2 w-full bg-black">
        
        {/* Signboards Row */}
        <div className="max-w-6xl mx-auto w-full px-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-3 mb-4">
          <div className="border border-amber-900/50 bg-[#141414] px-4 py-1.5 rounded shadow text-center">
            <p className="text-xs uppercase font-bold text-amber-400">← Past Stops</p>
            <p className="text-[9px] text-neutral-400">Where we've been</p>
          </div>

          <div className="border-2 border-amber-800/80 bg-[#18120b] px-6 md:px-10 py-2 rounded-lg shadow-2xl text-center border-dashed">
            <h2 className="text-base md:text-xl font-black tracking-widest text-amber-200 uppercase drop-shadow">
              The Open Source Bus Route
            </h2>
            <p className="text-[11px] text-amber-300/80 font-medium">Exploring our journey. Together.</p>
          </div>

          <div className="border border-amber-900/50 bg-[#141414] px-4 py-1.5 rounded shadow text-center">
            <p className="text-xs uppercase font-bold text-amber-400">Next Stops →</p>
            <p className="text-[9px] text-neutral-400">Where we're going</p>
          </div>
        </div>

        {/* ───────── SCROLLABLE ROAD & BUS TRACK ───────── */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          className="overflow-x-auto scrollbar-none relative py-4 px-[42vw] scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="relative min-w-max flex flex-col pt-16">
            
            {/* Bus Moving on the Track */}
            <div 
              className="absolute top-0 pointer-events-none transition-transform ease-out will-change-transform z-30"
              style={{ 
                left: `${busPositionX}px`, 
                transform: 'translateX(-50%)' 
              }}
            >
              <div className="relative bg-amber-600 border-4 border-amber-950 rounded-xl p-2 shadow-2xl w-44 flex flex-col items-center">
                {/* Windows */}
                <div className="w-full flex justify-between gap-1 mb-1.5">
                  <div className="h-4 w-7 bg-cyan-200 border border-black/40 rounded-sm"></div>
                  <div className="h-4 w-7 bg-cyan-200 border border-black/40 rounded-sm"></div>
                  <div className="h-4 w-7 bg-cyan-200 border border-black/40 rounded-sm"></div>
                  <div className="h-4 w-7 bg-cyan-200 border border-black/40 rounded-sm"></div>
                </div>
                {/* Banner */}
                <span className="text-[9px] font-black tracking-widest text-amber-950 uppercase bg-amber-400 px-2 py-0.5 rounded shadow-sm">
                  Open Source Express
                </span>
                {/* Wheels */}
                <div className="absolute -bottom-3 left-4 w-5 h-5 bg-neutral-900 border-2 border-neutral-600 rounded-full animate-spin [animation-duration:3s]" />
                <div className="absolute -bottom-3 right-4 w-5 h-5 bg-neutral-900 border-2 border-neutral-600 rounded-full animate-spin [animation-duration:3s]" />
              </div>
            </div>

            {/* Continuous Road Line */}
            <div className="absolute top-[68px] left-0 right-0 h-3 bg-[#222222] border-y border-dashed border-amber-500/40 z-0 w-full" />

            {/* Stops Grid */}
            <div className="flex items-start gap-14 md:gap-20 pt-10 relative z-10">
              {EVENTS.map((event, index) => {
                const isSelected = selectedIndex === index;
                const isToday = event.isCurrentLocation;

                return (
                  <div
                    key={event.id}
                    id={`bus-stop-${index}`}
                    onClick={() => scrollToStop(index)}
                    className="flex flex-col items-center cursor-pointer group transition-all duration-300"
                  >
                    {/* Stop Pin on Road */}
                    <div className="flex flex-col items-center mb-2">
                      <div
                        className={`w-6 h-6 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
                          isSelected
                            ? 'bg-amber-400 border-amber-100 scale-125 shadow-[0_0_16px_rgba(251,191,36,0.9)]'
                            : isToday
                            ? 'bg-amber-600 border-amber-300'
                            : 'bg-[#2b1f14] border-amber-700 hover:scale-110'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                      </div>
                      <div className="w-0.5 h-3 bg-amber-800/60"></div>
                    </div>

                    {/* Today's Special Station Sign vs Event Card */}
                    {isToday ? (
                      <div
                        className={`w-44 bg-[#1e150b] border-2 transition-all duration-300 rounded-lg p-3 flex flex-col items-center text-center shadow-2xl ${
                          isSelected
                            ? 'border-amber-400 scale-105 shadow-amber-500/30 ring-2 ring-amber-400/50'
                            : 'border-amber-700/60 hover:border-amber-500'
                        }`}
                      >
                        <div className="bg-amber-500 text-neutral-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
                          YOU ARE HERE
                        </div>
                        <div className="text-sm font-black text-white tracking-widest my-1">
                          {event.date}
                        </div>
                        <p className="text-[10px] text-amber-300/80 leading-snug mt-1">
                          Current Stagnant Station
                        </p>
                        <div className="mt-3 text-[9px] font-black px-2 py-1 rounded w-full bg-amber-950/80 text-amber-300 border border-amber-700/50">
                          SCROLL TO TRAVEL ➔
                        </div>
                      </div>
                    ) : (
                      /* Regular Event Stop Card */
                      <div
                        className={`w-44 bg-[#121212] border-2 transition-all duration-300 rounded-lg p-2.5 flex flex-col items-center text-center shadow-xl ${
                          isSelected
                            ? 'border-amber-400 scale-105 bg-[#1a140d] shadow-amber-500/20 ring-1 ring-amber-400/40'
                            : 'border-neutral-800 opacity-80 hover:opacity-100 hover:border-amber-700'
                        }`}
                      >
                        {/* Date Badge */}
                        <div className="bg-[#241a10] text-amber-300 text-[10px] font-bold px-3 py-0.5 rounded border border-amber-700/40 mb-2">
                          {event.date}
                        </div>

                        {/* Card Thumbnail */}
                        <div className="w-full h-20 bg-neutral-900 rounded overflow-hidden mb-2 border border-neutral-800">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all"
                          />
                        </div>

                        <h3 className="font-bold text-xs text-amber-100 uppercase tracking-tight line-clamp-2 h-8 flex items-center justify-center">
                          {event.title}
                        </h3>

                        {/* Status Button */}
                        <div
                          className={`mt-2 text-[9px] font-black px-3 py-1 rounded w-full border uppercase transition-colors ${
                            event.status === 'COMPLETED'
                              ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800'
                              : event.status === 'REGISTER NOW'
                              ? 'bg-amber-600 text-amber-950 border-amber-400 hover:bg-amber-500'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                          }`}
                        >
                          {event.status}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Helper Bar */}
        <div className="flex justify-center items-center gap-4 text-[11px] text-amber-400/80 bg-[#121212] py-1.5 px-6 rounded-full w-fit mx-auto border border-neutral-800 mt-2 shadow-md">
          <button 
            onClick={() => scrollToStop(Math.max(0, selectedIndex - 1))}
            className="hover:text-amber-200 transition-colors flex items-center gap-1.5"
          >
            <Icons.ScrollHand /> ← Scroll left to see where we've been
          </button>
          <span>•</span>
          <button 
            onClick={() => scrollToStop(TODAY_INDEX)}
            className="text-amber-300 font-bold hover:underline"
          >
            Reset to Today
          </button>
          <span>•</span>
          <button 
            onClick={() => scrollToStop(Math.min(EVENTS.length - 1, selectedIndex + 1))}
            className="hover:text-amber-200 transition-colors"
          >
            Scroll right to see what's coming →
          </button>
        </div>
      </main>

      {/* ──────────────── 2. BOTTOM DASHBOARD PANELS ──────────────── */}
      <section className="max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-black">
        
        {/* Left Panel: Upcoming Highlights */}
        <div className="lg:col-span-3 bg-[#0f0f0f] border-2 border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-black tracking-widest text-amber-400 uppercase mb-4 flex items-center gap-2">
              <Icons.Calendar /> Upcoming Highlights
            </h4>
            <div className="space-y-3">
              {EVENTS.filter((e) => e.status !== 'COMPLETED' && !e.isCurrentLocation).map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => scrollToStop(EVENTS.findIndex(e => e.id === item.id))}
                  className="flex gap-3 items-start p-2 rounded hover:bg-neutral-900 cursor-pointer transition-colors border border-transparent hover:border-neutral-700"
                >
                  <div className="bg-black text-amber-400 text-center font-bold px-2 py-1 rounded border border-amber-900/50 min-w-[48px]">
                    <div className="text-xs leading-none">{item.date.split(' ')[0]}</div>
                    <div className="text-[9px] uppercase">{item.date.split(' ')[1]}</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-100 line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-amber-400/70">{item.time}</p>
                    <p className="text-[9px] text-neutral-400">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-4 w-full py-2 bg-[#1c140c] hover:bg-amber-700 text-amber-200 hover:text-amber-950 text-xs font-bold uppercase rounded border border-amber-800 transition-colors">
            View All Events →
          </button>
        </div>

        {/* Center Panel: Active Event Spotlight */}
        <div className="lg:col-span-6 bg-[#14100b] border-2 border-amber-900/60 rounded-xl p-5 shadow-2xl flex flex-col justify-between relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-amber-950 text-[10px] font-black px-4 py-0.5 rounded-full uppercase tracking-wider border border-amber-200 shadow">
            🚌 {selectedEvent.badge || `Stop #${selectedIndex + 1}`}
          </div>

          <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 mt-2">
              <div className="flex-1">
                <h3 className="text-xl font-black text-amber-200 uppercase tracking-wide">
                  {selectedEvent.title}
                </h3>
                <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-amber-300/80 mt-2.5">
                  <span className="flex items-center gap-1.5">
                    <Icons.Calendar /> {selectedEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Clock /> {selectedEvent.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.MapPin /> {selectedEvent.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Users /> {selectedEvent.teamSize}
                  </span>
                </div>
              </div>

              {/* Spotlight Event Thumbnail */}
              <div className="w-full md:w-36 h-24 rounded-lg overflow-hidden border-2 border-amber-900/60 shrink-0">
                <img 
                  src={selectedEvent.imageUrl} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed border-t border-neutral-800 pt-3">
              {selectedEvent.description}
            </p>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              disabled={selectedEvent.status === 'COMPLETED'}
              onClick={() => {
                if (selectedEvent.isCurrentLocation) {
                  scrollToStop(TODAY_INDEX + 1);
                }
              }}
              className={`w-full md:w-auto px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider border-2 shadow-lg transition-all ${
                selectedEvent.status === 'COMPLETED'
                  ? 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 border-amber-200 shadow-amber-600/30'
              }`}
            >
              {selectedEvent.status === 'COMPLETED'
                ? 'Event Concluded'
                : selectedEvent.isCurrentLocation
                ? 'Go to Next Event →'
                : 'Register Your Team →'}
            </button>
          </div>
        </div>

        {/* Right Panel: Past Memories Polaroid Board */}
        <div className="lg:col-span-3 bg-[#0f0f0f] border-2 border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-black tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
              <Icons.Camera /> Past Memories
            </h4>
            
            <div className="grid grid-cols-3 gap-2">
              {MEMORIES.map((src, index) => (
                <div 
                  key={index}
                  className="bg-neutral-800 p-1 rounded shadow transform hover:scale-105 transition-transform duration-200 cursor-pointer border border-neutral-700"
                >
                  <img 
                    src={src} 
                    alt={`Memory ${index + 1}`} 
                    className="w-full h-14 object-cover rounded-sm grayscale-[20%]"
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="mt-4 w-full py-2 bg-[#1c140c] hover:bg-amber-700 text-amber-200 hover:text-amber-950 text-xs font-bold uppercase rounded border border-amber-800 transition-colors">
            View All Photos →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-2 text-[10px] text-amber-400/50 bg-black border-t border-neutral-800 flex items-center justify-center gap-2">
        <Icons.Megaphone /> Stay updated! New events added every week.
      </footer>
    </div>
  );
}