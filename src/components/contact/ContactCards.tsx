import FadeIn from "./FadeIn";
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
//   {
//     title: "Instagram",
//     value: "@cosc_cec",
//     href: "#",
//   },
//   {
//     title: "Discord",
//     value: "Join Community",
//     href: "#",
//   },
];

export default function ContactCards() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:px-10 lg:px-12"
    >
      <SectionTitle title="CONTACT" />

      <div className="relative z-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.08}>
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden border border-neutral-800 p-8 transition-all duration-500 hover:border-[#D89A3D] hover:bg-[#0A0A0A]"
              >
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#D89A3D] transition-all duration-500 group-hover:w-full" />

                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {card.title}
                </p>

                <h3 className="mt-8 break-words text-xl text-white transition-colors duration-300 group-hover:text-[#D89A3D]">
                  {card.value}
                </h3>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}