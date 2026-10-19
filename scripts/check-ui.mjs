import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { build } from "vite";
import { Window } from "happy-dom";
import React, { act } from "react";
import { renderToStaticMarkup } from "react-dom/server";

await build({
  build: { ssr: "src/App.tsx", outDir: ".qa/ssr", emptyOutDir: true },
  logLevel: "error",
});
const { default: App } = await import("../.qa/ssr/App.js");
const markup = renderToStaticMarkup(React.createElement(App));
assert.equal(
  (markup.match(/<h1[ >]/g) || []).length,
  1,
  "One primary page heading",
);
for (const id of [
  "home",
  "craft",
  "work",
  "playground",
  "about",
  "project-index",
  "contact",
]) {
  assert.ok(markup.includes(`id="${id}"`), `Section ${id} is present`);
}
for (const source of [...markup.matchAll(/src="([^"?]+)"/g)].map(
  (match) => match[1],
)) {
  if (!source.startsWith("http"))
    assert.ok(
      fs.existsSync(path.join("public", source)),
      `Local asset exists: ${source}`,
    );
}
console.log("PASS: semantic page structure, section links, and local assets");

const window = new Window({ url: "https://portfolio.example/" });
const { document } = window;
for (const key of [
  "window",
  "document",
  "HTMLElement",
  "HTMLDialogElement",
  "Event",
  "MouseEvent",
  "PointerEvent",
  "KeyboardEvent",
  "FormData",
])
  globalThis[key] = key === "window" ? window : window[key];
Object.defineProperty(globalThis, "navigator", {
  value: window.navigator,
  configurable: true,
});
globalThis.localStorage = window.localStorage;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(document, "hidden", {
  value: false,
  writable: true,
  configurable: true,
});
Object.defineProperty(document, "fonts", {
  value: { ready: Promise.resolve() },
  configurable: true,
});
let reducedMotion = false;
window.matchMedia = (query) => ({
  matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
});
let frameId = 0;
const frames = new Map();
globalThis.requestAnimationFrame = (callback) => {
  frames.set(++frameId, callback);
  return frameId;
};
globalThis.cancelAnimationFrame = (id) => frames.delete(id);
const intersections = [];
class IntersectionMock {
  constructor(callback) {
    this.callback = callback;
    this.targets = [];
    intersections.push(this);
  }
  observe(target) {
    this.targets.push(target);
  }
  unobserve(target) {
    this.targets = this.targets.filter((item) => item !== target);
  }
  disconnect() {
    this.targets = [];
  }
}
class ResizeMock {
  observe() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionMock;
globalThis.ResizeObserver = ResizeMock;
let paintCount = 0;
window.HTMLCanvasElement.prototype.getContext = () => ({
  clearRect() {},
  setTransform() {},
  fillRect() {
    paintCount++;
  },
  globalAlpha: 1,
  fillStyle: "",
});
window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
  this.querySelector("button")?.focus();
};
window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
let copied = "";
Object.defineProperty(window.navigator, "clipboard", {
  value: {
    writeText: async (text) => {
      copied = text;
    },
  },
  configurable: true,
});
const mount = document.createElement("div");
document.body.appendChild(mount);
// Vite's production bundle step sets NODE_ENV. DOM tests need React's act-aware build.
process.env.NODE_ENV = "test";
const { createRoot } = await import("react-dom/client");
let root = createRoot(mount);
const flushFrame = (time) => {
  const callbacks = [...frames.values()];
  frames.clear();
  callbacks.forEach((callback) => callback(time));
};
const click = async (element) => {
  assert.ok(element, "Click target exists");
  await act(async () =>
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true })),
  );
};
const textButton = (text) =>
  [...document.querySelectorAll("button")].find(
    (button) => button.textContent.trim() === text,
  );
const render = async () => {
  await act(async () => root.render(React.createElement(App)));
  flushFrame(16);
};
await render();
assert.equal(document.documentElement.dataset.motion, "on");

await click(document.querySelector(".menu-button"));
assert.equal(
  document.querySelector(".menu-button").getAttribute("aria-expanded"),
  "true",
);
await act(async () =>
  document.dispatchEvent(
    new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
  ),
);
assert.equal(
  document.querySelector(".menu-button").getAttribute("aria-expanded"),
  "false",
);
await click(document.querySelector(".menu-button"));
await act(async () =>
  document.body.dispatchEvent(
    new window.PointerEvent("pointerdown", { bubbles: true }),
  ),
);
assert.equal(
  document.querySelector(".menu-button").getAttribute("aria-expanded"),
  "false",
);
console.log("PASS: menu toggle, Escape, and outside click");

