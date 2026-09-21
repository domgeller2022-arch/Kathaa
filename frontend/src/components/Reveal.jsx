import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";

export const Reveal = ({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  y = 28,
  stagger,
  ...rest
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const reduced = prefersReducedMotion();
    const targets = stagger ? el.querySelectorAll(".w") : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: reduced ? 0 : y },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.6 : 1.1,
          ease: EASE,
          delay,
          stagger: stagger && !reduced ? stagger : 0,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, [delay, y, stagger]);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export const Words = ({ text }) =>
  text.split(" ").map((w, i) => (
    <span key={i} className="w-wrap">
      <span className="w">{w}</span>{" "}
    </span>
  ));
