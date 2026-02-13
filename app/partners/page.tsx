"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  Globe,
  Handshake,
  Filter,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type Partner = {
  name: string;
  nameEn: string;
  sector: string;
  country: string;
  certified: boolean;
};

const partners: Partner[] = [
  {
    name: "مجموعة الخليج للاستثمار",
    nameEn: "Gulf Investment Group",
    sector: "استثمار",
    country: "الإمارات",
    certified: true,
  },
  {
    name: "شركة التقنية الأوروبية",
    nameEn: "European Tech Corp",
    sector: "تقنية",
    country: "ألمانيا",
    certified: true,
  },
  {
    name: "مؤسسة التجارة الآسيوية",
    nameEn: "Asian Trade Foundation",
    sector: "تجارة",
    country: "سنغافورة",
    certified: false,
  },
  {
    name: "شركة البناء والتطوير",
    nameEn: "Build & Develop Co.",
    sector: "بناء",
    country: "تركيا",
    certified: true,
  },
  {
    name: "مجموعة الصحة العالمية",
    nameEn: "Global Health Group",
    sector: "صحة",
    country: "المملكة المتحدة",
    certified: true,
  },
  {
    name: "شركة الطاقة المستدامة",
    nameEn: "Sustainable Energy Ltd",
    sector: "طاقة",
    country: "هولندا",
    certified: false,
  },
  {
    name: "مؤسسة التعليم الدولية",
    nameEn: "International Education Foundation",
    sector: "تعليم",
    country: "كندا",
    certified: true,
  },
  {
    name: "شركة اللوجستيات العالمية",
    nameEn: "Global Logistics Inc",
    sector: "لوجستيات",
    country: "الصين",
    certified: false,
  },
  {
    name: "مجموعة الإعلام الرقمي",
    nameEn: "Digital Media Group",
    sector: "إعلام",
    country: "الولايات المتحدة",
    certified: true,
  },
];

const sectors = [
  "الكل",
  "استثمار",
  "تقنية",
  "تجارة",
  "بناء",
  "صحة",
  "طاقة",
  "تعليم",
  "لوجستيات",
  "إعلام",
];

export default function PartnersPage() {
  const [activeFilter, setActiveFilter] = useState("الكل");

  const filtered =
    activeFilter === "الكل"
      ? partners
      : partners.filter((p) => p.sector === activeFilter);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="الشركاء"
            subtitle="شبكة شراكات عالمية تمتد عبر القارات والقطاعات"
          />

          {/* Become a Partner CTA */}
          <div className="glass glow-gold mx-auto mb-12 flex max-w-lg flex-col items-center gap-4 rounded-xl p-6 text-center sm:flex-row sm:text-right">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Handshake size={28} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-sm font-bold text-primary">
                هل ترغب في أن تصبح شريكاً؟
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                انضم إلى شبكة شركائنا المعتمدين واستفد من الفرص الحصرية
              </p>
            </div>
            <Link
              href="/join"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <span>تقدم الآن</span>
              <ArrowLeft size={14} />
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            {sectors.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Partner Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((partner) => (
              <div
                key={partner.name}
                className="glass rounded-xl border border-border/20 p-5 transition-all duration-300 hover:glow-teal"
              >
                <div className="mb-3 flex items-center gap-3" dir="ltr">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Building2 size={22} className="text-secondary" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-heading text-sm font-bold text-foreground">
                      {partner.name}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">
                      {partner.nameEn}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Globe size={12} className="text-secondary" />
                      {partner.country}
                    </span>
                    <span className="rounded bg-muted/40 px-2 py-0.5">
                      {partner.sector}
                    </span>
                  </div>
                  {partner.certified && (
                    <span className="flex items-center gap-1 text-[10px] text-primary">
                      <BadgeCheck size={14} />
                      معتمد
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
