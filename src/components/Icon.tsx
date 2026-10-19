import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "down"
  | "github"
  | "mail"
  | "menu"
  | "close"
  | "play"
  | "pause"
  | "copy"
  | "check"
  | "chevron"
  | "search"
  | "globe";

const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 19 19 5M5 5h14v14" />
    </>
  ),
  down: (
    <>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </>
  ),
  github: (
    <>
      <path
        d="M9 19c-4.3 1.3-4.3-2.2-6-2.6M15 22v-3.4c0-1 .1-1.4-.5-2 3.3-.4 6.8-1.6 6.8-7.4 0-1.7-.6-3-1.6-4.2.2-.4.7-2-.2-4 0 0-1.3-.4-4.4 1.6a15.4 15.4 0 0 0-8 0C4 1 2.7 1.4 2.7 1.4c-.9 2-.4 3.6-.2 4a6 6 0 0 0-1.6 4.2c0 5.8 3.5 7 6.8 7.4-.5.4-.7 1.2-.7 2V22"
        transform="translate(1 0) scale(.93)"
      />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 8h16M4 16h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M6 18 18 6" />
    </>
  ),
  play: <path d="m8 4 12 8-12 8Z" />,
  pause: (
    <>
      <path d="M8 5v14M16 5v14" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m8 4 8 8-8 8" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export function Star({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M50 0C56 32 68 44 100 50 68 56 56 68 50 100 44 68 32 56 0 50 32 44 44 32 50 0Z" />
    </svg>
  );
}
