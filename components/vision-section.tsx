"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import gsap from "gsap";

const sliderImages = [
  "https://ic-union.com/wp-content/uploads/2025/06/Artboard-10.png",
  "https://ic-union.com/wp-content/uploads/2025/06/Artboard-4.png",
  "https://ic-union.com/wp-content/uploads/2025/06/Artboard-7.png",
  "https://ic-union.com/wp-content/uploads/2025/06/Artboard-6.png",
  "https://ic-union.com/wp-content/uploads/2025/06/Artboard-5.png",
  "https://ic-union.com/wp-content/uploads/2025/06/Artboard-8.png",
];

export default function VisionSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ✅ Fullscreen lightbox state
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  const allImages = [...sliderImages, ...sliderImages];

  const open = (index: number) => setOpenIndex(index);
  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + allImages.length) % allImages.length
    );
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % allImages.length));

  // ESC + arrows
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 420;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  // ✅ GSAP 3D on hover (raw images, no cards)
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(scroller, { perspective: 1200 });
    gsap.set(cards, {
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%",
      willChange: "transform",
    });

    const enterHandlers: Array<() => void> = [];
    const leaveHandlers: Array<() => void> = [];
    const moveHandlers: Array<(ev: MouseEvent) => void> = [];

    cards.forEach((card) => {
      const onEnter = () => {
        gsap.to(card, {
          duration: 0.8,
          ease: "power4.out",
          z: 90,
          scale: 1.03,
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          duration: 0.9,
          ease: "power4.out",
          rotateY: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
        });
      };

      const onMove = (ev: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const mx = (ev.clientX - rect.left) / rect.width;
        const my = (ev.clientY - rect.top) / rect.height;

        const ry = gsap.utils.clamp(-26, 26, (mx - 0.5) * 34);
        const rx = gsap.utils.clamp(-18, 18, -(my - 0.5) * 26);

        gsap.to(card, {
          duration: 0.22,
          ease: "power2.out",
          rotateY: ry,
          rotateX: rx,
          z: 95,
        });
      };

      enterHandlers.push(onEnter);
      leaveHandlers.push(onLeave);
      moveHandlers.push(onMove);

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("mousemove", onMove);
    });

    // center focus
    let raf = 0;
    const updateCenterFocus = () => {
      const center =
        scroller.getBoundingClientRect().left + scroller.clientWidth / 2;

      cards.forEach((card) => {
        if (card.matches(":hover")) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(center - cardCenter);
        const t = gsap.utils.clamp(0, 1, 1 - dist / 520);

        gsap.to(card, {
          duration: 0.35,
          ease: "power2.out",
          scale: 1 + 0.06 * t,
          z: 55 * t,
          rotateY: 0,
          rotateX: 0,
        });
      });

      raf = requestAnimationFrame(updateCenterFocus);
    };

    raf = requestAnimationFrame(updateCenterFocus);

    return () => {
      cancelAnimationFrame(raf);
      cards.forEach((card, idx) => {
        card.removeEventListener("mouseenter", enterHandlers[idx]);
        card.removeEventListener("mouseleave", leaveHandlers[idx]);
        card.removeEventListener("mousemove", moveHandlers[idx]);
      });
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !isDragging) {
        const { scrollLeft: sl, scrollWidth, clientWidth } = scrollRef.current;
        if (sl + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
        }
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* ===== Framed Title ===== */}
        <div className="mb-6 flex items-center justify-center gap-10">
          {/* Left line */}
          <div className="flex flex-1 items-center">
            <div
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
            <span className="ml-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]" />
          </div>

          <h2 className="shrink-0 font-heading text-2xl font-bold text-primary md:text-3xl">
            الرؤية (VISION)
          </h2>

          {/* Right line */}
          <div className="flex flex-1 items-center justify-end">
            <span className="mr-5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(201,168,76,.6)]" />
            <div
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

        <p className="mx-auto mb-10 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          نسعى لبناء شبكة عالمية متكاملة تضم أبرز الشركات والمؤسسات حول العالم،
          تحت مظلة مهنية واحدة تعزز التعاون والشراكات الاستراتيجية وتدعم النمو
          المستدام.
        </p>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-primary/20"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-primary/20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="scrollbar-hide flex cursor-grab gap-10 overflow-x-auto px-10 py-4 active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="shrink-0 select-none"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="block cursor-pointer"
                  aria-label={`Open image ${(i % sliderImages.length) + 1}`}
                >
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Vision ${(i % sliderImages.length) + 1}`}
                    draggable={false}
                    className="block h-auto w-auto max-h-[260px] max-w-[520px] md:max-h-[300px] md:max-w-[620px]"
                    style={{
                      objectFit: "contain",
                      transform: "translateZ(10px)",
                      transformStyle: "preserve-3d",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Fullscreen Lightbox */}
      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          <img
            src={allImages[openIndex]}
            alt={`Vision ${(openIndex % sliderImages.length) + 1}`}
            className="max-h-[88vh] max-w-[92vw] select-none"
            style={{ objectFit: "contain" }}
            draggable={false}
          />
        </div>
      )}
    </section>
  );
}