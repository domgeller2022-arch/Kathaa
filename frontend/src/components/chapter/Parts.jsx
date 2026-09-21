import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export const Cassette = () => {
  const ref = useRef(null);
  useEffect(() => {
    const svg = ref.current;
    const shapes = svg.querySelectorAll("path, circle, rect, line");
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      shapes.forEach((s) => {
        const len = s.getTotalLength();
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(shapes, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 45%", scrub: 0.5 },
      });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} className="cassette" viewBox="0 0 320 240" role="img" aria-label="A cassette tape with a pencil through one reel" data-testid="cassette-drawing">
      <rect x="20" y="60" width="280" height="170" rx="6" />
      <rect x="45" y="80" width="230" height="95" rx="4" />
      <rect x="95" y="115" width="130" height="30" rx="15" />
      <circle cx="110" cy="130" r="14" />
      <circle cx="210" cy="130" r="14" />
      <circle cx="110" cy="130" r="4" />
      <circle cx="210" cy="130" r="4" />
      <path d="M60 230 L80 195 L240 195 L260 230" />
      <line x1="120" y1="205" x2="200" y2="205" />
      <path d="M204 136 L292 22 L306 32 L218 146 Z" />
      <line x1="292" y1="22" x2="285" y2="14" />
      <line x1="306" y1="32" x2="313" y2="26" />
      <path d="M285 14 L313 26 L320 8 Z" />
    </svg>
  );
};

const FAQ = [
  ["Can I show my licence on my phone?", "No. Only physical photo ID is accepted."],
  ["What time should I arrive?", "By 6:40pm."],
  ["Can I bring my own drinks?", "No. There is a cash bar on board."],
  ["When do tickets go on sale?", "Soon. Join the list to hear first."],
];

export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <dl className="faq" data-testid="faq">
      {FAQ.map(([q, a], i) => (
        <div className="faq-item" key={q}>
          <dt>
            <button
              type="button"
              className="faq-q"
              aria-expanded={open === i}
              aria-controls={`faq-a-${i}`}
              id={`faq-q-${i}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              data-testid={`faq-question-${i}`}
            >
              <span>{q}</span>
              <span className="faq-plus" aria-hidden="true" />
            </button>
          </dt>
          <dd className={`faq-a ${open === i ? "is-open" : ""}`} id={`faq-a-${i}`} aria-labelledby={`faq-q-${i}`} style={{ margin: 0 }}>
            <div>
              <p data-testid={`faq-answer-${i}`}>{a}</p>
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
};
