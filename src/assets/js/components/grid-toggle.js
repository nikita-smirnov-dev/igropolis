const initGridToggle = () => {
  const toggleContainer = document.querySelector("[data-grid-toggle]");
  const grid = document.querySelector("[data-games-list]");

  if (!toggleContainer || !grid) return;

  const btnSmall = document.querySelector('button[data-toggle-type="small"]');
  const btnBig = document.querySelector('button[data-toggle-type="big"]');

  const isBig = localStorage.getItem("gridView") === "big";

  grid.classList.toggle("catalog__list--big", isBig);
  btnBig.setAttribute("aria-pressed", isBig);
  btnSmall.setAttribute("aria-pressed", !isBig);

  toggleContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-toggle-type]");
    if (!button) return;

    const makeBig = button.dataset.toggleType === "big";

    grid.classList.toggle("catalog__list--big", makeBig);
    btnBig.setAttribute("aria-pressed", makeBig);
    btnSmall.setAttribute("aria-pressed", !makeBig);

    if (makeBig) {
      localStorage.setItem("gridView", "big");
    } else {
      localStorage.removeItem("gridView");
    }
  });
};

initGridToggle();
