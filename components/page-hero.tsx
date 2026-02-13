import type { LucideIcon } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function PageHero({ title, subtitle, icon: Icon }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-12">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-secondary/5 blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(43, 50%, 54%) 1px, transparent 1px), linear-gradient(90deg, hsl(43, 50%, 54%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <Icon size={28} className="text-primary" />
        </div>
        <h1 className="text-gold-gradient font-heading text-2xl font-bold md:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {subtitle}
        </p>
        <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
      </div>
    </section>
  );
}
