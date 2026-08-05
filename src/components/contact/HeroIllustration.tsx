import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <img
        src="/illustrations/contact-hero.png"
        alt="Contact Illustration"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}