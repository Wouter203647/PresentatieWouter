const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("progressDots");
const modeToggle = document.getElementById("modeToggle");
const brand = document.querySelector(".brand");

let currentIndex = 0;

function createDots() {
  slides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ga naar onderdeel ${index + 1}`);
    button.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(button);
  });
}

function updateButtons() {
  const current = slides[currentIndex];
  const prevLabel = current.dataset.prev || "Terug";
  const nextLabel = current.dataset.next || "Volgende";

  prevBtn.textContent = currentIndex === 0 ? "Terug naar begin" : prevLabel;
  nextBtn.textContent = currentIndex === slides.length - 1 ? "Terug naar begin" : nextLabel;

  prevBtn.style.opacity = currentIndex === 0 ? "0.45" : "1";
  prevBtn.disabled = currentIndex === 0;
  nextBtn.style.display = "inline-flex";
  nextBtn.disabled = false;
}

function updateDots() {
  const dots = Array.from(dotsContainer.querySelectorAll("button"));
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  if (document.body.classList.contains("read-mode")) {
    slides[Math.max(0, Math.min(index, slides.length - 1))].scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentIndex);
  });

  updateButtons();
  updateDots();
}

function nextSlide() {
  if (currentIndex === slides.length - 1) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex + 1);
  }
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

createDots();
goToSlide(0);

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
brand.addEventListener("click", (event) => {
  event.preventDefault();
  goToSlide(0);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
  }
});


modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("read-mode");
  const isReadMode = document.body.classList.contains("read-mode");
  modeToggle.textContent = isReadMode ? "Presentatiemodus" : "Leesmodus";

  if (!isReadMode) {
    window.scrollTo({ top: 0 });
    goToSlide(currentIndex);
  }
});
