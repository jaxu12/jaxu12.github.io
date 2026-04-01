(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  document.documentElement.classList.add("js");

  function setupNavDropdown() {
    const dropdowns = Array.from(document.querySelectorAll(".dropdown"));
    if (!dropdowns.length) return;

    const closeAll = function () {
      dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector(".dropdown-toggle");
        dropdown.classList.remove("open");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    };

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");
      if (!trigger || !menu) return;

      const items = Array.from(menu.querySelectorAll("a, button"));
      let closeTimer = null;

      const cancelScheduledClose = function () {
        if (!closeTimer) return;
        clearTimeout(closeTimer);
        closeTimer = null;
      };

      const open = function () {
        cancelScheduledClose();
        closeAll();
        dropdown.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      };

      const close = function () {
        cancelScheduledClose();
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      };

      const scheduleClose = function () {
        cancelScheduledClose();
        closeTimer = setTimeout(close, 180);
      };

      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (dropdown.classList.contains("open")) close();
        else open();
      });

      trigger.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
          if (items[0]) items[0].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          open();
          if (items.length) items[items.length - 1].focus();
        } else if (event.key === "Escape") {
          close();
        }
      });

      menu.addEventListener("keydown", function (event) {
        if (!items.length) return;
        const index = items.indexOf(document.activeElement);

        if (event.key === "ArrowDown") {
          event.preventDefault();
          items[(index + 1 + items.length) % items.length].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          items[(index - 1 + items.length) % items.length].focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          items[0].focus();
        } else if (event.key === "End") {
          event.preventDefault();
          items[items.length - 1].focus();
        } else if (event.key === "Escape") {
          event.preventDefault();
          close();
          trigger.focus();
        }
      });

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        dropdown.addEventListener("mouseenter", open);
        dropdown.addEventListener("mouseleave", scheduleClose);
        menu.addEventListener("mouseenter", cancelScheduledClose);
        menu.addEventListener("mouseleave", scheduleClose);
      }
    });

    document.addEventListener("click", function (event) {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".dropdown")) closeAll();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });

  }

  function setupLanguageSwitch() {
    const buttons = Array.from(document.querySelectorAll("[data-lang-switch]"));
    if (!buttons.length || !window.SiteI18n) return;

    const moveFocus = function (current, direction) {
      const next = (current + direction + buttons.length) % buttons.length;
      buttons[next].focus();
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        window.SiteI18n.setLang(button.dataset.langSwitch || "pl");
      });

      button.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveFocus(index, 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveFocus(index, -1);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.SiteI18n.setLang(button.dataset.langSwitch || "pl");
        }
      });
    });
  }

  let revealObserver = null;
  function refreshReveal(root) {
    const scope = root || document;
    const nodes = Array.from(scope.querySelectorAll(".reveal"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
    }

    nodes.forEach((node) => revealObserver.observe(node));
  }

  document.addEventListener("ui:refresh-reveal", function (event) {
    const detail = (event && event.detail) || {};
    refreshReveal(detail.root || document);
  });

  function setupThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const sunIcon = toggle.querySelector(".sun-icon");
    const moonIcon = toggle.querySelector(".moon-icon");

    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    }

    toggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.SiteI18n) window.SiteI18n.init();
    setupLanguageSwitch();
    setupNavDropdown();
    setupThemeToggle();
    refreshReveal(document);
  });
})();
