"use client";

import { useEffect, useState } from "react";

const links = [
  { title: "Introduction", id: "introduction" },
  { title: "Contact", id: "contact" },
  { title: "Contribute", id: "contribute" },
  { title: "Message", id: "message" },
];

export default function ContactNav() {
  const [active, setActive] = useState("introduction");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((s) => observer.observe(s!));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop */}

      <nav className="fixed right-10 top-12 z-50 hidden lg:block">
        <ul className="space-y-5">
          {links.map((item, i) => (
            <li
              key={item.id}
              className="flex items-center gap-4 text-xs uppercase tracking-[0.3em]"
            >
              <span className="text-neutral-600">
                {(i + 1).toString().padStart(2, "0")}
              </span>

              <button
                onClick={() => scrollTo(item.id)}
                className={`transition-colors duration-300 ${
                  active === item.id
                    ? "text-[#D89A3D]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-800 bg-black/90 backdrop-blur lg:hidden">
        <div className="flex overflow-x-auto px-3 py-3">
          {links.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`whitespace-nowrap px-4 text-[11px] uppercase tracking-[0.25em] transition ${
                active === item.id
                  ? "text-[#D89A3D]"
                  : "text-neutral-500"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}