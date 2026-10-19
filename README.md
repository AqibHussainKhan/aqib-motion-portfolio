# Aqib Motion Portfolio

A React + TypeScript + Tailwind CSS portfolio inspired by the supplied video: a purple introduction, scroll-controlled 3D cards, a live particle ring, horizontal selected work, and a grouped project gallery. The remaining sections introduce Aqib, list his skills, provide a searchable project index, and open an email conversation.

## Open and run

Open the **Aqib Motion Portfolio** folder in VS Code. In its terminal:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. Use a current Node.js version compatible with the installed Vite version; this project was verified with Node.js 24.19.0.

To create the production build:

```bash
npm run build
npm run preview
```

The output is in `dist/`. Vite uses `base: './'` so asset paths also work when the project is hosted under a GitHub Pages repository path. Opening `index.html` directly is not the development workflow.

## Where to edit

| File                               | What it controls                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `src/data/portfolio.ts`            | Name, email, social links, biography, skills, projects, and Live/GitHub URLs |
| `src/components/Navbar.tsx`        | Navigation and mobile menu                                                   |
| `src/components/Hero.tsx`          | Opening headline and hero composition                                        |
| `src/components/CardStage.tsx`     | Three rotating cards                                                         |
| `src/components/OrbitScene.tsx`    | Particle ring and visibility-aware animation                                 |
| `src/components/SelectedWork.tsx`  | Featured projects and desktop horizontal sequence                            |
| `src/components/Playground.tsx`    | Grouped portfolio and web-project gallery                                    |
| `src/components/About.tsx`         | Photo, personal introduction, and skills                                     |
| `src/components/ProjectIndex.tsx`  | Search and category filters                                                  |
| `src/components/ProjectDialog.tsx` | Project details dialog                                                       |
| `src/components/Contact.tsx`       | Copy email and compose-email form                                            |
| `src/components/Footer.tsx`        | Footer and social links                                                      |
| `src/hooks/useScrollScenes.ts`     | Shared scroll updates and section reveals                                    |
| `src/hooks/useMotion.tsx`          | Pause control and saved motion preference                                    |
| `src/App.css`                      | Layout, animation composition, and responsive styles                         |
| `src/index.css`                    | Font, palette, resets, and global focus styles                               |
| `public/images/aqib-portrait.webp` | Aqib's About photo                                                           |
| `public/images/hero-chrome.webp`   | Hero artwork                                                                 |
| `public/images/lime-loop.webp`     | NOVA editorial cover                                                         |
| `public/images/blue-portal.webp`   | HOSTELX editorial cover                                                      |

Add project records in `src/data/portfolio.ts`. The project index updates from that data. Set `featured: true` for the projects that should appear in selected work. Hospital Management System is the first featured project and has `flagship: true`. A new visual treatment needs a matching `ProjectArt.tsx` treatment; existing visual types can be reused. Both the gallery and the searchable index derive their groups from `projectCollections`: six personal portfolios on the left and ten applications, recreations, and experiments on the right. On mobile, the same groups stack vertically.

## Working behavior

- Project details use a native dialog with Escape/backdrop closing and focus restoration.
- Live and source links open the corresponding existing public project.
- Search and categories work together, with a clear-filters action for an empty result.
- The contact form validates inputs and **opens an email draft in the visitor's email app**. The visitor sends it there. No backend email service or delivery claim is included.
- The animation pause control saves its preference in localStorage. System reduced-motion preferences are respected by default.
- Desktop work cards follow vertical scrolling. At 800px and below they use a vertical layout to avoid forcing sideways navigation on phones.

## Performance decisions

- Scroll events schedule one shared requestAnimationFrame update and never set React state per frame.
- The particle loop runs only while its canvas is near the viewport, the tab is visible, and animations are enabled. It stops when hidden, offscreen, or paused.
- Mobile uses fewer particles and a lower canvas pixel ratio.
- Hero and gallery imagery are local optimized WebP files. Non-hero images load lazily.
- The font is local WOFF2. No remote font request, live iframe, embedded video, animation framework, or WebGL runtime is required.
- All animation and observer cleanup runs on unmount.

## Checks

```bash
npm run check
```

This runs TypeScript and the production build, then component checks using a simulated DOM: semantic structure and local assets, menu close behavior, filters/search, modal actions and focus restoration, copy-email and email-draft behavior, motion preference persistence, reduced motion, offscreen animation cleanup, and a 100 KiB gzip JavaScript budget.

**Verification limit:** a browser preview was not available in the build environment. These checks do not measure browser layout, native dialog focus containment, GPU rendering, or real-phone frame rate. Test scrolling and layout on desktop and phone before calling performance verified. A constant frame rate on every device is not guaranteed.

## Artwork and reference

The visible sequence is recreated from the supplied clip. Sections not fully visible in that clip are designed in the same visual language. The gallery covers are editorial artworks, not screenshots of the linked applications.

Artwork generation details are in `ARTWORK.md`. Aqib's photo was reused from his existing public cinematic-portfolio repository. Manrope is bundled under the included SIL Open Font License (`FONT-LICENSE.txt`).

## Project collection update

Cards Portal and Time, counted were removed. All 12 newly supplied links were added. The four other existing projects remain. Hospital Management System is the flagship and appears first in featured work.

| Portfolios (6)        | Web projects (10)                     |
| --------------------- | ------------------------------------- |
| Cinematic Portfolio   | Hospital Management System — flagship |
| Aqib Latest Portfolio | NOVA                                  |
| Personal Portfolio    | HOSTELX                               |
| Ideas in Motion       | LabCore                               |
| Portfolio V2          | Daraz Storefront                      |
| Your Logo Portfolio   | Made in Webflow                       |
|                       | React Website Clone                   |
|                       | SkyWatch Weather                      |
|                       | Web Dev Quiz                          |
|                       | Solar System                          |

Made in Webflow is a community-showcase website recreation. React Website Clone recreates the React developer website. Both belong with the other web projects, not the personal portfolios.
