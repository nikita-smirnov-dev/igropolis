import { init } from "astro/virtual-modules/prefetch.js";
import { disableScroll } from "../helpers/disable-scroll";
import { enableScroll } from "../helpers/enable-scroll";

const initBurger = () => {
  const burger = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-menu]");

  if (!burger || !menu) return;

  const openMenu = () => {
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Закрыть меню");
    menu.classList.add("header__nav--visible");

    disableScroll();

    const focusable = menu.querySelector("a");

    setTimeout(() => {
      focusable?.focus();
    }, 300);
  };

  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    menu.classList.remove("header__nav--visible");

    enableScroll();

    burger?.focus();
  };

  const toggleMenu = () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  };

  burger.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
};

initBurger();