const expectedCollections = { portfolios: 6, "web-projects": 10 };
const collectionIds = {};
assert.equal(
  document.querySelectorAll("#playground .floating-project").length,
  6,
  "The reference composition has six floating cards",
);
assert.ok(
  document.querySelector("#playground .playground-title h2 br"),
  "The main headline stays centered on two lines",
);
assert.ok(
  !document.querySelector("#playground .collection-cards"),
  "The grid gallery is absent",
);
for (const [id, count] of Object.entries(expectedCollections)) {
  const group = document.querySelector(`#playground [data-collection="${id}"]`);
  const pager = group.querySelector(".floating-collection-controls");
  const pageCount = Math.ceil(count / 3);
  const indexRows = [
    ...document.querySelectorAll(
      `#project-index [data-collection="${id}"] .project-row`,
    ),
  ];
  assert.equal(
    indexRows.length,
    count,
    `${id} index contains all its projects`,
  );
  assert.equal(Number(pager.dataset.pageCount), pageCount);
  const seen = new Set();
  const allowedSlots = id === "portfolios" ? [1, 3, 5] : [2, 4, 6];
  for (let page = 0; page < pageCount; page++) {
    assert.equal(Number(pager.dataset.page), page + 1);
    const cards = [...group.querySelectorAll(".floating-project")];
    assert.equal(
      cards.length,
      3,
      "Each side keeps three visible floating cards",
    );
    for (const [slot, card] of cards.entries()) {
      seen.add(card.dataset.projectId);
      assert.ok(
        card.classList.contains(`floating-project-${allowedSlots[slot]}`),
        "Category stays on its side of the reference layout",
      );
    }
    await click(pager.querySelector('[data-direction="next"]'));
  }
  assert.equal(
    Number(pager.dataset.page),
    1,
    "Gallery wraps to the initial view",
  );
  assert.equal(
    seen.size,
    count,
    "Every project is reachable through the gallery controls",
  );
  collectionIds[id] = seen;
  assert.deepEqual(
    new Set(indexRows.map((row) => row.dataset.projectId)),
    seen,
    "Gallery and index grouping agree",
  );
  await click(pager.querySelector('[data-direction="previous"]'));
  assert.equal(
    Number(pager.dataset.page),
    pageCount,
    "Previous wraps to the final page",
  );
  await click(pager.querySelector('[data-direction="next"]'));
  assert.equal(Number(pager.dataset.page), 1);
}
assert.equal(
  [...collectionIds.portfolios].filter((id) =>
    collectionIds["web-projects"].has(id),
  ).length,
  0,
);
assert.equal(
  document.querySelector("#work .featured-project h3").textContent,
  "Hospital Management System",
);
assert.ok(document.querySelector("#work .project-flagship-label"));
assert.ok(!document.body.textContent.includes("Cards Portal"));
assert.ok(!document.body.textContent.includes("Time, counted."));
console.log(
  "PASS: reference floating composition, independent paging, 6/10 grouping, and first-featured HMS",
);

