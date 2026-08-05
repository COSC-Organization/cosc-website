export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg opacity-90">
      <svg
        viewBox="0 0 500 600"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground */}
        <line
          x1="40"
          y1="520"
          x2="460"
          y2="520"
          stroke="#2A2A2A"
          strokeWidth="1"
        />

        {/* Building */}
        <rect
          x="150"
          y="120"
          width="200"
          height="320"
          stroke="#E8E8E8"
          strokeWidth="2"
        />

        {/* Roof */}
        <polygon
          points="130,120 250,60 370,120"
          stroke="#E8E8E8"
          strokeWidth="2"
        />

        {/* Door */}
        <rect
          x="225"
          y="330"
          width="50"
          height="110"
          stroke="#D89A3D"
          strokeWidth="2"
        />

        {/* Windows */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={180 + col * 45}
              y={160 + row * 45}
              width="22"
              height="22"
              stroke="#999"
              strokeWidth="1"
            />
          ))
        )}

        {/* Trees */}
        <circle
          cx="90"
          cy="390"
          r="28"
          stroke="#D89A3D"
          strokeWidth="2"
        />

        <line
          x1="90"
          y1="418"
          x2="90"
          y2="470"
          stroke="#999"
        />

        <circle
          cx="410"
          cy="390"
          r="28"
          stroke="#D89A3D"
          strokeWidth="2"
        />

        <line
          x1="410"
          y1="418"
          x2="410"
          y2="470"
          stroke="#999"
        />
      </svg>
    </div>
  );
}