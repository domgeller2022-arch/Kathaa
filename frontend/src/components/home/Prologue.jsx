import { useEffect, useRef } from "react";
import { gsap, EASE, isDesktop, prefersReducedMotion } from "@/lib/motion";
import { TAGLINE } from "@/config/site";
import { useIntro } from "@/components/Providers";

export const Prologue = () => {
  const root = useRef(null);
  const { introDone, finishIntro } = useIntro();
  const played = useRef(introDone);

  useEffect(() => {
    const el = root.current;
    const q = gsap.utils.selector(el);
    const word = q(".masthead-word")[0];
    const drop = q(".drop-line")[0];
    const setDropHeight = () => {
      drop.style.height = `${el.getBoundingClientRect().bottom - word.getBoundingClientRect().bottom}px`;
    };
    setDropHeight();

    if (played.current) {
      gsap.set(q(".shirorekha"), { scaleX: 1 });
      gsap.set(q(".drop-line"), { opacity: 0 });
      return undefined;
    }

    if (prefersReducedMotion()) {
      gsap.set(q(".shirorekha"), { scaleX: 1 });
      gsap.fromTo(q(".masthead"), { opacity: 0 }, { opacity: 1, duration: 0.8, onComplete: finishIntro });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(q(".ltr"), { opacity: 0, y: 30 });
      gsap.set(q(".masthead-sc"), { opacity: 0, letterSpacing: "0.8em" });
      gsap.set(q(".masthead-tagline"), { opacity: 0 });
      const threadX = isDesktop() ? 48 - window.innerWidth / 2 : 0;
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.to(q(".shirorekha"), { scaleX: 1, duration: 1 })
        .to(q(".ltr"), { opacity: 1, y: 0, duration: 0.9, stagger: 0.18 }, "-=0.45")
        .to(q(".drop-line"), { scaleY: 1, duration: 0.8 }, "-=0.3")
        .to(q(".drop-line"), { x: threadX, duration: 0.7 }, "+=0.05")
        .add(finishIntro)
        .to(q(".drop-line"), { opacity: 0, duration: 0.5 })
        .to(q(".masthead-sc"), { opacity: 1, letterSpacing: "0.35em", duration: 1.1 }, "-=1.6")
        .to(q(".masthead-tagline"), { opacity: 1, duration: 0.8 }, "-=0.6");

      const skip = () => {
        if (tl.progress() < 1) tl.progress(1);
      };
      window.addEventListener("wheel", skip, { passive: true, once: true });
      window.addEventListener("touchstart", skip, { passive: true, once: true });
      window.addEventListener("keydown", skip, { once: true });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={root} className="prologue" aria-label="Prologue" data-testid="prologue">
      <div className="masthead">
        <h1 className="masthead-word" lang="ne" data-testid="masthead-word">
          <span className="shirorekha" aria-hidden="true" />
          <span className="ltr">क</span>
          <span className="ltr">था</span>
          <span className="drop-line" aria-hidden="true" />
        </h1>
        <p className="masthead-sc" data-testid="masthead-sc">
          Kathaa
        </p>
        <p className="masthead-tagline" data-testid="masthead-tagline">
          {TAGLINE}
        </p>
      </div>
    </section>
  );
};
