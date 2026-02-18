"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const globeWrapRef = useRef<HTMLDivElement>(null);
  const globeCoreRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ✅ Particles (خفيفة + حيّة)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    }[] = [];

    const resize = () => {
      // devicePixelRatio for crispness
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.floor((w * h) / 22000); // adaptive
      const n = Math.max(55, Math.min(110, count));

      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 2 + 0.6,
          a: Math.random() * 0.55 + 0.12,
        });
      }
    };

    resize();
    seed();

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.a})`;
        ctx.fill();
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const t = 1 - dist / 140;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(30, 144, 176, ${0.09 * t})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ✅ Globe motion (smooth + يبدأ من تحت شوية)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const globeWrap = globeWrapRef.current;
    const globeCore = globeCoreRef.current;
    if (!hero || !globeWrap || !globeCore) return;

    const ctx = gsap.context(() => {
      gsap.set(hero, { perspective: 1400 });

      gsap.set(globeWrap, {
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        willChange: "transform",
        force3D: true,
      });

      gsap.set(globeCore, {
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        willChange: "transform",
        force3D: true,
      });

      // ✅ Smooth setters (بدون jump)
      const setY = gsap.quickSetter(globeWrap, "y", "px");
      const setRY = gsap.quickSetter(globeCore, "rotationY", "deg");
      const setRX = gsap.quickSetter(globeCore, "rotationX", "deg");
      const setRZ = gsap.quickSetter(globeCore, "rotationZ", "deg");

      // ✅ يبدأ من تحت شوية (y موجبة)
      const startY = 100;
      const endY = -80; // يطلع بسيط مع النزول (حركة سينماتيك)
      const startRY = -25;
      const endRY = 520;
      const startRX = 18;
      const endRX = 26;
      const startRZ = 7;
      const endRZ = 12;

      // ✅ set initial state مرة واحدة (عشان مفيش فرقعة أول scroll)
      setY(startY);
      setRY(startRY);
      setRX(startRX);
      setRZ(startRZ);

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.1, // ✅ سمووث قوي
        fastScrollEnd: true,
        onUpdate: (self) => {
          const p = self.progress; // 0..1
          setY(startY + (endY - startY) * p);
          setRY(startRY + (endRY - startRY) * p);
          setRX(startRX + (endRX - startRX) * p);
          setRZ(startRZ + (endRZ - startRZ) * p);
        },
      });

      ScrollTrigger.refresh();
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />

      {/* ✅ Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-90"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

      {/* 🌍 Globe */}
      <div
        ref={globeWrapRef}
        className="pointer-events-none absolute -top-40 -left-52 z-[2]
                   h-[780px] w-[780px] opacity-90
                   md:-top-52 md:-left-72
                   md:h-[1000px] md:w-[1000px]"
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        <div
          ref={globeCoreRef}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(-24px) scale(0.985)",
              opacity: 0.30,
              filter: "blur(0.25px)",
            }}
          >
            <GlobeSVG />
          </div>

          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(24px)",
              opacity: 0.92,
            }}
          >
            <GlobeSVG />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-28 pb-20 text-center md:pt-32">
        <img
          src="https://storage.googleapis.com/msgsndr/werPeYZO9zeHeXsv0ktK/media/69955bc25c2265db681610cc.png"
          alt="ICU Logo"
          width={120}
          height={120}
          className="mx-auto mb-8 h-28 w-28 object-contain drop-shadow-lg md:h-32 md:w-32"
        />

        {/* ✅ عنوان من غير قص */}
        <h1 className="text-gold-gradient font-heading text-3xl font-bold overflow-visible md:text-5xl lg:text-6xl">
          <span className="inline-block align-middle leading-[1.7] pt-[3px] pb-[8px]">
            اتحاد الشركات الدولي
          </span>
        </h1>

        <p
          className="mt-2 font-heading text-lg font-semibold tracking-wide text-secondary md:text-xl"
          dir="ltr"
        >
          International Companies Union (ICU)
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          منصة عالمية تجمع الشركات والمؤسسات تحت مظلة اتحاد دولي موحد لتعزيز
          التعاون والتمثيل والاعتماد المهني على المستوى الدولي.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/memberships"
            className="glass glow-gold w-full rounded-lg px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 sm:w-auto"
          >
            اكتشف العضويات
          </Link>
          <Link
            href="/councils"
            className="glass-teal glow-teal w-full rounded-lg px-6 py-3 text-sm font-semibold text-secondary transition-all hover:bg-secondary/10 sm:w-auto"
          >
            المجالس والسفراء والمستشارون
          </Link>
          <Link
            href="/join"
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 sm:w-auto"
          >
            انضم الآن
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-card to-transparent" />
    </section>
  );
}

function GlobeSVG() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full">
      <defs>
        <radialGradient id="gGlow" cx="30%" cy="20%" r="70%">
          <stop offset="0%" stopColor="rgba(201,168,76,.35)" />
          <stop offset="55%" stopColor="rgba(30,144,176,.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        <linearGradient id="gStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(201,168,76,.75)" />
          <stop offset="60%" stopColor="rgba(30,144,176,.65)" />
          <stop offset="100%" stopColor="rgba(201,168,76,.45)" />
        </linearGradient>

        <filter id="softGlow">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="300" cy="300" r="260" fill="url(#gGlow)" />

      <circle
        cx="300"
        cy="300"
        r="220"
        fill="none"
        stroke="url(#gStroke)"
        strokeWidth="2.3"
        opacity="0.9"
        filter="url(#softGlow)"
      />

      <g fill="none" stroke="url(#gStroke)" strokeWidth="1.25" opacity="0.72" filter="url(#softGlow)">
        <ellipse cx="300" cy="300" rx="70" ry="220" />
        <ellipse cx="300" cy="300" rx="120" ry="220" />
        <ellipse cx="300" cy="300" rx="170" ry="220" />
        <ellipse cx="300" cy="300" rx="210" ry="220" />
      </g>

      <g fill="none" stroke="url(#gStroke)" strokeWidth="1.15" opacity="0.58" filter="url(#softGlow)">
        <ellipse cx="300" cy="300" rx="220" ry="35" />
        <ellipse cx="300" cy="300" rx="220" ry="75" />
        <ellipse cx="300" cy="300" rx="220" ry="115" />
        <ellipse cx="300" cy="300" rx="220" ry="155" />
        <ellipse cx="300" cy="300" rx="220" ry="195" />
      </g>

      <g fill="none" stroke="url(#gStroke)" strokeWidth="1.05" opacity="0.5" filter="url(#softGlow)">
        <path d="M 95 340 C 190 190, 410 190, 505 340" />
        <path d="M 95 260 C 190 410, 410 410, 505 260" />
      </g>
    </svg>
  );
}