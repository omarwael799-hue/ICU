"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "#about" },
  { label: "العضويات", href: "/memberships" },
  { label: "منظومة المسميات", href: "/pyramid" },
  { label: "بوابات الخدمات", href: "/services" },
  { label: "مجتمع الأعضاء", href: "/community" },
  { label: "التحقق من العضوية", href: "/verify" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 glass border-b border-border/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src="https://ic-union.com/wp-content/uploads/2024/11/931a979d-0d07-4020-9005-3a09f038392a-300x300.png"
            alt="ICU Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <div className="hidden flex-col sm:flex">
            <span className="text-gold-gradient font-heading text-sm font-bold leading-tight">
              اتحاد الشركات الدولي
            </span>
            <span className="text-xs text-muted-foreground">
              International Companies Union
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-3 py-2 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
              <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 sm:block"
          >
            انضم الآن
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="glass border-t border-border/20 px-4 pb-4 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-border/10 py-3 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/join"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-lg bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            انضم الآن
          </Link>
        </nav>
      )}
    </header>
  );
}
