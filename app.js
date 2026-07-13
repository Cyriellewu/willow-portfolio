const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const fuelNotes = [
  "A good question",
  "An elegant query plan",
  "A stubborn edge case",
  "Someone saying 'what if?'",
];

const fuelNote = document.querySelector("#fuel-note");
if (fuelNote) {
  const advanceFuel = () => {
    const currentIndex = fuelNotes.indexOf(fuelNote.textContent);
    fuelNote.textContent = fuelNotes[(currentIndex + 1) % fuelNotes.length];
  };

  fuelNote.addEventListener("click", advanceFuel);
}

const graphCopy = document.querySelector("#graph-copy");
const graphDisplay = document.querySelector("#toy-graph");
const graphFacts = {
  time: "Time links faults that recur near each other. The graph remembers sequence, not just frequency.",
  place: "Place links faults that happen in the same subsystem context. The graph remembers where a signal belongs.",
  pattern: "Pattern links faults that co-occur more often than chance. The graph remembers a recurring relationship.",
};

document.querySelectorAll("[data-graph]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-graph]").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    if (graphCopy) graphCopy.textContent = graphFacts[button.dataset.graph];
    if (graphDisplay) graphDisplay.dataset.graphState = button.dataset.graph;
  });
});

const weekCopy = document.querySelector("#week-copy");
const weekPanel = document.querySelector("#week-panel");
const weekViews = {
  timeline: "Mon: a late walk, a finished query, and a call home. The day is more than its tasks.",
  calendar: "One fictional week: work, movement, conversation, and rest share the same calendar without competing for a streak.",
  recap: "The recap is not a productivity score. It is a small record of where attention went.",
};

document.querySelectorAll("[data-week-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-week-view]").forEach((item) => item.setAttribute("aria-selected", "false"));
    button.setAttribute("aria-selected", "true");
    if (weekCopy) weekCopy.textContent = weekViews[button.dataset.weekView];
    if (weekPanel) {
      weekPanel.dataset.view = button.dataset.weekView;
      weekPanel.setAttribute("aria-labelledby", button.id);
    }
  });

  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll("[data-week-view]")];
    const index = tabs.indexOf(button);
    const next = event.key === "ArrowRight"
      ? tabs[(index + 1) % tabs.length]
      : tabs[(index - 1 + tabs.length) % tabs.length];
    next.focus();
    next.click();
  });
});

const casts = [
  { symbol: "☷", text: "Code chooses: a fixed local hexagram. AI may: explain its traditional themes. AI may not: predict an outcome." },
  { symbol: "☉", text: "Code chooses: a local Tarot card from a fixed deck. AI may: offer a reflection prompt. AI may not: claim the draw is fate." },
  { symbol: "☯", text: "Code chooses: a rule-based BaZi state. AI may: summarize the supplied structure. AI may not: invent missing personal facts." },
];
let castIndex = 0;
const oracleCast = document.querySelector("#oracle-cast");
const oracleResult = document.querySelector("#oracle-result");
const oracleSymbol = document.querySelector("#oracle-symbol");
if (oracleCast && oracleResult && oracleSymbol) {
  oracleCast.addEventListener("click", () => {
    oracleResult.textContent = casts[castIndex].text;
    oracleSymbol.textContent = casts[castIndex].symbol;
    castIndex = (castIndex + 1) % casts.length;
  });
}

const claritySlider = document.querySelector("#clarity-slider");
const palmExhibit = document.querySelector(".palm-exhibit");
const palmCopy = document.querySelector("#palm-copy");
const palmStops = [...document.querySelectorAll(".slider-stops span")];
const palmNotes = [
  "Low smoothing keeps a toy branching pattern intact. This is a synthetic illustration, not biometric data.",
  "Moderate smoothing can reduce visible noise while starting to soften the original structure.",
  "Heavy smoothing looks cleaner, but the synthetic branches are less distinguishable. Visual polish is not enough.",
];

if (claritySlider && palmExhibit && palmCopy) {
  claritySlider.addEventListener("input", () => {
    const value = Number(claritySlider.value);
    palmExhibit.dataset.smoothing = String(value);
    palmCopy.textContent = palmNotes[value];
    palmStops.forEach((stop, index) => stop.classList.toggle("is-active", index === value));
  });
}

document.querySelectorAll(".decision-step").forEach((step) => {
  step.addEventListener("click", () => {
    document.querySelectorAll(".decision-step").forEach((item) => {
      const isCurrent = item === step;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-expanded", String(isCurrent));
    });
  });
});

document.querySelectorAll("[data-rep-stage]").forEach((stage) => {
  stage.addEventListener("click", () => {
    document.querySelectorAll("[data-rep-stage]").forEach((item) => {
      const isCurrent = item === stage;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-pressed", String(isCurrent));
    });
  });
});

const railLinks = [...document.querySelectorAll(".case-rail a[href^='#']")];
if (railLinks.length) {
  const sections = railLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const linkFor = (section) => railLinks.find((link) => link.getAttribute("href") === `#${section.id}`);
  const setActive = (section) => {
    railLinks.forEach((link) => link.classList.toggle("is-active", link === linkFor(section)));
  };
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (visible) setActive(visible.target);
    },
    { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.25, 0.5] },
  );
  sections.forEach((section) => observer.observe(section));
}

const siteHeader = document.querySelector(".site-header");
const siteNavigation = document.querySelector(".site-nav");
if (siteHeader && siteNavigation) {
  siteNavigation.id = siteNavigation.id || "site-navigation";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "menu-toggle";
  menuButton.setAttribute("aria-controls", siteNavigation.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
  siteNavigation.before(menuButton);

  if (!siteNavigation.querySelector(".nav-contact")) {
    const contact = document.createElement("a");
    contact.className = "nav-contact";
    contact.href = "mailto:willowwu925@gmail.com";
    contact.textContent = "Say hello";
    siteNavigation.append(contact);
  }

  const closeMenu = () => {
    siteNavigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
    document.body.classList.remove("menu-open");
  };
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    siteNavigation.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.textContent = "Close";
    document.body.classList.add("menu-open");
    siteNavigation.querySelector("a")?.focus();
  });
  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

const zoomButtons = [...document.querySelectorAll(".figure-zoom")];
if (zoomButtons.length) {
  let viewer = document.querySelector("#image-viewer");
  if (!viewer) {
    viewer = document.createElement("dialog");
    viewer.className = "image-viewer";
    viewer.id = "image-viewer";
    viewer.setAttribute("aria-labelledby", "viewer-caption");
    viewer.innerHTML = `
      <button type="button" class="viewer-close" aria-label="Close image viewer">Close</button>
      <img id="viewer-image" alt="" />
      <p id="viewer-caption"></p>
    `;
    document.body.append(viewer);
  }

  const viewerImage = viewer.querySelector("#viewer-image");
  const viewerCaption = viewer.querySelector("#viewer-caption");
  const closeButton = viewer.querySelector(".viewer-close");
  let returnFocus = null;

  zoomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.querySelector("img");
      if (!source) return;
      returnFocus = button;
      viewerImage.src = source.currentSrc || source.src;
      viewerImage.alt = source.alt;
      viewerCaption.textContent = button.dataset.caption || source.alt;
      viewer.showModal();
      closeButton.focus();
    });
  });

  const closeViewer = () => {
    viewer.close();
    viewerImage.removeAttribute("src");
    returnFocus?.focus();
  };

  closeButton.addEventListener("click", closeViewer);
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) closeViewer();
  });
}
