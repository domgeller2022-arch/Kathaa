import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const Video = ({ src, poster }) => {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.2,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  if (prefersReducedMotion()) return <img src={poster} alt="" />;
  return <video ref={ref} src={src} poster={poster} muted loop autoPlay playsInline preload="metadata" />;
};

export const MediaSlot = ({
  label,
  src = "",
  type = "image",
  poster = "",
  caption = "",
  alt = "",
  aspect = "16 / 10",
  className = "",
  ...rest
}) => (
  <figure className={`media-slot ${className}`} {...rest}>
    <div className="slot-frame" style={{ aspectRatio: aspect }}>
      {src ? type === "video" ? <Video src={src} poster={poster} /> : <img src={src} alt={alt} loading="lazy" /> : (
        <span className="slot-label">{label}</span>
      )}
    </div>
    {caption && <figcaption className="media-caption">{caption}</figcaption>}
  </figure>
);
