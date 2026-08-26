"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { blogs as defaultBlogs, type BlogPost } from "@/data/blogs";
import type { PageFlip } from "page-flip";

interface BlogsProps {
  posts?: BlogPost[];
}

interface ParchmentPageProps {
  side: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const ParchmentPage = ({ side, children, className = "" }: ParchmentPageProps) => (
  <div
    className={`page parchment-bg parchment-page-${side} text-[#26170c] p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative ${className}`}
  >
    <div className="parchment-texture" />
    <div className="parchment-frame" />
    <div className="parchment-frame-inner" />
    <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
  </div>
);

const FeatureBannerBox = ({ title, image }: { title: string; image?: string }) => (
  <div className="relative w-full my-1 p-1 sm:p-1.5 rounded border-2 border-[#2a170b] bg-[#F7EBD2]/90 flex flex-col items-center justify-center text-center shadow-xs overflow-hidden">
    {/* Tech/Circuit frame corner accents */}
    <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#2a170b] z-10" />
    <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#2a170b] z-10" />
    <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#2a170b] z-10" />
    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#2a170b] z-10" />

    {image ? (
      <div className="relative w-full aspect-[16/9.5] rounded-xs overflow-hidden border border-[#2a170b]/30">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply opacity-95"
        />
      </div>
    ) : (
      <div className="py-3 px-2 flex flex-col items-center justify-center text-center">
        {/* Top Badge: COSC Logo */}
        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[#2a170b] rounded-md mb-1 shadow-xs border border-[#d6aa5c]/40">
          <img src="/blogs/coscblack.png" alt="COSC Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain invert brightness-200" />
        </div>

        {/* Title */}
        <h3 className="font-sans font-black text-xs sm:text-sm md:text-base text-[#1f1107] uppercase tracking-wider leading-tight max-w-[240px]">
          {title.includes("DSA") ? "LONG TERM DSA SERIES" : title}
        </h3>

        {/* Subtitle */}
        <p className="font-garamond text-[9px] sm:text-[10.5px] text-[#4a2e18] font-semibold mt-0.5 leading-tight max-w-[220px]">
          Ready yourself with curated community concepts and insights
        </p>
      </div>
    )}

    {/* Corner Botanical & Book sketch icons */}
    <div className="absolute bottom-1 left-1.5 opacity-60 pointer-events-none z-10">
      <svg className="w-5 h-5 text-[#2a170b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2v20M12 6c-3-2-6-1-8 2 2 3 5 3 8-2zm0 6c-3-2-6-1-8 2 2 3 5 3 8-2zm0-9c3-2 6-1 8 2-2 3-5 3-8-2zm0 6c3-2 6-1 8 2-2 3-5 3-8-2z" />
      </svg>
    </div>
    <div className="absolute bottom-1 right-1.5 opacity-60 pointer-events-none z-10">
      <svg className="w-5 h-5 text-[#2a170b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM6.5 6H20M6.5 10H20" />
      </svg>
    </div>
  </div>
);

const TapedQuoteCard = ({ excerpt }: { excerpt: string }) => (
  <div className="relative w-full my-1.5 p-2 sm:p-2.5 bg-[#FBF4E3] border border-[#d2c0a0] rounded-xs shadow-xs text-center select-none">
    {/* Translucent Masking Tape Strip top-left */}
    <div className="absolute -top-2.5 left-2 sm:left-3 w-12 sm:w-14 h-3.5 bg-[#decfae]/85 backdrop-blur-xs border-y border-white/50 shadow-2xs rotate-[-7deg] pointer-events-none" />

    <p className="font-garamond italic text-[9.5px] sm:text-[11px] leading-relaxed text-[#2d1b0f] font-medium px-1">
      &ldquo;{excerpt}&rdquo;
    </p>
  </div>
);

const BottomMetaFooter = ({ date, author }: { date: string; author: string }) => (
  <div className="w-full pt-1 border-t border-[#7a4b24]/30 select-none">
    <div className="flex items-center justify-center gap-2 sm:gap-4 text-[8.5px] sm:text-[9.5px] font-garamond font-semibold text-[#4a2e18]">
      {/* Date */}
      <div className="flex items-center gap-1">
        <svg className="w-3 h-3 text-[#7a4b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{date.replace(/^Published on\s*/i, "")}</span>
      </div>

      <span className="text-[#7a4b24]/40 font-normal">|</span>

      {/* Author */}
      <div className="flex items-center gap-1">
        <svg className="w-3 h-3 text-[#7a4b24]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>{author.startsWith("By") ? author : `By ${author}`}</span>
      </div>
    </div>
  </div>
);

const OrnateDropCap = ({ letter }: { letter: string }) => (
  <span className="float-left font-playfair text-3xl sm:text-4xl leading-none pr-1.5 pt-0.5 text-[#24140a] font-bold select-none">
    {letter}
  </span>
);

const RightPageBottomSketches = () => (
  <div className="mt-1.5 pt-1 border-t border-[#7a4b24]/20 flex items-end justify-between w-full text-[#3a2312] select-none">
    {/* Left Sketch: Steaming Coffee Mug & Saucer + Pencil */}
    <div className="flex items-center gap-1 opacity-85">
      <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Steam */}
        <path d="M22 14c-1-3 1-5 0-7M30 14c-1-3 1-5 0-7M38 14c-1-3 1-5 0-7" strokeDasharray="2 1" />
        {/* Cup */}
        <path d="M16 22h32v18c0 5.5-4.5 10-10 10H26c-5.5 0-10-4.5-10-10V22z" />
        {/* Handle */}
        <path d="M48 26c4 0 6 2 6 6s-2 6-6 6" />
        {/* Saucer */}
        <ellipse cx="32" cy="54" rx="24" ry="4" />
        {/* Coffee line */}
        <path d="M18 27c8 2 20 2 28 0" strokeDasharray="1 1" />
        {/* Pencil next to mug */}
        <path d="M8 52l12-35 4 1-12 35-4-1z" fill="none" />
        <path d="M8 52l-2 5 5-2" />
      </svg>
    </div>

    {/* Center Ornamental Rule */}
    <div className="flex items-center justify-center gap-1 text-[#7a4b24]/50 pb-0.5">
      <span className="text-[9px] font-serif">~ ❦ ~</span>
    </div>

    {/* Right Sketch: Open Notebook with Flowchart & Handwritten Note */}
    <div className="flex flex-col items-center opacity-85">
      <div className="flex items-center gap-1">
        <svg className="w-12 h-10 sm:w-16 sm:h-12" viewBox="0 0 80 56" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Open Book Spine */}
          <path d="M40 8v42M40 8C30 4 12 6 6 10v38c6-4 24-6 34-2M40 8C50 4 68 6 74 10v38c-6-4-24-6-34-2" />
          {/* Flowchart Diagram on Left Page */}
          <rect x="12" y="16" width="10" height="6" rx="1" />
          <rect x="24" y="26" width="10" height="6" rx="1" />
          <rect x="12" y="36" width="10" height="6" rx="1" />
          <path d="M17 22v14M22 19h7v7" />
          {/* Handwritten Lines on Right Page */}
          <path d="M46 16h22M46 22h18M46 28h24M46 34h20" strokeDasharray="2 1" />
        </svg>
        <div className="text-left font-caveat text-[9.5px] sm:text-[11px] text-[#2a170b] leading-tight max-w-[80px] font-bold">
          Consistency<br />Builds<br />Mastery.
        </div>
      </div>
    </div>
  </div>
);

