const initToast = () => {
  const TOAST_DURATION = 3000;

  const toastEl = document.querySelector("[data-toast-container]");
  if (!toastEl) return;

  const outputEl = toastEl.querySelector('output[role="status"]');
  const closeBtn = toastEl.querySelector("[data-toast-close]");

  let hideTimeout, progressTimeout;

  const toastMap = {
    favorite: {
      success: (item) => ({
        title: "Добавлено в избранное",
        desc: `"${item}" теперь в вашем избранном`,
      }),
      error: (item) => ({
        title: "Ошибка",
        desc: `Не удалось добавить "${item}" в избранное. Попробуйте позже`,
      }),
    },
    bookmark: {
      success: (item) => ({
        title: "Добавлено в закладки",
        desc: `"${item}" теперь в ваших закладках`,
      }),
      error: (item) => ({
        title: "Ошибка",
        desc: `Не удалось добавить "${item}" в закладки. Попробуйте позже`,
      }),
    },
  };

  function showToast({ status = "success", type = "favorite", item = "" }) {
    clearTimeout(hideTimeout);
    clearTimeout(progressTimeout);

    const generator = toastMap[type]?.[status];
    const { title, desc } = generator
      ? generator(item)
      : { title: "", desc: "" };

    outputEl.innerHTML = `
      <h3 class="toast__title" data-toast-title>${title}</h3>
      <p class="toast__descr" data-toast-descr>${desc}</p>
      <div class="toast__progress">
        <div class="toast__bar" data-toast-bar></div>
      </div>
    `;

    toastEl.classList.remove("toast--success", "toast--error");
    toastEl.classList.add("toast--visible", `toast--${status}`);

    const bar = outputEl.querySelector("[data-toast-bar]");
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      progressTimeout = setTimeout(() => {
        bar.style.transition = `width ${TOAST_DURATION}ms linear`;
        bar.style.width = "100%";
      }, 20);
    }

    hideTimeout = setTimeout(hideToast, TOAST_DURATION);
  }

  function hideToast() {
    toastEl.classList.remove("toast--visible");
    const bar = outputEl.querySelector("[data-toast-bar]");
    if (bar) bar.style.width = "0%";
  }

  closeBtn.addEventListener("click", hideToast);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-toast]");
    if (!btn) return;

    const status = btn.dataset.toastStatus || "success";
    const type = btn.dataset.type || "favorite";
    const item = btn.dataset.toastItem || "";

    showToast({ status, type, item });
  });
};

initToast();
