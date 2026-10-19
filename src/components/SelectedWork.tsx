import { useEffect, useRef } from "react";
import { featuredProjects } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import { Icon } from "./Icon";
import ProjectArt from "./ProjectArt";

export default function SelectedWork({
  onSelect,
}: {
  onSelect: (project: Project) => void;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const revealFocusedProject = (index: number) => {
    if (
      !section.current ||
      window.innerWidth <= 800 ||
      document.documentElement.dataset.motion === "off"
    )
      return;
    const progress = index / Math.max(1, featuredProjects.length - 1);
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const travel = section.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + progress * travel, behavior: "instant" });
  };
  useEffect(() => {
    const update = () => {
      if (section.current && track.current)
        section.current.style.setProperty(
          "--travel",
          `${Math.max(0, track.current.scrollWidth - window.innerWidth + window.innerWidth * 0.055)}px`,
        );
    };
    const observer = new ResizeObserver(update);
    if (track.current) observer.observe(track.current);
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={section}
      className="work-section"
      id="work"
      data-scene="work"
      aria-labelledby="work-heading"
    >
      <div className="work-sticky">
        <div className="work-heading container">
          <div>
            <span className="eyebrow">(04 — SELECTED WORK)</span>
            <h2 id="work-heading">
              Made with
              <br />
              <span>purpose.</span>
            </h2>
          </div>
          <p>
            A few things I’ve put
            <br />
            my mind (and code) into.
            <br />
            <a href="#project-index">
              Explore all projects <Icon name="arrow" size={15} />
            </a>
          </p>
          <span className="work-direction">
            SCROLL TO EXPLORE <Icon name="chevron" size={14} />
          </span>
        </div>
        <div className="work-viewport">
          <div ref={track} className="work-track">
            {featuredProjects.map((project, index) => (
              <article
                className="featured-project"
                key={project.id}
                onFocusCapture={(event) => {
                  if ((event.target as HTMLElement).matches(":focus-visible"))
                    revealFocusedProject(index);
                }}
              >
                <button
                  type="button"
                  className="project-cover-button"
                  onClick={() => onSelect(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <ProjectArt
                    visual={project.visual}
                    title={project.coverTitle || project.title}
                    accent={project.accent}
                  />
                  {project.flagship && (
                    <span className="project-flagship-label">
                      Flagship project
                    </span>
                  )}
                  <span className="project-open">
                    <Icon name="arrow" size={25} />
                  </span>
                  <span className="project-cover-tag">
                    {project.category} / {project.year}
                  </span>
                </button>
                <div className="project-info">
                  <div>
                    <span className="project-number">0{index + 1}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.subtitle}</p>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live website`}
                  >
                    <Icon name="arrow" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="work-bottom container">
          <span>INDEPENDENT PROJECTS / 2026</span>
          <span className="work-rail">
            <i />
          </span>
          <span>SCROLL →</span>
        </div>
      </div>
    </section>
  );
}
