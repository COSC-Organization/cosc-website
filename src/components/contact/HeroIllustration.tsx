export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg
        viewBox="0 0 700 700"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground */}
        <line
          x1="60"
          y1="600"
          x2="640"
          y2="600"
          stroke="#2d2d2d"
        />

        {/* Main building */}
        <rect
          x="220"
          y="170"
          width="260"
          height="340"
          stroke="#f5f5f5"
          strokeWidth="2"
        />

        {/* Roof */}
        <polygon
          points="190,170 350,90 510,170"
          stroke="#f5f5f5"
          strokeWidth="2"
        />

        {/* Steps */}
        <line x1="250" y1="510" x2="450" y2="510" stroke="#555" />
        <line x1="240" y1="525" x2="460" y2="525" stroke="#555" />
        <line x1="230" y1="540" x2="470" y2="540" stroke="#555" />

        {/* Door */}
        <rect
          x="315"
          y="390"
          width="70"
          height="120"
          stroke="#D89A3D"
          strokeWidth="2"
        />

        {/* Windows */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={250 + col * 50}
              y={205 + row * 45}
              width="22"
              height="22"
              stroke="#8a8a8a"
            />
          ))
        )}

        {/* Left tree */}
        <circle
          cx="120"
          cy="410"
          r="34"
          stroke="#D89A3D"
          strokeWidth="2"
        />
        <line
          x1="120"
          y1="444"
          x2="120"
          y2="520"
          stroke="#888"
        />

        {/* Right tree */}
        <circle
          cx="580"
          cy="410"
          r="34"
          stroke="#D89A3D"
          strokeWidth="2"
        />
        <line
          x1="580"
          y1="444"
          x2="580"
          y2="520"
          stroke="#888"
        />

        {/* Birds */}
        <path
          d="M170 110 Q180 100 190 110"
          stroke="#777"
        />
        <path
          d="M205 90 Q215 80 225 90"
          stroke="#777"
        />

        {/* Decorative frame */}
        <rect
          x="40"
          y="40"
          width="620"
          height="620"
          stroke="#222"
        />
      </svg>
    </div>
  );
}