import { modal } from "../utils/modal";

export const initExtandableText = () => {
  const elements = document.querySelectorAll("[data-descr]");

  if (!elements || !elements.length === 0) return;

  const getLineHeight = (el) => {
    const cs = getComputedStyle(el);
    const lh = cs.lineHeight;

    if (!lh || lh === "normal") {
      const fs = parseFloat(cs.fontSize) || 16;
      return fs * 1.2;
    }

    return parseFloat(lh);
  };

  elements.forEach((el) => {
    const maxLines = parseInt(el.getAttribute("data-max-lines"), 10) || 5;

    const prevDisplay = el.style.display;
    const prevOverFlow = el.style.overflow;
    const prevLineClamp = el.style.webkitLineClamp;

    el.style.display = "block";
    el.style.overflow = "visible";
    el.style.webkitLineClamp = "unset";

    const lineCount = Math.round(el.scrollHeight / getLineHeight(el));

    el.style.display = prevDisplay;
    el.style.overflow = prevOverFlow;
    el.style.webkitLineClamp = prevLineClamp;

    if (lineCount <= maxLines) return;

    const next = el.nextElementSibling;
    if (next && next.classList.contains("expand-btn")) return;

    const action = el.getAttribute("data-expand-action") || "toggle";
    const btn = document.createElement("button");
    btn.classList.add("expand-btn");

    if (action === "modal") {
      btn.textContent = "Читать полностью";
      btn.addEventListener("click", () => {
        btn.setAttribute("data-testimonial", el.textContent.trim());
        modal.open("testimonial");
      });
    } else if (action === "toggle") {
    }

    el.insertAdjacentElement("afterend", btn);
  });
};

initExtandableText();
