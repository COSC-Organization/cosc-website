interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <h2 className="select-none font-serif text-[4rem] uppercase leading-none text-white/[0.03]
      sm:text-[6rem]
      md:text-[8rem]
      lg:text-[10rem]
      xl:text-[12rem]">
        {title}
      </h2>
    </div>
  );
}