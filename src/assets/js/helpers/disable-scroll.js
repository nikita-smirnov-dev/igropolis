export const disableScroll = () => {
  const body = document.body;
  const fixBlocks = document.querySelectorAll(".fix-block");
  const scrollPosition = window.scrollY;

  const paddingOffset = `${window.innerWidth - body.offsetWidth}px`;

  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  body.style.paddingRight = paddingOffset;

  body.dataset.scrollPosition = scrollPosition;
  body.classList.add("stop-scroll");
  body.style.top = `-${scrollPosition}px`;
};
