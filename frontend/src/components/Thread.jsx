import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/motion";
import { useIntro } from "@/components/Providers";

export const Thread = () => {
  const { pathname } = useLocation();
  const { introDone } = useIntro();
  const drawRef = useRef(null);
  const nodeRefs = useRef([]);
  const [nodes, setNodes] = useState([]);
  const fracs = useRef([]);
  const posRef = useRef([]);

  useEffect(() => {
    let raf = 0;
    const mapProgress = (p) => {
      const fr = fracs.current;
      const pos = posRef.current;
      if (!fr.length) return p;
      const xs = [0, ...fr, 1];
      const ys = [0, ...pos, 1];
      for (let i = 1; i < xs.length; i += 1) {
        if (p <= xs[i]) {
          const span = xs[i] - xs[i - 1] || 1;
          return ys[i - 1] + ((p - xs[i - 1]) / span) * (ys[i] - ys[i - 1]);
        }
      }
      return 1;
    };
    const compute = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const els = [...document.querySelectorAll("[data-chapter]")];
      const n = els.length;
      const next = els.map((el, i) => ({
        numeral: el.dataset.chapter,
        frac: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45) / max)),
        pos: 0.08 + (0.84 * (i + 1)) / (n + 1),
      }));
      fracs.current = next.map((x) => x.frac).sort((a, b) => a - b);
      posRef.current = next.map((x) => x.pos);
      setNodes(next);
    };
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, window.scrollY / max);
      if (drawRef.current)
        drawRef.current.style.clipPath = `inset(0 0 ${(1 - mapProgress(p)) * 100}% 0)`;
      nodeRefs.current.forEach((el, i) => {
        if (el) el.classList.toggle("is-passed", p >= fracs.current[i] - 0.005);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const t = setTimeout(() => {
      compute();
      update();
    }, 400);
    const ro = new ResizeObserver(() => {
      compute();
      update();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    ScrollTrigger.addEventListener("refresh", compute);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      ScrollTrigger.removeEventListener("refresh", compute);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const visible = introDone || pathname !== "/";
  return (
    <div className={`thread ${visible ? "is-visible" : ""}`} aria-hidden="true" data-testid="thread">
      <div className="thread-track" />
      <div className="thread-draw" ref={drawRef} />
      {nodes.map((n, i) => (
        <div
          key={`${n.numeral}-${i}`}
          className="thread-node"
          style={{ top: `${n.pos * 100}%` }}
          ref={(el) => (nodeRefs.current[i] = el)}
        >
          <span className="thread-numeral">{n.numeral}</span>
        </div>
      ))}
    </div>
  );
};
