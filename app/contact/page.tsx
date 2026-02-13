"use client";

import React, { useState } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Send,
  Building2,
} from "lucide-react";

const offices = [
  {
    title: "المقر الرئيسي",
    titleEn: "Headquarters",
    location: "London, United Kingdom",
    address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
    icon: Building2,
    textColor: "text-primary",
    borderColor: "border-primary/40",
  },
  {
    title: "المكتب الإقليمي",
    titleEn: "Regional Office",
    location: "Istanbul, Turkey",
    address: "Levent, Nispetiye Caddesi, Beşiktaş, Istanbul, 34340",
    icon: MapPin,
    textColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
];

export default function ContactPage() {
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
            title="تواصل معنا"
            subtitle="نسعد بتواصلكم ونتطلع للإجابة على استفساراتكم"
          />

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Info Side */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              {/* Office Cards */}
              {offices.map((office) => (
                <div
                  key={office.title}
                  className={`glass rounded-xl border ${office.borderColor} p-5 transition-all duration-300 hover:glow-gold`}
                >
                  {/* Header */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    {/* icon (left) */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <office.icon size={20} className={office.textColor} />
                    </div>

                    {/* titles (right aligned) */}
                    <div className="min-w-0 flex-1 text-right">
                      <h3
                        className={`font-heading text-sm font-bold ${office.textColor}`}
                      >
                        {office.title}
                      </h3>

                      {/* English line: keep LTR but align to the right visually */}
                      <div
                        className="mt-0.5 text-[10px] text-muted-foreground"
                        dir="ltr"
                      >
                        <span className="block truncate text-right">
                          {office.titleEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-2">
                    {/* location */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe size={14} className="shrink-0 text-secondary" />
                      <span dir="ltr" className="truncate text-left">
                        {office.location}
                      </span>
                    </div>

                    {/* address */}
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <MapPin
                        size={14}
                        className="mt-0.5 shrink-0 text-secondary"
                      />
                      <span dir="ltr" className="text-left">
                        {office.address}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Details */}
              <div className="glass rounded-xl p-5">
                <h4 className="mb-4 text-right font-heading text-sm font-bold text-primary">
                  معلومات التواصل
                </h4>

                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:info@ic-union.com"
                    className="flex items-center justify-between gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex items-center gap-3" dir="ltr">
                      <Mail size={16} className="shrink-0 text-secondary" />
                      <span>info@ic-union.com</span>
                    </div>
                  </a>

                  <a
                    href="tel:+440000000000"
                    className="flex items-center justify-between gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex items-center gap-3" dir="ltr">
                      <Phone size={16} className="shrink-0 text-secondary" />
                      <span>+44 000 000 0000</span>
                    </div>
                  </a>

                  <a
                    href="https://ic-union.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <div className="flex items-center gap-3" dir="ltr">
                      <Globe size={16} className="shrink-0 text-secondary" />
                      <span>ic-union.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="glass glow-gold rounded-xl p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Send size={28} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary">
                    تم إرسال رسالتك بنجاح
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك مع اتحاد
                    الشركات الدولي.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-xl p-6 md:p-8"
                >
                  <h3 className="mb-6 font-heading text-lg font-bold text-foreground">
                    أرسل رسالة
                  </h3>

                  <div className="flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-sm font-semibold text-foreground"
                        >
                          الاسم
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                          placeholder="الاسم الكامل"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-sm font-semibold text-foreground"
                        >
                          البريد الإلكتروني
                        </label>
                        <input
                          id="contact-email"
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
                        htmlFor="contact-subject"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        الموضوع
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="موضوع الرسالة"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-sm font-semibold text-foreground"
                      >
                        الرسالة
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        className="w-full rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-heading text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Send size={16} />
                      <span>إرسال الرسالة</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}