import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/meta";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import { published } from "@/config/site";
import { ChapterHead } from "@/components/ChapterHead";
import { Reveal } from "@/components/Reveal";
import { JoinList } from "@/components/JoinList";
import { Footer } from "@/components/Footer";

const HeldNote = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
      tl.to(el.querySelector(".held-gold"), { opacity: 1, duration: reduced ? 0.6 : 1.2 });
      if (!reduced) tl.to(el.querySelector(".held-stroke"), { scaleY: 1, duration: 1.4 }, "-=0.4");
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <span ref={ref} className="held" lang="ne" aria-label="कथा" data-testid="held-note">
      <span aria-hidden="true">कथा</span>
      <span className="held-gold" aria-hidden="true">कथा</span>
      <span className="held-stroke" aria-hidden="true" />
    </span>
  );
};

export default function OurStory() {
  usePageMeta("Our Story · Kathaa", "Kathaa means story. In Nepali, the long vowel is held. So are our stories.");
  return (
    <div data-testid="our-story-page">
      <section className="section" style={{ minHeight: "80svh", display: "flex", alignItems: "center" }} data-testid="our-story-hero">
        <div className="wrap">
          <Reveal as="p" className="masthead-word" style={{ fontSize: "clamp(7rem, 30vw, 16rem)", textAlign: "left", padding: 0 }} lang="ne">
            कथा
          </Reveal>
          <Reveal as="h1" className="chapter-title mt-6" delay={0.2}>
            Kathaa means story.
          </Reveal>
        </div>
      </section>

      <section className="section--tight" data-chapter="I" data-testid="held-note-section">
        <div className="wrap">
          <ChapterHead numeral="I" devanagari="दीर्घ स्वर" title="The held note" />
          <div className="event-grid" style={{ marginTop: 0, alignItems: "start" }}>
            <div>
              <HeldNote />
            </div>
            <div className="manifesto" style={{ paddingBottom: "20vh" }}>
              <Reveal as="p" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)" }}>
                In Nepali, <span lang="ne">कथा</span> — <em>kathā</em> — ends on a long vowel: a sound that is held.
                Our company's name, Pravaha — <em>pravāha</em>, the flow — holds one too.
              </Reveal>
              <Reveal as="p" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)" }} delay={0.15}>
                The flow carries the story. The story is held a little longer. That is what we want every Kathaa
                evening to do.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section page-section" data-chapter="II" data-testid="pravaha-house-section">
        <div className="wrap">
          <ChapterHead numeral="II" devanagari="प्रवाह हाउस" title="Pravaha House" />
          <Reveal as="p" className="lead">
            Kathaa is an initiative of <span className="eyebrow eyebrow--ink" style={{ display: "inline", marginBottom: 0 }}>Pravaha House</span>, a
            Sydney company creating live experiences that carry culture forward.
          </Reveal>
        </div>
      </section>

      <section className="section page-section" data-chapter="III" data-testid="why-we-started-section">
        <div className="wrap">
          <ChapterHead numeral="III" devanagari="हाम्रो सुरुवात" title="Why we started" />
          <Reveal as="blockquote" className="display" style={{ fontStyle: "italic", borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem" }} data-testid="founders-story">
            [FOUNDERS' STORY — to be written by the directors]
          </Reveal>
          <Reveal className="mt-16" delay={0.1}>
            <Link to="/chapter-one" className="k-link" data-testid="our-story-chapter-one-link">
              {published ? "Read Chapter One →" : "Chapter One — coming soon →"}
            </Link>
          </Reveal>
        </div>
      </section>

      <JoinList numeral="IV" />
      <Footer />
    </div>
  );
}
