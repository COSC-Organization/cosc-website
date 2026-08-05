interface SectionDividerProps {
  number: string;
  title: string;
}

export default function SectionDivider({
  number,
  title,
}: SectionDividerProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
      <div className="flex items-center gap-4 py-10">
        <span className="text-[11px] uppercase tracking-[0.35em] text-neutral-600">
          {number}
        </span>

        <div className="h-px flex-1 bg-neutral-800" />

        <span className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
          {title}
        </span>
      </div>
    </div>
  );
}