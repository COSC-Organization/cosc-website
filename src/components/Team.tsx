"use client";

import Image from "next/image";
import { team } from "@/data/team";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";

const frames = ["/team/frame1.webp", "/team/frame2.webp", "/team/frame3.webp"];
const defaultFramePhotoBox = [
  { top: "30%", left: "18%", width: "64%", height: "70%" },
  { top: "19%", left: "17%", width: "66%", height: "72%" },
  { top: "32%", left: "24%", width: "54%", height: "60%" },
];
const pattern = [0, 2, 1, 1, 0, 2, 0, 1, 0, 2, 0, 1, 2];

function getFrameIndex(index: number) {
  return pattern[index % pattern.length];
}

// ✅ Snow particle component
function SnowParticles() {
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
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.2;

        if (p.y > canvas.height) {
          p.y = -5;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
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

function renderMember(member: any, index: number, isLCP: boolean = false) {
  let frameIdx = pattern[index % pattern.length];
  
  let box;
  if (member.customPhotoBox) {
    box = member.customPhotoBox;
  } else {
    box = defaultFramePhotoBox[frameIdx];
  }
  
  return (
    <div key={member.image} className="flex flex-col items-center w-full mx-auto relative z-10">
      <div className="relative w-full aspect-[280/348] max-w-[260px] mx-auto">
        <div className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full opacity-70 pointer-events-none" />
        
        {/* Photo layer */}
        <div
          className={`absolute overflow-visible ${member.photoInFront ? "z-30" : "z-10"}`}
          style={{ 
            top: `calc(${box.top} - 8%)`, 
            left: `calc(${box.left} - 8%)`, 
            width: `calc(${box.width} + 16%)`, 
            height: `calc(${box.height} + 16%)` 
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          </div>
        </div>

        {/* Frame layer */}
        <Image
          src={frames[frameIdx]}
          alt=""
          fill
          className={`object-contain object-bottom pointer-events-none select-none relative ${member.photoInFront ? "z-10" : "z-30"}`}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          loading={isLCP ? "eager" : undefined}
        />
      </div>
      
      <h3 className="mt-3 text-base sm:text-lg md:text-xl font-semibold text-white text-center font-geometric transition-all duration-300 cursor-default">
        {member.name}
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm text-center font-geometric">
        {member.role}
      </p>
      <div className="flex gap-3 mt-2 text-gray-300">
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden min-h-screen">
      {/* ✅ Snow particles in background */}
      <SnowParticles />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-canela">
          MEET OUR TEAM
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-geometric max-w-2xl mx-auto px-4">
          The student leaders and contributors fueling open source collaboration.
        </p>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-x-8 lg:gap-y-12">
        {team.map((member, index) => renderMember(member, index, index === 0))}
      </div>
    </section>
  );
}