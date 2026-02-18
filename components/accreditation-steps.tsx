import {
  FileText,
  Search,
  ClipboardCheck,
  ShieldCheck,
  Eye,
} from "lucide-react";

const steps = [
  { icon: FileText, label: "التقديم", desc: "تقديم طلب العضوية" },
  { icon: Search, label: "المراجعة", desc: "مراجعة أولية للطلب" },
  { icon: ClipboardCheck, label: "التقييم", desc: "تقييم شامل للمؤسسة" },
  { icon: ShieldCheck, label: "الاعتماد", desc: "منح شهادة الاعتماد" },
  { icon: Eye, label: "الظهور", desc: "التمثيل والظهور الدولي" },
];

export default function AccreditationSteps() {
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

          <h2 className="shrink-0 font-heading text-2xl font-bold text-primary md:text-3xl">
            خطوات الاعتماد
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
          رحلة واضحة ومنظمة للحصول على اعتماد الاتحاد
        </p>

        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-0">
              <div className="glass group flex w-40 flex-col items-center rounded-xl p-4 text-center transition-all duration-300 hover:glow-gold">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <step.icon size={18} className="text-primary" />
                </div>
                <span className="font-heading text-xs font-bold text-foreground">
                  {step.label}
                </span>
                <span className="mt-1 text-[10px] text-muted-foreground">
                  {step.desc}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden h-px w-8 bg-gradient-to-l from-primary/40 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}