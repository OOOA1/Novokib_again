"use strict";

const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dot_container");

let currentSlide = 0;
const slidesNumber = slides.length;

// Перемещение к нужному слайду
const moveToSlide = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
};
moveToSlide(0);

// Создать точки
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" alt = "Кнопка точки для переключения слайдов" data-slide="${index}"></button>`
    );
  });
};
createDots();

// Выбор активной точки
const activateCurrentDot = function (index) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("active"));
  document.querySelector(`.dot[data-slide="${index}"]`).classList.add("active");
};
activateCurrentDot(0);

// Функция следующего слайда
const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

// Функция предыдущего слайда
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

// Перелистывание слайдера стрелочками
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    previousSlide();
  }
});

// Перелистывание слайдера с помощью точек
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});

// Таймер для перелистывания слайдов
let slideTimer = 0;
makeTimer();
function makeTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(function () {
    nextSlide();
  }, 10000);
}
