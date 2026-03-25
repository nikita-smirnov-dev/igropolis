import { initExpandableText } from "./expandable-text";

const initTabs = () => {
  const tabNavs = document.querySelectorAll("[data-tabs]");

  if (!tabNavs.length) return;

  tabNavs.forEach((nav) => {
    const tabs = nav.querySelectorAll("[data-tab]");

    const activateTab = (tabBtn) => {
      const targetId = tabBtn.dataset.tab;

      tabs.forEach((btn) => {
        const isActive = btn === tabBtn;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      const panels = document.querySelectorAll("[data-target]");
      let activePanel = null;

      panels.forEach((panel) => {
        const isActive = panel.dataset.target === targetId;
        panel.classList.toggle("is-active", isActive);

        if (isActive) activePanel = panel;
      });

      requestAnimationFrame(() => {
        initExpandableText();
      });

      tabBtn.focus();
    };

    tabs.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => activateTab(tabBtn));

      tabBtn.addEventListener("keydown", (e) => {
        const idx = Array.from(tabs).indexOf(tabBtn);

        let newIndex;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
            newIndex = (idx + 1) % tabs.length;
            e.preventDefault();
            activateTab(tabs[newIndex]);
            break;
          case "ArrowLeft":
          case "ArrowUp":
            newIndex = (idx - 1 + tabs.length) % tabs.length;
            e.preventDefault();
            activateTab(tabs[newIndex]);
            break;
          case "Home":
            e.preventDefault();
            activateTab(tabs[0]);
            break;
          case "End":
            e.preventDefault();
            activateTab(tabs[tabs.length - 1]);
            break;
        }
      });
    });
  });
};

initTabs();
