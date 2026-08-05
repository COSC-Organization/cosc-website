export default function ContactHero() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-24 sm:px-8 md:px-10 lg:px-12">
      <div className="max-w-3xl">
        <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
          07
        </p>

        <h1 className="font-serif text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
          Get In
          <br />
          Touch
        </h1>

        <div className="mt-8 h-px w-24 bg-[#D89A3D] sm:w-32" />

        <p className="mt-8 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
          Whether you're interested in contributing, collaborating,
          hosting workshops, or simply saying hello, our doors are
          always open.
        </p>
      </div>
    </section>
  );
}