"use client";

import { useState } from "react";
import { X } from "lucide-react";
import SectionHeading from "./section-heading";

const partnerLogos = [
  {
    src: "https://ic-union.com/wp-content/uploads/2024/11/NFI5Fz1w_400x400.jpg",
    name: "Partner 1",
  },
  {
    src: "https://ic-union.com/wp-content/uploads/2024/11/i832065.jpg",
    name: "Partner 2",
  },
  {
    src: "https://ic-union.com/wp-content/uploads/2024/11/260525342_1525652434456910_4406498102430586682_n-300x300.jpg",
    name: "Partner 3",
  },
  {
    src: "https://ic-union.com/wp-content/uploads/2024/11/Certified-Study-Centre-Logo-300x143.png",
    name: "Certified Study Centre",
  },
  {
    src: "https://ic-union.com/wp-content/uploads/2024/11/IAF-234x300.png",
    name: "IAF",
  },
  {
    src: "https://ic-union.com/wp-content/uploads/2024/11/20230220_1676899455-878-1-300x264.png",
    name: "Partner 6",
  },
];

export default function PartnersLogosSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="شركاؤنا واعتماداتنا"
          subtitle="مؤسسات وهيئات نتعاون معها لتعزيز المصداقية والاعتماد الدولي"
        />

        {/* ✅ Clear grid (no marquee) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partnerLogos.map((p) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(p.src)}
              className="glass group relative flex min-h-[140px] items-center justify-center overflow-hidden rounded-2xl border border-border/25 bg-card/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
              aria-label={`Open ${p.name}`}
            >
              {/* subtle shine */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(201,168,76,.12) 28%, rgba(30,144,176,.08) 55%, transparent 78%)",
                  transform: "translateX(-22%) rotate(10deg)",
                }}
              />

              {/* logo */}
<img
  src={p.src}
  alt={p.name}
  className="max-h-[110px] w-auto max-w-[92%] object-contain transition-transform duration-300 group-hover:scale-[1.08]"
/>
              {/* tiny bottom fade */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-primary/7 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Fullscreen preview */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <img
            src={open}
            alt="Partner logo"
            className="max-h-[88vh] max-w-[92vw] select-none"
            style={{ objectFit: "contain" }}
            draggable={false}
          />
        </div>
      )}
    </section>
  );
}