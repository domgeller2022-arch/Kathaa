import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId } from "@/lib/motion";
import { chapterOne, TICKET_URL, artistRevealed as ARTIST_REVEALED, published as PUBLISHED } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { BilingualEyebrow } from "@/components/ChapterHead";
import { MediaSlot } from "@/components/MediaSlot";

export const TicketCta = ({ secondary = true }) => (
  <div className="actions" data-testid="ticket-cta">
    {TICKET_URL ? (
      <a href={TICKET_URL} target="_blank" rel="noreferrer" className="k-btn k-btn--solid" data-testid="get-tickets-button">
        Get tickets →
      </a>
    ) : (
      <>
        <button type="button" className="k-btn" onClick={() => scrollToId("list")} data-testid="join-list-cta">
          Join the list
        </button>
        <span className="hint" data-testid="tickets-soon">Tickets open soon.</span>
      </>
    )}
    {secondary && (
      <Link to="/chapter-one" className="k-link" data-testid="read-the-story-link">
        Read the story →
      </Link>
    )}
  </div>
);

export const ArtistBlock = ({ revealed = ARTIST_REVEALED, showLine = true }) => {
  const { artist } = chapterOne;
  return (
    <div data-testid="artist-block">
      <div className="slot-frame portrait-frame">
        {revealed ? (
          artist.portrait ? (
            <img src={artist.portrait} alt={artist.name} loading="lazy" />
          ) : (
            <span className="slot-label">[ARTIST PORTRAIT]</span>
          )
        ) : (
          <>
            <div className="silhouette" aria-hidden="true" />
            <span className="slot-label" data-testid="artist-teaser">The voice of a decade. Revealing soon.</span>
          </>
        )}
      </div>
      {revealed && (
        <Reveal>
          <p className="artist-name" data-testid="artist-name">{artist.name}</p>
          {showLine && <p className="smoke mt-2">{artist.line}</p>}
        </Reveal>
      )}
    </div>
  );
};

const YearRewind = () => {
  const stage = useRef(null);
  const [label, setLabel] = useState(prefersReducedMotion() ? "2000s" : "2026");
  const [settled, setSettled] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const st = ScrollTrigger.create({
      trigger: stage.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        if (p >= 0.9) {
          setLabel("2000s");
          setSettled(true);
        } else {
          const eased = gsap.parseEase("power2.out")(p / 0.9);
          setLabel(String(2026 - Math.round(eased * 25)));
          setSettled(false);
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="rewind-stage" ref={stage} data-testid="year-rewind">
      <div className="rewind-pin">
        <p className={`year ${settled ? "chrome-dusk is-sweeping" : ""}`} aria-live="off" data-testid="year-counter">
          {label}
        </p>
      </div>
    </div>
  );
};

export const NowShowing = ({ published = PUBLISHED }) => {
  if (!published) return null;
  const { heroMedia } = chapterOne;
  return (
    <section className="relative now-showing" data-chapter="II" data-testid="now-showing-section">
      <YearRewind />
      <div className="section" style={{ paddingTop: 0 }}>
       <div className="wrap">
        <BilingualEyebrow devanagari="अध्याय एक" english="Kathaa Live presents · Chapter One" testId="now-showing-heading" />
        <Reveal as="h2" className="event-title chrome-dusk is-sweeping" data-testid="chapter-one-title">
          {chapterOne.title}
        </Reveal>
        <Reveal as="p" className="event-date" data-testid="chapter-one-date">
          {chapterOne.dateLabel} · {chapterOne.descriptor}
        </Reveal>
        <div className="event-grid">
          <Reveal>
            <MediaSlot
              label="[EVENT HERO MEDIA]"
              src={heroMedia.src}
              type={heroMedia.type}
              poster={heroMedia.poster}
              caption={heroMedia.caption || "[MEDIA CAPTION]"}
              data-testid="event-hero-media"
            />
          </Reveal>
          <ArtistBlock />
        </div>
        <div className="mt-16">
          <TicketCta />
        </div>
       </div>
      </div>
    </section>
  );
};
