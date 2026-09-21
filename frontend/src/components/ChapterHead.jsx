import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Words } from "@/components/Reveal";

export const BilingualEyebrow = ({ devanagari, english, testId }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="bilingual-eyebrow"
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      data-testid={`${testId}-eyebrow`}
    >
      <motion.p
        className="eyebrow-deva"
        lang="ne"
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        data-testid={`${testId}-devanagari`}
      >
        {devanagari}
      </motion.p>
      <motion.span
        className="eyebrow-rule"
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
      {english && <p className="eyebrow" data-testid={`${testId}-english`}>{english}</p>}
    </motion.div>
  );
};

export const ChapterHead = ({ numeral, title, eyebrow, devanagari }) => {
  const testId = `heading-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
  return (
    <header className="chapter-head" data-testid={testId}>
      <BilingualEyebrow devanagari={devanagari} english={eyebrow} testId={testId} />
      <Reveal as="h2" className="chapter-title" stagger={0.06} data-testid={`${testId}-title`}>
        {numeral && <span className="numeral w" aria-label={`Chapter ${numeral}`}>{numeral}</span>}
        <Words text={title} />
      </Reveal>
    </header>
  );
};
