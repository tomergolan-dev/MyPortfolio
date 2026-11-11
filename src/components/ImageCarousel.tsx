"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/types/database";

/**
 * A project's images, one at a time. Swipes natively on touch (scroll snapping), with arrows and
 * dots for mouse and keyboard. A single image shows on its own, with no controls.
 */
export default function ImageCarousel({
  images,
  fallbackAlt,
  sizes,
}: {
  images: ProjectImage[];
  fallbackAlt: string;
  sizes: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Follow the scroll position, so swiping, arrows and dots always agree on the current image.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;
    function onScroll() {
      if (!track) return;
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count]);

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, next));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }

  if (count === 0) return null;

  if (count === 1) {
    return (
      <Image
        src={images[0].url}
        alt={images[0].alt_text || fallbackAlt}
        width={1600}
        height={1000}
        sizes={sizes}
        className="h-auto w-full rounded-2xl border border-white/10"
      />
    );
  }

  const arrowClass =
    "absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-opacity hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0 sm:flex";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${fallbackAlt} images`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") goTo(index + 1);
        if (event.key === "ArrowLeft") goTo(index - 1);
      }}
      className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ide-cyan/50"
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl border border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div
              key={image.id}
              className="w-full shrink-0 snap-center"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <Image
                src={image.url}
                alt={image.alt_text || fallbackAlt}
                width={1600}
                height={1000}
                sizes={sizes}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous image"
          className={`${arrowClass} left-3`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === count - 1}
          aria-label="Next image"
          className={`${arrowClass} right-3`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
