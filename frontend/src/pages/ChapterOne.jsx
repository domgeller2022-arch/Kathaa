import { usePageMeta } from "@/lib/meta";
import { chapterOne, published, artistRevealed, TICKET_URL } from "@/config/site";
import { scrollToId } from "@/lib/motion";
import { ChapterHead, BilingualEyebrow } from "@/components/ChapterHead";
import { Reveal } from "@/components/Reveal";
import { JoinList } from "@/components/JoinList";
import { Footer } from "@/components/Footer";
import { TicketCta, ArtistBlock } from "@/components/home/NowShowing";
import { Cassette, Faq } from "@/components/chapter/Parts";
import { Gallery, EveningDetails, KnowBefore } from "@/components/chapter/Details";

const shareText = `Kathaa Live presents Chapter One — ${chapterOne.title}. ${chapterOne.dateLabel}, ${chapterOne.descriptor.toLowerCase()}.`;

const ShareRow = ({ suffix = "" }) => (
  <div className="actions" data-testid={`share-actions${suffix}`}>
    {TICKET_URL ? (
      <a href={TICKET_URL} target="_blank" rel="noreferrer" className="k-btn k-btn--solid" data-testid={`page-get-tickets${suffix}`}>
        Get tickets →
      </a>
    ) : (
      <button type="button" className="k-btn" onClick={() => scrollToId("list")} data-testid={`page-join-list${suffix}`}>
        Join the list
      </button>
    )}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${typeof window !== "undefined" ? window.location.origin : ""}/chapter-one`)}`}
      target="_blank"
      rel="noreferrer"
      className="k-btn"
      data-testid={`share-whatsapp${suffix}`}
    >
      Share on WhatsApp
    </a>
    <a href={chapterOne.icsPath} download="kathaa-chapter-one.ics" className="k-btn" data-testid={`add-to-calendar${suffix}`}>
      Add to calendar
    </a>
  </div>
);

const ComingSoon = () => (
  <section className="section" style={{ minHeight: "100svh", display: "flex", alignItems: "center" }} data-testid="chapter-one-coming-soon">
    <div className="wrap">
      <BilingualEyebrow devanagari="अध्याय एक" english="Kathaa Live presents" testId="chapter-one-coming-soon-heading" />
      <h1 className="chapter-title">Chapter One — coming soon</h1>
      <div className="mt-10">
        <TicketCta secondary={false} />
      </div>
    </div>
  </section>
);

export default function ChapterOne() {
  usePageMeta(
    `Chapter One · ${chapterOne.title} · Kathaa Live`,
    `${chapterOne.dateLabel}. ${chapterOne.descriptor}. Kathaa Live presents Chapter One.`,
  );
  const { artist } = chapterOne;

  if (!published) {
    return (
      <div data-testid="chapter-one-page">
        <ComingSoon />
        <JoinList numeral="" />
        <Footer />
      </div>
    );
  }

  return (
    <div data-testid="chapter-one-page">
      <section className="section chapter-hero" style={{ minHeight: "88svh", display: "flex", alignItems: "center" }} data-testid="chapter-one-hero">
        <div className="wrap">
          <BilingualEyebrow devanagari="अध्याय एक" english="Kathaa Live presents · Chapter One" testId="chapter-one-hero-heading" />
          <Reveal as="h1" className="event-title chrome-dusk is-sweeping" data-testid="chapter-one-page-title">
            {chapterOne.title}
          </Reveal>
          <Reveal as="p" className="event-date" delay={0.1}>
            {chapterOne.dateLabel}
          </Reveal>
          <Reveal className="mt-12" delay={0.2}>
            <ShareRow />
          </Reveal>
        </div>
      </section>

      <section className="section--tight page-section" data-chapter="I" data-testid="the-story-section">
        <div className="wrap">
          <ChapterHead numeral="I" devanagari="कथा" title="The story" />
          <Reveal as="p" className="display">
            Before streaming, there was the FM dial, the cassette rewound with a pencil, the song you waited all week to
            hear again. On 11 December, one of the voices that defined that decade tells the story behind the songs —
            live, on Sydney Harbour.
          </Reveal>
          <Cassette />
        </div>
      </section>

      <section className="section page-section" data-chapter="II" data-testid="the-artist-section">
        <div className="wrap">
          <ChapterHead numeral="II" devanagari="कलाकार" title="The artist" />
          <div className="event-grid" style={{ marginTop: 0, alignItems: "start" }}>
            <div style={{ maxWidth: "24rem" }}>
              <ArtistBlock revealed={artistRevealed} showLine={false} />
            </div>
            {artistRevealed && (
              <div>
                <Reveal as="h3" className="artist-name" style={{ marginTop: 0 }}>
                  {artist.name}
                </Reveal>
                <Reveal as="p" className="body mt-6" data-testid="artist-story">
                  {artist.story}
                </Reveal>
                {artist.quote && (
                  <Reveal as="blockquote" className="display mt-10" style={{ fontStyle: "italic" }} data-testid="artist-quote">
                    “{artist.quote}”
                  </Reveal>
                )}
                {artist.audio && (
                  <audio controls src={artist.audio} className="mt-8" data-testid="artist-audio">
                    Your browser does not support audio.
                  </audio>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section--tight" data-chapter="III" data-testid="on-the-water-section">
        <div className="wrap">
          <ChapterHead numeral="III" devanagari="जलयात्रा" title="On the water" />
          <Gallery />
        </div>
      </section>

      <section className="section" data-chapter="IV" data-testid="the-evening-section">
        <div className="wrap">
          <ChapterHead numeral="IV" devanagari="साँझ" title="The evening" />
          <Reveal>
            <EveningDetails />
          </Reveal>
          <div className="mt-16">
            <KnowBefore />
          </div>
        </div>
      </section>

      <section className="section--tight page-section sunlit-section" data-chapter="V" data-testid="faq-section">
        <div className="wrap">
          <ChapterHead numeral="V" devanagari="जिज्ञासा" title="Questions people ask" />
          <Reveal>
            <Faq />
          </Reveal>
          <Reveal className="mt-16">
            <ShareRow suffix="-bottom" />
          </Reveal>
        </div>
      </section>

      <JoinList numeral="VI" />
      <Footer />
    </div>
  );
}
