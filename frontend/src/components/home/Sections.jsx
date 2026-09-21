import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { PARTNER_URL, published, chapterOne } from "@/config/site";
import { ChapterHead, BilingualEyebrow } from "@/components/ChapterHead";
import { Reveal, Words } from "@/components/Reveal";

export const StoryMarquee = () => {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return (
    <div className={`editorial-marquee ${paused || reduced ? "is-paused" : ""}`} data-testid="story-marquee">
      <p className="sr-only">Stories, told live. Kathaa.</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {[0, 1, 2].map((item) => (
              <span className="marquee-phrase" key={item}>
                Stories, <em>told live.</em><span className="marquee-dot" /><span lang="ne">कथा</span><span className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
      {!reduced && (
        <button type="button" className="marquee-toggle" onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play scrolling text" : "Pause scrolling text"} aria-pressed={paused} data-testid="marquee-toggle">
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
};

export const Standard = () => (
  <section className="section page-section" data-chapter="IV" data-testid="standard-section">
    <div className="wrap">
      <ChapterHead numeral="IV" devanagari="हाम्रो मानक" title="The Kathaa Standard" />
      <div className="standard-grid">
        <Reveal as="p" className="standard-line" stagger={0.05}>
          <Words text="Considered production. Warm hospitality. Details that don't shout." />
        </Reveal>
        <Reveal as="p" className="standard-note">
          We'd rather host fewer, better nights than many forgettable ones.
        </Reveal>
      </div>
    </div>
  </section>
);

export const Chapters = () => (
  <section className="section chapters-section" data-chapter="V" data-testid="chapters-section">
    <div className="wrap">
      <ChapterHead numeral="V" devanagari="अध्यायहरू" title="The Chapters" />
      <div className="chapters-grid">
        <Reveal>
          {published ? (
            <Link to="/chapter-one" className="chapter-card" data-testid="chapter-one-card">
              <div>
                <BilingualEyebrow devanagari="अध्याय एक" english="Chapter One" testId="chapter-card-one" />
                <h3>{chapterOne.title}</h3>
              </div>
              <div>
                <p className="smoke">{chapterOne.dateLabel}</p>
                <p className="smoke">{chapterOne.descriptor}</p>
                <p className="gold mt-4">Read the story →</p>
              </div>
            </Link>
          ) : (
            <div className="chapter-card" data-testid="chapter-one-card">
              <BilingualEyebrow devanagari="अध्याय एक" english="Chapter One" testId="chapter-card-one" />
              <h3>Chapter One — coming soon</h3>
            </div>
          )}
        </Reveal>
        <Reveal delay={0.15}>
          <div className="blank-page" data-testid="chapter-two-blank">
            <p>Chapter Two — not yet written.</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Partnerships = () => (
  <section className="section--tight partnerships" data-chapter="VI" data-testid="partnerships-section">
    <div className="wrap">
      <ChapterHead numeral="VI" devanagari="सहकार्य" title="Partnerships" />
      <Reveal as="p" className="display">
        Brands that want to be part of the story, not just beside it.
      </Reveal>
      <Reveal className="mt-10" delay={0.1}>
        <a href={PARTNER_URL} className="k-link" data-testid="partner-link">
          Partner with Pravaha House →
        </a>
      </Reveal>
    </div>
  </section>
);
