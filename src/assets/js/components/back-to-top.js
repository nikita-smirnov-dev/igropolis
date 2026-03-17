const initBackToTop = () => {
  const btn = document.querySelector("[data-backtotop]");

  if (!btn) return;

  const SHOW_AFTER = 300;

  const toggleButton = () => {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add("back-to-top--visible");
    } else {
      btn.classList.remove("back-to-top--visible");
    }
  };

  window.addEventListener("scroll", toggleButton, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

initBackToTop();
