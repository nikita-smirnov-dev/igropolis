const initSearch = () => {
  const searchForm = document.querySelector("[data-search]");
  if (!searchForm) return;

  const input = searchForm.querySelector("[data-search-input]");
  const resetBtn = searchForm.querySelector("[data-search-reset]");

  const updateClasses = () => {
    if (input.value.trim()) {
      searchForm.classList.add("search--input");
      input.setAttribute("aria-expanded", "true");
    } else {
      searchForm.classList.remove("search--input");
      input.setAttribute("aria-expanded", "false");
    }
  };

  input.addEventListener("mouseenter", () => {
    searchForm.classList.add("search--hover");
  });

  input.addEventListener("mouseleave", () => {
    searchForm.classList.remove("search--hover");
  });

  input.addEventListener("focus", () => {
    searchForm.classList.add("search--focus");
  });

  input.addEventListener("blur", () => {
    searchForm.classList.remove("search--focus");
  });

  input.addEventListener("input", updateClasses);

  resetBtn.addEventListener("click", () => {
    input.value = "";
    updateClasses();
    input.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.altKey) {
      e.preventDefault();
      input.focus();
      searchForm.classList.add("search--focus");
    }
  });

  searchForm.addEventListener("focusout", (e) => {
    if (e.relatedTarget && !searchForm.contains(e.relatedTarget)) {
      searchForm.classList.remove("search--input");
      input.setAttribute("aria-expanded", "false");
      input.value = "";
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.relatedTarget)) {
      searchForm.classList.remove("search--input");
      searchForm.classList.remove("search--focus");
      input.setAttribute("aria-expanded", "false");
      input.value = "";
    }
  });
};

initSearch();
