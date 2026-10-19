import { useMemo, useState } from "react";
import { categories, projects, projectCollections } from "../data/portfolio";
import type { Project, ProjectCategory } from "../data/portfolio";
import { Icon, Star } from "./Icon";

export default function ProjectIndex({
  onSelect,
}: {
  onSelect: (project: Project) => void;
}) {
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === "All" || project.category === category) &&
          `${project.title} ${project.subtitle} ${project.stack.join(" ")}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  const collections = projectCollections
    .map((collection) => ({
      ...collection,
      projects: collection.projects.filter((project) =>
        filtered.includes(project),
      ),
    }))
    .filter((collection) => collection.projects.length > 0);
  return (
    <section
      className="project-index-section"
      id="project-index"
      aria-labelledby="index-heading"
    >
      <div className="container">
        <div className="index-heading">
          <div>
            <span className="eyebrow">(07 — THE PROJECT INDEX)</span>
            <h2 id="index-heading">
              More to discover<span>↘</span>
            </h2>
          </div>
          <p>
            Personal portfolios on one side.
            <br />
            Everything else on the other.
          </p>
        </div>
        <div className="index-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
                {item === "All" && <sup>{projects.length}</sup>}
              </button>
            ))}
          </div>
          <label className="project-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Search projects"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a project"
            />
          </label>
        </div>
        <div className="index-results" aria-live="polite" aria-atomic="true">
          <span>
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <div
          className={`project-index-groups ${collections.length === 1 ? "single-collection" : ""}`}
        >
          {collections.map((collection) => (
            <section
              className="index-collection"
              key={collection.id}
              data-collection={collection.id}
              aria-labelledby={`index-${collection.id}`}
            >
              <div className="index-collection-heading">
                <h3 id={`index-${collection.id}`}>{collection.title}</h3>
                <span>
                  {String(collection.projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="project-table">
                {collection.projects.map((project) => (
                  <button
                    type="button"
                    className={`project-row ${project.flagship ? "flagship-row" : ""}`}
                    key={project.id}
                    onClick={() => onSelect(project)}
                    data-project-id={project.id}
                  >
                    <span
                      className="project-row-dot"
                      style={{ backgroundColor: project.accent }}
                    />
                    <h3>
                      {project.title}
                      {project.flagship && (
                        <small>
                          <Star />
                          FLAGSHIP PROJECT
                        </small>
                      )}
                    </h3>
                    <span className="project-row-category">
                      {project.category}
                    </span>
                    <Icon name="arrow" size={22} />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-projects">
            <p>No projects match this search.</p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
            >
              Clear filters <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
        <a
          className="index-github"
          href="https://github.com/AqibHussainKhan?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          More experiments live on GitHub <Icon name="github" size={18} />
        </a>
      </div>
    </section>
  );
}
