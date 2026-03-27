import Swiper from "swiper";
import { Navigation } from "swiper";
import { getGap } from "@/assets/js/helpers/get-gap";

const initMainCollectionsSlider = () => {
  const slider = document.querySelector("[data-main-collections-slider]");

  if (!slider) return;

  const gap = getGap();

  new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: gap,
    speed: 700,
    loop: true,
    loopAdditionalSlides: 1,
    a11y: {
      enabled: true,
    },
    navigation: {
      nextEl: ".main-collections__slider-btn--next",
      prevEl: ".main-collections__slider-btn--prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
    },
  });
};

initMainCollectionsSlider();
