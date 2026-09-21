import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { chapterOne } from "@/config/site";
import { MediaSlot } from "@/components/MediaSlot";
import { Reveal } from "@/components/Reveal";

export const Gallery = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const items = ref.current.querySelectorAll(".gallery > *");
      items.forEach((item, i) => {
        gsap.to(item, {
          y: -(20 + (i % 3) * 18),
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref}>
      <div className="gallery" data-testid="vessel-gallery">
        {chapterOne.gallery.map((g, i) => (
          <Reveal key={g.label} delay={(i % 3) * 0.08}>
            <MediaSlot label={g.label} src={g.src} caption={g.caption} aspect={i === 0 ? "16 / 10" : "4 / 5"} data-testid={`vessel-image-${i + 1}`} />
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <MediaSlot
            label={chapterOne.video.label}
            src={chapterOne.video.src}
            poster={chapterOne.video.poster}
            type="video"
            caption={chapterOne.video.caption}
            aspect="16 / 9"
            data-testid="event-video"
          />
        </Reveal>
      </div>
    </div>
  );
};

export const EveningDetails = () => {
  const { evening, dateLabel } = chapterOne;
  const rows = [
    ["Date", dateLabel],
    ["Arrive by", evening.arriveBy, "gold"],
    ["Boarding", evening.boarding],
    ["Departing from", evening.departingFrom],
    ["Drinks", evening.drinks],
    ["Food", evening.food],
    ["Tickets", evening.tickets],
  ];
  return (
    <dl className="details" data-testid="evening-details">
      {rows.map(([k, v, cls]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd className={cls || ""} data-testid={`detail-${k.toLowerCase().replace(/\s/g, "-")}`}>
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export const KnowBefore = () => (
  <Reveal className="know-panel" data-testid="know-before-panel">
    <p className="eyebrow" style={{ marginBottom: 0 }}>Know before you go</p>
    <ul>
      <li>
        <span>
          <strong>Bring physical, government-issued photo ID.</strong> Digital licences and photos of ID are not accepted.
        </span>
      </li>
      <li>
        <span>
          <strong>Arrive by 6:40pm.</strong> Boarding is a short window and departure is on time. Late arrivals cannot board and are not refunded.
        </span>
      </li>
      <li>
        <span>No alcohol may be brought on board or consumed on the wharf.</span>
      </li>
    </ul>
  </Reveal>
);
