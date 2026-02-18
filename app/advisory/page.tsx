"use client";

import React from "react"

import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";
import {
  BadgeCheck,
  Briefcase,
  Globe,
  GraduationCap,
  Scale,
  Building2,
  TrendingUp,
  Send,
} from "lucide-react";

const consultants = [
  {
    name: "د. أحمد المنصوري",
    specialty: "الاستشارات الاستراتيجية والحوكمة",
    region: "الشرق الأوسط وشمال أفريقيا",
    icon: Scale,
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    name: "سارة ويليامز",
    specialty: "التجارة الدولية والتصدير",
    region: "أوروبا والمملكة المتحدة",
    icon: Globe,
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    name: "د. محمد الراشد",
    specialty: "الاستثمار والتمويل الدولي",
    region: "الخليج العربي",
    icon: TrendingUp,
    textColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
  {
    name: "ليلى العتيبي",
    specialty: "ريادة الأعمال وتطوير المشاريع",
    region: "آسيا والمحيط الهادئ",
    icon: Briefcase,
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    name: "جيمس أندرسون",
    specialty: "الامتثال والتنظيم الدولي",
    region: "أمريكا الشمالية",
    icon: BadgeCheck,
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    name: "د. فاطمة النعيمي",
    specialty: "التعليم والتطوير المهني",
    region: "العالم العربي",
    icon: GraduationCap,
    textColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
];

const consultationFields = [
  "الاستشارات الاستراتيجية",
  "التوسع الدولي",
  "حوكمة الشركات",
  "التمويل والاستثمار",
  "الامتثال والتنظيم",
  "التحول الرقمي",
  "إدارة المخاطر",
  "تطوير الأعمال",
];

export default function AdvisoryPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="الخدمات الاستشارية"
            subtitle="استشارات مهنية معتمدة من خبراء دوليين في مختلف التخصصات"
          />

          {/* Certified Badge */}
          <div className="glass glow-gold mx-auto mb-12 flex max-w-md items-center gap-4 rounded-xl p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <BadgeCheck size={28} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-primary">
                مستشارون معتمدون دولياً
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                جميع المستشارين حاصلون على اعتماد رسمي من اتحاد الشركات
                الدولي ويخضعون لمعايير جودة صارمة.
              </p>
            </div>
          </div>

          {/* Consultant Cards */}
          <div className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {consultants.map((c) => (
              <div
                key={c.name}
                className={`glass rounded-xl border ${c.borderColor} p-5 transition-all duration-300 hover:glow-teal`}
              >
                <div className="mb-3 flex items-center gap-3" dir="ltr">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card/80">
                    <c.icon size={22} className={c.textColor} />
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="font-heading text-sm font-bold text-foreground">
                      {c.name}
                    </h3>
                    <p className={`text-[10px] ${c.textColor}`}>
                      {c.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe size={12} className="text-secondary" />
                    {c.region}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-primary">
                    <BadgeCheck size={12} />
                    معتمد
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Fields */}
          <SectionHeading title="مجالات الاستشارة" />
          <div className="mx-auto mb-16 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-4">
            {consultationFields.map((field) => (
              <div
                key={field}
                className="glass rounded-lg p-3 text-center text-xs font-semibold text-foreground/80 transition-all hover:glow-teal"
              >
                {field}
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <SectionHeading
            title="حجز استشارة"
            subtitle="أرسل طلبك وسيتم تعيين المستشار المناسب لك"
          />
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="glass glow-gold rounded-xl p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Send size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary">
                  تم استلام طلبك
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  سيتواصل معك المستشار المختص خلال 24 ساعة عمل.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="adv-name"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        الاسم الكامل
                      </label>
                      <input
                        id="adv-name"
                        type="text"
                        required
                        className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="أدخل اسمك"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="adv-email"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        البريد الإلكتروني
                      </label>
                      <input
                        id="adv-email"
                        type="email"
                        required
                        dir="ltr"
                        className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="adv-field"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      مجال الاستشارة
                    </label>
                    <select
                      id="adv-field"
                      required
                      className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    >
                      <option value="">اختر المجال</option>
                      {consultationFields.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="adv-details"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      تفاصيل الطلب
                    </label>
                    <textarea
                      id="adv-details"
                      required
                      rows={4}
                      className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="اشرح ما تحتاجه بالتفصيل..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-lg bg-primary py-3 font-heading text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    إرسال طلب الاستشارة
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
