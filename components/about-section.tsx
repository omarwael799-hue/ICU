import { Shield, Target, AlertTriangle } from "lucide-react";

const aboutItems = [
  {
    icon: Shield,
    title: "تعريف الاتحاد",
    text: "اتحاد الشركات الدولي (ICU) هو كيان دولي مستقل يهدف إلى توحيد الشركات والمؤسسات حول العالم تحت مظلة مهنية واحدة، تقوم على أسس التعاون الدولي، والتمثيل المهني، والاعتماد المؤسسي.",
  },
  {
    icon: Target,
    title: "الهدف",
    text: "تمكين الشركات والمؤسسات من الحصول على تمثيل دولي موثوق، وتعزيز فرص التعاون بين القطاعات المختلفة، وتقديم خدمات اعتماد وتطوير مهني على المستوى العالمي.",
  },
  {
    icon: AlertTriangle,
    title: "إخلاء مسؤولية",
    text: "اتحاد الشركات الدولي ليس جهة حكومية ولا يمنح تراخيص حكومية. هو كيان مهني مستقل يوفر اعتماداً مؤسسياً وتمثيلاً دولياً بناءً على معايير مهنية خاصة.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* ===== Framed Title (thick→thin toward title, spaced) ===== */}
        <div className="mb-6 flex items-center justify-center gap-10">
          {/* Left line */}
          <div className="flex flex-1 items-center">
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(to right, rgba(201,168,76,.65) 0%, rgba(201,168,76,.35) 45%, rgba(201,168,76,0) 100%)",
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
              }}
            />
            <span className="ml-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]" />
          </div>

          <h2 className="shrink-0 font-heading text-2xl font-bold text-primary md:text-3xl">
            من نحن
          </h2>

          {/* Right line */}
          <div className="flex flex-1 items-center justify-end">
            <span className="mr-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]" />
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(to left, rgba(201,168,76,.65) 0%, rgba(201,168,76,.35) 45%, rgba(201,168,76,0) 100%)",
                maskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        </div>

        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          تعرف على اتحاد الشركات الدولي ورؤيته
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {aboutItems.map((item) => (
            <div
              key={item.title}
              className="glass group relative overflow-hidden rounded-xl p-6 transition-all duration-300
                         hover:-translate-y-2 hover:glow-gold hover:shadow-2xl hover:shadow-primary/10"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* ✨ Shine sweep */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(201,168,76,.16) 25%, rgba(30,144,176,.10) 50%, transparent 75%)",
                  transform: "translateX(-20%) rotate(12deg)",
                }}
              />

              {/* ✨ Subtle border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-primary/25" />

              {/* Content */}
              <div className="relative" style={{ transform: "translateZ(10px)" }}>
                <div className="mb-4 flex items-center gap-3" dir="ltr">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10
                               transition-all duration-300 group-hover:bg-primary/18 group-hover:scale-[1.06]"
                  >
                    <item.icon
                      size={20}
                      className="text-primary transition-all duration-300 group-hover:scale-[1.08]"
                    />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-foreground transition-all duration-300 group-hover:tracking-wide">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {item.text}
                </p>
              </div>

              {/* ✨ Bottom glow fade */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}