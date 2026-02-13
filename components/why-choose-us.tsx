import {
  ShieldCheck,
  Users,
  Globe,
  Lightbulb,
  Award,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "اعتماد موثوق",
    desc: "نظام اعتماد مهني دولي يعزز مصداقية شركتك",
  },
  {
    icon: Users,
    title: "أعضاء معتمدون",
    desc: "شبكة واسعة من الشركات والمؤسسات المعتمدة عالمياً",
  },
  {
    icon: Globe,
    title: "انتشار عالمي",
    desc: "تمثيل دولي في مختلف القارات والقطاعات",
  },
  {
    icon: Lightbulb,
    title: "حلول ذكية",
    desc: "خدمات رقمية متكاملة لتطوير الأعمال",
  },
  {
    icon: Award,
    title: "تميز مهني",
    desc: "معايير عالية الجودة في كافة الخدمات المقدمة",
  },
  {
    icon: Handshake,
    title: "شراكات استراتيجية",
    desc: "فرص تعاون حقيقية مع مؤسسات دولية رائدة",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* ===== Framed Title ===== */}
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

          {/* Title */}
          <h2 className="shrink-0 font-heading text-2xl font-bold text-primary md:text-3xl">
            لماذا تختارنا
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

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          مزايا فريدة تجعل من اتحاد الشركات الدولي الخيار الأمثل
        </p>

        {/* ===== Feature Cards ===== */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass group relative overflow-hidden rounded-xl p-5 transition-all duration-300
                         hover:-translate-y-1.5 hover:glow-gold hover:shadow-2xl hover:shadow-primary/10"
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {/* Shine sweep */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(201,168,76,.14) 26%, rgba(30,144,176,.10) 55%, transparent 78%)",
                  transform: "translateX(-18%) rotate(10deg)",
                }}
              />

              {/* Border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-primary/25" />

              <div
                className="relative flex items-start gap-4"
                style={{ transform: "translateZ(10px)" }}
              >
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-3 rounded-xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-[1.06]">
                    <f.icon
                      size={22}
                      className="text-primary transition-transform duration-300 group-hover:scale-[1.08]"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground transition-all duration-300 group-hover:tracking-wide">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {f.desc}
                  </p>
                </div>
              </div>

              {/* Bottom fade */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-primary/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}