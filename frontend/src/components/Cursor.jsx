import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

export const Cursor = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const el = ref.current;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
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
  return <div ref={ref} className="cursor" aria-hidden="true" />;
};

export const Grain = () => <div className="grain" aria-hidden="true" />;
