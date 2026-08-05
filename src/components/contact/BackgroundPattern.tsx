export default function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#fff 1px,transparent 1px),
            linear-gradient(to bottom,#fff 1px,transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Vertical */}

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />

      {/* Accent */}

      <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-[#D89A3D]/5 blur-3xl" />

      <div className="absolute left-0 bottom-20 h-72 w-72 rounded-full bg-[#D89A3D]/5 blur-3xl" />
    </div>
  );
}