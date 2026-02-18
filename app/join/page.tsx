"use client";

import React from "react"

import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";

const packages = [
  { value: "bronze", label: "برونزي - BRONZE" },
  { value: "silver", label: "فضي - SILVER" },
  { value: "gold", label: "ذهبي - GOLD" },
  { value: "platinum", label: "بلاتيني - PLATINUM" },
  { value: "vvip", label: "كبار الشخصيات - VVIP" },
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-2xl px-4">
          <SectionHeading
            title="انضم الآن"
            subtitle="قدّم طلب انضمامك إلى اتحاد الشركات الدولي"
          />

          {submitted ? (
            <div className="glass glow-gold rounded-xl p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary">
                تم استلام طلبك بنجاح
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                سيتم التواصل معك خلال 48 ساعة لاستكمال إجراءات العضوية.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-xl p-6 md:p-8"
            >
              <div className="flex flex-col gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    الاسم الكامل
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    الدولة
                  </label>
                  <input
                    id="country"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="دولة الإقامة أو المقر الرئيسي"
                  />
                </div>

                {/* Sector */}
                <div>
                  <label
                    htmlFor="sector"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    المجال
                  </label>
                  <input
                    id="sector"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="مجال العمل أو التخصص"
                  />
                </div>

                {/* Phone + Email row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      الهاتف
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      dir="ltr"
                      className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="+000 000 0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      dir="ltr"
                      className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Package */}
                <div>
                  <label
                    htmlFor="package"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    اختيار الباقة
                  </label>
                  <select
                    id="package"
                    required
                    className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  >
                    <option value="">اختر مستوى العضوية</option>
                    {packages.map((pkg) => (
                      <option key={pkg.value} value={pkg.value}>
                        {pkg.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-primary py-3 font-heading text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  إرسال طلب الانضمام
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
