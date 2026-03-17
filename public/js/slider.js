function clampIndex(index, length) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function initSlider(root) {
  const images = Array.from(root.querySelectorAll(".slider__img"));
  const prev = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  const dots = root.querySelector("[data-slider-dots]");

  if (images.length === 0) return;

  let current = images.findIndex((img) => img.classList.contains("is-active"));
  if (current < 0) current = 0;

  function setActive(index) {
    current = clampIndex(index, images.length);
    images.forEach((img, i) => img.classList.toggle("is-active", i === current));
    if (dots) {
      Array.from(dots.children).forEach((dot, i) =>
        dot.classList.toggle("is-active", i === current),
      );
    }
  }

  if (dots) {
    dots.innerHTML = "";
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "slider__dot" + (i === current ? " is-active" : "");
      dots.appendChild(dot);
    });
  }

  prev?.addEventListener("click", () => setActive(current - 1));
  next?.addEventListener("click", () => setActive(current + 1));

  let timer = window.setInterval(() => setActive(current + 1), 4500);

  root.addEventListener("mouseenter", () => {
    window.clearInterval(timer);
  });
  root.addEventListener("mouseleave", () => {
    timer = window.setInterval(() => setActive(current + 1), 4500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-slider]").forEach(initSlider);
});

