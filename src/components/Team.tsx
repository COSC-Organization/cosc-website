import Image from "next/image";
import { team } from "@/data/team";
import { Github, Linkedin } from "lucide-react";

const frames = ["/team/frame1.webp", "/team/frame2.webp", "/team/frame3.webp"];
const defaultFramePhotoBox = [
  { top: "30%", left: "18%", width: "64%", height: "70%" },
  { top: "19%", left: "17%", width: "66%", height: "72%" },
  { top: "32%", left: "24%", width: "54%", height: "60%" },
];
const pattern = [0, 2, 1, 1, 0, 2, 2, 1, 0, 2, 1, 2, 1];

function getFrameIndex(index: number) {
  return pattern[index % pattern.length];
}

const firstRowMembers = team.slice(0, 2);
const remainingMembers = team.slice(2);

function renderMember(member: any, index: number, isLCP: boolean = false, forceFrame?: number) {
  let frameIdx;
  if (forceFrame !== undefined) {
    frameIdx = forceFrame;
  } else {
    frameIdx = pattern[index % pattern.length];
    if (frameIdx === 2) {
      frameIdx = Math.random() < 0.5 ? 0 : 1;
    }
  }
  
  let box;
  if (member.customPhotoBox) {
    box = member.customPhotoBox;
  } else {
    box = defaultFramePhotoBox[frameIdx];
  }
  
  return (
    <div key={member.image} className="flex flex-col items-center w-full mx-auto">
      <div className="relative w-full h-[280px] flex items-end justify-center">
        <div className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full opacity-70 pointer-events-none" />
        <div className="relative w-full aspect-[280/348] max-w-[260px]">
          
          {/* Photo layer — behind frame by default, unless member.photoInFront is true */}
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
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Frame layer — in front by default, unless member.photoInFront is true */}
          <Image
            src={frames[frameIdx]}
            alt=""
            fill
            className={`object-contain object-bottom pointer-events-none select-none relative ${member.photoInFront ? "z-10" : "z-30"}`}
            sizes="(max-width: 640px) 50vw, 25vw"
            loading={isLCP ? "eager" : undefined}
          />
          
        </div>
      </div>
      <h3 className="mt-1 text-xl font-semibold text-orange-400 hover:text-orange-300 text-center font-geometric drop-shadow-[0_0_10px_rgba(251,146,60,0.6)] hover:drop-shadow-[0_0_16px_rgba(251,146,60,0.9)] transition-all duration-300 hover:scale-105 cursor-default">
        {member.name}
      </h3>
      <p className="text-gray-400 text-sm text-center font-geometric">
        {member.role}
      </p>
      <div className="flex gap-4 mt-2 text-gray-300">
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
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-6xl font-bold mb-3 font-canela">
          MEET OUR TEAM
        </h1>
        <p className="text-gray-400 text-sm font-geometric max-w-2xl mx-auto">
          The student leaders and contributors fueling open source collaboration.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 mb-16">
        {firstRowMembers.map((member, index) => renderMember(member, index, index === 0, 2))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16">
        {remainingMembers.map((member, index) => renderMember(member, index + 2))}
      </div>
    </section>
  );
}