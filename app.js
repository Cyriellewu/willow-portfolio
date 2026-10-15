const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Email: click copies the address and says so. Falls back to a mail link if the clipboard is unavailable.
document.querySelectorAll(".copy-email").forEach((button) => {
  const address = button.dataset.email;
  const label = button.textContent;
  let timer = null;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(address);
      button.textContent = "Copied";
      button.classList.add("is-copied");
      clearTimeout(timer);
      timer = setTimeout(() => {
        button.textContent = label;
        button.classList.remove("is-copied");
      }, 1600);
    } catch (error) {
      window.location.href = `mailto:${address}`;
    }
  });
});

// Image viewer for screenshots.
const frames = [...document.querySelectorAll("button.frame")];
const viewer = document.querySelector("#viewer");
if (frames.length && viewer && typeof viewer.showModal === "function") {
  const image = viewer.querySelector("img");
  const caption = viewer.querySelector("p");
  const close = viewer.querySelector(".viewer-close");
  let returnTo = null;

  frames.forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.querySelector("img");
      if (!source) return;
      returnTo = button;
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      caption.textContent = button.dataset.caption || source.alt;
      viewer.showModal();
      close.focus();
    });
  });

  close.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    image.removeAttribute("src");
    caption.textContent = "";
    if (returnTo) returnTo.focus();
    returnTo = null;
  });
}
