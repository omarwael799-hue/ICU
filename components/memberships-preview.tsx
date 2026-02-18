import Link from "next/link";
import { Star, Award, Crown, Gem, Diamond } from "lucide-react";

const tiers = [
  {
    name: "BRONZE",
    nameAr: "برونزي",
    icon: Star,
    gradient: "from-amber-800/40 to-amber-900/20",
    ring: "group-hover:ring-amber-600/40",
    glow: "group-hover:shadow-amber-700/40",
    aura: "bg-amber-600/25",
    text: "text-amber-600",
    border: "border-amber-700/30",
  },
  {
    name: "SILVER",
    nameAr: "فضي",
    icon: Award,
    gradient: "from-slate-400/20 to-slate-500/10",
    ring: "group-hover:ring-slate-400/40",
    glow: "group-hover:shadow-slate-400/40",
    aura: "bg-slate-300/25",
    text: "text-slate-300",
    border: "border-slate-400/30",
  },
  {
    name: "GOLD",
    nameAr: "ذهبي",
    icon: Crown,
    gradient: "from-yellow-600/30 to-yellow-700/10",
    ring: "group-hover:ring-yellow-500/40",
    glow: "group-hover:shadow-yellow-500/40",
    aura: "bg-yellow-500/30",
    text: "text-yellow-500",
    border: "border-yellow-500/30",
  },
  {
    name: "PLATINUM",
    nameAr: "بلاتيني",
    icon: Gem,
    gradient: "from-cyan-600/20 to-cyan-700/10",
    ring: "group-hover:ring-cyan-500/40",
    glow: "group-hover:shadow-cyan-500/40",
    aura: "bg-cyan-500/25",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
  },
  {
    name: "VVIP",
    nameAr: "كبار الشخصيات",
    icon: Diamond,
    gradient: "from-primary/30 to-primary/10",
    ring: "group-hover:ring-primary/50",
    glow: "group-hover:shadow-primary/40",
    aura: "bg-primary/30",
    text: "text-primary",
    border: "border-primary/40",
  },
];

export default function MembershipsPreview() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">

{/* ===== Framed Title (no overlap, thick→thin toward title, spaced) ===== */}
<div className="mb-6 flex items-center justify-center gap-10">
  {/* Left line (screen left → thin near title) */}
  <div className="flex flex-1 items-center">
    <div
      className="h-[3px] w-full"
      style={{
        background:
          "linear-gradient(to right, rgba(201,168,76,.65) 0%, rgba(201,168,76,.35) 45%, rgba(201,168,76,0) 100%)",
        // thick at edge → thin at title side
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
      }}
    />
    <span className="ml-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]" />
  </div>

  {/* Title */}
  <h2 className="shrink-0 font-heading text-2xl font-bold text-primary md:text-3xl">
    مستويات العضوية
  </h2>

  {/* Right line (screen right → thin near title) */}
  <div className="flex flex-1 items-center justify-end">
    <span className="mr-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]" />
    <div
      className="h-[3px] w-full"
      style={{
        background:
          "linear-gradient(to left, rgba(201,168,76,.65) 0%, rgba(201,168,76,.35) 45%, rgba(201,168,76,0) 100%)",
        // thick at edge → thin at title side
        maskImage:
          "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
      }}
    />
  </div>
</div>
        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          اختر العضوية الأنسب لطموحاتك واحتياجاتك المهنية
        </p>

        {/* ===== Cards ===== */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass group relative cursor-pointer rounded-xl border ${tier.border}
                          bg-gradient-to-b ${tier.gradient}
                          p-5 text-center transition-all duration-300
                          hover:-translate-y-1 hover:scale-[1.05]
                          hover:ring-2 ${tier.ring} hover:shadow-2xl ${tier.glow}`}
            >
              {/* Aura خلف الأيقونة */}
              <div
                className={`pointer-events-none absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2
                            rounded-full blur-2xl opacity-0 transition-opacity duration-300
                            group-hover:opacity-100 ${tier.aura}`}
              />

              {/* Icon */}
              <div
                className={`relative mx-auto mb-3 flex h-14 w-14 items-center justify-center
                            rounded-full bg-card/70 transition-all duration-300
                            group-hover:scale-110 ${tier.text}`}
              >
                <tier.icon size={28} />
              </div>

              <h3 className={`font-heading text-sm font-bold ${tier.text}`}>
                {tier.nameAr}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
                {tier.name}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/memberships"
            className="glass glow-gold inline-block rounded-lg px-6 py-3
                       text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            عرض تفاصيل العضويات
          </Link>
        </div>
      </div>
    </section>
  );
}