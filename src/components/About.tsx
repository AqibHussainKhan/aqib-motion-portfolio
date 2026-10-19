import { profile, skills } from "../data/portfolio";
import { Icon, Star } from "./Icon";

export default function About() {
  return (
    <section
      className="about-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="section-topline">
          <span>(06 — THE PERSON BEHIND THE PIXELS)</span>
          <span>HELLO, I’M AQIB.</span>
        </div>
        <div className="about-layout">
          <div className="about-portrait" data-reveal>
            <img
              src={`${import.meta.env.BASE_URL}images/aqib-portrait.webp`}
              width="650"
              height="650"
              alt="Aqib Hussain Khan"
              loading="lazy"
              decoding="async"
            />
            <div className="portrait-caption">
              <span>AQIB HUSSAIN KHAN</span>
              <Star />
            </div>
            <span className="portrait-corner">
              CREATIVE MIND.
              <br />
              DEVELOPER AT HEART.
            </span>
          </div>
          <div className="about-copy" data-reveal>
            <h2 id="about-heading">
              Good design.
              <br />
              Clean code.
              <br />
              <em>A human touch.</em>
            </h2>
            <p>{profile.introduction}</p>
            <p>
              I’m a front-end developer based in Pakistan, with a background in
              Artificial Intelligence. I enjoy building with React, TypeScript,
              and Tailwind CSS — and finding that sweet spot where clarity meets
              character.
            </p>
            <div className="about-facts">
              <div>
                <span>BASED IN</span>
                <strong>{profile.location}</strong>
              </div>
              <div>
                <span>STUDIED</span>
                <strong>{profile.education}</strong>
              </div>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              A look behind the scenes <Icon name="github" size={18} />
            </a>
          </div>
        </div>
        <div className="skills-list">
          {skills.map((skill) => (
            <div className="skill-row" key={skill.name} data-reveal>
              <span>{skill.number}</span>
              <h3>{skill.name}</h3>
              <p>{skill.note}</p>
              <Star />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
