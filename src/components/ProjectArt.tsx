import type { CSSProperties } from "react";
import type { ProjectVisual } from "../data/portfolio";
import { Star } from "./Icon";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export default function ProjectArt({
  visual,
  title,
  accent,
  compact = false,
}: {
  visual: ProjectVisual;
  title?: string;
  accent?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`project-art art-${visual} ${compact ? "is-compact" : ""}`}
      style={{ "--project-accent": accent } as CSSProperties}
      aria-hidden="true"
    >
      {visual === "hospital" && (
        <>
          <div className="hospital-grid" />
          <div className="hospital-cross">
            <svg viewBox="0 0 100 100">
              <path
                d="M38 8h24v30h30v24H62v30H38V62H8V38h30Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="hospital-panel">
            <span>HMS / CONNECTED CARE</span>
            <svg viewBox="0 0 260 85">
              <path d="M0 48h50l14-15 18 32 23-58 22 70 18-35 15 6h100" />
            </svg>
            <div className="hospital-panel-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="art-wordmark hospital-wordmark">
            {title || "HMS Care"}
            <span>↗</span>
          </span>
          <span className="art-corner-label">
            HEALTHCARE WORKFLOWS
            <br />
            BROUGHT TOGETHER.
          </span>
        </>
      )}
      {visual === "nova" && (
        <>
          <img
            src={asset("lime-loop.webp")}
            alt=""
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <span className="art-wordmark">
            {title || "NOVA"}
            <span>001</span>
          </span>
          <span className="art-corner-label">
            A NEW PERSPECTIVE
            <br />
            ON EVERYDAY ESSENTIALS.
          </span>
        </>
      )}
      {visual === "hostel" && (
        <>
          <img
            src={asset("blue-portal.webp")}
            alt=""
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <span className="art-wordmark">
            {title || "HOSTELX"}
            <span>002</span>
          </span>
          <span className="art-corner-label">
            ROOM TO LIVE.
            <br />
            SPACE TO GROW.
          </span>
        </>
      )}
      {visual === "cinematic" && (
        <>
          <div className="cinematic-orb" />
          <div className="cinematic-orb small" />
          <span className="art-wordmark serif-wordmark">
            {title || "In Motion"}
            <span>↗</span>
          </span>
          <Star className="cinematic-star" />
          <span className="art-corner-label">
            A PERSONAL EXPLORATION
            <br />
            OF CODE & CHARACTER.
          </span>
        </>
      )}
      {visual === "portfolio" && (
        <>
          <div className="portfolio-art-sheet">
            <span>AQIB / CREATIVE DEVELOPER</span>
            <Star />
            <div>
              DESIGN.
              <br />
              CODE.
              <br />
              CHARACTER.
            </div>
          </div>
          <span className="art-wordmark portfolio-wordmark">
            {title || "Portfolio"}
            <span>↗</span>
          </span>
          <span className="art-corner-label">
            A PERSONAL PERSPECTIVE
            <br />
            ON THE WEB.
          </span>
        </>
      )}
      {visual === "lab" && (
        <>
          <div className="lab-grid" />
          <div className="lab-window">
            <span>
              <i /> LABCORE
            </span>
            <div className="lab-timeline">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>
              Make time
              <br />
              for good work.
            </strong>
            <small>ATTENDANCE · ACTIVITY · FEEDBACK</small>
          </div>
        </>
      )}
      {visual === "storefront" && (
        <>
          <div className="storefront-tiles">
            <i />
            <i />
            <i />
          </div>
          <span className="art-wordmark">
            {title || "Daraz"}
            <span>↗</span>
          </span>
          <span className="art-corner-label">
            MARKETPLACE INTERFACE
            <br />A FRONT-END RECREATION.
          </span>
        </>
      )}
      {visual === "webflow" && (
        <>
          <span className="webflow-symbol">W</span>
          <div className="webflow-squares">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="art-wordmark">{title || "Made in Webflow"}</span>
          <span className="art-corner-label">
            SHOWCASE / COMMUNITY
            <br />A WEBSITE RECREATION.
          </span>
        </>
      )}
      {visual === "react" && (
        <>
          <svg
            className="react-art-atom"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <ellipse cx="100" cy="100" rx="88" ry="33" />
            <ellipse
              cx="100"
              cy="100"
              rx="88"
              ry="33"
              transform="rotate(60 100 100)"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="88"
              ry="33"
              transform="rotate(120 100 100)"
            />
            <circle cx="100" cy="100" r="8" fill="currentColor" />
          </svg>
          <span className="art-wordmark">{title || "React"}</span>
          <span className="art-corner-label">
            A DEVELOPER WEBSITE
            <br />
            RECREATED IN THE BROWSER.
          </span>
        </>
      )}
      {visual === "quiz" && (
        <>
          <div className="quiz-art-options">
            <span>
              A<Star />
            </span>
            <span>
              B<i />
            </span>
            <span>
              C<i />
            </span>
          </div>
          <span className="art-wordmark">{title || "Quiz."}</span>
          <span className="art-corner-label">
            HTML / CSS / JAVASCRIPT
            <br />A LITTLE BRAIN STRETCH.
          </span>
        </>
      )}
      {visual === "weather" && (
        <>
          <div className="weather-art-sun" />
          <div className="weather-art-cloud">
            <i />
            <i />
            <i />
          </div>
          <div className="weather-art-horizon" />
          <span className="art-wordmark">{title || "SkyWatch"}</span>
          <span className="art-corner-label">
            CITY SEARCH / FORECASTS
            <br />A CLEARER OUTLOOK.
          </span>
        </>
      )}
      {visual === "solar" && (
        <>
          <div className="solar-orbits">
            <i />
            <i />
            <i />
            <span />
            <b />
            <b />
          </div>
          <span className="art-wordmark">{title || "Orbit."}</span>
          <span className="art-corner-label">
            THE SOLAR SYSTEM
            <br />A STUDY IN MOTION.
          </span>
        </>
      )}
    </div>
  );
}
