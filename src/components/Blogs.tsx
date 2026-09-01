"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from "react";
import { blogs, type BlogPost } from "@/data/blogs";

/* ------------------------------------------------------------------ */
/*  Ambient background (unchanged from the original page)             */
/* ------------------------------------------------------------------ */

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
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.15,
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
        ctx.fillStyle = `rgba(255, 200, 130, ${p.opacity})`;
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

/* ------------------------------------------------------------------ */
/*  Pagination                                                        */
/* ------------------------------------------------------------------ */

type Page = {
  kind: "index" | "postHead" | "postCont" | "outro" | "blank";
  post?: BlogPost;
  paragraphs?: string[];
  part?: number;
  partOf?: number;
  pageNum?: number;
};

type JumpTarget = { spreadIndex: number; pageNum: number };

const PAGE_LIMITS = [220, 540];

function paginateParagraphs(paragraphs: string[], limits: number[]): string[][] {
  const pages: string[][] = [];
  let current: string[] = [];
  let count = 0;
  let limitIndex = 0;
  const limitFor = (i: number) => limits[Math.min(i, limits.length - 1)];

  for (const p of paragraphs) {
    const max = limitFor(limitIndex);
    if (current.length > 0 && count + p.length > max) {
      pages.push(current);
      current = [];
      count = 0;
      limitIndex++;
    }
    current.push(p);
    count += p.length;
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

function buildPages(posts: BlogPost[]): Page[] {
  const pages: Page[] = [{ kind: "index" }];

  posts.forEach((post) => {
    const body = post.content && post.content.length ? post.content : [post.excerpt];
    const chunks = paginateParagraphs(body, PAGE_LIMITS);
    const total = chunks.length;

    chunks.forEach((chunk, i) => {
      pages.push({
        kind: i === 0 ? "postHead" : "postCont",
        post,
        paragraphs: chunk,
        part: i + 1,
        partOf: total,
      });
    });
  });

  pages.push({ kind: "outro" });
  return pages;
}

/* ------------------------------------------------------------------ */
/*  Design tokens / small helpers                                     */
/* ------------------------------------------------------------------ */

// Pastel chip background + a darker, saturated ink for the label text.
const TAG_PALETTE = [
  { bg: "#fbe3c9", text: "#9a5620" }, // amber
  { bg: "#dcefd2", text: "#3f6b3f" }, // sage
  { bg: "#d9e7fb", text: "#2f5aa8" }, // sky
  { bg: "#ece0fb", text: "#6a3fb5" }, // lilac
  { bg: "#fbdbe6", text: "#b23763" }, // rose
  { bg: "#fdf2c9", text: "#8a6a0c" }, // gold
];

function tagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_PALETTE[hash % TAG_PALETTE.length];
}

type IconName =
  | "calendar"
  | "bulb"
  | "wrench"
  | "shield"
  | "trophy"
  | "grid"
  | "terminal"
  | "tag"
  | "book"
  | "document"
  | "clock"
  | "tower";

function iconForTag(tag: string): IconName {
  const t = tag.toLowerCase();
  if (t.includes("event")) return "calendar";
  if (t.includes("hackathon")) return "bulb";
  if (t.includes("buildathon")) return "wrench";
  if (t.includes("cyber")) return "shield";
  if (t.includes("competition")) return "trophy";
  if (t.includes("dsa")) return "grid";
  if (t.includes("coding") || t.includes("practice")) return "terminal";
  return "tag";
}

/**
 * Small hand-drawn-style ink line icons — stand in for the "vintage
 * editorial illustration" linework instead of platform emoji, which
 * render inconsistently and read as distinctly modern/digital.
 */
function VintageIcon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
          <path d="M7 13.2h2M11 13.2h2M15 13.2h2M7 16.6h2M11 16.6h2" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6.2 6.2 0 0 0-3.6 11.2c.6.5 1 1.2 1 2h5.2c0-.8.4-1.5 1-2A6.2 6.2 0 0 0 12 3Z" />
          <path d="M12 3v1.4M6.6 6.6l1 1M17.4 6.6l-1 1" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3.5 17l2.9 2.9 5.8-5.8a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.1-.6-.6-2.1 2.9-3.3Z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3.2 5 5.8v5.4c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V5.8L12 3.2Z" />
          <path d="M9 12.2l2 2 4-4.4" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
          <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7 10M17 5h3v1.5A3.5 3.5 0 0 1 17 10" />
          <path d="M12 13v3.5M9 20.5h6M9.6 20.5c0-1.8.7-2.6 2.4-3 1.7.4 2.4 1.2 2.4 3" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
          <path d="M6.5 9.5l3 2.7-3 2.7M12.5 15.5h5" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M12 6.5c-1.8-1.4-4-2-6.5-2v13c2.5 0 4.7.6 6.5 2 1.8-1.4 4-2 6.5-2v-13c-2.5 0-4.7.6-6.5 2Z" />
          <path d="M12 6.5v13" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M6.5 3.5h8l3 3v14h-11v-17Z" />
          <path d="M14 3.5v3.3h3.2M9 12.5h6M9 15.7h6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.3l3 1.8" />
        </svg>
      );
    case "tower":
      return (
        <svg {...common}>
          <path d="M9 21V9.5h6V21" />
          <path d="M10.3 9.5V5.8h3.4v3.7" />
          <path d="M10.8 3 12 1.6 13.2 3" />
          <path d="M5 21h14M11 12.5h2M11 15.5h2M11 18.5h2" />
        </svg>
      );
    case "tag":
    default:
      return (
        <svg {...common}>
          <path d="M11.5 3.5H19a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-.44 1.06l-8.5 8.5a1.5 1.5 0 0 1-2.12 0l-6.5-6.5a1.5 1.5 0 0 1 0-2.12l8.5-8.5c.28-.28.66-.44 1.06-.44Z" />
          <circle cx="15.5" cy="8.5" r="1.4" />
        </svg>
      );
  }
}

