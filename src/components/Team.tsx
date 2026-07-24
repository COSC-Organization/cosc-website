import Image from "next/image";
import { team } from "@/data/team";
import { Github, Linkedin, Twitter } from "lucide-react";

const frameConfig = [
  // scale compensates for frame1.webp having more baked-in transparent padding than the others
  { src: "/team/frame1.webp", scale: 1.10, photo: { top: "41.2%", left: "25.6%", width: "46.3%", height: "42.3%" } },
  { src: "/team/frame2.webp", scale: 1.0, photo: { top: "40.6%", left: "24.9%", width: "51.8%", height: "43.3%" } },
  { src: "/team/frame3.webp", scale: 1.0, photo: { top: "25.0%", left: "31.7%", width: "37.8%", height: "56.3%" } },
];

// Deterministic shuffle pattern so it looks random but stays consistent on every load
function getFrameConfig(index: number) {
  const pattern = [0, 2, 1, 2, 0, 1, 2, 1, 0, 2, 1, 2, 1];
  return frameConfig[pattern[index % pattern.length]];
}

export default function Team() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-3">MEET THE TEAM</h1>
        <p className="text-gray-400 text-sm">
          The student leaders and contributors fueling open source collaboration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8">
        {team.map((member, index) => {
          const frame = getFrameConfig(index);
          return (
            <div key={member.name} className="flex flex-col items-center w-full mx-auto">
              {/* Outer box: identical square for every card, clips the scaled-up inner content */}
              <div className="relative w-full max-w-[700px] aspect-square mx-auto overflow-hidden">
                {/* Inner wrapper: scaled to visually normalize frames with extra baked-in padding */}
                <div
                  className="absolute inset-0"
                  style={{ transform: `scale(${frame.scale})`, transformOrigin: "center center" }}
                >
                  {/* Photo - positioned per-frame to match this frame's actual window opening */}
                  <div className="absolute overflow-hidden" style={{ ...frame.photo }}>
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  {/* Frame overlay on top */}
                  <Image
                    src={frame.src}
                    alt=""
                    fill
                    className="object-contain pointer-events-none select-none z-10 brightness-110 drop-shadow-[0_0_25px_rgba(255,176,102,0.6)]"
                  />
                </div>
              </div>

              <h3 className="mt-0 text-base font-semibold text-white text-center -translate-y-6">
                {member.name}
              </h3>
              <p className="text-gray-400 text-sm text-center -translate-y-6">
                {member.role}
              </p>

              <div className="flex gap-4 mt-1 text-gray-300 -translate-y-6">
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <Github size={18} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={18} />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter size={18} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}