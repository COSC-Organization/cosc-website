import SectionTitle from "./SectionTitle";
const domains = [
  "Web",
  "AI / ML",
  "Android",
  "Cybersecurity",
  "DevOps",
  "Design",
  "Documentation",
  "Open Source",
];

export default function ContributeSection() {
  return (
<section className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:px-10 lg:px-12" id = "contribute">
    <SectionTitle title="CONTRIBUTE" />
    <div className="relative z-10">
 <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
        <div>
          

          <h2 className="mt-4 font-serif text-4xl uppercase leading-tight sm:text-5xl md:text-6xl">
            Build
            <br />
            With Us
          </h2>

          <div className="mt-8 h-px w-24 bg-[#D89A3D]" />

          <p className="mt-8 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
            COSC is powered by students who learn by building. Whether
            you're writing code, designing interfaces, documenting
            projects, or helping others, there's always a place for you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {domains.map((domain) => (
            <div
              key={domain}
              className="rounded-xl border border-neutral-800 px-5 py-6 text-center text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#D89A3D] hover:bg-neutral-950"
            >
              {domain}
            </div>
          ))}
        </div>
      </div>
    </div>
         
    </section>
  );
}