interface DeskProp {
  id: string;
  src: string;
  alt: string;
  containerClass: string;
  imgClass: string;
  filter: string;
}

const DESK_PROPS: DeskProp[] = [
  {
    id: "plant-left",
    src: "/blogs/plant.png",
    alt: "Plant",
    containerClass:
      "absolute -left-24 sm:-left-48 md:-left-64 lg:-left-78 xl:-left-90 top-[55%] sm:top-[58%] z-30 pointer-events-none transition-transform duration-500 ease-out hidden sm:block",
    imgClass: "w-22 sm:w-27 md:w-33 lg:w-40 xl:w-45 h-auto object-contain",
    filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.85))",
  },
  {
    id: "mug-left",
    src: "/blogs/mug.png",
    alt: "Coffee Mug",
    containerClass:
      "absolute -left-8 sm:-left-20 md:-left-32 lg:-left-40 xl:-left-48 top-[95%] sm:top-[95%] z-30 pointer-events-none transition-transform duration-500 ease-out hidden sm:block",
    imgClass: "w-14 sm:w-18 md:w-22 lg:w-24 xl:w-28 h-auto object-contain",
    filter: "drop-shadow(0 15px 20px rgba(0, 0, 0, 0.85))",
  },
  {
    id: "bookstack-right",
    src: "/blogs/bookstack.png",
    alt: "Book stack",
    containerClass:
      "absolute -right-45 sm:-right-50 md:-right-52 lg:-right-50 xl:-right-80 top-[86%] sm:top-[78%] z-20 pointer-events-none transition-transform duration-500 ease-out hidden sm:block",
    imgClass: "w-60 sm:w-56 md:w-64 lg:w-72 xl:w-96 h-auto object-contain",
    filter: "drop-shadow(0 15px 20px rgba(0, 0, 0, 0.85))",
  },
  {
    id: "plant2-right",
    src: "/blogs/plant2.png",
    alt: "Plant",
    containerClass:
      "absolute -right-36 sm:-right-40 md:-right-44 lg:-right-40 xl:-right-48 top-[78%] sm:top-[68%] z-30 pointer-events-none transition-transform duration-500 ease-out hidden sm:block",
    imgClass: "w-15 sm:w-27 md:w-33 lg:w-40 xl:w-30 h-auto object-contain",
    filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.85))",
  },
  {
    id: "button-bottom",
    src: "/blogs/button.png",
    alt: "Buttons",
    containerClass:
      "absolute left-1/2 -translate-x-1/2 top-[94%] sm:top-[98%] z-10 pointer-events-none transition-transform duration-500 ease-out hidden sm:block",
    imgClass: "w-48 sm:w-56 md:w-64 h-auto object-contain",
    filter: "drop-shadow(0 15px 20px rgba(0, 0, 0, 0.85))",
  },
];

