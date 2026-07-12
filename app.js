const root = document.documentElement;
const menuButton = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".mobile-nav");
const themeButton = document.querySelector(".theme-toggle");
const currentYear = document.querySelector("#current-year");
const fuelNote = document.querySelector("#fuel-note");

const fuelNotes = [
  "A good question",
  "An elegant query plan",
  "A stubborn edge case",
  "Someone saying “what if?”",
];

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeButton?.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
}

themeButton?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNavigation?.classList.toggle("is-open", !isOpen);
});

mobileNavigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileNavigation.classList.remove("is-open");
  });
});

if (fuelNote) {
  fuelNote.addEventListener("click", () => {
    const currentIndex = fuelNotes.indexOf(fuelNote.textContent);
    const nextIndex = (currentIndex + 1) % fuelNotes.length;
    fuelNote.textContent = fuelNotes[nextIndex];
  });
  fuelNote.setAttribute("role", "button");
  fuelNote.setAttribute("tabindex", "0");
  fuelNote.setAttribute("aria-label", "Change fuel note");
  fuelNote.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fuelNote.click();
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

setTheme(root.getAttribute("data-theme") || "light");
