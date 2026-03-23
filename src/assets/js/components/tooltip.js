const initTooltips = () => {
  const containers = document.querySelectorAll("[data-tooltip-container]");

  containers.forEach((container) => {
    const btn = container.querySelector("[data-tooltip-btn]");
    const tooltip = container.querySelector("[data-tooltip-element]");
    const parent = container.closest("[data-tooltip-parent]");

    if (!btn || !tooltip || !parent) return;

    const showTooltip = () => {
      tooltip.classList.remove("tooltip__elem--hidden");

      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;

      const parentRect = parent.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let vert = "top";
      if (containerRect.top - tooltipHeight < parentRect.top) vert = "bottom";

      let hor = "right";
      if (containerRect.left - tooltipWidth < parentRect.left) hor = "left";

      tooltip.dataset.positionVert = vert;
      tooltip.dataset.positionHor = hor;
    };

    const hideTooltip = () => {
      tooltip.classList.add("tooltip__elem--hidden");
    };

    btn.addEventListener("mouseenter", showTooltip);
    btn.addEventListener("focus", showTooltip);
    btn.addEventListener("mouseleave", hideTooltip);
    btn.addEventListener("blur", hideTooltip);
    btn.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideTooltip();
    });
  });
};

initTooltips();
