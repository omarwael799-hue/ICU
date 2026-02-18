interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <h2 className="text-gold-gradient font-heading text-2xl font-bold md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-l from-transparent via-primary to-transparent" />
    </div>
  );
}
