const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

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
