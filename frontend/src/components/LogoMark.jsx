/* PLACEHOLDER — replace with final SVG logo (kathaa-logo.svg) */
export const LogoMark = ({ size = "4rem", className = "" }) => (
  <span className={`logo ${className}`} style={{ "--logo-size": size }}>
    <span className="logo-deva" lang="ne">
      कथा
    </span>
    <span className="logo-sc">Kathaa</span>
  </span>
);
