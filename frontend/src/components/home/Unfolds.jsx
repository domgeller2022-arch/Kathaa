import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { ChapterHead } from "@/components/ChapterHead";
import { Reveal } from "@/components/Reveal";
import { eyebrows } from "@/config/eyebrows";

const PAGES = [
  ["I", "आगमन", "The Arrival", "The evening begins before the music does."],
  ["II", "कथावाचन", "The Telling", "The artist, in their own words: where the songs came from."],
  ["III", "प्रस्तुतिः", "The Performance", "Then the music, heard differently."],
  ["IV", "उपसंहारः", "The Afterword", "The part of the night people talk about next week."],
];

export const Unfolds = () => {
  const root = useRef(null);
  const track = useRef(null);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      setHorizontal(true);
      const el = root.current;
      const tr = track.current;
      let tween;
      const t = setTimeout(() => {
        const distance = () => tr.scrollWidth - window.innerWidth;
        tween = gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, 50);
      return () => {
        clearTimeout(t);
        tween?.scrollTrigger?.kill();
        tween?.kill();
        gsap.set(tr, { clearProps: "all" });
        setHorizontal(false);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="section--tight" data-chapter="III" data-testid="unfolds-section">
      <div className="wrap">
        <ChapterHead
          sanskrit={eyebrows.home.unfolds.sa}
          title="How a Kathaa evening unfolds"
        />
      </div>
      <div ref={root} className={`unfolds ${horizontal ? "is-horizontal" : ""}`}>
        <div ref={track} className="unfold-track wrap">
          {PAGES.map(([n, sanskrit, title, line]) => (
            <Reveal key={n} className="unfold-page" data-testid={`unfold-${title.toLowerCase().replace(/\s/g, "-")}`}>
              <p className="unfold-num" aria-hidden="true">{n}</p>
              <p className="unfold-sa" lang="sa">{sanskrit}</p>
              <h3 className="unfold-title">{title}</h3>
              <p className="unfold-line">{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
