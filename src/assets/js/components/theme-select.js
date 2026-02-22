import { switchTheme } from "@/assets/helpers/switch-theme";

const initThemeSelect = () => {
  const container = document.querySelector("[data-theme-select]");
  if (!container) return;

  const button = container.querySelector("[data-theme-select-button]");
  const menu = container.querySelector(".theme-select__list");
  const options = menu.querySelectorAll(".theme-select__option");
  const icons = button.querySelectorAll(".theme-select__button-icon");

  const savedTheme = localStorage.getItem("theme") || "system";
  switchTheme(savedTheme);

  const updateButtonIcon = (theme) => {
    icons.forEach((icon) => {
      icon.classList.toggle(
        "theme-select__button-icon--active",
        icon.classList.contains(`theme-select__button-icon--${theme}`),
      );
    });
  };

  updateButtonIcon(savedTheme);

  options.forEach((opt) => {
    opt.setAttribute(
      "aria-pressed",
      opt.dataset.theme === savedTheme ? "true" : "false",
    );
  });

  const openMenu = () => {
    menu.classList.add("theme-select__list--open");
    button.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    menu.classList.remove("theme-select__list--open");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();

    if (menu.classList.contains("theme-select__list--open")) closeMenu();
    else openMenu();
  });

  document.addEventListener("pointerdown", (e) => {
    if (!container.contains(e.target)) closeMenu();
  });

  container.addEventListener("focusout", (e) => {
    if (e.relatedTarget && !container.contains(e.relatedTarget)) {
      closeMenu();
    }
  });

  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      button.focus();
    }
  });

  options.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      const theme = opt.dataset.theme;

      switchTheme(theme);

      localStorage.setItem("theme", theme);

      options.forEach((opt) => {
        opt.setAttribute(
          "aria-pressed",
          opt.dataset.theme === theme ? "true" : "false",
        );
      });

      updateButtonIcon(theme);

      if (e.pointerType === "mouse" || e.pointerType === "touch") {
        closeMenu();
      }
    });
  });
};

initThemeSelect();
