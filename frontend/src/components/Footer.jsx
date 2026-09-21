import { Link } from "react-router-dom";
import { LogoMark } from "@/components/LogoMark";
import {
  CONTACT_EMAIL,
  PARTNER_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/config/site";

export const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div>
          <LogoMark size="3rem" />
          <p className="mt-6" data-testid="footer-legal">
            Kathaa is an initiative of Pravaha House Pty Ltd · ACN 702 078 804
          </p>
        </div>
        <div className="footer-links">
          {INSTAGRAM_URL ? (
            <a href={INSTAGRAM_URL} className="k-link" target="_blank" rel="noreferrer" data-testid="footer-instagram">
              Instagram
            </a>
          ) : (
            <span className="smoke" data-testid="footer-instagram-placeholder">Instagram · [INSTAGRAM URL]</span>
          )}
          {FACEBOOK_URL && (
            <a href={FACEBOOK_URL} className="k-link" target="_blank" rel="noreferrer" data-testid="footer-facebook">
              Facebook
            </a>
          )}
          <a href={`mailto:${CONTACT_EMAIL}`} className="k-link" data-testid="footer-email">
            {CONTACT_EMAIL}
          </a>
          <a href={PARTNER_URL} className="k-link" data-testid="footer-partnerships">
            Partnerships → pravahahouse.com.au
          </a>
        </div>
        <div className="footer-links">
          <Link to="/privacy" className="k-link" data-testid="footer-privacy">
            Privacy
          </Link>
          <Link to="/terms" className="k-link" data-testid="footer-terms">
            Terms
          </Link>
        </div>
      </div>
      <p className="footer-ack" data-testid="footer-acknowledgement">
        We acknowledge the Traditional Custodians of the land and waters on which we gather,
        and pay our respects to Elders past and present.
      </p>
    </div>
  </footer>
);
