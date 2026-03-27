const initNavScroll = (root = document) => {
  const navs = root.querySelectorAll("[data-scroll-nav]");

  navs.forEach((nav) => {
    const list = nav.querySelector("[data-scroll-list]");
    const btnLeft = nav.querySelector('[data-scroll-btn="left"]');
    const btnRight = nav.querySelector('[data-scroll-btn="right"]');

    if (!list || !btnLeft || !btnRight) return;

    const updateButtons = () => {
      const maxScroll = list.scrollWidth - list.clientWidth;
      const scrollLeft = list.scrollLeft;

      if (maxScroll <= 0) {
        btnLeft.classList.remove("is-visible");
        btnRight.classList.remove("is-visible");
        return;
      }

      btnLeft.classList.toggle("is-visible", scrollLeft > 10);
      btnRight.classList.toggle("is-visible", scrollLeft < maxScroll - 10);
    };

    btnLeft.addEventListener("click", () => {
      list.scrollBy({ left: -200, behavior: "smooth" });
    });

    btnRight.addEventListener("click", () => {
      list.scrollBy({ left: 200, behavior: "smooth" });
    });

    list.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
  });
};

initNavScroll();
