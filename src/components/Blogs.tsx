"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { blogs, type BlogPost } from "@/data/blogs";

// Reuses the same ambient particle effect used on the Team page
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

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="relative flex flex-col w-full bg-[#12161f] border-2 border-amber-800/40 rounded-xl overflow-hidden hover:border-orange-400/60 transition-colors duration-300 group">
      <div className="absolute inset-0 bg-orange-400/10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

      <div className="relative w-full aspect-[16/9] overflow-hidden border-b-2 border-amber-800/40">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs uppercase tracking-wide text-orange-300 font-geometric"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg sm:text-xl font-semibold text-white font-geometric mb-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm font-geometric mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 font-geometric border-t border-amber-800/30 pt-3">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function Blogs() {
  return (
    <section className="relative bg-[#0a0e14] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden min-h-screen">
      <AmbientParticles />

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-canela">
          BLOGS
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-geometric max-w-2xl mx-auto px-4">
          Stories, guides, and updates from the Canara Open Source Community.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}