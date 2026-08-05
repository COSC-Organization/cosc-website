import HeroIllustration from "./HeroIllustration";

export default function ContactHero() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-24 sm:px-8 md:px-10 lg:px-12" id = "introduction">
  <div className="grid w-full items-center gap-16 lg:grid-cols-2">
    <div className="max-w-3xl">
      <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
        07
      </p>

      <h1 className="font-serif text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
        Get In
        <br />
        Touch
      </h1>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px w-20 bg-[#D89A3D]" />
        <div className="h-px max-w-32 flex-1 bg-neutral-800" />
      </div>

      <p className="mt-8 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
        Whether you're interested in contributing, collaborating,
        hosting workshops, or simply saying hello, our doors are always open.
      </p>
    </div>

   <div className="hidden lg:flex justify-center">
    <HeroIllustration />
</div>
  </div>
</section>
  );
}