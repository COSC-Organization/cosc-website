"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cabin_Sketch } from "next/font/google";
import {
  Code2,
  Smartphone,
  Bot,
  Terminal,
  MessagesSquare,
  Palette,
  ArrowUpRight,
  Users,
  Star,
} from "lucide-react";

// --- Core Components & Hooks ---
import { useAssetPreloader } from '@/hooks/useAssetPreloader';

// --- Font Setup ---
const cabinSketch = Cabin_Sketch({ subsets: ["latin"], weight: ["400", "700"] });

// --- TypeScript Interfaces ---
interface Project {
  id: string;
  title: string;
  category: "Web Development" | "Mobile Apps" | "Developer Tools" | "AI / ML" | "Community Tools" | "Design";
  description: string;
  contributors: number;
  stars: number;
  githubUrl: string;
  liveUrl: string;
}

interface GitHubRepo {
  id: number | string;
  name: string;
  description?: string;
  topics?: string[];
  forks_count: number;
  stargazers_count: number;
  html_url: string;
  homepage?: string;
}

// --- Theme Constants ---
const INK = "#2B2620";
const INK_SOFT = "#4A4038";
const PAGE_BG = "#14110D";
const PAPER_BG = "#D9CBB3";
const CARD_BG = "#D9CBB3";
const SHADOW = "#2b2218";

// --- Category Styling Map ---
const categoryStyles: Record<Project["category"], { icon: React.ElementType; accent: string }> = {
  "Web Development": { icon: Code2, accent: "#38704D" },
  "Mobile Apps": { icon: Smartphone, accent: "#A26B29" },
  "AI / ML": { icon: Bot, accent: "#3B719B" },
  "Developer Tools": { icon: Terminal, accent: "#524A42" },
  "Community Tools": { icon: MessagesSquare, accent: "#784DB5" },
  Design: { icon: Palette, accent: "#A34867" },
};

// Filter categories list
const categories = [
  "All Projects",
  "Web Development",
  "Mobile Apps",
  "Developer Tools",
  "AI / ML",
  "Community Tools",
  "Design",
] as const;

// --- Helper Components ---
function Clothespin() {
  return (
    <div className="absolute -top-4 sm:-top-5 z-30 flex flex-col items-center pointer-events-none scale-75 sm:scale-100 origin-bottom">
      <div 
        className="w-6 h-10 rounded-[2px] border border-[#2b1f15] relative shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: "#b88a56",
          backgroundImage: "radial-gradient(circle, #c79a66 20%, transparent 20%)",
          backgroundSize: "4px 4px"
        }}
      >
        <div className="w-full h-[2px] bg-[#422e1a] absolute top-1/2 -translate-y-1/2" />
        <div className="w-[2px] h-full bg-[#422e1a] absolute left-1/2 -translate-x-1/2 opacity-50" />
      </div>
      <div className="w-2 h-2 bg-[#1f150e] rounded-full -mt-0.5 shadow-md" />
    </div>
  );
}

function DriftingCloud({ className, duration = "75s", delay = "0s" }: { className?: string; style?: React.CSSProperties; duration?: string; delay?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        animationName: "cloudDrift",
        animationDuration: duration,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDelay: delay,
      }}
    >
      <svg viewBox="0 0 180 100" className="w-full h-full" fill="none">
        <g stroke="#2b2620" strokeWidth="2.2" strokeLinejoin="round" fill="#fffdf7">
          <path d="M35 70c-16 0-24-12-19-24 4-10 16-14 24-9 3-13 20-20 32-13 9 5 12 15 9 22 12-3 24 4 25 15 1 10-9 18-20 18H40c-9 0-14-4-14-9Z" />
        </g>
      </svg>
    </div>
  );
}

function SceneryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <img
        src="/background.png"
        alt="Balcony Cityscape Background"
        className="w-full h-full object-cover object-bottom"
      />
    </div>
  );
}

