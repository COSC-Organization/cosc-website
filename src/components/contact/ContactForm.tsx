import SectionTitle from "./SectionTitle";

export default function ContactForm() {
  return (
<section className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:px-10 lg:px-12" id = "message">
    <SectionTitle title="MESSAGE" />

    <div className="relative z-10">

          <div className="grid gap-16 lg:grid-cols-2">
        <div>
          

          <h2 className="mt-4 font-serif text-4xl uppercase leading-tight sm:text-5xl md:text-6xl">
            Let's Start
            <br />
            A Conversation
          </h2>

          <div className="mt-8 h-px w-24 bg-[#D89A3D]" />

          <p className="mt-8 max-w-lg text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
            Questions, collaborations, workshops, sponsorships or simply
            saying hello—we'd love to hear from you.
          </p>
        </div>

        <form className="space-y-8">
          <div>
            <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-neutral-500">
              Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              className="w-full border-b border-neutral-700 bg-transparent py-4 text-lg outline-none transition focus:border-[#D89A3D]"
            />
          </div>

          <div>
            <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-neutral-500">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border-b border-neutral-700 bg-transparent py-4 text-lg outline-none transition focus:border-[#D89A3D]"
            />
          </div>

          <div>
            <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-neutral-500">
              Subject
            </label>

            <input
              type="text"
              placeholder="What's this about?"
              className="w-full border-b border-neutral-700 bg-transparent py-4 text-lg outline-none transition focus:border-[#D89A3D]"
            />
          </div>

          <div>
            <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-neutral-500">
              Message
            </label>

            <textarea
              rows={6}
              placeholder="Tell us about your idea..."
              className="w-full resize-none border-b border-neutral-700 bg-transparent py-4 text-lg outline-none transition focus:border-[#D89A3D]"
            />
          </div>

          <button
  type="submit"
  className="group mt-4 inline-flex w-full items-center justify-center border border-[#D89A3D] px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#D89A3D] hover:text-black hover:shadow-[0_0_35px_rgba(216,154,61,0.2)] sm:w-auto"
>
  Send Message

  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
    →
  </span>
</button>
        </form>
      </div>
      </div>
    </section>
  );
}