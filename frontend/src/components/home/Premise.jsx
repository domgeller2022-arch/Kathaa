import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { Words } from "@/components/Reveal";
import { BilingualEyebrow } from "@/components/ChapterHead";
import { eyebrows } from "@/config/eyebrows";

const LINES = [
  "Most nights out give you the songs.",
  "Kathaa lets the artist tell you where they came from.",
  "Every song carries a place and a year — the town it was written in, the night it almost wasn't recorded, the decade that shaped the voice singing it. The evening is built around that telling. By the time the first note lands, you already know why it matters.",
  "Kathaa means story. Ours is just beginning.",
];

export const Premise = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const words = el.querySelectorAll(".w");
    if (prefersReducedMotion()) {
      gsap.set(words, { opacity: 1 });
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 55%", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" data-chapter="I" data-testid="premise-section">
      <div className="wrap">
        <BilingualEyebrow
          sanskrit={eyebrows.home.premise.sa}
          english={eyebrows.home.premise.en}
          testId="premise-heading"
        />
        <div className="manifesto" ref={ref} data-testid="manifesto">
          {LINES.map((line) => (
            <p key={line}>
              <Words text={line} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
