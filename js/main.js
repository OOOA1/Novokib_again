"use strict";

const btnToShowModalWindow = document.querySelectorAll(".btn");
const overlay = document.querySelectorAll(".overlay");
const modalWindow = document.querySelectorAll(".form__block2");
const allSections = document.querySelectorAll(".section");
const lazyImages = document.querySelectorAll("img[data-src]");
const hamburger = document.querySelectorAll(".hamburger");
const close = document.querySelectorAll(".close");
const headerNav = document.querySelectorAll(".header_navigation");
const headerNavEl = document.querySelectorAll(".header_nav_adaptation");

// плавное прокручивание
document.querySelectorAll(".nav__el").forEach(function (htmlElement) {
  htmlElement.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  });
});

// Открытие модального окна

btnToShowModalWindow.forEach((btn) => {
  btn.addEventListener("click", () => {
    overlay.forEach((overlay) => overlay.classList.remove("hidden"));
    modalWindow.forEach((modal) => modal.classList.remove("hidden"));
  });
});

overlay.forEach((overlay) => {
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    modalWindow.forEach((modal) => modal.classList.add("hidden"));
  });
});

// Появление частей сайта

const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Имплементация Lazy Loading Это важно!!!

const loadImages = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Меняем изображение на изображение с высоким разрешением

  entry.target.src = entry.target.dataset.src;
  // Загрузка высококачественного изображения только после того как высококачесвтенное изображение скачается
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  // Выключить обсервер(перестать наблюдать)
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  thashold: 0.7,
});

lazyImages.forEach((image) => lazyImagesObserver.observe(image));

// Меню гамбургер

// Показать кнопку бургера

const showOpenBtn = function () {
  hamburger.forEach((openBtn) => {
    setTimeout(() => (openBtn.style.display = "block"), 300);
  });
};

const hideOpenBtn = function () {
  hamburger.forEach((openBtn) => {
    setTimeout(() => (openBtn.style.display = "none"), 300);
  });
};

const showCloseBtn = function () {
  close.forEach((closeBtn) => {
    setTimeout(() => (closeBtn.style.display = "block"), 300);
  });
};

const hideCloseBtn = function () {
  close.forEach((closeBtn) => {
    setTimeout(() => (closeBtn.style.display = "none"), 300);
  });
};

const showNav = function () {
  headerNav.forEach((nav) => {
    nav.style.visibility = "visible";
    nav.style.display = "block";
    nav.style.transform = "translateY(0%)";
  });
};

const hideNav = function () {
  headerNav.forEach((nav) => {
    nav.style.visibility = "hidden";
    // nav.style.display = "none";
    nav.style.transform = "translateY(-100%)";
  });
};

// Открыть меню
hamburger.forEach((openBtn) => {
  openBtn.addEventListener("click", () => {
    hideOpenBtn();
    showCloseBtn();
    showNav();
  });
});

// Закрыть меню
close.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    hideCloseBtn();
    showOpenBtn();
    hideNav();
  });
});

// Закрыть меню после крика на элемент меню

headerNavEl.forEach((navEl) => {
  navEl.addEventListener("click", () => {
    hideNav();
    hideCloseBtn();
    showOpenBtn();
  });
});
