export default function FooterCTA() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-900">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 md:px-10 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
          Community
        </p>

        <h2 className="mt-6 font-serif text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          Learn.
          <br />
          Build.
          <br />
          Share.
          <br />
          Contribute.
        </h2>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-px w-20 bg-[#D89A3D]" />
          <div className="h-px w-40 bg-neutral-800" />
        </div>

        <p className="mt-10 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
          Great communities are built one contribution at a time.
          We'd love to have you with us.
        </p>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://github.com/COSC-Organization"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-[#D89A3D] px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#D89A3D] hover:text-black hover:shadow-[0_0_35px_rgba(216,154,61,0.2)]"
          >
            View GitHub
          </a>

          <a
            href="mailto:cosc@canaraengineering.in"
            className="inline-flex items-center justify-center border border-neutral-700 px-8 py-4 text-xs uppercase tracking-[0.3em] transition hover:border-white"
          >
            Email Us
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 font-serif text-[6rem] uppercase leading-none text-white/[0.03] sm:text-[8rem] md:text-[10rem] lg:text-[14rem]">
        COSC
      </div>
    </section>
  );
}