function Github({ size, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

// --- Main Engine Components ---
function WireMarquee({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [winWidth, setWinWidth] = useState(1600);
  const [isMobile, setIsMobile] = useState(false);
  
  const offsetTarget = useRef(0);
  const offsetCurrent = useRef(0);

  const CARD_W = isMobile ? 230 : 310; 
  const SPACING = CARD_W + (isMobile ? 80 : 140); 
  
  const renderList = projects.length > 0 ? [...projects, ...projects, ...projects, ...projects, ...projects] : [];
  const LOOP_W = renderList.length * SPACING;

  const logicalW = Math.max(winWidth * 2.2, 2000);
  const offsetX = (logicalW - winWidth) / 2; 
  
  const ROPE_BASE_Y = isMobile ? 35 : 15; 
  const DIP_AMOUNT = isMobile ? 15 : 65; 
  const CONTROL_Y = ROPE_BASE_Y + DIP_AMOUNT * 2; 
  
  const pathD = `M0,${ROPE_BASE_Y} Q${logicalW / 2},${CONTROL_Y} ${logicalW},${ROPE_BASE_Y}`;

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      offsetTarget.current += e.deltaY * 1.2;
    };

    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const delta = (touchStartX - x) + (touchStartY - y);
      offsetTarget.current += delta * 2.0;
      touchStartX = x;
      touchStartY = y;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (renderList.length === 0) return;
    let animationId: number;

    const render = () => {
      offsetCurrent.current += (offsetTarget.current - offsetCurrent.current) * 0.08;

      for (let i = 0; i < renderList.length; i++) {
        const cardNode = document.getElementById(`hanging-card-${i}`);
        if (cardNode) {
          let x = ((offsetCurrent.current + i * SPACING) % LOOP_W + LOOP_W) % LOOP_W;
          x -= SPACING * 1.5; 

          const normX = (x + CARD_W / 2 - winWidth / 2) / (logicalW / 2); 
          const y = ROPE_BASE_Y + DIP_AMOUNT * (1 - normX * normX);
          
          const dy_dx = (-2 * DIP_AMOUNT * normX) / (logicalW / 2);
          const angle = Math.atan(dy_dx) * (180 / Math.PI);

          const centerScreen = winWidth / 2;
          const cardCenter = x + CARD_W / 2;
          const distFromCenter = Math.abs(cardCenter - centerScreen);
          
          const maxVisibleDist = winWidth / 2 + CARD_W;
          const normalizedDist = Math.min(distFromCenter / maxVisibleDist, 1);
          
          const scale = 1 - (Math.pow(normalizedDist, 1.5) * 0.45);
          const opacity = 1 - (Math.pow(normalizedDist, 3) * 0.4);

          cardNode.style.transform = `translate(${x}px, ${y - 4}px) rotate(${angle * 0.9}deg) scale(${scale})`;
          cardNode.style.opacity = opacity.toString();
        }
      }
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [renderList.length, SPACING, CARD_W, LOOP_W, DIP_AMOUNT, ROPE_BASE_Y, logicalW, winWidth]);

  return (
    <div ref={containerRef} className="relative w-full select-none mt-4 sm:mt-4 mb-0 h-[360px] sm:h-[420px] z-20">
      <svg 
        className="absolute top-0 pointer-events-none overflow-visible drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]" 
        style={{ width: `${logicalW}px`, height: "180px", left: `-${offsetX}px` }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="juteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#593b20" />
            <stop offset="35%" stopColor="#b58d56" />
            <stop offset="50%" stopColor="#d6b17a" />
            <stop offset="65%" stopColor="#a37842" />
            <stop offset="100%" stopColor="#3b2412" />
          </linearGradient>
          <pattern id="juteTexture" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#422915" strokeWidth="1.5" opacity="0.6" />
            <line x1="3" y1="0" x2="3" y2="6" stroke="#d6b17a" strokeWidth="1" opacity="0.4" />
          </pattern>
        </defs>

        <path d={pathD} fill="none" stroke="#120b06" strokeWidth="6" strokeOpacity="0.7" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="url(#juteGradient)" strokeWidth="4.5" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="url(#juteTexture)" strokeWidth="4.5" strokeLinecap="round" />
      </svg>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {renderList.map((project, i) => {
          const style = categoryStyles[project.category] || categoryStyles["Web Development"];
          const Icon = style.icon;

          return (
            <div
              key={`${project.id}-${i}`}
              id={`hanging-card-${i}`}
              className="absolute top-0 left-0 flex flex-col items-center group pointer-events-auto origin-top"
              style={{ width: `${CARD_W}px`, willChange: "transform, opacity" }}
            >
              <Clothespin />

              <div
                className="w-full p-3.5 sm:p-6 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02] relative"
                style={{
                  backgroundColor: PAPER_BG,
                  color: INK,
                  boxShadow: `4px 6px 16px rgba(0,0,0,0.6), inset 0 0 35px rgba(140, 115, 80, 0.3)`,
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
                  clipPath: "polygon(0% 1%, 1.5% 0.5%, 4% 1.5%, 8% 0.5%, 15% 1%, 23% 0%, 32% 1.2%, 40% 0.5%, 48% 1%, 57% 0.2%, 65% 1.2%, 74% 0.5%, 82% 1%, 90% 0.2%, 96% 1%, 99% 0.5%, 100% 2%, 99.2% 7%, 100% 14%, 99% 22%, 99.8% 30%, 99% 38%, 100% 46%, 99.5% 55%, 100% 63%, 99% 72%, 99.8% 80%, 99% 88%, 100% 95%, 99.2% 99%, 96% 99.5%, 90% 99%, 82% 99.8%, 74% 98.8%, 65% 99.5%, 57% 99%, 48% 99.8%, 40% 99%, 32% 99.5%, 23% 98.8%, 15% 99.5%, 8% 98.8%, 4% 99.5%, 1.5% 98.8%, 0% 99%, 0.8% 93%, 0% 86%, 1% 78%, 0.2% 70%, 1% 62%, 0% 54%, 0.5% 45%, 0% 37%, 0.8% 28%, 0% 20%, 0.5% 11%, 0% 4%)"
                }}
              >
                <div>
                  <div className="flex justify-between items-center mb-2 sm:mb-4">
                    <span
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] tracking-wide border rounded-sm font-mono"
                      style={{ 
                        borderColor: INK, 
                        color: INK,
                        backgroundColor: "rgba(255,255,255,0.2)" 
                      }}
                    >
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono font-bold" style={{ color: INK_SOFT }}>
                      <span className="flex items-center gap-1">
                        <Users size={11} /> {project.contributors}
                      </span>
                      <span className="flex items-center gap-1" style={{ color: "#b57322" }}>
                        <Star size={11} fill="#b57322" /> {project.stars}
                      </span>
                    </div>
                  </div>

                  <div
                    className="w-full h-16 sm:h-28 rounded-md mb-2 sm:mb-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-[#383127]"
                    style={{ 
                      backgroundColor: "#2A2520",
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")"
                    }}
                  >
                    <div className="absolute inset-1 border border-dashed border-[#54483a] rounded pointer-events-none opacity-60" />
                    <Icon size={28} className="sm:w-[42px] sm:h-[42px]" style={{ color: "#E8DEC8" }} />
                  </div>

                  <h3 className={`${cabinSketch.className} text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1 tracking-wide`} style={{ color: INK }}>
                    {project.title}
                  </h3>
                  
                  <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-[#c2823a] opacity-70 mb-1.5 sm:mb-2.5 rounded-full" />

                  <p className={`${cabinSketch.className} text-xs sm:text-sm line-clamp-2 leading-snug mb-2 sm:mb-4 font-medium`} style={{ color: INK_SOFT }}>
                    {project.description}
                  </p>
                </div>

                <div className="w-full border-t border-dashed border-[#a39379] my-1 sm:my-2 opacity-70" />

                <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs font-mono font-bold hover:text-[#b57322] transition-colors flex items-center gap-1 cursor-pointer" 
                    style={{ color: INK }}
                  >
                    <Github size={12} /> GitHub Repo
                  </a>
                  
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono font-bold rounded flex items-center gap-1 shadow-sm transition-transform group-hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: "#c2823a",
                      color: "#FAF6ED",
                    }}
                  >
                    Live Demo <ArrowUpRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("All Projects");

  // Clean public fetch for GitHub Organization & User repositories with full TypeScript compliance
  useEffect(() => {
    async function fetchGitHubReposAutomatically() {
      try {
        const endpoints = [
          "https://api.github.com/orgs/COSC-Organization/repos?per_page=100",
          "https://api.github.com/users/COSC-Organization/repos?per_page=100"
        ];

        let data: GitHubRepo[] = [];

        for (const url of endpoints) {
          try {
            const response = await fetch(url, {
              headers: {
                "Accept": "application/vnd.github+json"
              }
            });
            if (response.ok) {
              const result = (await response.json()) as GitHubRepo[];
              if (Array.isArray(result) && result.length > 0) {
                data = result;
                break;
              }
            }
          } catch {
            // Move to next endpoint silently
          }
        }

        if (data.length === 0) return;

        const formattedProjects: Project[] = data
          .filter((repo: GitHubRepo) => repo.name.toLowerCase() !== ".github")
          .map((repo: GitHubRepo) => {
          let cat: Project["category"] = "Web Development";
          const topics: string[] = repo.topics || [];
          if (topics.includes("mobile") || topics.includes("flutter") || topics.includes("react-native")) cat = "Mobile Apps";
          else if (topics.includes("ai") || topics.includes("ml") || topics.includes("bot")) cat = "AI / ML";
          else if (topics.includes("cli") || topics.includes("tool")) cat = "Developer Tools";
          else if (topics.includes("community") || topics.includes("forum")) cat = "Community Tools";
          else if (topics.includes("design") || topics.includes("ui")) cat = "Design";

          let demoUrl = repo.homepage;
          if (!demoUrl || demoUrl.trim() === "") {
            demoUrl = repo.html_url;
          }

          return {
            id: repo.id.toString(),
            title: repo.name,
            category: cat,
            description: repo.description || "Open source project by Canara Open Source Community.",
            contributors: repo.forks_count,
            stars: repo.stargazers_count,
            githubUrl: repo.html_url,
            liveUrl: demoUrl,
          };
        });

        if (formattedProjects.length > 0) {
          setProjectsData(formattedProjects);
        }
      } catch (error) {
        console.error("Failed to automatically fetch live GitHub repositories", error);
      }
    }

    fetchGitHubReposAutomatically();
  }, []);

  const filteredProjects =
    activeFilter === "All Projects" ? projectsData : projectsData.filter((p) => p.category === activeFilter);

  return (
    <div
      className="h-screen w-full relative overflow-hidden select-none font-sans flex flex-col justify-center"
      style={{ backgroundColor: PAGE_BG, color: INK }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }

        @keyframes cloudDrift {
          0% { transform: translateX(-600px); }
          100% { transform: translateX(calc(100vw + 600px)); }
        }
      `}</style>



      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] mix-blend-screen z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      <SceneryBackground />

      <div className="flex-1 w-full max-w-7xl mx-auto pt-0 pb-0 relative z-10 flex flex-col justify-center items-center">
        
        <DriftingCloud className="top-[-4%] w-10 opacity-10" duration="400s" delay="-0s" />
        <DriftingCloud className="top-[12%] w-12 opacity-[0.08]" duration="400s" delay="-65s" />
        <DriftingCloud className="top-[3%] w-8 opacity-15" duration="400s" delay="-130s" />
        <DriftingCloud className="top-[16%] w-14 opacity-[0.12]" duration="400s" delay="-195s" />
        <DriftingCloud className="top-[-2%] w-10 opacity-20" duration="400s" delay="-260s" />
        <DriftingCloud className="top-[8%] w-12 opacity-10" duration="400s" delay="-325s" />

        <DriftingCloud className="top-[5%] w-20 opacity-25" duration="200s" delay="-0s" />
        <DriftingCloud className="top-[15%] w-24 opacity-30" duration="200s" delay="-30s" />
        <DriftingCloud className="top-[-1%] w-28 opacity-20" duration="200s" delay="-60s" />
        <DriftingCloud className="top-[10%] w-16 opacity-35" duration="200s" delay="-90s" />
        <DriftingCloud className="top-[22%] w-32 opacity-25" duration="200s" delay="-120s" />
        <DriftingCloud className="top-[2%] w-24 opacity-30" duration="200s" delay="-150s" />
        <DriftingCloud className="top-[18%] w-20 opacity-20" duration="200s" delay="-180s" />
        
        <DriftingCloud className="top-[1%] w-36 opacity-50" duration="100s" delay="-0s" />
        <DriftingCloud className="top-[11%] w-48 opacity-40" duration="100s" delay="-15s" />
        <DriftingCloud className="top-[20%] w-32 opacity-65" duration="100s" delay="-30s" />
        <DriftingCloud className="top-[3%] w-40 opacity-55" duration="100s" delay="-45s" />
        <DriftingCloud className="top-[7%] w-56 opacity-45" duration="100s" delay="-60s" />
        <DriftingCloud className="top-[18%] w-28 opacity-70" duration="100s" delay="-75s" />
        <DriftingCloud className="top-[14%] w-44 opacity-50" duration="100s" delay="-90s" />

        <div className="relative text-center -mt-30 sm:-mt-50 -mb-2 sm:-mb-15 overflow-hidden w-full px-4 z-20">
          <h2 className={`${cabinSketch.className} text-2xl sm:text-[2.6rem] mb-0 tracking-wide`} style={{ color: "#EDE6D6" }}>
            OUR PROJECTS
          </h2>
        </div>

        <WireMarquee projects={filteredProjects} />

        <div className="absolute bottom-16 sm:bottom-16 left-0 w-full px-2 sm:px-4 z-30 flex flex-col items-center">
          
          <div 
            className="px-3 py-1 sm:px-4 sm:py-1.5 mb-1.5 sm:mb-2 rounded-sm border border-[#EDE6D6]/30 text-center max-w-lg"
            style={{
              backgroundColor: "rgba(20, 17, 13, 0.85)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
              boxShadow: `2px 2px 0 ${SHADOW}`
            }}
          >
            <p className="text-[10px] sm:text-xs sm:text-sm font-medium" style={{ color: "#EDE6D6" }}>
              Explore the open source projects built by our community.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto px-2 sm:px-6 py-1 sm:py-2">
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-3 pb-1 sm:pb-2 pt-1 w-full px-2 sm:px-4">
              {categories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`shrink-0 px-3 sm:px-5 py-1 sm:py-2 text-[11px] sm:text-sm tracking-wide font-bold transition-all duration-300 cursor-pointer ${cabinSketch.className} ${
                      isActive 
                        ? "-translate-y-1 -rotate-2 text-[#14110D]" 
                        : "hover:-translate-y-1 hover:rotate-1 hover:text-[#EDE6D6]"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#D48C46" : CARD_BG,
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
                      color: isActive ? PAGE_BG : INK_SOFT,
                      border: isActive ? `2px solid #EDE6D6` : `2px dashed rgba(237, 230, 214, 0.4)`,
                      borderRadius: "4px 12px 4px 12px / 12px 4px 12px 4px",
                      boxShadow: isActive ? `4px 4px 0 ${SHADOW}` : `2px 2px 0 ${SHADOW}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#D48C46";
                        e.currentTarget.style.color = "#EDE6D6";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "rgba(237, 230, 214, 0.4)";
                        e.currentTarget.style.color = INK_SOFT;
                      }
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-50 group scale-75 sm:scale-100 origin-bottom-right">
          <a
            href="https://github.com/COSC-Organization"
            target="_blank"
            rel="noopener noreferrer"
            className={`${cabinSketch.className} w-20 h-20 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-center p-2 border-2 transition-transform duration-300 group-hover:scale-110`}
            style={{
              backgroundColor: PAPER_BG,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
              borderColor: INK,
              color: INK,
              boxShadow: `4px 4px 0 ${SHADOW}`,
            }}
          >
            <span className="text-[9px] sm:text-xs uppercase tracking-wider font-bold" style={{ color: INK }}>Have an idea?</span>
            <span className="text-[8px] sm:text-[10px] text-[#b57322] mt-0.5 flex items-center gap-0.5 font-bold">
              Build <ArrowUpRight size={10} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}