const BLOG_IMAGES = [
  "/blogs/table.png",
  "/blogs/board.png",
  "/blogs/board2.png",
  "/blogs/sticky.png",
  "/blogs/plant.png",
  "/blogs/mug.png",
  "/blogs/bookstack.png",
  "/blogs/plant2.png",
  "/blogs/button.png",
  "/blogs/books.png",
  "/blogs/1.png",
  "/blogs/coscblack.png",
  "/blogs/buildathon.png",
  "/blogs/ceatherion.jpeg",
  "/blogs/bug-bounty.png",
  "/blogs/DSA-series.png",
];

export default function Blogs({ posts = defaultBlogs }: BlogsProps) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);

  // Preload all blog images on mount to ensure instant rendering
  useEffect(() => {
    BLOG_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const handleNext = useCallback(() => {
    pageFlipRef.current?.flipNext();
  }, []);

  const handlePrev = useCallback(() => {
    pageFlipRef.current?.flipPrev();
  }, []);

  const jumpToPage = useCallback((pageNum: number) => {
    pageFlipRef.current?.flip(pageNum);
  }, []);

  // Safe event delegation for clicks inside cloned flipbook pages
  const handleTargetClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const jumpBtn = target.closest("[data-jump-page]");
      if (jumpBtn) {
        const pageNum = parseInt(jumpBtn.getAttribute("data-jump-page") || "0", 10);
        if (!isNaN(pageNum)) {
          jumpToPage(pageNum);
          return;
        }
      }
      const nextBtn = target.closest("[data-action='next']");
      if (nextBtn) {
        handleNext();
        return;
      }
      const prevBtn = target.closest("[data-action='prev']");
      if (prevBtn) {
        handlePrev();
        return;
      }
    },
    [jumpToPage, handleNext, handlePrev]
  );

  useEffect(() => {
    if (!sourceRef.current || !targetRef.current) return;

    let isMounted = true;
    let pageFlipInstance: PageFlip | null = null;

    const initPageFlip = async () => {
      if (!sourceRef.current || !targetRef.current) return;

      // Clear previous container contents to allow multiple mounts ("loaded twice")
      targetRef.current.innerHTML = "";

      const pageElements = sourceRef.current.querySelectorAll(".page");
      if (pageElements.length === 0) return;

      // Clone original React DOM nodes so React's DOM structure is never mutated or lost
      const clonedPages: HTMLElement[] = [];
      pageElements.forEach((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        targetRef.current?.appendChild(clone);
        clonedPages.push(clone);
      });

      try {
        // Dynamically import PageFlip for fast loading & SSR safety
        const { PageFlip } = await import("page-flip");
        if (!isMounted || !targetRef.current) return;

        const pageFlip = new PageFlip(targetRef.current, {
          width: 680,
          height: 880,
          size: "stretch",
          minWidth: 280,
          maxWidth: 800,
          minHeight: 300,
          maxHeight: 1000,
          maxShadowOpacity: 0.5,
          showCover: false,
          mobileScrollSupport: false,
          clickEventForward: true,
          usePortrait: false,
          startPage: 0,
        });

        pageFlip.loadFromHTML(clonedPages);
        pageFlipInstance = pageFlip;
        pageFlipRef.current = pageFlip;
      } catch (err) {
        console.error("Failed to initialize PageFlip:", err);
      }
    };

    const targetContainer = targetRef.current;

    // Use requestAnimationFrame for smooth initialization after layout render
    const animId = requestAnimationFrame(() => {
      initPageFlip();
    });

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      if (pageFlipInstance) {
        try {
          pageFlipInstance.destroy();
        } catch {
          // Safe cleanup
        }
        pageFlipRef.current = null;
      }
      if (targetContainer) {
        targetContainer.innerHTML = "";
      }
    };
  }, [posts]);

  // Helper render function for all flipbook pages
  const renderPages = () => (
    <>
      {/* Page 0: Welcome to COSC Page */}
      <ParchmentPage side="left">
        <div className="flex flex-col h-full justify-between select-none">
          {/* Header */}
          <div className="text-center pt-1 pb-1 border-b border-[#7a4b24]/30">
            <h1 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-[#2A1A12]">
              Welcome to COSC
            </h1>
            <div className="flex items-center justify-center gap-2 mt-0.5 text-[#7a4b24]/50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
              <span className="text-[10px] font-serif leading-none">❖</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
            </div>
          </div>

          {/* Book Illustration */}
          <div className="relative w-full h-50 sm:h-20 my-0.5">
            <Image
              src="/blogs/1.png"
              alt="Welcome to COSC"
              fill
              priority
              className="object-contain mix-blend-multiply opacity-95"
            />
          </div>

          {/* Intro Text */}
          <p className="text-[9.5px] sm:text-xs text-[#3F332A] font-sans text-center leading-relaxed px-1">
            Canara Open Source Community is a space for learners, developers, and innovators to collaborate, build, and grow together through open source.
          </p>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-2 my-1 text-[#7a4b24]/50">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
            <span className="text-[10px] font-serif leading-none">❖</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
          </div>

          {/* 2x2 Grid Pillars */}
          <div className="grid grid-cols-2 gap-2 my-auto text-[#2A1A12]">
            {/* LEARN */}
            <div className="flex items-start gap-1.5 p-1 border-r border-b border-[#7a4b24]/25 pb-2">
              <div>
                <h4 className="font-sans font-extrabold text-[11px] sm:text-xs text-[#2A1A12] tracking-wider uppercase">
                  LEARN
                </h4>
                <p className="text-[8px] sm:text-[9.5px] text-[#5c3c1e] font-sans leading-tight mt-0.5">
                  Explore new concepts, resources, and skills together.
                </p>
              </div>
            </div>

            {/* BUILD */}
            <div className="flex items-start gap-1.5 p-1 border-b border-[#7a4b24]/25 pb-2">
              <div>
                <h4 className="font-sans font-extrabold text-[11px] sm:text-xs text-[#2A1A12] tracking-wider uppercase">
                  BUILD
                </h4>
                <p className="text-[8px] sm:text-[9.5px] text-[#5c3c1e] font-sans leading-tight mt-0.5">
                  Build real-world projects and turn ideas into impact.
                </p>
              </div>
            </div>

            {/* SHARE */}
            <div className="flex items-start gap-1.5 p-1 border-r border-[#7a4b24]/25 pt-2">
              <div>
                <h4 className="font-sans font-extrabold text-[11px] sm:text-xs text-[#2A1A12] tracking-wider uppercase">
                  SHARE
                </h4>
                <p className="text-[8px] sm:text-[9.5px] text-[#5c3c1e] font-sans leading-tight mt-0.5">
                  Share knowledge, experiences, and inspire the community.
                </p>
              </div>
            </div>

            {/* CONTRIBUTE */}
            <div className="flex items-start gap-1.5 p-1 pt-2">
              <div>
                <h4 className="font-sans font-extrabold text-[11px] sm:text-xs text-[#2A1A12] tracking-wider uppercase">
                  CONTRIBUTE
                </h4>
                <p className="text-[8px] sm:text-[9.5px] text-[#5c3c1e] font-sans leading-tight mt-0.5">
                  Contribute to open source and help others grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ParchmentPage>

      {/* Page 1: Latest Blogs List */}
      <ParchmentPage side="right">
        <div className="flex flex-col h-full justify-between select-none">
          {/* Header */}
          <div className="text-center pt-1 pb-1 border-b border-[#7a4b24]/30">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-[#2A1A12]">
              Latest Blogs
            </h2>
            <div className="flex items-center justify-center gap-2 mt-0.5 text-[#7a4b24]/50">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
              <span className="text-[10px] font-serif leading-none">❖</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
            </div>
          </div>

          {/* Blog Post List (Text Only) */}
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1 my-2">
            {posts.map((post, idx) => (
              <button
                key={post.slug}
                data-jump-page={(idx + 1) * 2}
                onClick={() => jumpToPage((idx + 1) * 2)}
                className="w-full text-left p-2 rounded border border-[#7a4b24]/20 hover:border-[#C99A4B]/60 hover:bg-[#4A2612]/5 transition-all group flex items-start gap-2 cursor-pointer shadow-xs"
              >
                <span className="font-playfair text-xs sm:text-sm font-bold text-[#C99A4B] pt-0.5">
                  0{idx + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block font-sans font-bold text-xs text-[#2A1A12] group-hover:text-[#C99A4B] leading-snug">
                    {post.title}
                  </span>
                  <span className="block text-[9px] text-[#786B5A] mt-0.5">
                    {post.date}
                  </span>
                </div>
                <span className="text-xs text-[#C99A4B] font-bold group-hover:translate-x-0.5 transition-transform pt-0.5 pr-1">
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Start Reading Action Button */}
          <div className="pt-1.5 border-t border-[#7a4b24]/25 text-center">
            <button
              data-action="next"
              onClick={handleNext}
              className="w-full py-1.5 bg-[#4A2612] text-[#FFF9E9] text-xs font-sans font-semibold rounded hover:bg-[#24130B] transition-all cursor-pointer shadow-sm border border-[#C99A4B]/50 flex items-center justify-center gap-1.5 select-none"
            >
              Start Reading Stories <span>→</span>
            </button>
          </div>
        </div>
      </ParchmentPage>

      {/* Dynamic Blog Posts */}
      {posts.map((post) => (
        <React.Fragment key={post.slug}>
          {/* Left Page */}
          <ParchmentPage side="left">
            {/* Title & Byline */}
            <div className="mt-3 sm:mt-4 text-center">
              <h2 className="font-playfair text-sm sm:text-base md:text-lg font-bold leading-tight text-[#1f1107] mb-0.5">
                {post.title}
              </h2>
              <p className="font-garamond italic text-[9.5px] sm:text-[11px] text-[#52351c] font-semibold">
                — By {post.author.includes("Canara") ? "Canara Open Source Community" : post.author} • {post.date.includes("2025") ? post.date : `${post.date} • 2025`} —
              </p>
            </div>

            {/* Center Feature Banner Box */}
            <FeatureBannerBox title={post.title} image={post.image} />

            {/* Taped Quote Card */}
            <TapedQuoteCard excerpt={post.excerpt} />

            {/* Bottom Metadata Bar */}
            <BottomMetaFooter date={post.date} author={post.author} />
          </ParchmentPage>

          {/* Right Page */}
          <ParchmentPage side="right">
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[10px] sm:text-[11.5px] leading-[1.6] font-garamond text-[#24140a] font-medium custom-scrollbar text-justify">
                {post.content.map((paragraph, pIdx) =>
                  pIdx === 0 ? (
                    <p key={pIdx}>
                      <OrnateDropCap letter={paragraph.charAt(0)} />
                      {paragraph.slice(1)}
                    </p>
                  ) : (
                    <p key={pIdx}>{paragraph}</p>
                  )
                )}
              </div>

              {/* Bottom Vintage Sketches */}
              <RightPageBottomSketches />
            </div>
          </ParchmentPage>
        </React.Fragment>
      ))}

      {/* End Page Spread */}
      {/* Left Side: The End */}
      <ParchmentPage side="left" className="items-center text-center">
        <div className="flex flex-col items-center justify-center my-auto select-none">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A1A12] tracking-wide">
            The End
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#7a4b24]/50">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
            <span className="text-xs font-serif leading-none">❖</span>
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
          </div>
        </div>
      </ParchmentPage>

      {/* Right Side: Thank You & COSC Logo */}
      <ParchmentPage side="right" className="items-center text-center">
        <div className="flex flex-col items-center justify-center my-auto select-none space-y-2 sm:space-y-3">
          <h2 className="font-canela text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A1A12] tracking-wide">
            Thank You!
          </h2>

          <div className="flex items-center justify-center gap-2 my-1 text-[#7a4b24]/50 w-4/5">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
            <span className="text-xs font-serif leading-none">❦</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
          </div>

          {/* COSC Logo */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 my-1">
            <Image
              src="/blogs/coscblack.png"
              alt="COSC Logo"
              fill
              className="object-contain mix-blend-multiply"
            />
          </div>

          {/* COSC Text */}
          <div className="text-center space-y-0.5">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#2A1A12]">
              COSC
            </h3>
            <p className="text-[8px] sm:text-[9.5px] font-sans font-semibold tracking-[0.2em] text-[#786B5A] uppercase">
              CANARA OPEN SOURCE COMMUNITY
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 my-1 text-[#7a4b24]/50 w-3/4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
            <span className="text-[10px] font-serif leading-none">❖</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/40 to-transparent" />
          </div>
        </div>
      </ParchmentPage>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-between p-4 pt-16 pb-4 overflow-hidden select-none">
      {/* Hidden React source container to preserve DOM nodes safely across mounts */}
      <div ref={sourceRef} className="hidden" aria-hidden="true">
        {renderPages()}
      </div>

      {/* Table Background Image */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-90 transition-transform duration-500"
          style={{
            backgroundImage: "url('/blogs/table.png')",
            transform: "rotateX(18deg) scale(1.1)",
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />

      {/* StPageFlip Flipbook Container */}
      <div
        className="w-full max-w-4xl h-[70vh] max-h-[600px] relative flex items-center justify-center my-auto z-10"
        style={{ perspective: "1200px" }}
      >
        {/* Page Heading: COSC CHRONICLES (Positioned directly above books.png) */}
        <div className="absolute -top-14 sm:-top-16 md:-top-20 lg:-top-22 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center select-none whitespace-nowrap pointer-events-none">
          <h1 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.22em] text-[#F5E5C9] drop-shadow-lg uppercase text-center">
            COSC CHRONICLES
          </h1>

          {/* Golden ornamental line divider with center diamond */}
          <div className="flex items-center justify-center gap-2 mt-1.5 w-60 sm:w-80 md:w-96 text-[#C99A4B]">
            <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#C99A4B]/70 to-[#C99A4B]" />
            <span className="text-xs font-serif leading-none text-[#C99A4B]">❖</span>
            <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#C99A4B]/70 to-[#C99A4B]" />
          </div>
        </div>

        {/* Left Board Container with Overlaid Table of Contents */}
        <div
          className="absolute -left-22 sm:-left-45 md:-left-60 lg:-left-72 xl:-left-85 top-1/2 -translate-y-1/2 z-20 transition-transform duration-500 ease-out hidden sm:block pointer-events-auto"
          style={{
            filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85))",
          }}
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/blogs/board.png"
              alt="Board Table of Contents"
              className="w-43 sm:w-53 md:w-70 lg:w-72 xl:w-90 h-auto object-contain"
            />

            {/* Overlaid Table of Contents text on the left board */}
            <div className="absolute inset-[14%] sm:inset-[16%] flex flex-col justify-between p-1.5 sm:p-3 text-[#2A1A12] select-none pointer-events-auto">
              <div className="text-center pb-1 border-b border-[#C99A4B]/40 mb-1.5">
                <h2 className="font-playfair text-xs sm:text-base md:text-lg font-bold tracking-wide text-[#2A1A12]">
                  Table of Contents
                </h2>
                <p className="text-[8px] sm:text-[9px] font-sans text-[#786B5A] italic mt-0.5">
                  Canara Open Source Community
                </p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
                {posts.map((post, idx) => (
                  <button
                    key={post.slug}
                    onClick={() => jumpToPage((idx + 1) * 2)}
                    className="w-full text-left p-1 rounded hover:bg-[#4A2612]/10 transition-colors group flex items-start gap-1.5 cursor-pointer"
                  >
                    <span className="font-playfair text-xs sm:text-sm font-bold text-[#C99A4B]">
                      0{idx + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="block font-sans font-semibold text-[10px] sm:text-xs text-[#2A1A12] group-hover:text-[#4A2612] leading-snug">
                        {post.title}
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-[#786B5A] mt-0.5">
                        {post.date}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-1 border-t border-[#C99A4B]/40 text-center text-[8px] sm:text-[9px] font-sans text-[#786B5A]">
                Volume I — {posts.length} Stories
              </div>
            </div>
          </div>
        </div>

        {/* Right Board Container (board2.png) with Overlaid "Want to write a blog?" Callout */}
        <div
          className="absolute -right-45 sm:-right-50 md:-right-52 lg:-right-50 xl:-right-85 top-[28%] sm:top-[22%] z-20 transition-transform duration-500 ease-out hidden sm:block pointer-events-auto"
          style={{
            filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85))",
          }}
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/blogs/board2.png"
              alt="Write a Blog Board"
              className="w-40 sm:w-44 md:w-56 lg:w-60 xl:w-80 h-auto object-contain"
            />

            {/* Overlaid text on right board matching attached image design */}
            <div className="absolute inset-[13%] sm:inset-[15%] flex flex-col justify-between items-center text-center p-2 sm:p-4 text-[#1f1107] select-none pointer-events-auto">
              <div className="flex flex-col items-center justify-center my-auto w-full space-y-1.5 sm:space-y-3">
                {/* Title */}
                <h3 className="font-playfair text-sm sm:text-base md:text-xl font-black text-[#1f1107] leading-tight tracking-tight">
                  Want to write<br />a blog?
                </h3>

                {/* Vintage Ornamental Divider */}
                <div className="flex items-center justify-center w-4/5 gap-2 my-0.5 sm:my-1 text-[#7a4b24]/60">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/50 to-transparent" />
                  <span className="text-[10px] sm:text-xs font-serif leading-none">❖</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#7a4b24]/50 to-transparent" />
                </div>

                {/* Subtitle / Description */}
                <p className="text-[9px] sm:text-xs md:text-sm font-geometric font-bold text-[#2a170d] leading-snug max-w-[140px] sm:max-w-[180px]">
                  Share your ideas,<br />
                  knowledge, and<br />
                  stories with the<br />
                  community.
                </p>

                {/* Button */}
                <a
                  href="https://github.com/Canara-Open-Source-Community/cosc-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 sm:mt-2 px-3.5 sm:px-5 py-1 sm:py-1.5 bg-[#2a170d] hover:bg-[#1a0e08] text-[#f8eedb] text-[9px] sm:text-xs md:text-sm font-geometric font-bold rounded-lg shadow-md border border-[#523119]/50 transition-all active:scale-95 cursor-pointer inline-block"
                >
                  Click Here
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Note Container (sticky.png) with Overlaid "Ideas worth sharing. ♡" Handwritten Text */}
        <div
          className="absolute -right-45 sm:-right-50 md:-right-52 lg:-right-50 xl:-right-80 top-[-5%] sm:top-[-10%] z-10 pointer-events-none transition-transform duration-500 ease-out hidden sm:block"
          style={{
            filter: "drop-shadow(0 15px 20px rgba(0, 0, 0, 0.85))",
          }}
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/blogs/sticky.png"
              alt="Sticky Note"
              className="w-45 sm:w-45 md:w-50 lg:w-50 xl:w-70 h-auto object-contain"
            />

            {/* Overlaid handwritten text matching image */}
            <div className="absolute inset-[15%] sm:inset-[18%] flex flex-col justify-between p-2 sm:p-4 text-[#1c120c] font-caveat select-none rotate-[-6deg]">
              <div className="flex flex-col items-start justify-center my-auto pl-1 sm:pl-2">
                <span className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-[#1c120c] whitespace-nowrap">
                  Ideas worth
                </span>
                <span className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-[#1c120c] border-b-2 border-[#1c120c]/80 pb-0.5 whitespace-nowrap">
                  sharing.
                </span>
              </div>
              <div className="self-end text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1c120c] font-bold pr-2 sm:pr-4">
                ♡
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Desk Items */}
        {DESK_PROPS.map((prop) => (
          <div
            key={prop.id}
            className={prop.containerClass}
            style={{ filter: prop.filter }}
          >
            <img src={prop.src} alt={prop.alt} className={prop.imgClass} />
          </div>
        ))}

        {/* Page Navigation Controls (Placed over button image) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[100%] sm:top-[104%] z-30 flex items-center gap-6 sm:gap-15">
          <button
            onClick={handlePrev}
            className="px-2 py-1 bg-transparent text-[#f8eedb] hover:text-white text-xs sm:text-sm font-geometric font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 select-none drop-shadow-md"
          >
            <span>←</span> Prev
          </button>

          <button
            onClick={handleNext}
            className="px-2 py-1 bg-transparent text-[#f8eedb] hover:text-white text-xs sm:text-sm font-geometric font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 select-none drop-shadow-md"
          >
            Next <span>→</span>
          </button>
        </div>

        {/* Book Base Background Image */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: "rotateX(8deg)",
            transformOrigin: "50% 60%",
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85))",
          }}
        >
          <img
            src="/blogs/books.png"
            alt="Book background"
            className="w-[94%] h-[99%] -top-[3.99%] relative object-fill scale-y-[1.08] scale-x-[1.04]"
          />
        </div>

        {/* Interactive StPageFlip Flipbook */}
        <div
          ref={targetRef}
          onClick={handleTargetClick}
          className="w-full h-full transition-transform duration-500 ease-out z-10 relative"
          style={{
            transform: "rotateX(10deg) translateY(-26px)",
            transformOrigin: "50% 60%",
            transformStyle: "preserve-3d",
          }}
        />
      </div>
    </div>
  );
}