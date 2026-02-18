import Link from "next/link";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "من نحن", href: "#about" },
  { label: "العضويات", href: "/memberships" },
  { label: "منظومة المسميات", href: "/pyramid" },
  { label: "مجتمع الأعضاء", href: "/community" },
  { label: "بوابات الخدمات", href: "/services" },
  { label: "التحقق من العضوية", href: "/verify" },
  { label: "تواصل معنا", href: "/contact" },
];

const policyLinks = [
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "الشروط والأحكام", href: "/terms" },
  { label: "سياسة الخصوصية", href: "/privacy" },
];

const MAP_URL =
  "https://www.google.com/maps?ll=51.574436,-0.428682&z=13&t=m&hl=en-GB&gl=US&mapclient=embed&q=House,+2nd+Floor+17+King+Edwards+Rd+London,+Ruislip+HA4+7AE,+UK";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/80">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* ✅ خلي Contact أعرض: grid-cols-5 + Contact col-span-2 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* About Column */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="https://storage.googleapis.com/msgsndr/werPeYZO9zeHeXsv0ktK/media/69955bc25c2265db681610cc.png"
                alt="ICU Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-gold-gradient font-heading text-sm font-bold">
                اتحاد الشركات الدولي
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              منصة عالمية تجمع الشركات والمؤسسات تحت مظلة اتحاد دولي موحد
              لتعزيز التعاون والتمثيل والاعتماد المهني على المستوى الدولي.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 font-heading text-sm font-bold text-primary">
              روابط سريعة
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 font-heading text-sm font-bold text-primary">
              السياسات
            </h4>
            <ul className="flex flex-col gap-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Contact (أعرض) */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 font-heading text-sm font-bold text-primary">
              تواصل معنا
            </h4>

            {/* contact lines first */}
            <ul className="flex flex-col gap-3">
              <li
                className="flex items-center gap-2 text-sm text-muted-foreground"
                dir="ltr"
              >
                <Globe size={16} className="shrink-0 text-secondary" />
                <span>London, United Kingdom</span>
              </li>

              <li
                className="flex items-center gap-2 text-sm text-muted-foreground"
                dir="ltr"
              >
                <Mail size={16} className="shrink-0 text-secondary" />
                <span>info@ic-union.com</span>
              </li>

              <li
                className="flex items-center gap-2 text-sm text-muted-foreground"
                dir="ltr"
              >
                <Phone size={16} className="shrink-0 text-secondary" />
                <span>00447366529291</span>
              </li>
            </ul>

            {/* Find us + map */}
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-secondary" />
                <h4 className="font-heading text-sm font-bold text-primary">
                  Find us:
                </h4>
              </div>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full overflow-hidden rounded-xl border border-border/30 bg-card/40 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                aria-label="Open map"
              >
                {/* soft glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
                </div>

                {/* grid + stars */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(201,168,76,.35) 1px, transparent 1px), radial-gradient(rgba(30,144,176,.25) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "18px 18px, 26px 26px, 64px 64px, 64px 64px",
                    backgroundPosition: "0 0, 10px 12px, 0 0, 0 0",
                    maskImage:
                      "radial-gradient(90% 75% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,.92) 55%, rgba(0,0,0,.1) 82%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "radial-gradient(90% 75% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,.92) 55%, rgba(0,0,0,.1) 82%, rgba(0,0,0,0) 100%)",
                  }}
                />

                {/* ✅ padding أكبر */}
                <div className="relative p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.55)]" />
                      <span className="text-xs font-semibold text-foreground/90">
                        London — Ruislip (HA4 7AE)
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Open →
                    </span>
                  </div>

                  {/* ✅ faux map (أكبر ارتفاعاً) */}
                  <div className="relative overflow-hidden rounded-lg border border-border/30 bg-background/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />

                    <div className="absolute left-[58%] top-[44%]">
                      <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-secondary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="block h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_16px_rgba(30,144,176,.55)]" />
                    </div>

                    <svg
                      className="absolute inset-0 h-full w-full opacity-70"
                      viewBox="0 0 600 240"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M40,190 C140,120 190,160 260,110 C330,60 420,120 520,70"
                        fill="none"
                        stroke="rgba(201,168,76,.35)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M80,70 C160,120 240,70 320,120 C400,170 470,140 560,180"
                        fill="none"
                        stroke="rgba(30,144,176,.30)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="260"
                        cy="110"
                        r="3.2"
                        fill="rgba(201,168,76,.75)"
                      />
                      <circle
                        cx="520"
                        cy="70"
                        r="3.2"
                        fill="rgba(30,144,176,.75)"
                      />
                    </svg>

                    <div className="relative h-[150px] md:h-[170px]" />
                  </div>

                  {/* address panel */}
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-border/30 bg-card/50 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-secondary" />
                      <span className="text-[12px] text-muted-foreground" dir="ltr">
                        17 King Edwards Rd, 2nd Floor
                      </span>
                    </div>
                    <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                      ICU
                    </span>
                  </div>

                  {/* hover shine */}
                  <div
                    className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 0%, rgba(201,168,76,.14) 28%, rgba(30,144,176,.10) 55%, transparent 78%)",
                      transform: "translateX(-22%) rotate(10deg)",
                    }}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-8" />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {"© 2026 International Companies Union. All Rights Reserved."}
          </p>

          {/* ✅ Social icons أكبر */}
          <div className="flex items-center gap-3">
            {/* Snapchat */}
            <a
              href="https://www.snapchat.com/@ic.union1?invite_id=_LDWWPq-&locale=ar_IQ&share_id=hJeYijM-Tge3KN395QtJlw&sid=bd95253ec83c4a2e832ca35b6df85940"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="Snapchat"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-3.3 0-6 2.7-6 6v3c0 .6-.4 1-1 1s-1 .4-1 1 .4 1 1 1c1.1 0 2 .9 2 2 0 .8-.7 1.5-1.5 1.5H5c-.6 0-1 .4-1 1s.4 1 1 1h1c1.7 0 3 1.3 3 3h6c0-1.7 1.3-3 3-3h1c.6 0 1-.4 1-1s-.4-1-1-1h-.5c-.8 0-1.5-.7-1.5-1.5 0-1.1.9-2 2-2 .6 0 1-.4 1-1s-.4-1-1-1-1-.4-1-1V8c0-3.3-2.7-6-6-6z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCDND8tgHvmHQ3tNo9A7ZRHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="YouTube"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a2.958 2.958 0 0 0-2.08-2.092C19.598 3.5 12 3.5 12 3.5s-7.598 0-9.418.594A2.958 2.958 0 0 0 .502 6.186 30.02 30.02 0 0 0 0 12a30.02 30.02 0 0 0 .502 5.814 2.958 2.958 0 0 0 2.08 2.092C4.402 20.5 12 20.5 12 20.5s7.598 0 9.418-.594a2.958 2.958 0 0 0 2.08-2.092A30.02 30.02 0 0 0 24 12a30.02 30.02 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@user6104258841787?_t=ZN-8u6EAo6pFFm&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="TikTok"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8.5a6.5 6.5 0 0 1-4.5-1.8V15a6 6 0 1 1-6-6c.5 0 1 .05 1.5.15v3.1a2.5 2.5 0 1 0 2.5 2.5V2h3a6.5 6.5 0 0 0 3.5 3.5v3z" />
              </svg>
            </a>

            {/* Instagram (مظبوطة) */}
            <a
              href="https://www.instagram.com/ic.union1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 7.5A3 3 0 1 1 15 12a3.003 3.003 0 0 1-3 3zm4.75-7.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/ic.union1?mibextid=LQQJ4d&rdid=JArt06fkQpmzGr4r&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19m726dSQh%2F%3Fmibextid%3DLQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="Facebook"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com/ic_union1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="X"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/ic-union/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
              aria-label="LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}