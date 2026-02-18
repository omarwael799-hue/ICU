import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Lock,
  MessageCircle,
  Calendar,
  BookOpen,
  Award,
  ArrowLeft,
  Star,
} from "lucide-react";

const communityFeatures = [
  {
    icon: Calendar,
    title: "الفعاليات والمؤتمرات",
    titleEn: "Events & Conferences",
    desc: "فعاليات دورية ومؤتمرات دولية حصرية للأعضاء تشمل ورش عمل ومعارض وجلسات تواصل مهنية.",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    icon: MessageCircle,
    title: "منتدى الأعضاء",
    titleEn: "Members Forum",
    desc: "منصة حصرية للتواصل وتبادل الخبرات بين أعضاء الاتحاد من مختلف القطاعات والمناطق الجغرافية.",
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    icon: Award,
    title: "برنامج التقدير",
    titleEn: "Recognition Program",
    desc: "نظام تقدير ومكافآت للأعضاء المتميزين والأكثر مساهمة في تطوير مجتمع الاتحاد.",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    icon: BookOpen,
    title: "مكتبة المعرفة",
    titleEn: "Knowledge Library",
    desc: "محتوى تعليمي وتقارير وأبحاث حصرية لدعم التطور المهني وتعزيز المعرفة في مختلف القطاعات.",
    textColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
];

const councilTopics = [
  { title: "التجارة الدولية والتصدير", members: 142 },
  { title: "التقنية والتحول الرقمي", members: 98 },
  { title: "الاستثمار والتمويل", members: 115 },
  { title: "ريادة الأعمال والشركات الناشئة", members: 87 },
  { title: "الصناعة والتصنيع", members: 64 },
  { title: "الطاقة والاستدامة", members: 53 },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="مجتمع الأعضاء"
            subtitle="مجتمع حصري يجمع قادة الأعمال والمؤسسات من حول العالم"
          />

          {/* Exclusive Access Notice */}
          <div className="glass glow-gold mx-auto mb-12 flex max-w-md items-center gap-4 rounded-xl p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Lock size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-primary">
                وصول حصري للأعضاء
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                المحتوى الكامل والخدمات المتقدمة متاحة حصرياً لأعضاء اتحاد
                الشركات الدولي.
              </p>
            </div>
          </div>

          {/* Community Features */}
          <div className="mb-16 grid gap-5 md:grid-cols-2">
            {communityFeatures.map((feature) => (
              <div
                key={feature.title}
                className={`glass rounded-xl border ${feature.borderColor} p-6 transition-all duration-300 hover:glow-teal`}
              >
                {/* ✅ centered title block (icon + text centered) + RTL (icon on the right) */}
                <div className="mb-4 flex flex-col items-center text-center">
                  <div
                    className="inline-flex items-center justify-center gap-3"
                    dir="rtl"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10">
                      <feature.icon size={20} className={feature.textColor} />
                    </div>

                    <div className="text-center">
                      <h3
                        className={`font-heading text-sm font-bold ${feature.textColor}`}
                      >
                        {feature.title}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        {feature.titleEn}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground text-center">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Business Council */}
          <SectionHeading
            title="مجلس الأعمال"
            subtitle="مجالس أعمال متخصصة بحسب القطاع لتسهيل التعاون والشراكات"
          />

          <div className="mx-auto mb-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {councilTopics.map((topic) => (
              <div
                key={topic.title}
                className="glass rounded-xl border border-border/20 p-4 transition-all duration-300 hover:glow-teal"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="shrink-0 text-secondary" />
                    <h4 className="font-heading text-xs font-bold text-foreground">
                      {topic.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Users size={12} />
                  <span>{topic.members} عضو</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mx-auto max-w-md text-center">
            <Star size={32} className="mx-auto mb-3 text-primary" />
            <h3 className="font-heading text-lg font-bold text-foreground">
              انضم إلى مجتمعنا
            </h3>
            <p className="mb-5 mt-2 text-sm text-muted-foreground">
              كن جزءاً من شبكة عالمية من قادة الأعمال والمؤسسات المعتمدة
            </p>

            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-heading text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <span>انضم الآن</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}