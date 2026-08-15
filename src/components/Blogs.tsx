"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { blogs, type BlogPost } from "@/data/blogs";

/* ---------------------------------------------------------------- */
/* Ambient background embers                                         */
/* ---------------------------------------------------------------- */

function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.35 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.15;
        if (p.y > canvas.height) {
          p.y = -5;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 190, 110, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Small helpers                                                     */
/* ---------------------------------------------------------------- */

const numeral = (n: number) => String(n).padStart(2, "0");

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[10px] sm:text-[11px] uppercase tracking-wide font-geometric px-2 py-1 rounded-sm border transition-colors ${
        active
          ? "bg-orange-500/90 border-orange-400 text-[#1a1206]"
          : "bg-black/5 border-amber-900/30 text-amber-900/80 hover:border-orange-500/60 hover:text-orange-700"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------------------------------------------------------------- */
/* The book                                                          */
/* ---------------------------------------------------------------- */

export default function Blogs() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"index" | "reading">("index");

  const allTags = useMemo(
    () => Array.from(new Set(blogs.flatMap((b) => b.tags ?? []))),
    []
  );

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogs.forEach((b) => (b.tags ?? []).forEach((t) => (counts[t] = (counts[t] ?? 0) + 1)));
    return counts;
  }, []);

  const filteredBlogs = useMemo(
    () => (activeTag ? blogs.filter((b) => b.tags?.includes(activeTag)) : blogs),
    [activeTag]
  );

  const selectedPost: BlogPost | null =
    blogs.find((b) => b.slug === selectedSlug) ?? null;

  const selectedIndexInFiltered = selectedPost
    ? filteredBlogs.findIndex((b) => b.slug === selectedPost.slug)
    : -1;

  const openPost = (slug: string) => {
    setSelectedSlug(slug);
    setMobileView("reading");
  };

  const goRelative = (dir: -1 | 1) => {
    if (selectedIndexInFiltered === -1) return;
    const next = filteredBlogs[selectedIndexInFiltered + dir];
    if (next) openPost(next.slug);
  };

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setSelectedSlug(null);
    setMobileView("index");
  };

  return (
    <section className="relative bg-[#0a0e14] text-white py-10 sm:py-14 md:py-20 px-3 sm:px-6 overflow-hidden min-h-screen">
      <AmbientParticles />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 font-canela tracking-wide">
            BLOGS
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm font-geometric max-w-2xl mx-auto px-4">
            Stories, guides, and updates from the Canara Open Source Community.
          </p>
          <p className="mt-3 text-orange-300/70 text-[11px] sm:text-xs font-geometric italic">
            Ideas worth sharing. Stories worth remembering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-6 xl:gap-8 items-start">
          {/* ---------------- Left sidebar ---------------- */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-6">
            <div className="bg-[#12161f] border-2 border-amber-800/40 rounded-xl p-4">
              <h3 className="font-canela text-lg mb-1">Blog Index</h3>
              <p className="text-gray-400 text-xs font-geometric mb-3">
                Explore stories, updates, and insights from our community.
              </p>
              <button
                onClick={() => {
                  setActiveTag(null);
                  setSelectedSlug(null);
                  setMobileView("index");
                }}
                className={`w-full flex items-center justify-between text-sm font-geometric px-2 py-1.5 rounded-md mb-1 transition-colors ${
                  activeTag === null
                    ? "bg-orange-500/90 text-[#1a1206]"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <span>All Posts</span>
                <span>{blogs.length}</span>
              </button>
              <div className="mt-2 flex flex-col gap-1">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`w-full flex items-center justify-between text-xs font-geometric px-2 py-1.5 rounded-md transition-colors ${
                      activeTag === tag
                        ? "bg-orange-500/20 text-orange-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <span>{tag}</span>
                    <span>{tagCounts[tag]}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ---------------- The book ---------------- */}
          <div className="min-w-0">
            {/* mobile tab toggle */}
            <div className="flex lg:hidden mb-3 gap-2">
              <button
                onClick={() => setMobileView("index")}
                className={`flex-1 text-xs font-geometric uppercase tracking-wide py-2 rounded-t-lg border-b-2 ${
                  mobileView === "index"
                    ? "border-orange-400 text-orange-300"
                    : "border-transparent text-gray-500"
                }`}
              >
                Index
              </button>
              <button
                onClick={() => setMobileView("reading")}
                className={`flex-1 text-xs font-geometric uppercase tracking-wide py-2 rounded-t-lg border-b-2 ${
                  mobileView === "reading"
                    ? "border-orange-400 text-orange-300"
                    : "border-transparent text-gray-500"
                }`}
              >
                {selectedPost ? "Reading" : "Cover"}
              </button>
            </div>

            <div
              className="relative rounded-2xl overflow-hidden md:grid md:grid-cols-2 bg-[#e9dcc3]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(91,58,36,0.04) 0px, rgba(91,58,36,0.04) 1px, transparent 1px, transparent 26px)",
                perspective: "2200px",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.55), inset 0 0 0 3px #2c1c10, inset 0 0 0 7px #5b3a24, inset 0 0 0 9px rgba(214,158,91,0.45)",
              }}
            >
              {/* aged paper vignette */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(91,58,36,0.22) 100%)",
                }}
              />

              {/* spine */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-5 -translate-x-1/2 z-20 bg-gradient-to-r from-black/30 via-black/10 to-black/30 shadow-[0_0_18px_rgba(0,0,0,0.4)]" />

              {/* ---- Left page: INDEX ---- */}
              <div
                key={`index-${activeTag ?? "all"}`}
                className={`${
                  mobileView === "index" ? "block" : "hidden"
                } md:block relative p-5 sm:p-7 md:pr-8 text-[#241a10] page-turn-left`}
                style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex-1 h-px bg-amber-900/25" />
                  <h2 className="font-canela text-xl sm:text-2xl tracking-wide">Index</h2>
                  <span className="flex-1 h-px bg-amber-900/25" />
                </div>

                {activeTag && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-[11px] font-geometric text-amber-900/60">
                      Filtered by
                    </span>
                    <TagPill label={activeTag} active onClick={() => toggleTag(activeTag)} />
                  </div>
                )}

                <div className="flex flex-col divide-y divide-amber-900/15">
                  {filteredBlogs.map((post, i) => (
                    <button
                      key={post.slug}
                      onClick={() => openPost(post.slug)}
                      className={`group text-left py-3.5 flex items-start gap-3 sm:gap-4 transition-colors ${
                        selectedSlug === post.slug ? "bg-orange-900/10" : "hover:bg-black/5"
                      } rounded-md px-2 -mx-2`}
                    >
                      <span className="font-canela text-2xl sm:text-3xl text-orange-800/70 leading-none pt-0.5">
                        {numeral(i + 1)}
                      </span>
                      <span className="flex-1 min-w-0">
                        {post.category && (
                          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-wide font-geometric bg-amber-900/10 text-amber-900/70 px-1.5 py-0.5 rounded-sm mb-1">
                            {post.category}
                          </span>
                        )}
                        <span className="block font-geometric font-semibold text-sm sm:text-[15px] leading-snug group-hover:text-orange-800 transition-colors">
                          {post.title}
                        </span>
                        <span className="block text-[11px] sm:text-xs text-amber-900/60 font-geometric mt-1">
                          By {post.author} · {post.date}
                        </span>
                      </span>
                    </button>
                  ))}
                  {filteredBlogs.length === 0 && (
                    <p className="py-6 text-sm font-geometric text-amber-900/60">
                      No stories under this tag yet.
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-amber-900/20 text-center">
                  <span className="text-[10px] tracking-[0.2em] font-geometric text-amber-900/40 uppercase">
                    {filteredBlogs.length} {filteredBlogs.length === 1 ? "story" : "stories"} in this volume
                  </span>
                </div>
              </div>

              {/* ---- Right page: reading ---- */}
              <div
                key={`reading-${selectedPost ? selectedPost.slug : "cover"}`}
                className={`${
                  mobileView === "reading" ? "block" : "hidden"
                } md:block relative p-5 sm:p-7 md:pl-8 text-[#241a10] page-turn-right`}
                style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              >
                {selectedPost ? (
                  <>
                    <button
                      onClick={() => setMobileView("index")}
                      className="lg:hidden mb-4 text-xs font-geometric text-amber-900/60 flex items-center gap-1"
                    >
                      ← Back to index
                    </button>

                    <div className="inline-block bg-emerald-800/90 text-white text-[10px] uppercase tracking-wide font-geometric px-2.5 py-1 rounded-sm mb-3">
                      You are reading
                    </div>

                    {selectedPost.category && (
                      <span className="inline-block ml-2 text-[10px] uppercase tracking-wide font-geometric bg-amber-900/10 text-amber-900/70 px-2 py-1 rounded-sm mb-3">
                        {selectedPost.category}
                      </span>
                    )}

                    <h2 className="font-canela text-2xl sm:text-3xl leading-tight mb-2">
                      {selectedPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-amber-900/60 font-geometric mb-4">
                      By {selectedPost.author} · {selectedPost.date} · {selectedPost.readTime}
                    </p>

                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-amber-900/20 mb-4">
                      <Image
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>

                    <div className="space-y-3 text-[13.5px] sm:text-sm leading-relaxed font-geometric text-[#3a2c1c]">
                      {selectedPost.content.map((para, idx) =>
                        idx === 0 ? (
                          <p key={idx}>
                            <span className="float-left font-canela text-5xl sm:text-6xl leading-[0.8] pr-2 pt-1 text-orange-900/80">
                              {para.charAt(0)}
                            </span>
                            {para.slice(1)}
                          </p>
                        ) : (
                          <p key={idx}>{para}</p>
                        )
                      )}
                    </div>

                    {selectedPost.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedPost.tags.map((tag) => (
                          <TagPill
                            key={tag}
                            label={tag}
                            active={activeTag === tag}
                            onClick={() => toggleTag(tag)}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-6 pt-3 border-t border-amber-900/20 text-xs font-geometric text-amber-900/70">
                      <button
                        onClick={() => goRelative(-1)}
                        disabled={selectedIndexInFiltered <= 0}
                        className="disabled:opacity-30 hover:text-orange-700 transition-colors"
                      >
                        ← Prev post
                      </button>
                      <span>
                        {selectedIndexInFiltered + 1} / {filteredBlogs.length}
                      </span>
                      <button
                        onClick={() => goRelative(1)}
                        disabled={selectedIndexInFiltered >= filteredBlogs.length - 1}
                        className="disabled:opacity-30 hover:text-orange-700 transition-colors"
                      >
                        Next post →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 sm:py-16">
                    <span className="text-4xl mb-3">📖</span>
                    <h2 className="font-canela text-xl sm:text-2xl mb-2">
                      Pick a story to begin
                    </h2>
                    <p className="text-xs sm:text-sm font-geometric text-amber-900/60 max-w-xs">
                      Choose an entry from the index to open its page here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---------------- Right sidebar ---------------- */}
          <aside className="hidden lg:flex flex-col gap-4 sticky top-6">
            <div className="bg-[#12161f] border-2 border-amber-800/40 rounded-xl p-4">
              <h3 className="font-canela text-lg mb-3">Top Categories</h3>
              <div className="flex flex-col gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-left text-xs font-geometric px-2.5 py-1.5 rounded-md border transition-colors ${
                      activeTag === tag
                        ? "border-orange-400 text-orange-300 bg-orange-500/10"
                        : "border-amber-800/30 text-gray-300 hover:border-orange-500/50"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#12161f] border-2 border-amber-800/40 rounded-xl p-4">
              <h3 className="font-canela text-lg mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <TagPill
                    key={tag}
                    label={`#${tag.toLowerCase().replace(/\s+/g, "")}`}
                    active={activeTag === tag}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>

      <style jsx global>{`
        @keyframes pageTurnRight {
          0% {
            transform: rotateY(-100deg);
            opacity: 0;
            filter: brightness(0.6);
          }
          55% {
            transform: rotateY(-12deg);
            opacity: 1;
            filter: brightness(0.95);
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
            filter: brightness(1);
          }
        }
        @keyframes pageTurnLeft {
          0% {
            transform: rotateY(100deg);
            opacity: 0;
            filter: brightness(0.6);
          }
          55% {
            transform: rotateY(12deg);
            opacity: 1;
            filter: brightness(0.95);
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
            filter: brightness(1);
          }
        }
        .page-turn-right {
          animation: pageTurnRight 0.6s cubic-bezier(0.4, 0.15, 0.2, 1) both;
        }
        .page-turn-left {
          animation: pageTurnLeft 0.6s cubic-bezier(0.4, 0.15, 0.2, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .page-turn-right,
          .page-turn-left {
            animation: none;
          }
        }
        .page-turn-right,
        .page-turn-left {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .page-turn-right::-webkit-scrollbar,
        .page-turn-left::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}