"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export interface NavItem {
    id: string;
    label: string;
    href: string;
}

export const navItems: NavItem[] = [
    { id: "00", label: "Home", href: "/" },
    { id: "01", label: "About Us", href: "/#about" },
    { id: "02", label: "Blogs", href: "/blogs" },
    { id: "03", label: "Events", href: "/events" },
    { id: "04", label: "Projects", href: "/projects" },
    { id: "05", label: "Workshops", href: "/workshops" },
    { id: "06", label: "Team", href: "/team" },
    { id: "07", label: "Get In Touch", href: "/#contact" },
];

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent background scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    // Hide Header on HeroSection (Home page '/')
    if (pathname === "/" || pathname === "/get-in-touch") {
        return null;
    }

    const handleNavClick = (href: string, label: string) => {
        setIsMobileMenuOpen(false);
        if (label === "Home" || href === "/") {
            router.push("/");
            return;
        }
        if (label === "Projects" || href === "/projects") {
            router.push("/projects");
            return;
        }
        if (label === "Team" || href === "/team") {
            router.push("/team");
            return;
        }
        if (href.startsWith("/#")) {
            const hash = href.replace("/", "");
            if (pathname === "/") {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    return;
                }
            }
        }
        router.push(href);
    };

    return (
        <>
            {/* Header Bar (Transparent, Fixed) */}
            <header className="fixed top-0 left-0 w-full z-40 py-1.5 px-2 sm:py-2 sm:px-4 lg:py-2 lg:px-6 pointer-events-none flex justify-between items-center">
                {/* Top Left Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-0 pointer-events-auto group cursor-pointer"
                    aria-label="Canara Open Source Community Home"
                >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex-shrink-0 -ml-1">
                        <Image
                            src="/cosc logo.png"
                            alt="Canara Open Source Community Logo"
                            fill
                            sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 112px"
                            className="object-contain scale-125 transition-transform duration-300 group-hover:scale-135"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center -ml-2 sm:-ml-3 lg:-ml-4">
                        <h1 className="text-white text-sm sm:text-base lg:text-lg font-bold tracking-tight uppercase font-canela leading-snug group-hover:text-amber-200 transition-colors">
                            Canara Open Source<br />Community
                        </h1>
                    </div>
                </Link>

                {/* Top Right Bento Grid Navigation Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="pointer-events-auto text-white hover:text-amber-400 transition-all duration-300 p-2 cursor-pointer flex items-center justify-center rounded-xl hover:bg-white/5 active:scale-95 group"
                    aria-label="Open Navigation Menu"
                >
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="3" y="3" width="4" height="4" rx="1" />
                        <rect x="10" y="3" width="4" height="4" rx="1" />
                        <rect x="17" y="3" width="4" height="4" rx="1" />
                        <rect x="3" y="10" width="4" height="4" rx="1" />
                        <rect x="10" y="10" width="4" height="4" rx="1" />
                        <rect x="17" y="10" width="4" height="4" rx="1" />
                        <rect x="3" y="17" width="4" height="4" rx="1" />
                        <rect x="10" y="17" width="4" height="4" rx="1" />
                        <rect x="17" y="17" width="4" height="4" rx="1" />
                    </svg>
                </button>
            </header>

            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Right-Side Navigation Panel (Expands from top-right corner) */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-[45%] xl:w-[38%] bg-zinc-950/98 backdrop-blur-2xl border-l border-b border-amber-500/20 shadow-[0_0_90px_rgba(0,0,0,0.95)] z-50 flex flex-col justify-between p-6 sm:p-8 lg:p-10 origin-top-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen
                        ? "scale-100 opacity-100 translate-y-0 translate-x-0 pointer-events-auto"
                        : "scale-90 opacity-0 -translate-y-6 translate-x-6 pointer-events-none"
                    }`}
            >
                {/* Header in Navigation Panel */}
                <div className="flex justify-between items-center w-full pb-4 border-b border-white/10">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 group">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex-shrink-0 -ml-1">
                            <Image
                                src="/cosc logo.png"
                                alt="Canara Open Source Community Logo"
                                fill
                                sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                                className="object-contain scale-135 transition-transform duration-300 group-hover:scale-145"
                            />
                        </div>
                        <div className="flex flex-col -ml-2">
                            <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-tight uppercase font-canela leading-none group-hover:text-amber-200 transition-colors">
                                Canara Open Source
                            </span>
                            <span className="text-amber-500 text-xs sm:text-sm font-semibold tracking-widest uppercase font-geometric mt-1">
                                Community
                            </span>
                        </div>
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-amber-500/50 hover:bg-white/5 active:scale-95 cursor-pointer"
                        aria-label="Close Navigation Menu"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu Navigation Links List */}
                <div className="w-full my-auto py-4">
                    <div className="flex flex-col gap-2.5 sm:gap-3.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <div
                                    key={item.id}
                                    className={`flex items-center justify-between group cursor-pointer border-b border-zinc-900/90 pb-2.5 sm:pb-3 hover:border-amber-500/50 transition-all duration-300 ${
                                        isActive ? "text-amber-400" : ""
                                    }`}
                                    onClick={() => handleNavClick(item.href, item.label)}
                                >
                                    <div className="flex items-baseline gap-3.5 sm:gap-4 transition-transform duration-300 group-hover:translate-x-2">
                                        <span className={`font-mono text-xs sm:text-sm lg:text-base tracking-tighter font-bold transition-colors duration-300 ${
                                            isActive ? "text-amber-400" : "text-zinc-600 group-hover:text-amber-400"
                                        }`}>
                                            {item.id}
                                        </span>
                                        <span className={`text-base sm:text-lg lg:text-xl font-geometric font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
                                            isActive ? "text-amber-300 font-bold" : "text-zinc-200 group-hover:text-white"
                                        }`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-amber-400">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Tagline in Navigation Panel */}
                <div className="w-full text-center border-t border-white/10 pt-4">
                    <p className="text-zinc-500 font-geometric text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
                        Learn &bull; Build &bull; Share &bull; Contribute
                    </p>
                </div>
            </div>
        </>
    );
}
