import { Reveal, Words } from "@/components/Reveal";

export const ChapterHead = ({ numeral, title, eyebrow }) => (
  <header className="chapter-head">
    {eyebrow && (
      <Reveal as="p" className="eyebrow" y={12}>
        {eyebrow}
      </Reveal>
    )}
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
