"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Particle = {
  size: number;
  left: number;
  top: number;
  color: string;
  delay: number;
  duration: number;
};

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const timerRef = useRef<number | null>(null);

  // ✅ generate particles ONCE (no random in render)
  useEffect(() => {
    const next = Array.from({ length: 20 }).map((_, i) => {
      const size = Math.random() * 4 + 2; // 2..6
      return {
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: i % 3 === 0 ? "hsl(43, 50%, 54%)" : "hsl(195, 70%, 35%)",
        opacity: 0.3,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      } as any;
    });

    setParticles(next);
  }, []);

  // ✅ progress loop (clamped + cleaned up)
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        // controlled random step
        const next = prev + (Math.random() * 10 + 6); // 6..16
        return Math.min(next, 100);
      });
    }, 80);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  // ✅ when progress hits 100, stop timer + hide after fade
  useEffect(() => {
    if (progress < 100) return;

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const t = window.setTimeout(() => setVisible(false), 450);
    return () => window.clearTimeout(t);
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              backgroundColor: p.color,
              opacity: 0.3,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating ring */}
      <div className="relative mb-8">
        <div
          className="h-24 w-24 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-secondary"
          style={{ animationDuration: "2s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://storage.googleapis.com/msgsndr/werPeYZO9zeHeXsv0ktK/media/69955bc25c2265db681610cc.png"
            alt="ICU Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
      </div>

      {/* Text */}
      <p className="text-gold-gradient mb-6 font-heading text-lg font-bold">
        اتحاد الشركات الدولي
      </p>

      {/* Progress bar */}
      <div className="h-1 w-48 overflow-hidden rounded-full bg-muted/30">
        <div
          className="h-full rounded-full bg-gradient-to-l from-secondary via-primary to-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-18px);
          }
        }
      `}</style>
    </div>
  );
}