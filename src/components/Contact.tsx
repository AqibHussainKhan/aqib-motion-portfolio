import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../data/portfolio";
import { Icon, Star } from "./Icon";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [formError, setFormError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };
  const compose = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setFormError("Please add your name and a message before continuing.");
      return;
    }
    setFormError("");
    const subject = encodeURIComponent(`Let’s make something — ${name}`);
    const body = encodeURIComponent(
      `Hi Aqib,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setDraftReady(true);
  };
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="section-topline">
          <span>(08 — YOUR NEXT IDEA)</span>
          <span>
            <span className="status-dot" /> OPEN TO OPPORTUNITIES
          </span>
        </div>
        <div className="contact-layout">
          <div className="contact-copy" data-reveal>
            <h2 id="contact-heading">
              Have something
              <br />
              <em>in mind?</em>
              <Star />
            </h2>
            <p>
              Let’s turn that idea into something
              <br />
              people will love to use.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
              <Icon name="arrow" size={23} />
            </a>
            <button
              type="button"
              className="copy-email"
              onClick={() => void copy()}
            >
              <Icon name={copied ? "check" : "copy"} size={15} />
              {copied ? "Email copied" : "Copy email address"}
            </button>
            <span className="copy-feedback" role="status">
              {copyError
                ? `Select and copy: ${profile.email}`
                : copied
                  ? "Email address copied to your clipboard."
                  : ""}
            </span>
          </div>
          <form className="contact-form" onSubmit={compose}>
            <label>
              Your name
              <input
                type="text"
                name="name"
                placeholder="How should I call you?"
                autoComplete="name"
                required
                maxLength={90}
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label>
              A little about your idea
              <textarea
                name="message"
                placeholder="A website, a collaboration, or just a hello…"
                rows={3}
                required
                minLength={10}
                maxLength={5000}
              />
            </label>
            <div className="contact-form-bottom">
              <p>Opens a draft in your email app.</p>
              <button className="button button-dark" type="submit">
                Compose email <Icon name="arrow" size={18} />
              </button>
            </div>
            <p className="form-status" role="status">
              {draftReady
                ? "Continue in your email app to send your message. You can also use the email link above."
                : ""}
            </p>
            <p className="form-error" role="alert">
              {formError}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
