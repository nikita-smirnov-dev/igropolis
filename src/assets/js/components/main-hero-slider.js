import Swiper from "swiper";
import { Navigation } from "swiper";

const initMainHeroSlider = () => {
  const slider = document.querySelector("[data-main-hero-slider]");

  if (!slider) return;

  new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 700,
    loop: true,
    centeredSlides: true,
    a11y: {
      enabled: true,
    },
    navigation: {
      nextEl: ".main-hero__slider-btn--next",
      prevEl: ".main-hero__slider-btn--prev",
    },
  });
};

initMainHeroSlider();
