export const enableScroll = () => {
  const body = document.body;
  const fixBlocks = document.querySelectorAll(".fix-block");
  const scrollPosition = parseInt(body.dataset.scrollPosition || "0", 10);

  fixBlocks.forEach((el) => {
    el.style.paddingRight = "0px";
  });
  body.style.paddingRight = "0px";

  body.classList.remove("stop-scroll");
  body.style.top = "";

  const html = document.documentElement;
  const originalScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, scrollPosition);
  html.style.scrollBehavior = originalScrollBehavior;

  body.removeAttribute("data-scroll-position");
};
