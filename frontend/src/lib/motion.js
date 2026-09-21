import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("kathaa", "0.22, 1, 0.36, 1");

export const EASE = "kathaa";
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
export const isFinePointer = () => window.matchMedia("(pointer: fine)").matches;

export const scrollToId = (id, offset = -24) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
};

export { gsap, ScrollTrigger };
