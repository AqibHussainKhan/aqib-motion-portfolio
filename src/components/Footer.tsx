import { Icon, Star } from "./Icon";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <a href="#home" className="footer-brand">
            <Star />
            <span>aqib.</span>
          </a>
          <p>
            Made with curiosity.
            <br />
            Built with care.
          </p>
          <a href="#home" className="footer-top-link">
            Back to top <Icon name="arrow" size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AQIB HUSSAIN KHAN</span>
          <span>CREATIVE DEVELOPER / PAKISTAN</span>
          <div>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Icon name="arrow" size={12} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <Icon name="arrow" size={12} />
            </a>
            <a href={`mailto:${profile.email}`}>
              Email <Icon name="arrow" size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
