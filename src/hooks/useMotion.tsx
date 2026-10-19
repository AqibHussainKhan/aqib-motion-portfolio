import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const MotionContext = createContext({ enabled: true, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("aqib-motion:animations");
      return saved === null
        ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : saved === "on";
    } catch {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    try {
      localStorage.setItem("aqib-motion:animations", enabled ? "on" : "off");
    } catch {
      /* Private browsing can disable storage. */
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (media.matches) setEnabled(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [enabled]);

  return (
    <MotionContext.Provider
      value={{ enabled, toggle: () => setEnabled((value) => !value) }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
