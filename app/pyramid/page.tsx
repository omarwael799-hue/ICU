"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";
import {
  Crown,
  Users,
  Settings,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const pyramidLayers = [
  {
    level: 1,
    title: "القيادة الاستراتيجية",
    titleEn: "Strategic Leadership",
    icon: Crown,
    color: "bg-primary/20 border-primary/50",
    textColor: "text-primary",
    glowClass: "glow-gold",
    width: "max-w-sm",
    details: [
      "المجلس الفخري الأعلى",
      "المجلس الفخري",
      "الرئاسة العامة للاتحاد",
      "نائب الرئيس العام",
      "الأمين العام",
    ],
    description:
      "القمة التنظيمية التي تضم القيادات العليا المسؤولة عن التوجيه الاستراتيجي للاتحاد وتمثيله على أعلى المستويات الدولية.",
  },
  {
    level: 2,
    title: "مجالس التمثيل",
    titleEn: "Representation Councils",
    icon: Users,
    color: "bg-secondary/15 border-secondary/40",
    textColor: "text-secondary",
    glowClass: "glow-teal",
    width: "max-w-lg",
    details: [
      "السفراء الدوليون",
      "السفراء الإقليميون",
      "السفراء القطاعيون",
      "المستشارون الدوليون",
      "المستشارون الإقليميون",
      "المستشارون القطاعيون",
    ],
    description:
      "الطبقة التمثيلية التي تشمل السفراء والمستشارين على المستويات القطاعية والإقليمية والدولية لتوسيع نفوذ الاتحاد.",
  },
  {
    level: 3,
    title: "الأدوار التشغيلية",
    titleEn: "Operational Roles",
    icon: Settings,
    color: "bg-teal-light/15 border-teal-light/30",
    textColor: "text-teal-light",
    glowClass: "glow-teal",
    width: "max-w-xl",
    details: [
      "إدارة العضويات",
      "إدارة الشراكات",
      "إدارة الفعاليات",
      "إدارة التواصل والعلاقات العامة",
      "الإدارة المالية والإدارية",
      "إدارة التقنية والمنصات الرقمية",
    ],
    description:
      "الفرق التشغيلية المسؤولة عن إدارة الأنشطة اليومية وتنفيذ الخطط الاستراتيجية وضمان سير العمل بكفاءة.",
  },
  {
    level: 4,
    title: "بوابات الخدمات",
    titleEn: "Service Portals",
    icon: Layers,
    color: "bg-muted/40 border-border/40",
    textColor: "text-foreground/80",
    glowClass: "",
    width: "max-w-2xl",
    details: [
      "بوابة الفرص التجارية",
      "بوابة التمويل والاستثمار",
      "بوابة الوظائف والتوظيف",
      "بوابة المشاريع المشتركة",
      "بوابة الاعتماد والشهادات",
    ],
    description:
      "المنصات الرقمية المتكاملة التي تقدم الخدمات المباشرة للأعضاء وتوفر الأدوات اللازمة لتطوير أعمالهم.",
  },
];

export default function PyramidPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            title="منظومة المسميات"
            subtitle="الهيكل التنظيمي الهرمي لاتحاد الشركات الدولي"
          />

          {/* Pyramid */}
          <div className="flex flex-col items-center gap-4">
            {pyramidLayers.map((layer) => (
              <div key={layer.level} className={`w-full ${layer.width}`}>
                <button
                  type="button"
                  onClick={() =>
                    setExpanded(expanded === layer.level ? null : layer.level)
                  }
                  className={`glass relative w-full rounded-xl border ${layer.color} px-6 py-5 transition-all duration-300 ${
                    expanded === layer.level ? layer.glowClass : ""
                  } hover:scale-[1.01]`}
                >
                  {/* HEADER */}
                  <div className="relative flex items-center justify-center">
                    {/* ✅ Centered group (icon + text horizontally) */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${layer.color}`}
                      >
                        <layer.icon size={22} className={layer.textColor} />
                      </div>

                      <div className="text-right">
                        <h3
                          className={`font-heading text-base font-bold ${layer.textColor}`}
                        >
                          {layer.title}
                        </h3>
                        <span className="text-[10px] text-muted-foreground">
                          {layer.titleEn}
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="absolute right-0">
                      {expanded === layer.level ? (
                        <ChevronUp size={18} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown
                          size={18}
                          className="text-muted-foreground"
                        />
                      )}
                    </div>
                  </div>
                </button>

                {expanded === layer.level && (
                  <div className="mt-2 animate-fade-in rounded-xl bg-card/60 p-5">
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {layer.details.map((d) => (
                        <div
                          key={d}
                          className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2"
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${layer.color}`}
                          />
                          <span className="text-xs text-foreground/80">
                            {d}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Indicator */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Crown size={14} className="text-primary" />
              <span>أعلى سلطة</span>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-border to-transparent" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Layers size={14} className="text-muted-foreground" />
              <span>قاعدة الخدمات</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}