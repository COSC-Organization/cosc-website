// src/app/workshops/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Data Structures
const filters = ['All', 'Hackathons', 'Tech Talks', 'Meetups', 'Workshops'] as const;
type EventType = typeof filters[number];

interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time?: string;
  description?: string;
  imageSrc: string;
  status: 'upcoming' | 'past';
  registrationUrl?: string;
  recapUrl?: string;
}

// All Events Data (Using /posters/1-poster.webp as demo)
const allEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Code Jam Hackathon',
    type: 'Hackathons',
    date: 'AUG 24-26, 2024',
    time: '10:00 AM - 6:00 PM',
    description: 'Join us for 48 hours of coding and collaboration!',
    imageSrc: '/posters/1-poster.webp', // <--- Set to 1-poster.webp demo image
    status: 'upcoming',
    registrationUrl: 'https://forms.google.com',
  },
  {
    id: '2',
    title: 'Introduction to Open Source Tech Talk',
    type: 'Tech Talks',
    date: 'SEP 10, 2024',
    time: '5:00 PM - 7:00 PM',
    description: 'Learn the basics of contributing to open source.',
    imageSrc: '/posters/2-poster.webp',
    status: 'upcoming',
    registrationUrl: 'https://forms.google.com',
  },
  {
    id: '3',
    title: 'Spring Meetup 2024',
    type: 'Meetups',
    date: 'MAY 15, 2024',
    imageSrc: '/posters/3-poster.webp',
    status: 'past',
    recapUrl: '/blogs/spring-meetup-recap',
  },
  {
    id: '4',
    title: 'AI Workshop',
    type: 'Workshops',
    date: 'APR 12, 2024',
    imageSrc: '/posters/4-poster.webp',
    status: 'past',
    recapUrl: '/blogs/ai-workshop-recap',
  },
];

export default function WorkshopsPage() {
  const [activeFilter, setActiveFilter] = useState<EventType>('All');

  const filteredEvents = allEvents.filter((event) => {
    if (activeFilter === 'All') return true;
    return event.type === activeFilter;
  });

  const upcoming = filteredEvents.filter((e) => e.status === 'upcoming');
  const past = filteredEvents.filter((e) => e.status === 'past');

  return (
    <main className="min-h-screen bg-black text-white relative pt-28 md:pt-36">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/building3.webp')] bg-cover bg-no-repeat bg-center" />

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12 relative z-10">
        
        {/* Title and Filter Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-800 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Upcoming & Past Events
          </h1>
          
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-white text-black border-white shadow-lg scale-105'
                    : 'bg-black text-white border-gray-700 hover:border-gray-500 hover:bg-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-[auto,1fr] gap-x-12 relative">
          
          {/* Left Timeline Bar */}
          <div className="w-1 absolute left-14 top-0 bottom-0 bg-gray-800 group" aria-hidden="true">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-600 border-4 border-black ring-1 ring-orange-600 group-hover:scale-110 transition-transform"/>
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-600 border-4 border-black ring-1 ring-orange-600 group-hover:scale-110 transition-transform"/>
          </div>

          <div className="col-start-2 flex flex-col gap-y-16 pl-20">
            
            {/* UPCOMING EVENTS */}
            {upcoming.length > 0 && (
              <section>
                <div className="mb-8 pl-1">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                    UPCOMING EVENTS ({upcoming.length})
                  </p>
                </div>

                <div className="space-y-6">
                  {upcoming.map((event) => (
                    <article key={event.id} className="flex flex-col md:flex-row gap-6 bg-[#0F0F0F] rounded-2xl p-6 border border-gray-800/60 shadow-xl group hover:border-orange-900 transition-all">
                      <div className="relative aspect-[3/2] w-full md:w-60 rounded-xl overflow-hidden flex-shrink-0 border border-gray-800 bg-gray-900">
                        <Image
                          src={event.imageSrc}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 240px"
                        />
                      </div>

                      <div className="flex flex-col flex-grow pt-2">
                        <span className="text-xs uppercase tracking-wider text-orange-500 font-semibold mb-1">
                          {event.type}
                        </span>
                        <h3 className="text-2xl font-serif text-white tracking-tight mb-3">
                          {event.title}
                        </h3>
                        
                        <div className="space-y-1 text-sm text-gray-300 mb-5 font-mono tracking-tighter">
                          <p>{event.date}</p>
                          {event.time && <p>{event.time}</p>}
                        </div>

                        {event.description && (
                          <p className="text-sm text-gray-400 mb-7 max-w-lg leading-relaxed">
                            {event.description}
                          </p>
                        )}

                        {event.registrationUrl && (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="self-start px-6 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors shadow-lg"
                          >
                            Register Now
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* PAST EVENTS */}
            {past.length > 0 && (
              <section>
                <div className="mb-8 pl-1">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                    PAST EVENTS ({past.length})
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {past.map((event) => (
                    <article key={event.id} className="bg-[#0F0F0F] rounded-2xl overflow-hidden border border-gray-800/60 shadow-lg group hover:border-orange-900 transition-all">
                      <div className="relative aspect-[16/10] border-b border-gray-800 bg-gray-900">
                        <Image
                          src={event.imageSrc}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                      </div>

                      <div className="p-6">
                        <span className="text-xs uppercase tracking-wider text-orange-500 font-semibold mb-1 block">
                          {event.type}
                        </span>
                        <h3 className="text-xl font-serif text-white tracking-tight mb-1.5">
                          {event.title}
                        </h3>
                        
                        <p className="text-sm text-gray-300 mb-6 font-mono tracking-tighter">
                          {event.date}
                        </p>

                        {event.recapUrl && (
                          <Link
                            href={event.recapUrl}
                            className="inline-block px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors border border-gray-700"
                          >
                            View Recap
                          </Link>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* EMPTY STATE */}
            {filteredEvents.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                <p className="text-lg">No events found under "{activeFilter}".</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}