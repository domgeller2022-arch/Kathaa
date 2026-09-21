import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PARTNER_URL } from "@/config/site";
import { scrollToId } from "@/lib/motion";
import { useIntro } from "@/components/Providers";

const useJoinList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (e) => {
    e.preventDefault();
    if (pathname === "/" || pathname === "/chapter-one" || pathname === "/our-story") {
      scrollToId("list");
    } else {
      navigate("/#list");
    }
  };
};

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { introDone } = useIntro();
  const { pathname } = useLocation();
  const firstLink = useRef(null);
  const joinList = useJoinList();
  const visible = introDone || pathname !== "/";

  useEffect(() => {
    if (!open) return undefined;
    firstLink.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const links = (refFirst, s = "") => (
    <>
      <Link to="/chapter-one" className="k-link" ref={refFirst} data-testid={`nav${s}-chapter-one`}>
        Chapter One
      </Link>
      <Link to="/our-story" className="k-link" data-testid={`nav${s}-our-story`}>
        Our Story
      </Link>
      <a href={PARTNER_URL} className="k-link" data-testid={`nav${s}-partnerships`}>
        Partnerships
      </a>
      <a href="/#list" className="k-link" onClick={(e) => { setOpen(false); joinList(e); }} data-testid={`nav${s}-join`}>
        Join the list
      </a>
    </>
  );

  return (
    <>
      <nav className={`nav ${visible ? "is-visible" : ""}`} aria-label="Primary" data-testid="nav">
        <Link to="/" className="nav-brand" data-testid="nav-home">
          Kathaa
        </Link>
        <div className="nav-links">{links()}</div>
        <button
          type="button"
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen(true)}
          data-testid="nav-menu-button"
        >
          Menu
        </button>
      </nav>
      <div
        id="menu-panel"
        className={`menu-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        data-testid="menu-panel"
      >
        <div className="flex justify-between items-center">
          <span className="nav-brand">Kathaa</span>
          <button
            type="button"
            className="nav-menu-btn"
            onClick={() => setOpen(false)}
            data-testid="nav-menu-close"
          >
            Close
          </button>
        </div>
        <div className="menu-links">{links(firstLink, "-menu")}</div>
      </div>
    </>
  );
};
