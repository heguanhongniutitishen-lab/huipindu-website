type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-leaf-700 sm:text-sm">{eyebrow}</p>
      ) : null}
      <h2 className="text-[2.1rem] font-black leading-tight tracking-normal text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-ink/68 lg:mt-5 lg:text-lg lg:leading-9">{description}</p> : null}
    </div>
  );
}
