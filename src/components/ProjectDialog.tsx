import { useEffect, useRef } from "react";
import type { Project } from "../data/portfolio";
import { Icon } from "./Icon";
import ProjectArt from "./ProjectArt";

export default function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-heading"
      aria-describedby="project-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <button
        className="dialog-close"
        type="button"
        onClick={onClose}
        aria-label="Close project details"
      >
        <Icon name="close" size={20} />
      </button>
      <div className="dialog-art">
        <ProjectArt
          visual={project.visual}
          title={project.coverTitle || project.title}
          accent={project.accent}
        />
      </div>
      <div className="dialog-content">
        <span className="eyebrow">
          {project.flagship ? "FLAGSHIP PROJECT · " : ""}
          {project.category} / {project.year}
        </span>
        <h2 id="project-dialog-heading">{project.title}</h2>
        <p id="project-dialog-description">{project.description}</p>
        <div className="project-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="dialog-actions">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-dark"
          >
            View live project <Icon name="arrow" size={18} />
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Source code <Icon name="github" size={18} />
          </a>
        </div>
      </div>
    </dialog>
  );
}
