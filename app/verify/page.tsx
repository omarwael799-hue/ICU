"use client";

import React from "react"

import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";
import { Search, ShieldCheck, AlertCircle } from "lucide-react";

interface VerificationResult {
  name: string;
  type: string;
  title: string;
  status: string;
  expiry: string;
}

const mockData: Record<string, VerificationResult> = {
  "ICU-2024-001": {
    name: "شركة التقنية المتقدمة",
    type: "ذهبي - GOLD",
    title: "عضو معتمد",
    status: "فعّال",
    expiry: "2026-12-31",
  },
  "ICU-2024-002": {
    name: "مجموعة الأعمال الدولية",
    type: "بلاتيني - PLATINUM",
    title: "سفير قطاعي",
    status: "فعّال",
    expiry: "2027-06-30",
  },
};

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = mockData[query.trim().toUpperCase()];
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-2xl px-4">
          <SectionHeading
            title="التحقق من العضوية"
            subtitle="أدخل رقم العضوية للتحقق من صلاحية ومعلومات العضو"
          />

          <form
            onSubmit={handleSearch}
            className="glass mb-8 rounded-xl p-6"
          >
            <label
              htmlFor="membership-number"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              رقم العضوية
            </label>
            <div className="flex gap-3">
              <input
                id="membership-number"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                dir="ltr"
                className="flex-1 rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                placeholder="ICU-2024-001"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <Search size={16} />
                <span>تحقق</span>
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {"جرّب: ICU-2024-001 أو ICU-2024-002"}
            </p>
          </form>

          {/* Result */}
          {searched && result && (
            <div className="glass glow-gold rounded-xl p-6">
              <div className="mb-4 flex items-center gap-3" dir="ltr">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary">
                    عضوية موثقة
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Verified Membership
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "الاسم", value: result.name },
                  { label: "نوع العضوية", value: result.type },
                  { label: "المسمى", value: result.title },
                  { label: "الحالة", value: result.status },
                  { label: "تاريخ الانتهاء", value: result.expiry },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg bg-card/60 p-3"
                  >
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searched && notFound && (
            <div className="glass rounded-xl border border-destructive/30 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle size={24} className="text-destructive" />
              </div>
              <h3 className="font-heading text-base font-bold text-destructive">
                لم يتم العثور على عضوية
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                تأكد من رقم العضوية وحاول مرة أخرى
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
