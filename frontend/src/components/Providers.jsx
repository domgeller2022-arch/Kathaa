import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId } from "@/lib/motion";

const IntroContext = createContext({ introDone: true, finishIntro: () => {} });
export const useIntro = () => useContext(IntroContext);

export const IntroProvider = ({ children }) => {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem("kathaa-intro") === "1",
  );
  const finishIntro = () => {
    sessionStorage.setItem("kathaa-intro", "1");
    setIntroDone(true);
  };
  return (
    <IntroContext.Provider value={{ introDone, finishIntro }}>
      {children}
    </IntroContext.Provider>
  );
};

export const SmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    // Measured before tuning: the page holds a flat 16.7ms frame time while
    // scrolling with zero long frames, so this was never a performance
    // problem — it is the easing curve.
    //
    // lerp is exponential smoothing: it always approaches, never arrives,
    // which is what reads as "floaty but somehow not smooth". Duration mode
    // tweens each input over a fixed curve instead — snappy off the mark,
    // gliding into the stop. syncTouch hands mobile back to native inertia,
    // which no easing model beats.
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: true,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  return null;
};

export const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = hash.replace("#", "");
    if (id) {
      const t = setTimeout(() => scrollToId(id), 350);
      return () => clearTimeout(t);
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
};
