import { disableScroll } from "../helpers/disable-scroll";
import { enableScroll } from "../helpers/enable-scroll";

const setupGlobalFilters = () => {
  const wrapper = document.querySelector("[data-filters]");
  const openBtn = document.querySelector("[data-filters-open]");
  const closeBtn = document.querySelector("[data-filters-close]");
  const overlay = document.querySelector("[data-overlay]");

  const open = () => {
    wrapper?.classList.add("filters--open");
    overlay?.classList.add("overlay--visible");
    disableScroll();
    setTimeout(() => closeBtn?.focus(), 500);
  };

  const close = () => {
    wrapper?.classList.remove("filters--open");
    overlay?.classList.remove("overlay--visible");
    enableScroll();
    setTimeout(() => openBtn?.focus(), 500);
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
};

const updateFiltersCount = () => {
  const filtersCountSpan = document.querySelector("[data-filters-count]");

  if (!filtersCountSpan) return;

  let count = 0;

  document.querySelectorAll("[data-filter]").forEach((filter) => {
    const selected = [
      ...filter.querySelectorAll("[data-filter-checkbox]:checked"),
      ...Array.from(
        filter.querySelectorAll(
          'input[type="text"], input[type="number"], textarea',
        ),
      ).filter((el) => {
        el.value && el.value !== el.defaultValue && el.value !== "0";
      }),
    ];

    count += selected.length;
  });

  filtersCountSpan.textContent = count === 0 ? "" : count;
  filtersCountSpan.classList.toggle(
    "catalog__filter-btn-count--hidden",
    count === 0,
  );
};

const initFilter = (root) => {
  const trigger = root.querySelector("[data-filter-trigger]");
  const container = root.querySelector("[data-filter-container]");
  const searchWrapper = root.querySelector("[data-filter-wrapper]");
  const search = root.querySelector("[data-filter-search]");
  const clearBtn = root.querySelector("[data-filter-clear]");
  const list = root.querySelector("[data-filter-list]");
  const toggle = root.querySelector("[data-filter-toggle]");
  const empty = root.querySelector("[data-filter-empty]");
  const valueSpan = root.querySelector("[data-filter-trigger-value]");
  const countSpan = root.querySelector("[data-filter-trigger-count]");
  const items = list ? [...list.querySelectorAll(".filter__item")] : [];

  const updateList = () => {
    if (!list || !items.length) return;

    const state = container.dataset.state;
    const query = search.value.trim().toLowerCase();
    clearBtn?.classList.toggle("filter__clear--hidden", !query);

    const visible = items.filter((li) =>
      li.textContent.toLowerCase().includes(query),
    );

    items.forEach((li) => {
      li.classList.toggle("filter__item--hidden", !visible.includes(li));
    });

    empty?.classList.toggle("filter__empty--hidden", visible.length > 0);

    if (state === "collapsed") {
      visible.forEach((li, i) => {
        li.classList.toggle("filter__item--hidden", i >= 5);
      });
    }
  };

  const collectSelected = () => {
    const selected = [];
    root.querySelectorAll("[data-filter-checkbox]:checked").forEach((el) => {
      const label = el.closest("label");
      selected.push(label ? label.textContent.trim() : el.value);
    });

    root
      .querySelectorAll('input[type="text"], input[type="number"], textarea')
      .forEach((el) => {
        if (el.value && el.value !== el.defaultValue && el.value !== "0") {
          selected.push(el.value);
        }
      });

    return selected;
  };

  const updateTriggerLabel = () => {
    const selected = collectSelected();
    const len = selected.length;

    valueSpan.textContent = len === 1 ? selected[0] : "";
    valueSpan.className =
      "filter__trigger-value " +
      (len === 0
        ? "filter__trigger-value--empty"
        : len === 1
          ? "filter__trigger-value--single"
          : "filter__trigger-value--multiple");

    valueSpan.setAttribute("aria-hidden", len !== 1);
    countSpan.textContent = len > 1 ? len : "";

    countSpan.classList.toggle("filter__trigger-count--hidden", len <= 1);

    updateFiltersCount();
  };

  const setState = (state) => {
    container.dataset.state = state;
    root.classList.toggle("filter--expanded", state === "expanded");
    root.classList.toggle("filter--collapsed", state === "collapsed");
    toggle.textContent = state === "expanded" ? "Свернуть все" : "Показать все";
    searchWrapper?.classList.toggle("filter--hidden", state === "collapsed");
    if (state === "collapsed") search.value = "";
    updateList();
  };

  trigger.addEventListener("click", () => {
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!expanded));
    root.classList.toggle("filter--open", !expanded);
  });

  toggle?.addEventListener("click", () => {
    setState(
      container.dataset.state === "collapsed" ? "expanded" : "collapsed",
    );
  });

  search?.addEventListener("input", updateList);
  clearBtn?.addEventListener("click", () => {
    search.value = "";
    updateList();
    search.focus();
  });

  root.addEventListener("change", updateTriggerLabel);
  root.addEventListener("input", (e) => {
    if (e.target.matches("input, textarea")) {
      updateTriggerLabel();
    }
  });

  updateList();
};

const initFilters = () => {
  setupGlobalFilters();
  document.querySelectorAll("[data-filter]").forEach(initFilter);
};

initFilters();
