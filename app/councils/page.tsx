import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import {
  Crown,
  Star,
  Globe,
  Users,
  Shield,
  ArrowLeft,
  Briefcase,
  Award,
} from "lucide-react";

const councilRoles = [
  {
    title: "المجلس الفخري",
    titleEn: "Honorary Council",
    icon: Crown,
    desc: "أعلى هيئة تمثيلية في الاتحاد تضم قادة الأعمال والشخصيات المؤثرة عالمياً",
    conditions: [
      "خبرة لا تقل عن 15 عاماً",
      "ترشيح من المجلس الأعلى",
      "سجل حافل بالإنجازات الدولية",
    ],
    benefits: [
      "تمثيل الاتحاد في المحافل الدولية الكبرى",
      "المشاركة في صنع القرار الاستراتيجي",
      "لقب فخري دائم",
    ],
    color: "border-primary/40",
    textColor: "text-primary",
  },
  {
    title: "المجلس الفخري الأعلى",
    titleEn: "Supreme Honorary Council",
    icon: Star,
    desc: "النخبة المختارة من أعضاء المجلس الفخري لتمثيل الاتحاد على أعلى المستويات",
    conditions: [
      "عضوية فاعلة في المجلس الفخري",
      "مساهمات استثنائية للاتحاد",
      "تصويت المجلس الأعلى",
    ],
    benefits: [
      "القيادة العليا للاتحاد",
      "التمثيل في المنظمات الدولية",
      "صلاحيات استراتيجية خاصة",
    ],
    color: "border-yellow-500/40",
    textColor: "text-yellow-500",
  },
];

const ambassadorTypes = [
  {
    title: "سفير قطاعي",
    titleEn: "Sector Ambassador",
    icon: Briefcase,
    desc: "يمثل الاتحاد في قطاع تخصصي محدد",
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    title: "سفير إقليمي",
    titleEn: "Regional Ambassador",
    icon: Globe,
    desc: "يمثل الاتحاد في منطقة جغرافية محددة",
    textColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
  {
    title: "سفير دولي",
    titleEn: "International Ambassador",
    icon: Shield,
    desc: "يمثل الاتحاد على المستوى الدولي العام",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
];

const advisorTypes = [
  {
    title: "مستشار قطاعي",
    titleEn: "Sector Advisor",
    icon: Briefcase,
    desc: "يقدم الاستشارات المتخصصة في مجال محدد",
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    title: "مستشار إقليمي",
    titleEn: "Regional Advisor",
    icon: Globe,
    desc: "يقدم الاستشارات لمنطقة جغرافية محددة",
    textColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
  {
    title: "مستشار دولي",
    titleEn: "International Advisor",
    icon: Award,
    desc: "يقدم الاستشارات الاستراتيجية على المستوى الدولي",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
];

const promotionPath = [
  "عضو",
  "قطاعي",
  "إقليمي",
  "دولي",
  "فخري",
  "فخري أعلى",
];

export default function CouncilsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="المجالس والسفراء والمستشارون"
            subtitle="منظومة تمثيلية متكاملة تعكس القوة والمصداقية والانتشار"
          />

          {/* Councils */}
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            {councilRoles.map((role) => (
              <div
                key={role.title}
                className={`glass rounded-xl border ${role.color} p-6 transition-all duration-300 hover:glow-gold`}
              >
                <div className="mb-4 flex items-center gap-3" dir="ltr">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <role.icon size={24} className={role.textColor} />
                  </div>
                  <div>
                    <h3
                      className={`font-heading text-lg font-bold ${role.textColor}`}
                    >
                      {role.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {role.titleEn}
                    </span>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {role.desc}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-foreground/80">
                      الشروط
                    </h4>
                    <ul className="flex flex-col gap-1">
                      {role.conditions.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-foreground/80">
                      المزايا
                    </h4>
                    <ul className="flex flex-col gap-1">
                      {role.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ambassadors */}
          <SectionHeading title="السفراء" />
          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {ambassadorTypes.map((a) => (
              <div
                key={a.title}
                className={`glass rounded-xl border ${a.borderColor} p-5 transition-all duration-300 hover:glow-teal`}
              >
                <div className="mb-3 flex items-center gap-3" dir="ltr">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <a.icon size={18} className={a.textColor} />
                  </div>
                  <div>
                    <h3
                      className={`font-heading text-sm font-bold ${a.textColor}`}
                    >
                      {a.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">
                      {a.titleEn}
                    </span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Advisors */}
          <SectionHeading title="المستشارون" />
          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {advisorTypes.map((a) => (
              <div
                key={a.title}
                className={`glass rounded-xl border ${a.borderColor} p-5 transition-all duration-300 hover:glow-teal`}
              >
                <div className="mb-3 flex items-center gap-3" dir="ltr">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <a.icon size={18} className={a.textColor} />
                  </div>
                  <div>
                    <h3
                      className={`font-heading text-sm font-bold ${a.textColor}`}
                    >
                      {a.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">
                      {a.titleEn}
                    </span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Promotion Flow */}
          <SectionHeading title="مسار الترقي" />
          <div className="glass mx-auto max-w-4xl rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {promotionPath.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 px-4 py-2 text-center">
                    <span className="font-heading text-xs font-bold text-primary">
                      {step}
                    </span>
                  </div>
                  {i < promotionPath.length - 1 && (
                    <ArrowLeft size={16} className="text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
