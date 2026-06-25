type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-leaf-700">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-black tracking-normal text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-ink/68">{description}</p> : null}
    </div>
  );
}
