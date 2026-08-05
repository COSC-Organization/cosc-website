import Link from "next/link";

export default function BackHome() {
  return (
    <Link
      href="/"
      className="fixed left-5 top-5 z-50 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-neutral-500 transition-all duration-300 hover:text-[#D89A3D] sm:left-8 sm:top-8"
    >
      <span className="text-lg leading-none">←</span>

      <span>Home</span>
    </Link>
  );
}