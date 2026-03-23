const initRatingChoice = () => {
  const containers = document.querySelectorAll("[data-rating-container]");

  if (!containers.length) return;

  containers.forEach((container) => {
    let rating = parseFloat(container.getAttribute("aria-valuenow")) || 0;
    let hover = 0;

    const stars = Array.from(container.querySelectorAll("[data-star]"));
    const displaySelector = container.getAttribute("data-rating-display");
    const ratingDisplayEl = displaySelector
      ? document.querySelector(displaySelector)
      : null;

    function updateDisplay() {
      const active = hover || rating;

      stars.forEach((star, i) => {
        const fillContainer = star.querySelector("[data-star-fill-container]");
        const value = i + 1;
        let fill = 0;

        if (active >= value) fill = 100;
        else if (active >= value - 0.5) fill = 50;
        else fill = 0;

        if (fillContainer) fillContainer.style.width = fill + `%`;

        container.classList.remove(
          "rating-choice--green",
          "rating-choice--yellow",
          "rating-choice--red",
        );

        if (active >= 4) container.classList.add("rating-choice--green");
        else if (active >= 2) container.classList.add("rating-choice--yellow");
        else container.classList.add("rating-choice--red");

        container.setAttribute("aria-valuenow", rating);

        if (ratingDisplayEl) {
          ratingDisplayEl.textContent = active.toFixed(1);
        }
      });
    }

    stars.forEach((star, i) => {
      star.addEventListener("mousemove", (e) => {
        const rect = star.getBoundingClientRect();
        const x = e.clientX - rect.left;
        hover = i + (x < rect.width / 2 ? 0.5 : 1);
        updateDisplay();
      });

      star.addEventListener("mouseleave", () => {
        hover = 0;
        updateDisplay();
      });

      star.addEventListener("click", () => {
        rating = hover;
        updateDisplay();
      });
    });

    container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        rating = Math.min(rating + 0.5, stars.length);
        updateDisplay();
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        rating = Math.max(rating - 0.5, 0);
        updateDisplay();
        e.preventDefault();
      }
    });

    updateDisplay();
  });
};

initRatingChoice();
