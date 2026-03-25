import { modal } from "../utils/modal";

export const initExpandableText = () => {
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
      btn.classList.add("expand-btn--toggle");

      el.style.display = "-webkit-box";
      el.style.webkitBoxOrient = "vertical";
      el.style.overflow = "hidden";
      el.style.webkitLineClamp = String(maxLines);
      el.setAttribute("data-expanded", "false");

      const textNode = document.createElement("span");
      textNode.classList.add("expand-text");
      textNode.textContent = "Развернуть";

      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      iconSvg.setAttribute("width", "12");
      iconSvg.setAttribute("height", "12");
      iconSvg.setAttribute("viewBox", "0 0 12 12");
      iconSvg.classList.add("expand-icon");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute(
        "d",
        "M9.3554 4.10505C9.30891 4.05819 9.25361 4.02099 9.19268 3.99561C9.13175 3.97022 9.0664 3.95715 9.0004 3.95715C8.93439 3.95715 8.86904 3.97022 8.80811 3.99561C8.74718 4.02099 8.69188 4.05819 8.6454 4.10505L6.3554 6.39505C6.30891 6.44192 6.25361 6.47911 6.19268 6.5045C6.13176 6.52988 6.0664 6.54295 6.0004 6.54295C5.93439 6.54295 5.86904 6.52988 5.80811 6.5045C5.74718 6.47911 5.69188 6.44192 5.6454 6.39505L3.3554 4.10505C3.30891 4.05819 3.25361 4.02099 3.19268 3.99561C3.13175 3.97022 3.0664 3.95715 3.0004 3.95715C2.93439 3.95715 2.86904 3.97022 2.80811 3.99561C2.74718 4.02099 2.69188 4.05819 2.6454 4.10505C2.55227 4.19873 2.5 4.32546 2.5 4.45755C2.5 4.58965 2.55227 4.71637 2.6454 4.81005L4.9404 7.10505C5.22165 7.38595 5.6029 7.54373 6.0004 7.54373C6.3979 7.54373 6.77915 7.38595 7.0604 7.10505L9.3554 4.81005C9.44852 4.71637 9.50079 4.58965 9.50079 4.45755C9.50079 4.32546 9.44852 4.19873 9.3554 4.10505Z",
      );
      iconSvg.appendChild(path);

      btn.append(textNode, iconSvg);

      btn.addEventListener("click", () => {
        const expanded = el.getAttribute("data-expanded") === "true";
        if (expanded) {
          el.style.webkitLineClamp = String(maxLines);
          btn.classList.remove("expanded");
          textNode.textContent = "Развернуть";
          el.setAttribute("data-expanded", "false");
        } else {
          el.style.webkitLineClamp = "unset";
          btn.classList.add("expanded");
          textNode.textContent = "Свернуть";
          el.setAttribute("data-expanded", "true");
        }
      });
    }

    el.insertAdjacentElement("afterend", btn);
  });
};

initExpandableText();
