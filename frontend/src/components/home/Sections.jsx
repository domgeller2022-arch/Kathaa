import { Link } from "react-router-dom";
import { PARTNER_URL, published, chapterOne } from "@/config/site";
import { ChapterHead, BilingualEyebrow } from "@/components/ChapterHead";
import { eyebrows, chapterCard } from "@/config/eyebrows";
import { Reveal, Words } from "@/components/Reveal";

export const Standard = () => (
  <section className="section page-section" data-chapter="IV" data-testid="standard-section">
    <div className="wrap">
      <ChapterHead sanskrit={eyebrows.home.standard.sa} title="The Kathaa Standard" />
      <div className="standard-grid">
        <Reveal as="p" className="standard-line" stagger={0.05}>
          <Words text="You are a guest, not a ticket holder." />
        </Reveal>
        <Reveal as="p" className="standard-note">
          The room is ready before you arrive, the sound is right, and nobody is hurried. Fewer nights. Better ones.
        </Reveal>
      </div>
    </div>
  </section>
);

export const Chapters = () => (
  <section className="section" data-chapter="V" data-testid="chapters-section">
    <div className="wrap">
      <ChapterHead sanskrit={eyebrows.home.chapters.sa} title="The Chapters" />
      <div className="chapters-grid">
        <Reveal>
          {published ? (
            <Link to="/chapter-one" className="chapter-card" data-testid="chapter-one-card">
              <div>
                <BilingualEyebrow sanskrit={chapterCard.sa} english={chapterCard.en} />
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
              <BilingualEyebrow sanskrit={chapterCard.sa} english={chapterCard.en} />
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
  <section className="section--tight" data-chapter="VI" data-testid="partnerships-section">
    <div className="wrap">
      <ChapterHead sanskrit={eyebrows.home.partnerships.sa} title="Partnerships" />
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
