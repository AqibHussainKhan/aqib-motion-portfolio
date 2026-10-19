import { Icon, Star } from "./Icon";
import { profile } from "../data/portfolio";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export default function Hero() {
  return (
    <section
      className="hero-section"
      id="home"
      data-scene="hero"
      aria-labelledby="hero-heading"
    >
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-layout container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> {profile.role}
          </p>
          <h1 id="hero-heading">
            Interfaces
            <br />
            that move
            <br />
            <span>people.</span>
            <Star className="heading-star" />
          </h1>
          <div className="hero-intro">
            <span className="tiny-index">(01 — INTRO)</span>
            <p>
              I’m Aqib. I bring a little more
              <br className="desktop-break" /> feeling to the web.
            </p>
          </div>
          <div className="hero-actions">
            <a href="#work" className="button button-cream">
              Explore my work <Icon name="arrow" size={17} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="circle-link"
              aria-label="Visit Aqib’s GitHub"
            >
              <Icon name="github" size={21} />
            </a>
          </div>
        </div>
        <div className="hero-art-wrap">
          <div className="hero-art">
            <img
              src={asset("hero-chrome.webp")}
              width="800"
              height="1200"
              alt="A chrome humanoid sculpture seated in a violet architectural studio"
              fetchPriority="high"
              decoding="async"
            />
            <div className="art-topline">
              <span>AQIB / DIGITAL CRAFT</span>
              <Star />
            </div>
            <div className="art-bottomline">
              <span>
                Code.
                <br />
                Create.
                <br />
                Connect.
              </span>
              <span>
                VOL.
                <br />
                001
              </span>
            </div>
          </div>
          <div className="hero-note">
            <span>
              Built to feel
              <br />
              different.
            </span>
            <Icon name="arrow" size={28} />
            <small>SCROLL TO EXPERIENCE</small>
          </div>
          <span className="art-caption">
            A LITTLE CODE. A LOT OF CHARACTER.
          </span>
        </div>
      </div>
      <div className="hero-footer container">
        <span>BASED IN PAKISTAN · OPEN TO COLLABORATE</span>
        <a href="#craft">
          SCROLL TO DISCOVER <Icon name="down" size={14} />
        </a>
        <span>REACT · TYPESCRIPT · MOTION</span>
      </div>
    </section>
  );
}
