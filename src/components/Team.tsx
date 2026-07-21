import Image from "next/image";
import { team } from "@/data/team";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Team() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-3">MEET THE TEAM</h1>
        <p className="text-gray-400 text-sm">
          The student leaders and contributors fueling open source collaboration.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-16">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col items-center w-full max-w-[180px] mx-auto">
            <div className="relative w-[170px] h-[210px]">
              {/* Photo - sits behind the frame, positioned to match the PNG's window opening */}
              <div className="absolute overflow-hidden" style={{ top: "21%", left: "18%", width: "64%", height: "56%" }}>
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              {/* Frame overlay on top */}
              <Image
                src="/team/frame.png"
                alt=""
                fill
                className="object-contain pointer-events-none select-none z-10"
              />
            </div>

            <h3 className="mt-6 text-base font-semibold text-white text-center">{member.name}</h3>
            <p className="text-gray-400 text-sm text-center">{member.role}</p>

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
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter size={18} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}