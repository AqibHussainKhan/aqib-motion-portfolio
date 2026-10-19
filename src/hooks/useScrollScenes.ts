import { useEffect } from "react";

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

// One scheduled update serves all scroll scenes. Scroll never sets React state.
export function useScrollScenes(enabled: boolean) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    let records: Array<{
      element: HTMLElement;
      top: number;
      travel: number;
      last: number;
    }> = [];
    let frame = 0;
    let needsMeasure = true;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (needsMeasure) {
        records = elements.map((element) => ({
          element,
          top: element.getBoundingClientRect().top + y,
          travel:
            element.dataset.scene === "hero"
              ? element.offsetHeight
              : Math.max(1, element.offsetHeight - window.innerHeight),
          last: -1,
        }));
        needsMeasure = false;
      }
      for (const record of records) {
        const progress = enabled ? clamp((y - record.top) / record.travel) : 0;
        if (Math.abs(progress - record.last) < 0.0005) continue;
        record.element.style.setProperty("--scene", progress.toFixed(4));
        record.last = progress;
      }
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--page-progress",
        String(scrollHeight > 0 ? clamp(y / scrollHeight) : 0),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      needsMeasure = true;
      schedule();
    };
    const resizeObserver = new ResizeObserver(measure);
    const main = document.querySelector("main");
    if (main) resizeObserver.observe(main);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    const fonts = document.fonts;
    let mounted = true;
    void fonts.ready.then(() => {
      if (mounted) measure();
    });
    measure();
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);
}

export function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}
