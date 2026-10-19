import { useEffect, useRef, useState } from "react";
import { Icon, Star } from "./Icon";
import { useMotion } from "../hooks/useMotion";

const links = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Playground", "#playground"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { enabled, toggle } = useMotion();
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation" ref={navRef}>
          <a
            href="#home"
            className="brand"
            aria-label="Aqib, back to top"
            onClick={() => setOpen(false)}
          >
            <Star />
            <span>
              aqib<span className="brand-dot">.</span>
            </span>
          </a>
          <div
            className={`nav-links ${open ? "is-open" : ""}`}
            id="navigation-links"
          >
            {links.map(([name, href]) => (
              <a key={name} href={href} onClick={() => setOpen(false)}>
                {name}
                <span>↗</span>
              </a>
            ))}
            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setOpen(false)}
            >
              Let’s talk <Icon name="arrow" size={14} />
            </a>
          </div>
          <div className="nav-controls">
            <button
              className="motion-button"
              type="button"
              onClick={toggle}
              aria-label={enabled ? "Pause animations" : "Enable animations"}
              title={enabled ? "Pause animations" : "Enable animations"}
              aria-pressed={!enabled}
            >
              <Icon name={enabled ? "pause" : "play"} size={14} />
            </button>
            <button
              ref={toggleRef}
              className="menu-button"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="navigation-links"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </nav>
      </header>
      <div className="page-progress" aria-hidden="true" />
    </>
  );
}
