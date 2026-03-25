const initHeaderScroll = () => {
  const header = document.querySelector("[data-header]");

  if (!header) return;

  const toggleClass = () => {
    if (window.scrollY > 100) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  };

  toggleClass();

  window.addEventListener("scroll", toggleClass);
};

initHeaderScroll();