function tagCounts(posts: BlogPost[]): [string, number][] {
  const map = new Map<string, number>();
  posts.forEach((p) => (p.tags ?? []).forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)));
  return Array.from(map.entries());
}

const pagePaper: CSSProperties = {
  background: "radial-gradient(120% 120% at 12% 0%, #fbf3dd 0%, #f1e2ba 55%, #e6d3a0 100%)",
};

const woodPlank: CSSProperties = {
  background: "linear-gradient(160deg, #6b4226 0%, #4a2f1f 55%, #3a2416 100%)",
};

// Subtle paper-fiber grain, generated purely in CSS via an SVG turbulence
// filter — no image asset. mix-blend-multiply lets the parchment gradient
// show through while the grain darkens it unevenly, like real paper fibers.
const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

function PaperGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-multiply"
      style={{ backgroundImage: GRAIN_URL, backgroundSize: "140px 140px" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page contents                                                     */
/* ------------------------------------------------------------------ */

type Ctx = {
  posts: BlogPost[];
  jumpMap: Map<string, JumpTarget>;
  activeSlug?: string;
  onJump: (slug: string) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  pageLabel: string;
};

function IndexPage({ posts, jumpMap, activeSlug, onJump }: Ctx) {
  return (
    <div className="relative flex h-full flex-col p-5 sm:p-7">
      <span className="pointer-events-none absolute right-4 top-3 text-[#7a5222] opacity-30 sm:right-6">
        <VintageIcon name="tower" className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-[#b8860b]/60">↭</span>
        <span className="h-px flex-1 bg-[#b8860b]/40" />
        <h2 className="font-canela text-lg tracking-[0.3em] text-[#7a5222] sm:text-xl">INDEX</h2>
        <span className="h-px flex-1 bg-[#b8860b]/40" />
        <span className="text-[#b8860b]/60">↭</span>
      </div>

      <ol className="no-scrollbar flex-1 space-y-0 overflow-y-auto pr-1">
        {posts.map((post, i) => {
          const isActive = post.slug === activeSlug;
          const color = tagColor(post.tags?.[0] ?? post.slug);
          return (
            <li
              key={post.slug}
              className={i > 0 ? "border-t border-dashed border-[#b8860b]/25" : ""}
            >
              <button
                type="button"
                onClick={() => onJump(post.slug)}
                className={`group flex w-full items-start gap-3 rounded-md p-2 text-left transition-colors ${
                  isActive ? "bg-[#dcc38c]" : "hover:bg-[#e2cf9e]/50"
                }`}
              >
                <span className="w-7 shrink-0 font-canela text-lg text-[#7a5222] sm:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  {post.tags?.[0] && (
                    <span
                      className="mb-1 inline-block rounded px-2 py-0.5 font-geometric text-[9px] font-semibold uppercase tracking-wide sm:text-[10px]"
                      style={{ backgroundColor: color.bg, color: color.text }}
                    >
                      {post.tags[0]}
                    </span>
                  )}
                  <span className="block font-canela text-sm font-semibold leading-snug text-[#2b2013] group-hover:underline sm:text-base">
                    {post.title}
                  </span>
                  <span className="mt-0.5 block font-geometric text-[10px] text-[#6b4226]/80 sm:text-xs">
                    By {post.author} · {post.date}
                  </span>
                </span>
                <span className="shrink-0 pt-1 text-right font-geometric text-[9px] uppercase tracking-wide text-[#7a5222]/70 sm:text-[10px]">
                  Page
                  <br />
                  {String(jumpMap.get(post.slug)?.pageNum ?? "").padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PostNavFooter({ ctx }: { ctx: Ctx }) {
  return (
    <div className="mt-2 flex items-center justify-between border-t border-[#b8860b]/25 pt-2 font-geometric text-[9px] uppercase tracking-wide text-[#7a5222]/80 sm:text-[10px]">
      <button
        type="button"
        onClick={ctx.onPrev}
        disabled={!ctx.canPrev}
        className="transition-colors hover:text-[#4a3420] disabled:opacity-30"
      >
        ← Prev post
      </button>
      <span className="normal-case tracking-normal text-[#7a5222]/60">{ctx.pageLabel}</span>
      <button
        type="button"
        onClick={ctx.onNext}
        disabled={!ctx.canNext}
        className="transition-colors hover:text-[#4a3420] disabled:opacity-30"
      >
        Next post →
      </button>
    </div>
  );
}

function PostHeadPage({ page, ctx }: { page: Page; ctx: Ctx }) {
  const post = page.post!;
  const isActive = post.slug === ctx.activeSlug;
  const color = tagColor(post.tags?.[0] ?? post.slug);

  return (
    <div className="relative flex h-full flex-col p-5 sm:p-7">
      <span className="pointer-events-none absolute right-4 top-3 text-[#7a5222] opacity-30 sm:right-6">
        <VintageIcon name="bulb" className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>

      {isActive && (
        <span
          className="relative mb-2 inline-flex w-fit items-center px-3 py-0.5 font-geometric text-[9px] font-semibold uppercase tracking-wider text-white"
          style={{
            backgroundColor: "#4f7350",
            clipPath: "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)",
          }}
        >
          You are reading
        </span>
      )}
      {post.tags?.[0] && (
        <span
          className="mb-2 inline-block w-fit rounded px-2 py-0.5 font-geometric text-[10px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: color.bg, color: color.text }}
        >
          {post.tags[0]}
        </span>
      )}

      <h3 className="font-canela text-xl font-bold leading-tight text-[#2b2013] sm:text-2xl">
        {post.title}
      </h3>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-geometric text-[10px] text-[#6b4226]/80 sm:text-xs">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2b2013] text-[10px] font-bold text-[#f3e6c9]">
          C
        </span>
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
        {post.readTime && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <VintageIcon name="clock" className="h-3 w-3" />
              {post.readTime}
            </span>
          </>
        )}
      </div>

      {post.image && (
        <div
          className="group relative mt-3 h-28 w-full shrink-0 overflow-hidden rounded-sm border border-[#6b4226]/30 shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:h-36"
          style={{ transform: "rotate(-1deg)" }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 90vw, 420px"
          />
        </div>
      )}

      <div className="no-scrollbar mt-3 flex-1 space-y-2 overflow-y-auto pr-1 font-geometric text-[11px] leading-relaxed text-[#3a2b18] sm:text-[13px]">
        {page.paragraphs?.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "first-letter:float-left first-letter:mr-1 first-letter:font-canela first-letter:text-3xl first-letter:font-bold first-letter:leading-[0.75] first-letter:text-[#7a5222] sm:first-letter:text-4xl"
                : undefined
            }
          >
            {p}
          </p>
        ))}
      </div>

      <PostNavFooter ctx={ctx} />
    </div>
  );
}

function PostContPage({ page, ctx }: { page: Page; ctx: Ctx }) {
  const post = page.post!;
  return (
    <div className="flex h-full flex-col p-5 sm:p-7">
      <span className="mb-3 font-canela text-[11px] uppercase tracking-[0.2em] text-[#7a5222]/70 sm:text-xs">
        {post.title} — continued
      </span>
      <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto pr-1 font-geometric text-[11px] leading-relaxed text-[#3a2b18] sm:text-[13px]">
        {page.paragraphs?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <PostNavFooter ctx={ctx} />
    </div>
  );
}

function OutroPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <span className="font-canela text-3xl text-[#7a5222]">❦</span>
      <h3 className="font-canela text-lg font-bold text-[#2b2013] sm:text-xl">
        You&apos;ve reached the last page — for now
      </h3>
      <p className="max-w-xs font-geometric text-xs text-[#3a2b18]/80 sm:text-sm">
        More builds, hackathons, and late-night debugging stories are on the way. Got one worth
        telling?
      </p>
      <button
        type="button"
        className="rounded-full bg-[#7a5222] px-4 py-2 font-geometric text-xs font-semibold text-[#f3e6c9] transition-colors hover:bg-[#8a5a34]"
      >
        Write for us →
      </button>
    </div>
  );
}

function BlankPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="font-canela text-2xl text-[#7a5222]/30">❧</span>
    </div>
  );
}

function PageView({ page, ctx }: { page: Page; ctx: Ctx }) {
  switch (page.kind) {
    case "index":
      return <IndexPage {...ctx} />;
    case "postHead":
      return <PostHeadPage page={page} ctx={ctx} />;
    case "postCont":
      return <PostContPage page={page} ctx={ctx} />;
    case "outro":
      return <OutroPage />;
    default:
      return <BlankPage />;
  }
}

/* ------------------------------------------------------------------ */
/*  The turning page                                                  */
/* ------------------------------------------------------------------ */

function FlipSheet({
  dir,
  front,
  back,
  ctx,
  phase,
  onEnd,
  reducedMotion,
}: {
  dir: "next" | "prev";
  front?: Page;
  back?: Page;
  ctx: Ctx;
  phase: "idle" | "flip";
  onEnd: (e: TransitionEvent<HTMLDivElement>) => void;
  reducedMotion: boolean;
}) {
  const rotation = phase === "flip" ? (dir === "next" ? -180 : 180) : 0;

  return (
    <div
      className="absolute inset-0 z-20"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: dir === "next" ? "left center" : "right center",
        transform: `rotateY(${rotation}deg)`,
        transition: reducedMotion ? "none" : "transform 0.85s cubic-bezier(0.45, 0.05, 0.15, 1)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
      }}
      onTransitionEnd={onEnd}
    >
      <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]" style={pagePaper}>
        <PaperGrain />
        {front && <PageView page={front} ctx={ctx} />}
      </div>
      <div
        className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
        style={{ ...pagePaper, transform: "rotateY(180deg)" }}
      >
        <PaperGrain />
        {back && <PageView page={back} ctx={ctx} />}
      </div>
    </div>
  );
}

type Bldg = { x: number; w: number; h: number; roof?: "flat" | "peak"; brick: string };

const SKYLINE_BUILDINGS: Bldg[] = [
  { x: 0, w: 130, h: 150, brick: "#8a4a30" },
  { x: 130, w: 90, h: 110, brick: "#a6603c" },
  { x: 220, w: 140, h: 170, roof: "peak", brick: "#8a4a30" },
  { x: 400, w: 100, h: 120, brick: "#a6603c" },
  { x: 660, w: 110, h: 130, brick: "#a6603c" },
  { x: 770, w: 140, h: 165, roof: "peak", brick: "#8a4a30" },
  { x: 910, w: 95, h: 115, brick: "#a6603c" },
  { x: 1050, w: 120, h: 150, brick: "#8a4a30" },
  { x: 1200, w: 100, h: 120, brick: "#a6603c" },
  { x: 1330, w: 130, h: 160, roof: "peak", brick: "#8a4a30" },
];

function BuildingShape({ b, baseY }: { b: Bldg; baseY: number }) {
  const top = baseY - b.h;
  const windowCols = Math.max(2, Math.floor(b.w / 26));
  const windowRows = Math.max(2, Math.floor(b.h / 30));
  const padX = 12;
  const padY = 16;
  const cellW = (b.w - padX * 2) / windowCols;
  const cellH = (b.h - padY * 2) / windowRows;

  const windows = [];
  for (let r = 0; r < windowRows; r++) {
    for (let c = 0; c < windowCols; c++) {
      windows.push(
        <rect
          key={`${r}-${c}`}
          x={b.x + padX + c * cellW + cellW * 0.18}
          y={top + padY + r * cellH + cellH * 0.15}
          width={cellW * 0.64}
          height={cellH * 0.6}
          rx={1}
          fill="#e9dcc0"
          opacity={0.55}
        />,
      );
    }
  }

  return (
    <g>
      <rect x={b.x} y={top} width={b.w} height={b.h} fill={b.brick} />
      {b.roof === "peak" && (
        <polygon
          points={`${b.x - 4},${top} ${b.x + b.w / 2},${top - 26} ${b.x + b.w + 4},${top}`}
          fill="#6e3a24"
        />
      )}
      {windows}
    </g>
  );
}

function DomeTower({ cx, baseY }: { cx: number; baseY: number }) {
  const bodyW = 90;
  const bodyH = 150;
  const top = baseY - bodyH;
  return (
    <g>
      <rect x={cx - bodyW / 2} y={top} width={bodyW} height={bodyH} fill="#c9ac7f" />
      <rect x={cx - bodyW / 2 - 10} y={top + 20} width={10} height={bodyH - 20} fill="#a6603c" />
      <rect x={cx + bodyW / 2} y={top + 20} width={10} height={bodyH - 20} fill="#a6603c" />
      <rect x={cx - 30} y={top - 34} width={60} height={40} fill="#c9ac7f" />
      <path d={`M ${cx - 34} ${top - 34} Q ${cx} ${top - 92} ${cx + 34} ${top - 34} Z`} fill="#8a3f2e" />
      <rect x={cx - 3} y={top - 108} width={6} height={20} fill="#8a3f2e" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={cx - 12} y={top + 10 + i * 42} width={24} height={26} fill="#4a3420" opacity={0.5} />
      ))}
    </g>
  );
}

