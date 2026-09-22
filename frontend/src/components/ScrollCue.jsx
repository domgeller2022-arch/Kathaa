import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The scroll cue as a pager.
 *
 * Clicking it advances one section and it stays put, so it can be clicked
 * through the whole page from a fixed spot. Scrolling by hand instead
 * dismisses it, which is how it behaved before.
 *
 * It is a real button: keyboard-reachable, labelled, and it moves the page
 * through Lenis so the motion matches every other scroll on the site.
 */
export const ScrollCue = () => {
  const [armed, setArmed] = useState(true);   // false once the reader scrolls themselves
  const [atEnd, setAtEnd] = useState(false);
  const paging = useRef(false);

  const sections = () =>
    [...document.querySelectorAll("[data-chapter]")].sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
    );

  const advance = useCallback(() => {
    const next = sections().find((el) => el.getBoundingClientRect().top > 12);
    if (!next) return;
    paging.current = true;
    const lenis = window.__lenis;
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(next, { offset: 0, duration: 1.1, onComplete: () => { paging.current = false; } });
    } else {
      next.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      setTimeout(() => { paging.current = false; }, 700);
    }
  }, []);

  useEffect(() => {
    // Only a scroll the reader started disarms the cue — its own paging
    // scroll must not dismiss it, or it would vanish after one click.
    const dismiss = () => {
      if (!paging.current) setArmed(false);
    };
    const checkEnd = () => {
      const last = sections().at(-1);
      if (!last) return;
      setAtEnd(last.getBoundingClientRect().top <= 12);
    };
    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("touchmove", dismiss, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (["PageDown", "ArrowDown", "End", " "].includes(e.key)) dismiss();
    });
    window.addEventListener("scroll", checkEnd, { passive: true });
    checkEnd();
    return () => {
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      window.removeEventListener("scroll", checkEnd);
    };
  }, []);

  const shown = armed && !atEnd;

  return (
    <button
      type="button"
      className={`scroll-cue ${shown ? "is-shown" : ""}`}
      onClick={advance}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      aria-label="Scroll to the next section"
      data-testid="scroll-cue"
    >
      Scroll
      <span className="scroll-cue-arrow" aria-hidden="true" />
    </button>
  );
};
