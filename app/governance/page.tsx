import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { Crown, Users, Shield, Globe, ArrowLeft } from "lucide-react";

const leaders = [
  {
    name: "عبدالله الحربي",
    title: "الرئيس العام",
    titleEn: "President",
    country: "المملكة المتحدة",
    bio: "رائد أعمال دولي يتمتع بأكثر من 20 عاماً من الخبرة في بناء الشراكات الاستراتيجية والتمثيل الدولي.",
    icon: Crown,
    textColor: "text-primary",
    borderColor: "border-primary/40",
  },
  {
    name: "محمد السيد",
    title: "نائب الرئيس",
    titleEn: "Vice President",
    country: "تركيا",
    bio: "خبير في التجارة الدولية والعلاقات المؤسسية مع سجل حافل في تطوير الأعمال عبر القارات.",
    icon: Shield,
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    name: "سارة المطيري",
    title: "الأمين العام",
    titleEn: "Secretary General",
    country: "الإمارات",
    bio: "متخصصة في الحوكمة المؤسسية وإدارة المنظمات الدولية مع خبرة واسعة في التنسيق بين الهيئات الدولية.",
    icon: Users,
    textColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
  {
    name: "أحمد الدوسري",
    title: "مدير العمليات",
    titleEn: "COO",
    country: "السعودية",
    bio: "متخصص في إدارة العمليات والتحول الرقمي مع خبرة في بناء المنصات التقنية للمنظمات الدولية.",
    icon: Globe,
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
];

const orgChart = [
  {
    level: "الرئاسة العامة",
    color: "bg-primary/20 border-primary/40 text-primary",
  },
  {
    level: "نائب الرئيس | الأمين العام",
    color: "bg-secondary/15 border-secondary/30 text-secondary",
  },
  {
    level: "مدير العمليات | المدير المالي | مدير العلاقات",
    color: "bg-teal-light/15 border-teal-light/30 text-teal-light",
  },
  {
    level: "إدارة العضويات | إدارة الشراكات | إدارة التقنية | إدارة الفعاليات",
    color: "bg-muted/40 border-border/40 text-foreground/70",
  },
];

export default function GovernancePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="الحوكمة والإدارة"
            subtitle="القيادات والهيكل الإداري لاتحاد الشركات الدولي"
          />

          {/* Leadership Cards */}
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className={`glass rounded-xl border ${leader.borderColor} p-6 transition-all duration-300 hover:glow-gold`}
              >
                <div className="mb-4 flex items-center gap-4" dir="ltr">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-card/80 ${leader.textColor}`}
                  >
                    <leader.icon size={28} />
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {leader.name}
                    </h3>
                    <p className={`text-sm font-semibold ${leader.textColor}`}>
                      {leader.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {leader.titleEn}
                    </span>
                  </div>
                </div>
                <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Globe size={12} className="text-secondary" />
                  {leader.country}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Organizational Chart */}
          <SectionHeading title="الهيكل التنظيمي" />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
            {orgChart.map((row, i) => (
              <div key={row.level} className="flex w-full flex-col items-center gap-3">
                <div
                  className={`glass w-full rounded-xl border p-4 text-center ${row.color}`}
                  style={{
                    maxWidth: `${100 - i * 5}%`,
                  }}
                >
                  <span className="font-heading text-sm font-bold">
                    {row.level}
                  </span>
                </div>
                {i < orgChart.length - 1 && (
                  <div className="h-6 w-px bg-border/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
