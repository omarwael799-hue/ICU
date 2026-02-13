import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import {
  Briefcase,
  Banknote,
  UserCheck,
  FolderKanban,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const portals = [
  {
    icon: Briefcase,
    title: "بوابة الفرص",
    titleEn: "Opportunities Portal",
    desc: "منصة متخصصة للفرص التجارية والاستثمارية الحصرية المتاحة للأعضاء. تشمل فرص الشراكة، والتوسع الدولي، والمشاريع المشتركة مع مؤسسات عالمية.",
    features: [
      "فرص استثمارية حصرية",
      "شراكات استراتيجية",
      "التوسع الدولي",
      "مشاريع مشتركة",
    ],
    color: "border-secondary/30",
    textColor: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Banknote,
    title: "بوابة التمويل",
    titleEn: "Funding Portal",
    desc: "ربط الأعضاء بمؤسسات مالية دولية وصناديق استثمارية لتمويل مشاريعهم وتوسيع أعمالهم على المستوى العالمي.",
    features: [
      "تمويل المشاريع",
      "صناديق استثمارية",
      "قروض ميسرة",
      "استشارات مالية",
    ],
    color: "border-emerald-500/30",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: UserCheck,
    title: "بوابة الوظائف",
    titleEn: "Career Portal",
    desc: "فرص عمل ومناصب قيادية في الشركات والمؤسسات الأعضاء في الاتحاد، مع إمكانية الترشيح لمناصب تمثيلية.",
    features: [
      "وظائف قيادية",
      "فرص تدريب",
      "ترشيح لمناصب",
      "تطوير مهني",
    ],
    color: "border-sky-500/30",
    textColor: "text-sky-400",
    bgColor: "bg-sky-500/10",
  },
  {
    icon: FolderKanban,
    title: "بوابة المشاريع",
    titleEn: "Projects Portal",
    desc: "منصة لإدارة المشاريع المشتركة بين الأعضاء والشراكات الاستراتيجية متعددة الأطراف.",
    features: [
      "مشاريع مشتركة",
      "شراكات متعددة",
      "إدارة مشاريع",
      "تقارير دورية",
    ],
    color: "border-amber-500/30",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: BadgeCheck,
    title: "بوابة الاعتماد والشهادات",
    titleEn: "Accreditation Portal",
    desc: "نظام متكامل لإصدار شهادات الاعتماد الدولية المعترف بها من الاتحاد، مع نظام تحقق إلكتروني.",
    features: [
      "شهادات معتمدة",
      "تحقق إلكتروني",
      "تجديد تلقائي",
      "سجل دولي",
    ],
    color: "border-primary/30",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="بوابات الخدمات"
            subtitle="حلول متكاملة ومنصات رقمية لدعم وتطوير أعمال الأعضاء"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portals.map((portal) => (
              <div
                key={portal.title}
                className={`glass group flex flex-col rounded-xl border ${portal.color} p-6 transition-all duration-300 hover:glow-teal`}
              >
                <div className="mb-4 flex items-center gap-3" dir="ltr">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${portal.bgColor}`}
                  >
                    <portal.icon size={24} className={portal.textColor} />
                  </div>
                  <div>
                    <h3
                      className={`font-heading text-base font-bold ${portal.textColor}`}
                    >
                      {portal.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">
                      {portal.titleEn}
                    </span>
                  </div>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {portal.desc}
                </p>

                <div className="mb-4 grid grid-cols-2 gap-1.5">
                  {portal.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <span
                        className={`h-1 w-1 shrink-0 rounded-full ${portal.bgColor}`}
                      />
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/join"
                  className={`flex items-center justify-center gap-2 rounded-lg border ${portal.color} py-2.5 text-sm font-semibold ${portal.textColor} transition-all hover:bg-card/40`}
                >
                  <span>طلب الوصول</span>
                  <ArrowLeft size={14} />
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