assert.equal(document.querySelectorAll(".project-row").length, 16);
await click(textButton("Web apps"));
assert.equal(document.querySelectorAll(".project-row").length, 8);
await click(textButton("Portfolios"));
assert.equal(document.querySelectorAll(".project-row").length, 6);
const search = document.querySelector('input[type="search"]');
const setValue = async (input, value) => {
  const prototype =
    input.tagName === "TEXTAREA"
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, "value").set.call(input, value);
  await act(async () => {
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
    input.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
};
await setValue(search, "zzzz-no-match");
assert.equal(document.querySelectorAll(".project-row").length, 0);
await click(textButton("Clear filters"));
assert.equal(document.querySelectorAll(".project-row").length, 16);
console.log("PASS: project categories, search, empty result, and filter reset");

const row = document.querySelector('.project-row[data-project-id="hospital"]');
row.focus();
await click(row);
assert.ok(document.querySelector("dialog[open]"));
assert.equal(
  document.querySelector("#project-dialog-heading").textContent,
  "Hospital Management System",
);
assert.equal(document.body.style.overflow, "hidden");
assert.ok(
  document
    .querySelector("dialog a")
    .href.includes("hospital-management-system./"),
);
await act(async () =>
  document
    .querySelector("dialog")
    .dispatchEvent(new window.Event("cancel", { cancelable: true })),
);
assert.ok(!document.querySelector("dialog"), "Project dialog closes");
assert.equal(document.body.style.overflow, "");
assert.ok(document.activeElement === row, "Focus returns to the project row");
await click(row);
await click(document.querySelector('[aria-label="Close project details"]'));
assert.ok(!document.querySelector("dialog"), "Project dialog closes");
console.log(
  "PASS: project modal, correct links, close/cancel, scroll lock, and focus restore",
);

const expectedLiveLinks = new Set(
  [
    "hospital-management-system.",
    "nova-ecommerce-store",
    "hostelx-management-system",
    "gutham-lab-portal",
    "Daraz.com",
    "made-in-webflow",
    "react-website-clone",
    "weather-app",
    "quiz-app",
    "solar-system",
    "aqib-cinematic-portfolio",
    "aqib-latest-portfolio",
    "portfolio",
    "portfolio-ideas-in-motion",
    "portfolio-v2",
    "your-logo-portfolio",
  ].map((slug) => `https://aqibhussainkhan.github.io/${slug}/`),
);
const observedLiveLinks = new Set();
for (const [id, count] of Object.entries(expectedCollections)) {
  const group = document.querySelector(`#playground [data-collection="${id}"]`);
  const other = document.querySelector(
    `#playground [data-collection="${id === "portfolios" ? "web-projects" : "portfolios"}"] .floating-collection-controls`,
  );
  const otherPage = other.dataset.page;
  for (let page = 0; page < Math.ceil(count / 3); page++) {
    for (const card of group.querySelectorAll(".floating-project")) {
      await click(card);
      const dialog = document.querySelector("dialog[open]");
      assert.ok(dialog, `Details open for ${card.dataset.projectId}`);
      observedLiveLinks.add(dialog.querySelector(".dialog-actions a").href);
      await click(dialog.querySelector('[aria-label="Close project details"]'));
    }
    await click(group.querySelector('[data-direction="next"]'));
    assert.equal(
      other.dataset.page,
      otherPage,
      "Moving one gallery leaves the other gallery unchanged",
    );
  }
}
assert.deepEqual(
  observedLiveLinks,
  expectedLiveLinks,
  "Every retained and requested live link is reachable in the floating gallery",
);
console.log(
  "PASS: all 16 gallery cards open the correct live-project links, preserving case and the HMS trailing dot",
);

await click(document.querySelector(".copy-email"));
assert.equal(copied, "aqib.n2742@gmail.com");
assert.ok(
  document.querySelector(".copy-email").textContent.includes("Email copied"),
);
const form = document.querySelector(".contact-form");
await setValue(form.elements.name, "A visitor");
await setValue(form.elements.email, "visitor@example.com");
await setValue(form.elements.message, "I would like to discuss a new website.");
await act(async () =>
  form.dispatchEvent(
    new window.Event("submit", { bubbles: true, cancelable: true }),
  ),
);
assert.equal(window.location.protocol, "mailto:");
assert.ok(
  decodeURIComponent(window.location.href).includes("visitor@example.com"),
);
assert.ok(
  document
    .querySelector(".form-status")
    .textContent.includes("Continue in your email app"),
);
console.log("PASS: copy email and contact draft (no message is sent)");

const canvas = document.querySelector("canvas");
const orbitObserver = intersections.find((observer) =>
  observer.targets.includes(canvas),
);
assert.ok(orbitObserver);
orbitObserver.callback([{ target: canvas, isIntersecting: true }]);
const previousPaints = paintCount;
flushFrame(32);
assert.ok(paintCount > previousPaints);
orbitObserver.callback([{ target: canvas, isIntersecting: false }]);
flushFrame(48);
assert.equal(
  frames.size,
  0,
  "Offscreen particle animation has no pending loop",
);
await click(document.querySelector('[aria-label="Pause animations"]'));
flushFrame(64);
assert.equal(document.documentElement.dataset.motion, "off");
assert.equal(localStorage.getItem("aqib-motion:animations"), "off");
assert.equal(frames.size, 0);
await act(async () => root.unmount());
root = createRoot(mount);
await render();
assert.equal(document.documentElement.dataset.motion, "off");
await act(async () => root.unmount());
localStorage.clear();
reducedMotion = true;
root = createRoot(mount);
await render();
assert.equal(
  document.documentElement.dataset.motion,
  "off",
  "System reduced motion is respected",
);
await act(async () => root.unmount());
assert.equal(frames.size, 0, "Animation frames are cleaned up on unmount");
console.log(
  "PASS: offscreen pause, motion preference persistence, reduced motion, and cleanup",
);

const assets = fs.readdirSync("dist/assets");
const jsBytes = assets
  .filter((name) => name.endsWith(".js"))
  .reduce(
    (sum, name) =>
      sum + gzipSync(fs.readFileSync(`dist/assets/${name}`)).length,
    0,
  );
assert.ok(jsBytes < 102400, `Compressed JavaScript budget: ${jsBytes} bytes`);
console.log(
  `PASS: production JavaScript budget (${(jsBytes / 1024).toFixed(1)} KiB gzip, under 100 KiB)`,
);
console.log(
  "These are component/DOM checks. Browser layout, real-device frame rate, and native dialog focus containment require browser/device QA.",
);
await window.happyDOM.abort();
