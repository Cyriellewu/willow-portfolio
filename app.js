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
