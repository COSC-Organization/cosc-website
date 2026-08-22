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
  "/cosc logo.png",
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

        pageFlip.loadFromHTML(clonedPages as unknown as NodeListOf<HTMLElement>);
        pageFlipInstance = pageFlip;
        pageFlipRef.current = pageFlip;
      } catch (err) {
        console.error("Failed to initialize PageFlip:", err);
      }
    };

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
      if (targetRef.current) {
        targetRef.current.innerHTML = "";
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
                    {post.category} · {post.date}
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
      {posts.map((post, postIdx) => (
        <React.Fragment key={post.slug}>
          {/* Left Page */}
          <ParchmentPage side="left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase font-geometric tracking-wider bg-[#5a3614]/15 px-1.5 py-0.5 rounded text-[#4a2b10] border border-[#5a3614]/20 font-semibold">
                {post.category}
              </span>
            </div>

            <h2 className="font-canela text-base sm:text-lg font-bold leading-tight mb-1 text-[#26170c]">
              {post.title}
            </h2>

            <p className="text-[10px] text-[#5c3c1e] font-geometric mb-2">
              By {post.author} · {post.date}
            </p>

            <div className="relative w-full aspect-[16/9] rounded border border-[#5a3614]/25 overflow-hidden mb-2 shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority={postIdx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 350px"
              />
            </div>

            <p className="text-[10px] sm:text-xs leading-relaxed font-geometric text-[#3a2311] italic flex-1 overflow-hidden">
              &ldquo;{post.excerpt}&rdquo;
            </p>

            <div className="pt-1.5 border-t border-[#5a3614]/20 text-center text-[9px] font-geometric text-[#5c3c1e]">
              Story {postIdx + 1} of {posts.length}
            </div>
          </ParchmentPage>

          {/* Right Page */}
          <ParchmentPage side="right">
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[10px] sm:text-xs leading-relaxed font-geometric text-[#2b180a] custom-scrollbar">
              {post.content.map((paragraph, pIdx) =>
                pIdx === 0 ? (
                  <p key={pIdx}>
                    <span className="float-left font-canela text-3xl leading-none pr-1 pt-0.5 text-[#6e3713] font-bold">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </p>
                ) : (
                  <p key={pIdx}>{paragraph}</p>
                )
              )}
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
              src="/cosc logo.png"
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
                        {post.category} · {post.date}
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