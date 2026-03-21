import noUiSlider from "nouislider";

const initRangeSlider = () => {
  const rangeElement = document.querySelector("[data-filter-range-slider]");
  const input = document.querySelector("[data-filter-range-input]");

  if (!rangeElement || !input) return;

  noUiSlider.create(rangeElement, {
    start: 0,
    connect: [true, false],
    step: 0.5,
    range: {
      min: 0,
      max: 5,
    },
  });

  rangeElement.noUiSlider.on("update", (values, handle) => {
    const value = parseFloat(values[handle]);
    input.value = value;

    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
};

initRangeSlider();