function TreeCluster({ cx, baseY }: { cx: number; baseY: number }) {
  return (
    <g opacity={0.9}>
      <ellipse cx={cx - 18} cy={baseY - 34} rx={26} ry={30} fill="#2e4a2e" />
      <ellipse cx={cx + 16} cy={baseY - 44} rx={30} ry={36} fill="#3c5c34" />
      <ellipse cx={cx} cy={baseY - 22} rx={22} ry={24} fill="#4a6b3f" />
    </g>
  );
}

function SkylineBackdrop() {
  const baseY = 460;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d1626 0%, #16233d 22%, #2c4d72 46%, #5b83a8 66%, #cdb98f 86%, #0a0e14 100%)",
        }}
      />
      {/* stars */}
      <svg className="absolute inset-x-0 top-0 h-1/2 w-full opacity-70" viewBox="0 0 1536 230">
        {[...Array(40)].map((_, i) => {
          const x = (i * 197) % 1536;
          const y = (i * 53) % 200;
          const r = (i % 3) * 0.4 + 0.5;
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.4 + (i % 5) * 0.1} />;
        })}
      </svg>
      <svg
        viewBox="0 0 1536 460"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        {SKYLINE_BUILDINGS.map((b, i) => (
          <BuildingShape key={i} b={b} baseY={baseY} />
        ))}
        <DomeTower cx={640} baseY={baseY} />
        {[95, 245, 560, 725, 990, 1160, 1420].map((x, i) => (
          <TreeCluster key={i} cx={x} baseY={baseY} />
        ))}
        <rect x={0} y={baseY - 2} width={1536} height={4} fill="#0a0e14" opacity={0.6} />
      </svg>
      {/* fade to the page's base colour at the very bottom so it blends seamlessly */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(180deg, rgba(10,14,20,0) 0%, #0a0e14 100%)" }}
      />
    </div>
  );
}

function WarmGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      style={{
        background: "radial-gradient(closest-side, rgba(255,190,110,0.16), rgba(255,190,110,0) 70%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative side panels (desktop only)                             */
/* ------------------------------------------------------------------ */

function SidePanelLeft({ posts, onViewIndex }: { posts: BlogPost[]; onViewIndex: () => void }) {
  const categories = useMemo(() => tagCounts(posts), [posts]);

  return (
    <div className="hidden w-52 flex-col items-center gap-3 xl:flex">
      <div className="relative w-full" style={{ width: 176 }}>
        <Image
          src="/blogs/decor/frame-sign.png"
          alt="Blog index sign"
          width={176}
          height={280}
          className="drop-shadow-2xl"
        />
        <div className="absolute inset-x-0 top-[5%] flex items-center justify-center gap-1.5 text-center">
          <VintageIcon name="book" className="h-3 w-3 text-[#f3e6c9]" />
          <span className="font-canela text-[11px] font-bold tracking-wide text-[#f3e6c9]">
            BLOG INDEX
          </span>
        </div>
        <div className="absolute inset-x-[15%] top-[19%] bottom-[9%] flex items-center justify-center">
          <p className="text-center font-geometric text-[9.5px] leading-snug text-[#4a3420]">
            Explore stories, tutorials, experiences and insights from our community.
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-amber-900/40 bg-[#12161f]">
        <button
          type="button"
          onClick={onViewIndex}
          className="flex w-full items-center justify-between px-3 py-2 font-geometric text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#d9722f,#b5521c)" }}
        >
          <span className="flex items-center gap-2">
            <VintageIcon name="document" className="h-3.5 w-3.5" /> All Posts
          </span>
          <span>{posts.length}</span>
        </button>
        <ul className="divide-y divide-amber-900/20">
          {categories.map(([tag, count]) => (
            <li
              key={tag}
              className="flex items-center justify-between px-3 py-2 font-geometric text-[11px] text-gray-300"
            >
              <span className="flex items-center gap-2">
                <VintageIcon name={iconForTag(tag)} className="h-3.5 w-3.5 text-gray-400" />
                {tag}
              </span>
              <span className="text-gray-500">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-end justify-center gap-2 pt-1">
        <Image src="/blogs/decor/mug.png" alt="" width={62} height={56} />
        <Image src="/blogs/decor/plant-small.png" alt="" width={54} height={55} />
      </div>
    </div>
  );
}

function SidePanelRight({ posts }: { posts: BlogPost[] }) {
  const tags = useMemo(() => tagCounts(posts).map(([t]) => t), [posts]);

  return (
    <div className="hidden w-52 flex-col gap-3 xl:flex">
      <div className="overflow-hidden rounded-lg border border-amber-900/50 shadow-lg">
        <div className="px-3 py-2 font-canela text-sm font-semibold text-[#f3e6c9]" style={woodPlank}>
          Top Categories
        </div>
        <div className="flex flex-col gap-2 bg-[#f3e6c9] p-3">
          {tags.map((tag) => {
            const c = tagColor(tag);
            return (
              <span
                key={tag}
                className="flex items-center gap-2 rounded-md px-2.5 py-1.5 font-geometric text-[11px] font-semibold"
                style={{ backgroundColor: c.bg, color: c.text }}
              >
                <VintageIcon name={iconForTag(tag)} className="h-3.5 w-3.5" /> {tag}
              </span>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-amber-900/50 shadow-lg">
        <div className="px-3 py-2 font-canela text-sm font-semibold text-[#f3e6c9]" style={woodPlank}>
          Popular Tags
        </div>
        <div className="flex flex-wrap gap-1.5 bg-[#2b2013] p-3">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#f3e6c9] px-2 py-0.5 font-geometric text-[10px] font-semibold text-[#4a3420]"
            >
              #{t.toLowerCase().replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-center gap-2 pt-1">
        <Image src="/blogs/decor/plant-large.png" alt="" width={64} height={90} />
        <Image src="/blogs/decor/books-stack.png" alt="" width={112} height={79} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function Blogs() {
  const { spreads, jumpMap } = useMemo(() => {
    const flat = buildPages(blogs);

    let counter = 1;
    flat.forEach((p) => {
      if (p.kind !== "index") p.pageNum = counter++;
    });

    const jm = new Map<string, JumpTarget>();
    flat.forEach((p, idx) => {
      if (p.kind === "postHead" && p.post) {
        jm.set(p.post.slug, { spreadIndex: Math.floor(idx / 2), pageNum: p.pageNum! });
      }
    });

    const sp: Page[][] = [];
    for (let i = 0; i < flat.length; i += 2) {
      sp.push([flat[i], flat[i + 1] ?? { kind: "blank" }]);
    }

    return { spreads: sp, jumpMap: jm };
    // blogs is a static module-level import — this only needs to run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [displaySpread, setDisplaySpread] = useState(0);
  const [animating, setAnimating] = useState<{ dir: "next" | "prev"; from: number; to: number } | null>(
    null,
  );
  const [phase, setPhase] = useState<"idle" | "flip">("idle");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!animating) return;
    setPhase("idle");
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("flip"));
    });
    return () => cancelAnimationFrame(raf1);
  }, [animating]);

  function goTo(target: number, dir?: "next" | "prev") {
    if (animating || target === displaySpread || target < 0 || target >= spreads.length) return;
    const direction = dir ?? (target > displaySpread ? "next" : "prev");

    if (reducedMotion) {
      setDisplaySpread(target);
      return;
    }
    setAnimating({ dir: direction, from: displaySpread, to: target });
  }

  function handleFlipEnd(e: TransitionEvent<HTMLDivElement>) {
    if (e.propertyName !== "transform" || !animating) return;
    setDisplaySpread(animating.to);
    setAnimating(null);
    setPhase("idle");
  }

  function handleJump(slug: string) {
    const target = jumpMap.get(slug);
    if (!target) return;
    goTo(target.spreadIndex);
  }

  let baseLeft: Page;
  let baseRight: Page;
  if (animating?.dir === "next") {
    baseLeft = spreads[animating.from][0];
    baseRight = spreads[animating.to][1];
  } else if (animating?.dir === "prev") {
    baseLeft = spreads[animating.to][0];
    baseRight = spreads[animating.from][1];
  } else {
    baseLeft = spreads[displaySpread][0];
    baseRight = spreads[displaySpread][1];
  }

  const activeSlug = useMemo(() => {
    const [left, right] = spreads[displaySpread];
    const candidate = [right, left].find((p) => p.kind === "postHead" || p.kind === "postCont");
    return candidate?.post?.slug;
  }, [displaySpread, spreads]);

  const lastSpread = spreads[spreads.length - 1];
  const totalPages = lastSpread[1]?.pageNum ?? lastSpread[0]?.pageNum ?? 0;
  const primaryPageNum = baseRight.pageNum ?? baseLeft.pageNum ?? 0;

  const canPrev = displaySpread > 0 && !animating;
  const canNext = displaySpread < spreads.length - 1 && !animating;

  const ctx: Ctx = {
    posts: blogs,
    jumpMap,
    activeSlug,
    onJump: handleJump,
    onPrev: () => goTo(displaySpread - 1, "prev"),
    onNext: () => goTo(displaySpread + 1, "next"),
    canPrev,
    canNext,
    pageLabel: `${primaryPageNum} / ${totalPages}`,
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0e14] px-4 py-12 text-white sm:px-6 sm:py-16 md:py-20">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <SkylineBackdrop />
      <WarmGlow />
      <AmbientParticles />

      <div
        className="pointer-events-none absolute right-4 top-6 hidden -rotate-3 lg:block"
        style={{ width: 148 }}
      >
        <Image
          src="/blogs/decor/scrap-note.png"
          alt=""
          width={148}
          height={96}
          className="drop-shadow-xl"
        />
        <div className="absolute inset-x-[10%] top-[16%] text-center font-geometric text-[9px] leading-snug text-[#4a3420]">
          Ideas worth sharing.
          <br />
          Stories worth remembering. ♥
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-8 max-w-4xl text-center sm:mb-10 md:mb-12">
        <h1 className="mb-2 font-canela text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          BLOGS
        </h1>
        <p className="mx-auto max-w-2xl px-4 font-geometric text-xs text-gray-400 sm:text-sm">
          Stories, guides, and updates from the Canara Open Source Community — turn the page.
        </p>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl items-start justify-center gap-6">
        <SidePanelLeft posts={blogs} onViewIndex={() => goTo(0, "prev")} />

        <div className="relative w-full max-w-3xl">
          {/* outer prev/next arrows */}
          <button
            type="button"
            onClick={ctx.onPrev}
            disabled={!ctx.canPrev}
            aria-label="Previous page"
            className="absolute left-0 top-1/2 z-30 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-800/50 bg-[#12161f] text-lg text-white shadow-lg transition hover:border-orange-400/70 hover:text-orange-300 active:scale-90 active:shadow-inner disabled:opacity-20 disabled:active:scale-100 sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={ctx.onNext}
            disabled={!ctx.canNext}
            aria-label="Next page"
            className="absolute right-0 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-amber-800/50 bg-[#12161f] text-lg text-white shadow-lg transition hover:border-orange-400/70 hover:text-orange-300 active:scale-90 active:shadow-inner disabled:opacity-20 disabled:active:scale-100 sm:flex"
          >
            ›
          </button>

          <div
            className="rounded-2xl p-3 sm:p-4"
            style={{
              background: "linear-gradient(160deg, #6b4226 0%, #4a2f1f 55%, #3a2416 100%)",
              boxShadow: "0 30px 70px -25px rgba(0,0,0,0.75), inset 0 0 0 2px rgba(255,255,255,0.06)",
            }}
          >
            <div className="relative" style={{ perspective: 2400 }}>
              {/* spine clasp */}
              <div
                className="absolute -top-1.5 left-1/2 z-30 h-3 w-7 -translate-x-1/2 rounded-b-full"
                style={{
                  background: "linear-gradient(180deg, #d8b96a, #9a7a34)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
                }}
              />

              <div
                className="relative flex flex-col overflow-hidden rounded-md sm:flex-row"
                style={{
                  background: "#3a2416",
                  boxShadow: "0 0 0 3px #efe0b3, 0 0 0 6px #e3cf95, 0 0 0 9px #d3ba7a",
                }}
              >
                {/* left page */}
                <div className="relative h-[460px] flex-1 sm:h-[600px]" style={pagePaper}>
                  <PaperGrain />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-6 sm:block"
                    style={{ background: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.18))" }}
                  />
                  <PageView page={baseLeft} ctx={ctx} />
                  {/* folded corner — outer edge, physical page detail */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 z-[6] h-5 w-5 sm:h-7 sm:w-7"
                    style={{
                      background: "linear-gradient(135deg, #e9dcb8 45%, #c7ac78 100%)",
                      clipPath: "polygon(0 100%, 100% 100%, 0 0)",
                      boxShadow: "1px -1px 3px rgba(0,0,0,0.25)",
                    }}
                  />
                  {animating?.dir === "prev" && (
                    <FlipSheet
                      dir="prev"
                      front={spreads[animating.from][0]}
                      back={spreads[animating.to][1]}
                      ctx={ctx}
                      phase={phase}
                      onEnd={handleFlipEnd}
                      reducedMotion={reducedMotion}
                    />
                  )}
                </div>

                <div
                  className="hidden w-2 shrink-0 sm:block"
                  style={{ background: "linear-gradient(90deg, rgba(0,0,0,.45), rgba(0,0,0,.1), rgba(0,0,0,.45))" }}
                />

                {/* right page */}
                <div className="relative h-[460px] flex-1 sm:h-[600px]" style={pagePaper}>
                  <PaperGrain />
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-6 sm:block"
                    style={{ background: "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,.18))" }}
                  />
                  {/* bookmark ribbon */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-0 z-10 h-10 w-5"
                    style={{
                      background: "#7a2e2e",
                      clipPath: "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)",
                      boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
                    }}
                  />
                  <PageView page={baseRight} ctx={ctx} />
                  {/* folded corner — outer edge, physical page detail */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 right-0 z-[6] h-5 w-5 sm:h-7 sm:w-7"
                    style={{
                      background: "linear-gradient(225deg, #e9dcb8 45%, #c7ac78 100%)",
                      clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
                      boxShadow: "-1px -1px 3px rgba(0,0,0,0.25)",
                    }}
                  />
                  {animating?.dir === "next" && (
                    <FlipSheet
                      dir="next"
                      front={spreads[animating.from][1]}
                      back={spreads[animating.to][0]}
                      ctx={ctx}
                      phase={phase}
                      onEnd={handleFlipEnd}
                      reducedMotion={reducedMotion}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          
        </div>

        <SidePanelRight posts={blogs} />
      </div>
    </section>
  );
}