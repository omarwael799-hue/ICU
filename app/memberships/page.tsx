import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { Star, Award, Crown, Gem, Diamond, Check } from "lucide-react";
import Link from "next/link";

const sharedFeatures = [
  "شهادة عضوية رسمية معتمدة من الاتحاد",
  "إدراج في دليل الأعضاء الدولي",
  "حق استخدام شعار الاتحاد",
  "الوصول إلى بوابات الخدمات",
  "المشاركة في الفعاليات والمؤتمرات",
  "الدعم الاستشاري الأولي",
];

const tiers = [
  {
    name: "BRONZE",
    nameAr: "برونزي",
    icon: Star,
    color: "from-amber-800/40 to-amber-900/20",
    borderColor: "border-amber-700/40",
    textColor: "text-amber-600",
    glowColor: "hover:shadow-amber-800/20",
    extras: [],
  },
  {
    name: "SILVER",
    nameAr: "فضي",
    icon: Award,
    color: "from-slate-400/20 to-slate-500/10",
    borderColor: "border-slate-400/30",
    textColor: "text-slate-300",
    glowColor: "hover:shadow-slate-400/20",
    extras: ["أولوية في بوابة الفرص", "تقرير سنوي عن القطاع"],
  },
  {
    name: "GOLD",
    nameAr: "ذهبي",
    icon: Crown,
    color: "from-yellow-600/30 to-yellow-700/10",
    borderColor: "border-yellow-500/40",
    textColor: "text-yellow-500",
    glowColor: "hover:shadow-yellow-600/20",
    extras: [
      "أولوية في بوابة الفرص",
      "تقرير سنوي عن القطاع",
      "دعوة لاجتماعات مجلس الأعمال",
      "ظهور مميز في الدليل",
    ],
  },
  {
    name: "PLATINUM",
    nameAr: "بلاتيني",
    icon: Gem,
    color: "from-cyan-600/20 to-cyan-700/10",
    borderColor: "border-cyan-500/40",
    textColor: "text-cyan-400",
    glowColor: "hover:shadow-cyan-500/20",
    extras: [
      "جميع مزايا الذهبي",
      "ترشيح لمنصب سفير قطاعي",
      "استشارات مهنية متقدمة",
      "تمثيل في المحافل الدولية",
    ],
  },
  {
    name: "VVIP",
    nameAr: "كبار الشخصيات",
    icon: Diamond,
    color: "from-primary/30 to-primary/10",
    borderColor: "border-primary/50",
    textColor: "text-primary",
    glowColor: "hover:shadow-primary/20",
    extras: [
      "جميع مزايا البلاتيني",
      "عضوية المجلس الاستشاري",
      "ترشيح للمجلس الفخري",
      "تمثيل دولي كامل",
      "خدمة كونسيرج مخصصة",
    ],
  },
];

export default function MembershipsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="مستويات العضوية"
            subtitle="اختر العضوية الأنسب لمؤسستك وانطلق نحو التمثيل الدولي"
          />

          {/* Shared Features */}
          <div className="glass mx-auto mb-12 max-w-3xl rounded-xl p-6">
            <h3 className="mb-4 text-center font-heading text-lg font-bold text-primary">
              المزايا المشتركة لجميع المستويات
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {sharedFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={14} className="shrink-0 text-secondary" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`glass group flex flex-col rounded-xl border ${tier.borderColor} bg-gradient-to-b ${tier.color} p-6 transition-all duration-300 hover:scale-[1.02] ${tier.glowColor} hover:shadow-lg`}
              >
                <div className="mb-4 text-center">
                  <div
                    className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-card/60 ${tier.textColor}`}
                  >
                    <tier.icon size={32} />
                  </div>
                  <h3
                    className={`font-heading text-xl font-bold ${tier.textColor}`}
                  >
                    {tier.nameAr}
                  </h3>
                  <p
                    className="text-xs tracking-widest text-muted-foreground"
                    dir="ltr"
                  >
                    {tier.name}
                  </p>
                </div>

                {tier.extras.length > 0 && (
                  <div className="mb-4 flex-1 border-t border-border/20 pt-4">
                    <p className="mb-2 text-xs font-semibold text-foreground/80">
                      مزايا إضافية:
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {tier.extras.map((e) => (
                        <li
                          key={e}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <Check
                            size={12}
                            className={`mt-0.5 shrink-0 ${tier.textColor}`}
                          />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/join"
                  className={`mt-auto block rounded-lg border ${tier.borderColor} py-2.5 text-center text-sm font-semibold ${tier.textColor} transition-all hover:bg-card/40`}
                >
                  انضم الآن
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
