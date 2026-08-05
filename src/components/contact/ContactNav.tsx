const links = [
  "Introduction",
  "Contact",
  "Contribute",
  "GitHub",
  "Location",
];

export default function ContactNav() {
  return (
    <>
      {/* Desktop */}

      <nav className="fixed right-10 top-12 z-50 hidden lg:block">
        <ul className="space-y-5">
          {links.map((item, i) => (
            <li
              key={item}
              className="flex items-center gap-4 text-xs uppercase tracking-[0.3em]"
            >
              <span className="text-neutral-600">
                {(i + 1).toString().padStart(2, "0")}
              </span>

              <span className="cursor-pointer transition-colors hover:text-[#D89A3D]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-800 bg-black/90 backdrop-blur lg:hidden">
        <div className="flex overflow-x-auto px-4 py-3">
          {links.map((item) => (
            <button
              key={item}
              className="whitespace-nowrap px-4 text-[11px] uppercase tracking-[0.25em] text-neutral-400 transition hover:text-[#D89A3D]"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}