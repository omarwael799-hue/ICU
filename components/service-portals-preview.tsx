"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Briefcase,
  Banknote,
  UserCheck,
  FolderKanban,
  BadgeCheck,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const portals = [
  { icon: Briefcase, title: "بوابة الفرص", desc: "فرص تجارية واستثمارية حصرية للأعضاء" },
  { icon: Banknote, title: "بوابة التمويل", desc: "حلول تمويلية وربط مع مؤسسات مالية دولية" },
  { icon: UserCheck, title: "بوابة الوظائف", desc: "فرص عمل ومناصب قيادية في الشركات الأعضاء" },
  { icon: FolderKanban, title: "بوابة المشاريع", desc: "مشاريع مشتركة وشراكات استراتيجية" },
  { icon: BadgeCheck, title: "بوابة الاعتماد والشهادات", desc: "شهادات اعتماد دولية معترف بها" },
];

export default function ServicePortalsPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ heading refs
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const leftDotRef = useRef<HTMLSpanElement>(null);
  const rightDotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles.length = 0;
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(30, 144, 176, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ✅ Draw motion for the framed title (from edges → title, then dots)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const leftDot = leftDotRef.current;
    const rightDot = rightDotRef.current;

    if (!section || !leftLine || !rightLine) return;

    const ctx = gsap.context(() => {
      gsap.set(leftLine, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(rightLine, { scaleX: 0, transformOrigin: "100% 50%" });

      if (leftDot) gsap.set(leftDot, { opacity: 0, scale: 0.6 });
      if (rightDot) gsap.set(rightDot, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(leftLine, { scaleX: 1, duration: 0.95, ease: "power3.out" }, 0)
        .to(rightLine, { scaleX: 1, duration: 0.95, ease: "power3.out" }, 0.08);

      if (leftDot) {
        tl.to(leftDot, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2.2)" }, 0.78);
      }
      if (rightDot) {
        tl.to(rightDot, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2.2)" }, 0.82);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* ===== Framed Title (animated) ===== */}
        <div className="mb-6 flex items-center justify-center gap-10">
          {/* Left */}
          <div className="flex flex-1 items-center">
            <div
              ref={leftLineRef}
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(to right, rgba(201,168,76,.65) 0%, rgba(201,168,76,.35) 45%, rgba(201,168,76,0) 100%)",
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
              }}
            />
            <span
              ref={leftDotRef}
              className="ml-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]"
            />
          </div>

          <h2 className="shrink-0 font-heading text-2xl font-bold text-primary md:text-3xl">
            بوابات الخدمات
          </h2>

          {/* Right */}
          <div className="flex flex-1 items-center justify-end">
            <span
              ref={rightDotRef}
              className="mr-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]"
            />
            <div
              ref={rightLineRef}
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(to left, rgba(201,168,76,.65) 0%, rgba(201,168,76,.35) 45%, rgba(201,168,76,0) 100%)",
                maskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,.35) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,.35) 75%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        </div>

        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          حلول متكاملة لدعم وتطوير أعمالكم
        </p>

        {/* ✅ Panels (Hover upgraded) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {portals.map((p) => (
            <div
              key={p.title}
              className="
                glass-teal group relative overflow-hidden rounded-xl p-5 text-center
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:scale-[1.03]
                hover:shadow-2xl hover:shadow-secondary/20
              "
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {/* ✨ Shine sweep */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(30,144,176,.18) 30%, rgba(201,168,76,.12) 50%, transparent 75%)",
                  transform: "translateX(-25%) rotate(12deg)",
                }}
              />

              {/* ✨ Border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 transition-all duration-500 group-hover:ring-secondary/35" />

              {/* ✨ Aura behind icon */}
              <div className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-secondary/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
                <div
                  className="
                    mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full
                    bg-secondary/10 transition-all duration-500
                    group-hover:bg-secondary/20 group-hover:scale-110
                  "
                >
                  <p.icon
                    size={22}
                    className="text-secondary transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="font-heading text-sm font-bold text-foreground transition-all duration-500 group-hover:tracking-wide">
                  {p.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80">
                  {p.desc}
                </p>
              </div>

              {/* ✨ Bottom glow */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-secondary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="glass-teal glow-teal inline-block rounded-lg px-6 py-3 text-sm font-semibold text-secondary transition-all hover:bg-secondary/10"
          >
            استكشف جميع البوابات
          </Link>
        </div>
      </div>
    </section>
  );
}