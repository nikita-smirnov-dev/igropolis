const initCustomSelect = () => {
  const selects = document.querySelectorAll("[data-custom-select]");

  if (!selects.length) return;

  selects.forEach((el) => {
    const trigger = el.querySelector("[role=combobox]");
    const listbox = el.querySelector("[data-select-listbox]");
    const options = el.querySelectorAll("[data-select-option]");
    const hiddenInput = el.querySelector("[data-select-hidden]");

    if (!trigger || !listbox || !options.length || !hiddenInput) return;

    let open = false;
    let activeIndex = 0;

    const updateHighlight = (index) => {
      activeIndex = index;
      options.forEach((opt, i) => {
        opt.classList.toggle("custom-select__option--current", i === index);
      });
      trigger.setAttribute("aria-activedescendant", options[index].id);
    };

    const selectOption = (index) => {
      activeIndex = index;
      options.forEach((opt, i) => {
        opt.setAttribute("aria-selected", i === index ? "true" : "false");
      });

      const selected = options[index];
      const value = selected.dataset.value;
      const label = selected.textContent;

      const span = trigger.querySelector("span");
      span.textContent = label;

      hiddenInput.value = value;

      closeListbox();
    };

    const openListbox = () => {
      el.classList.add("custom-select--open");
      trigger.setAttribute("aria-expended", "true");
      open = true;
      updateHighlight(activeIndex);
      trigger.focus();
    };
    const closeListbox = () => {
      el.classList.remove("custom-select--open");
      trigger.setAttribute("aria-expended", "false");
      trigger.removeAttribute("aria-activedescendant", "false");
      open = false;
    };

    trigger.addEventListener("click", () => {
      open ? closeListbox() : openListbox();
    });

    trigger.addEventListener("keydown", (e) => {
      const max = options.length - 1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) openListbox();
          updateHighlight((activeIndex + 1) % options.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) openListbox();
          updateHighlight((activeIndex - 1 + options.length) % options.length);
          break;
        case "Home":
          e.preventDefault();
          if (!open) openListbox();
          updateHighlight(0);
          break;
        case "End":
          e.preventDefault();
          if (!open) openListbox();
          updateHighlight(max);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (open) selectOption(activeIndex);
          else openListbox();
          break;
        case "Escape":
          e.preventDefault();
          closeListbox();
          break;
      }
    });

    options.forEach((opt, i) => {
      opt.addEventListener("click", () => selectOption(i));
      opt.addEventListener("mousedown", (ev) => ev.preventDefault());
    });

    document.addEventListener("click", (e) => {
      if (!el.contains(e.target)) closeListbox();
    });

    el.addEventListener("focusout", (e) => {
      if (!el.contains(e.relatedTarget)) {
        closeListbox();
      }
    });
  });
};

initCustomSelect();
