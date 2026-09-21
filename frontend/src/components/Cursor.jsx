import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

export const Cursor = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const el = ref.current;
    document.documentElement.classList.add("has-cursor");
    // 0.35s was two-thirds of the lag; the CSS transform transition on
    // .cursor was the rest, and the two compounded. 0.08s keeps a trace of
    // smoothing without the dot visibly trailing the mouse.
    const xTo = gsap.quickTo(el, "x", { duration: 0.08, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.08, ease: "power2.out" });
    const move = (e) => {
      el.classList.add("is-visible");
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const hit = e.target.closest("a, button, input, label, summary, [role='button']");
      el.classList.toggle("is-active", Boolean(hit));
    };
    const leave = () => el.classList.remove("is-visible");
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);
  // The dot is nested so GSAP can drive the wrapper's transform with no CSS
  // transition on it, while the inner dot keeps its eased hover scale.
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor-dot" />
    </div>
  );
};

export const Grain = () => <div className="grain" aria-hidden="true" />;
