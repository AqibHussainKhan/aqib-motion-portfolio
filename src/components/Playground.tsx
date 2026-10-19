import { useState } from "react";
import type { CSSProperties } from "react";
import { projectCollections } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import { Icon, Star } from "./Icon";
import ProjectArt from "./ProjectArt";

type Collection = (typeof projectCollections)[number];
const visibleCount = 3;

function FloatingCollection({
  collection,
  side,
  onSelect,
}: {
  collection: Collection;
  side: "left" | "right";
  onSelect: (project: Project) => void;
}) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(
    1,
    Math.ceil(collection.projects.length / visibleCount),
  );
  const visible = Array.from(
    { length: Math.min(visibleCount, collection.projects.length) },
    (_, index) =>
      collection.projects[
        (page * visibleCount + index) % collection.projects.length
      ],
  );
  const slots = side === "left" ? [1, 3, 5] : [2, 4, 6];
  const changePage = (direction: number) =>
    setPage((current) => (current + direction + pageCount) % pageCount);

  return (
    <div
      className={`floating-collection floating-collection-${side}`}
      data-collection={collection.id}
      role="group"
      aria-labelledby={`gallery-${collection.id}`}
    >
      <div className="floating-collection-heading">
        <h3 id={`gallery-${collection.id}`}>{collection.title}</h3>
        <span>{String(collection.projects.length).padStart(2, "0")}</span>
      </div>
      {visible.map((project, index) => (
        <button
          key={project.id}
          type="button"
          className={`floating-project floating-project-${slots[index]} ${project.flagship ? "is-flagship" : ""}`}
          style={
            {
              "--i": slots[index] - 1,
              "--project-accent": project.accent,
            } as CSSProperties
          }
          onClick={() => onSelect(project)}
          aria-label={`Explore ${project.title}`}
          data-project-id={project.id}
        >
          <ProjectArt
            visual={project.visual}
            title={project.coverTitle || project.title}
            accent={project.accent}
            compact
          />
          {project.flagship && (
            <span className="floating-flagship">
              <Star />
              FLAGSHIP PROJECT
            </span>
          )}
          <span className="floating-project-label">
            {project.title}
            <Icon name="arrow" size={13} />
          </span>
        </button>
      ))}
      <div
        className="floating-collection-controls"
        data-page={page + 1}
        data-page-count={pageCount}
      >
        <button
          type="button"
          onClick={() => changePage(-1)}
          aria-label={`Previous ${collection.title}`}
          disabled={pageCount <= 1}
          data-direction="previous"
        >
          <Icon name="chevron" size={13} />
        </button>
        <span
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${collection.title}: page ${page + 1} of ${pageCount}`}
        >
          {String(page + 1).padStart(2, "0")}
          <i />
          {String(pageCount).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => changePage(1)}
          aria-label={`Next ${collection.title}`}
          disabled={pageCount <= 1}
          data-direction="next"
        >
          <Icon name="chevron" size={13} />
        </button>
      </div>
    </div>
  );
}

export default function Playground({
  onSelect,
}: {
  onSelect: (project: Project) => void;
}) {
  return (
    <section
      className="playground-section floating-playground"
      id="playground"
      data-scene="playground"
      aria-labelledby="playground-heading"
    >
      <div className="playground-topline container">
        <span>(05 — THE PLAYGROUND)</span>
        <span>KEEP MAKING. KEEP EXPLORING.</span>
      </div>
      <div className="playground-gallery">
        <FloatingCollection
          collection={projectCollections[0]}
          side="left"
          onSelect={onSelect}
        />
        <FloatingCollection
          collection={projectCollections[1]}
          side="right"
          onSelect={onSelect}
        />
        <div className="playground-title">
          <Star />
          <p>CURIOUS BY NATURE.</p>
          <h2 id="playground-heading">
            Always
            <br />
            <em>exploring.</em>
          </h2>
          <a href="#project-index">
            Step inside <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
      <div className="playground-bottom container">
        <span>SMALL IDEAS CAN BECOME SOMETHING BIG.</span>
        <Star />
        <span>NO FINISH LINE. JUST CURIOSITY.</span>
      </div>
    </section>
  );
}
