import SectionTitle from "./SectionTitle";

const cards = [
  {
    title: "Email",
    value: "cosc@canaraengineering.in",
    href: "mailto:cosc@canaraengineering.in",
  },
  {
    title: "GitHub",
    value: "COSC-Organization",
    href: "https://github.com/COSC-Organization",
  },
  {
    title: "Instagram",
    value: "@cosc_cec",
    href: "#",
  },
  {
    title: "Discord",
    value: "Join Community",
    href: "#",
  },
];

export default function ContactCards() {
  return (
<section className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:px-10 lg:px-12">      
<SectionTitle title="CONTACT" />
<div className="relative z-10">
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-neutral-800 p-8 transition-all duration-300 hover:border-[#D89A3D] hover:bg-neutral-950"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {card.title}
            </p>

            <h3 className="mt-8 break-words text-xl text-white transition-colors group-hover:text-[#D89A3D]">
              {card.value}
            </h3>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}