import { useState } from "react";
import { FORM_ENDPOINT } from "@/config/site";
import { ChapterHead } from "@/components/ChapterHead";
import { eyebrows } from "@/config/eyebrows";
import { Reveal } from "@/components/Reveal";

export const JoinList = ({ numeral = "VII" }) => {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ firstName: "", email: "", consent: false });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.consent) return;
    setStatus("sending");
    try {
      if (FORM_ENDPOINT) {
        // TODO: FORM_ENDPOINT is empty until the list provider is chosen (A-75)
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("bad response");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="list" data-chapter={numeral} data-testid="join-list-section">
      <div className="wrap join-layout">
        <ChapterHead
          sanskrit={eyebrows.home.joinList.sa}
          eyebrow={eyebrows.home.joinList.en}
          title="Be the first to hear the next chapter."
        />
        {status === "done" ? (
          <p className="form-success" role="status" data-testid="join-list-success">
            Thank you. You'll hear from us when the next chapter is ready.
          </p>
        ) : (
          <Reveal as="form" className="form" onSubmit={submit} noValidate={false} data-testid="join-list-form">
            <div className="field">
              <label htmlFor="first-name">First name</label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                data-testid="join-list-first-name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-testid="join-list-email"
              />
            </div>
            <label className="check">
              <input
                type="checkbox"
                name="consent"
                required
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                data-testid="join-list-consent"
              />
              <span>Send me news about Kathaa events. Unsubscribe anytime.</span>
            </label>
            <div className="actions">
              <button type="submit" className="k-btn" disabled={status === "sending"} data-testid="join-list-submit">
                {status === "sending" ? "Joining…" : "Join the list"}
              </button>
              {status === "error" && (
                <p className="hint" role="alert" data-testid="join-list-error">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
