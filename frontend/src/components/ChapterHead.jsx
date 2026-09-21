import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import { Reveal, Words } from "@/components/Reveal";

/**
 * A miniature of the masthead: Sanskrit above, a short rule where the
 * shirorekha would be, English beneath. Repeats the brand's one idea at
 * every chapter instead of only in the logo.
 *
 * Built on GSAP like every other reveal on the site. des2 reached for
 * framer-motion here, which costs ~38kB gzipped for one component and
 * puts two animation systems in one page — §5 of the brief says use one.
 *
 * lang="sa" (not "ne") — these strings are Sanskrit. Tagging them
 * correctly matters for font selection and for screen readers.
 */
export const BilingualEyebrow = ({ sanskrit, english, testId }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduced = prefersReducedMotion();
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.fromTo(
        q(".eyebrow-sa"),
        { opacity: 0, y: reduced ? 0 : 8 },
        { opacity: 1, y: 0, duration: reduced ? 0.5 : 0.7 },
      )
        .fromTo(
          q(".eyebrow-rule"),
          { scaleX: 0 },
          { scaleX: 1, duration: reduced ? 0.01 : 0.9 },
          reduced ? "<" : "-=0.6",
        )
        .fromTo(
          q(".eyebrow"),
          { opacity: 0, y: reduced ? 0 : 6 },
          { opacity: 1, y: 0, duration: reduced ? 0.5 : 0.7 },
          "-=0.7",
        );
    }, el);
    return () => ctx.revert();
  }, []);

  if (!sanskrit && !english) return null;

  return (
    <div
      className="bilingual-eyebrow"
      ref={ref}
      data-testid={testId ? `${testId}-eyebrow` : undefined}
    >
      {sanskrit && (
        <p
          className="eyebrow-sa"
          lang="sa"
          data-testid={testId ? `${testId}-sanskrit` : undefined}
        >
          {sanskrit}
        </p>
      )}
      <span className="eyebrow-rule" aria-hidden="true" />
      {english && (
        <p className="eyebrow" data-testid={testId ? `${testId}-english` : undefined}>
          {english}
        </p>
      )}
    </div>
  );
};

export const ChapterHead = ({ numeral, title, eyebrow, sanskrit }) => (
  <header className="chapter-head">
    <BilingualEyebrow
      sanskrit={sanskrit}
      english={eyebrow}
      testId={`chapter-${String(numeral || title).toLowerCase()}`}
    />
    <Reveal as="h2" className="chapter-title" stagger={0.06}>
      {numeral && (
        <span className="numeral w" aria-label={`Chapter ${numeral}`}>
          {numeral}
        </span>
      )}
      <Words text={title} />
    </Reveal>
  </header>
);
