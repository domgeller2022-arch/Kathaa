import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/meta";
import { CONTACT_EMAIL } from "@/config/site";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const TextPage = ({ title, intro, sections, placeholder, testId }) => {
  usePageMeta(`${title} · Kathaa`, intro);
  return (
    <div data-testid={testId}>
      <section className="section" style={{ paddingTop: "10rem" }}>
        <div className="wrap">
          <Reveal as="p" className="eyebrow" y={12}>
            Kathaa · kathaa.com.au
          </Reveal>
          <Reveal as="h1" className="chapter-title">
            {title}
          </Reveal>
          <Reveal as="p" className="body mt-6">
            {intro}
          </Reveal>
          <p className="smoke mt-4" style={{ fontSize: "0.85rem" }}>
            Last updated: [DATE]
          </p>
          <div className="text-page mt-16">
            <nav className="toc" aria-label="Contents" data-testid="toc">
              {sections.map((s) => (
                <a key={s} href={`#${slug(s)}`} className="k-link">
                  {s}
                </a>
              ))}
            </nav>
            <article>
              {sections.map((s) => (
                <section key={s} id={slug(s)}>
                  <h2>{s}</h2>
                  <p>
                    [{placeholder} — {s}]
                  </p>
                </section>
              ))}
              <section id="contact">
                <h2>Contact</h2>
                <p>
                  Questions about this page:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="k-link" style={{ color: "var(--page)" }}>
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export function Privacy() {
  return (
    <TextPage
      testId="privacy-page"
      title="Privacy"
      intro="How Kathaa collects and uses the little information it holds — list sign-ups and enquiries — and how to unsubscribe."
      placeholder="PRIVACY POLICY TEXT"
      sections={["What we collect", "Why we collect it", "Where it is stored", "How to unsubscribe", "Your rights"]}
    />
  );
}

export function Terms() {
  return (
    <TextPage
      testId="terms-page"
      title="Terms"
      intro="Terms for using this website. Ticket terms are published by the ticketing platform at the time of sale."
      placeholder="TERMS TEXT"
      sections={["Use of this site", "Content and copyright", "Links to other sites", "Changes to these terms", "Governing law"]}
    />
  );
}

export function NotFound() {
  usePageMeta("Not yet written · Kathaa", "This page hasn't been written yet.");
  useEffect(() => {
    document.documentElement.dataset.pageTheme = "ivory";
    return () => delete document.documentElement.dataset.pageTheme;
  }, []);
  return (
    <div className="page-section notfound" data-testid="not-found-page">
      <div className="wrap">
        <p className="eyebrow eyebrow--ink">404</p>
        <h1 className="chapter-title">This page hasn't been written yet.</h1>
        <div className="mt-10">
          <Link to="/" className="k-link" data-testid="back-home-link">
            Back to the beginning →
          </Link>
        </div>
      </div>
    </div>
  );
}
