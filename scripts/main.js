(function () {
  let savedTheme = "dark";
  try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (error) { /* Use the default when storage is unavailable. */ }
  document.documentElement.setAttribute("data-theme", savedTheme === "light" ? "light" : "dark");
  document.documentElement.classList.add("js");

  function setupMobileNav() {
    const nav = document.querySelector(".site-nav");
    const toggle = document.querySelector(".mobile-nav-toggle");
    const links = document.getElementById("site-nav-links");
    if (!nav || !toggle || !links) return;

    const mobile = window.matchMedia("(max-width: 768px)");
    const setOpen = function (open) {
      nav.classList.toggle("is-menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      const label = open ? "nav.menu.close" : "nav.menu.open";
      toggle.dataset.i18nAriaLabel = label;
      toggle.setAttribute("aria-label", window.SiteI18n ? window.SiteI18n.t(label) : label);
      if (!open) {
        links.querySelectorAll(".dropdown").forEach((dropdown) => {
          dropdown.classList.remove("open");
          dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
        });
      }
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", function (event) {
      if (mobile.matches && event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", function (event) {
      if (mobile.matches && !nav.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-menu-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    mobile.addEventListener("change", function () { setOpen(false); });
  }

  function setupNavDropdown() {
    const dropdowns = Array.from(document.querySelectorAll(".dropdown"));
    if (!dropdowns.length) return;
    const closeDropdowns = [];

    const closeAll = function () {
      closeDropdowns.forEach((close) => close());
    };

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");
      if (!trigger || !menu) return;

      const items = Array.from(menu.querySelectorAll("a, button"));
      let closeTimer = null;
      let openedByHover = false;

      const cancelScheduledClose = function () {
        if (!closeTimer) return;
        clearTimeout(closeTimer);
        closeTimer = null;
      };

      const open = function (fromHover) {
        cancelScheduledClose();
        closeAll();
        dropdown.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        openedByHover = fromHover === true;
      };

      const close = function () {
        cancelScheduledClose();
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        openedByHover = false;
      };
      closeDropdowns.push(close);

      const scheduleClose = function () {
        cancelScheduledClose();
        closeTimer = setTimeout(function () {
          if (!dropdown.contains(document.activeElement)) close();
        }, 180);
      };

      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (dropdown.classList.contains("open") && !openedByHover) close();
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

      dropdown.addEventListener("focusout", function (event) {
        if (!dropdown.contains(event.relatedTarget)) close();
      });

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        dropdown.addEventListener("mouseenter", function () {
          if (window.matchMedia("(min-width: 769px)").matches) open(true);
        });
        dropdown.addEventListener("mouseleave", function () {
          if (window.matchMedia("(min-width: 769px)").matches) scheduleClose();
        });
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
      try { localStorage.setItem("theme", theme); } catch (error) { /* Theme changes still work without storage. */ }
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    }

    applyTheme(document.documentElement.getAttribute("data-theme") || "dark");

    toggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  function setupStoreGallery() {
    const gallery = document.getElementById("store-gallery");
    if (!gallery) return;
    const previous = document.querySelector("[data-gallery-prev]");
    const next = document.querySelector("[data-gallery-next]");
    const viewer = document.querySelector(".screenshot-viewer");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateArrows() {
      previous.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 2;
    }
    function move(direction) {
      const first = gallery.querySelector("a");
      if (!first) return;
      const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(gallery).columnGap || 0);
      gallery.scrollBy({ left: direction * step, behavior: reduceMotion.matches ? "instant" : "smooth" });
    }
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    gallery.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    gallery.addEventListener("keydown", (event) => {
      if (event.target !== gallery) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
      }
    });
    if (viewer && typeof viewer.showModal === "function") {
      gallery.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const image = viewer.querySelector("img");
        image.src = link.href;
        image.alt = link.querySelector("img").alt;
        viewer.showModal();
      });
      viewer.querySelector("button").addEventListener("click", () => viewer.close());
      viewer.addEventListener("click", (event) => {
        if (event.target !== viewer) return;
        const rect = viewer.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
      });
    }
    updateArrows();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.SiteI18n) window.SiteI18n.init();
    setupLanguageSwitch();
    setupMobileNav();
    setupNavDropdown();
    setupThemeToggle();
    setupStoreGallery();
    refreshReveal(document);
  });
})();
