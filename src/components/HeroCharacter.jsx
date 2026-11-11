import * as React from "react";
import { Terminal } from "lucide-react";

/**
 * HeroCharacter
 * Renders the 3D static developer character portrait with:
 * - Subtle CSS floating animation (via `.hero-float` wrapper)
 * - Smooth mouse-following 3D tilt & micro-translation using requestAnimationFrame lerp
 * - Touch-device safety (disables mouse tilt on coarse pointers while keeping gentle float)
 * - Full `prefers-reduced-motion` support
 */
export default function HeroCharacter({
  src = "/assets/hero-character-3d.png",
  alt = "3D character portrait of Sahithi Chukka",
  badgeText = "AUCE (A)",
}) {
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl || typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    if (motionQuery.matches || coarsePointerQuery.matches) {
      cardEl.style.transform = "";
      return;
    }

    const state = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      rafId: null,
    };

    const maxRotateY = 7; // subtle horizontal tilt (deg)
    const maxRotateX = 5; // subtle vertical tilt (deg)
    const maxShiftPx = 5; // subtle follow translation (px)
    const ease = 0.08;

    const animate = () => {
      state.currentX += (state.targetX - state.currentX) * ease;
      state.currentY += (state.targetY - state.currentY) * ease;

      const rotY = (state.currentX * maxRotateY).toFixed(2);
      const rotX = (-state.currentY * maxRotateX).toFixed(2);
      const moveX = (state.currentX * maxShiftPx).toFixed(2);
      const moveY = (state.currentY * maxShiftPx).toFixed(2);

      cardEl.style.transform = `perspective(700px) translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      const settled =
        Math.abs(state.targetX - state.currentX) < 0.002 &&
        Math.abs(state.targetY - state.currentY) < 0.002;

      if (settled) {
        state.currentX = state.targetX;
        state.currentY = state.targetY;
        if (state.targetX === 0 && state.targetY === 0) {
          cardEl.style.transform =
            "perspective(700px) translate3d(0px, 0px, 0) rotateX(0deg) rotateY(0deg)";
        }
        state.rafId = null;
        return;
      }

      state.rafId = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (state.rafId === null) {
        state.rafId = window.requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (event) => {
      const rect = cardEl.getBoundingClientRect();
      // Only track gently when the character is near/within the viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (state.targetX !== 0 || state.targetY !== 0) {
          state.targetX = 0;
          state.targetY = 0;
          startLoop();
        }
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const radiusX = Math.max(rect.width * 0.9, 140);
      const radiusY = Math.max(rect.height * 1.1, 160);

      const dx = Math.max(-1, Math.min(1, (event.clientX - centerX) / radiusX));
      const dy = Math.max(-1, Math.min(1, (event.clientY - centerY) / radiusY));

      state.targetX = dx;
      state.targetY = dy;
      startLoop();
    };

    const handleMouseLeave = () => {
      state.targetX = 0;
      state.targetY = 0;
      startLoop();
    };

    const handleReducedMotionChange = (e) => {
      if (e.matches) {
        if (state.rafId !== null) {
          window.cancelAnimationFrame(state.rafId);
          state.rafId = null;
        }
        state.targetX = 0;
        state.targetY = 0;
        state.currentX = 0;
        state.currentY = 0;
        cardEl.style.transform = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    motionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      motionQuery.removeEventListener("change", handleReducedMotionChange);
      if (state.rafId !== null) {
        window.cancelAnimationFrame(state.rafId);
      }
    };
  }, []);

  return (
    <div className="shrink-0 self-start md:self-center h-32 w-32 sm:h-44 sm:w-44 flex items-center justify-center">
      <div className="hero-float w-[85%] h-[85%]">
        <div
          ref={cardRef}
          className="relative w-full h-full group will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-sm bg-[#1a1a1c]">
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover object-top scale-[1.02] select-none pointer-events-none"
              draggable={false}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 hidden sm:flex items-center gap-1.5 bg-background border border-border px-2.5 py-1 rounded-md shadow-xs text-[11px] font-mono text-muted-foreground">
            <Terminal size={12} className="text-primary" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
