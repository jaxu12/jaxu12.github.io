(function () {
  const state = {
    projects: [],
    filter: "all"
  };

  function getProjectsPath() {
    const path = window.location.pathname;
    if (path.includes("/portfolio/")) return "../data/projects.json";
    if (path.includes("/polyrush/")) return "../data/projects.json";
    return "data/projects.json";
  }

  function isExternalUrl(value) {
    return /^https?:\/\//i.test(value || "");
  }

  function toLocalized(value, lang) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value[lang] || value.pl || value.en || "";
    return "";
  }

  function text(key) {
    if (!window.SiteI18n) return key;
    return window.SiteI18n.t(key);
  }

  function createLink(label, href, variant) {
    const link = document.createElement("a");
    link.className = "btn " + (variant || "btn-secondary");
    link.href = href;
    link.textContent = label;
    if (isExternalUrl(href)) {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    }
    return link;
  }

  function isGooglePlayUrl(value) {
    return /(?:^https?:\/\/)?play\.google\.com\//i.test(value || "");
  }

  function isGithubUrl(value) {
    return /(?:^https?:\/\/)?(?:www\.)?github\.com\//i.test(value || "");
  }

  function normalizeActionHref(value) {
    return String(value || "").trim().replace(/\/+$/, "");
  }

  function matchesFilter(project) {
    if (state.filter === "all") return true;
    const categories = Array.isArray(project.categories) ? project.categories : [];
    return categories.includes(state.filter);
  }

  function buildProjectCard(project, lang) {
    const article = document.createElement("article");
    article.className = "card project-card reveal";

    const title = toLocalized(project.title, lang);
    const short = toLocalized(project.short, lang);
    const description = toLocalized(project.description, lang);
    const role = toLocalized(project.role, lang);
    const status = toLocalized(project.status, lang);
    const comingSoon = project.comingSoon === true || String(status).toLowerCase().includes("coming soon");
    const year = project.year || "";

    const header = document.createElement("div");
    header.className = "project-card-header";
    const titleWrap = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = title;
    titleWrap.appendChild(heading);

    const topline = document.createElement("div");
    topline.className = "project-topline";
    if (status) {
      const statusBadge = document.createElement("span");
      statusBadge.className = "badge";
      statusBadge.textContent = status;
      topline.appendChild(statusBadge);
    }
    if (year) {
      const yearBadge = document.createElement("span");
      yearBadge.className = "badge";
      yearBadge.textContent = String(year);
      topline.appendChild(yearBadge);
    }
    titleWrap.appendChild(topline);
    header.appendChild(titleWrap);
    article.appendChild(header);

    if (project.image) {
      const image = document.createElement("img");
      image.className = "project-image";
      image.src = project.image;
      image.alt = title;
      image.loading = "lazy";
      image.decoding = "async";
      article.appendChild(image);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "project-image-placeholder";
      placeholder.textContent = text("portfolio.card.placeholder");
      article.appendChild(placeholder);
    }

    if (role) {
      const roleElement = document.createElement("p");
      roleElement.className = "project-role";
      const roleLabel = document.createElement("strong");
      roleLabel.textContent = text("portfolio.card.roleLabel") + " ";
      roleElement.appendChild(roleLabel);
      roleElement.appendChild(document.createTextNode(role));
      article.appendChild(roleElement);
    }

    if (short) {
      const shortElement = document.createElement("p");
      shortElement.className = "project-description";
      shortElement.textContent = short;
      article.appendChild(shortElement);
    }

    if (description) {
      const descriptionElement = document.createElement("p");
      descriptionElement.className = "project-description";
      descriptionElement.textContent = description;
      article.appendChild(descriptionElement);
    }

    if (Array.isArray(project.stack) && project.stack.length) {
      const stackLabel = document.createElement("p");
      stackLabel.className = "project-role";
      const label = document.createElement("strong");
      label.textContent = text("portfolio.card.stackLabel");
      stackLabel.appendChild(label);
      article.appendChild(stackLabel);

      const stack = document.createElement("ul");
      stack.className = "stack-list";
      project.stack.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        stack.appendChild(li);
      });
      article.appendChild(stack);
    }

    const actions = document.createElement("div");
    actions.className = "btn-row";

    const actionHrefs = new Set();
    const appendAction = function (label, href, variant) {
      const normalized = normalizeActionHref(href);
      if (!normalized || actionHrefs.has(normalized)) return;
      actionHrefs.add(normalized);
      actions.appendChild(createLink(label, href, variant));
    };

    if (comingSoon) {
      const disabled = document.createElement("button");
      disabled.type = "button";
      disabled.className = "btn btn-disabled";
      disabled.textContent = text("portfolio.actions.comingSoon");
      disabled.disabled = true;
      disabled.setAttribute("aria-disabled", "true");
      actions.appendChild(disabled);
    } else {
      const detailsHref = project.link || project.external || project.repo;
      const detailsLabelKey = isGithubUrl(detailsHref) ? "portfolio.actions.github" : "portfolio.actions.details";
      appendAction(text(detailsLabelKey), detailsHref, "btn-primary");
      const externalLabelKey = isGooglePlayUrl(project.external) ? "portfolio.actions.live" : "portfolio.actions.link";
      appendAction(text(externalLabelKey), project.external, "btn-secondary");
      appendAction(text("portfolio.actions.repo"), project.repo, "btn-ghost");
    }

    if (actions.childNodes.length) {
      article.appendChild(actions);
    }

    return article;
  }

  function updateFilterButtons() {
    const buttons = Array.from(document.querySelectorAll("[data-filter]"));
    buttons.forEach((button) => {
      const active = button.dataset.filter === state.filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderProjects() {
    const container = document.getElementById("projects");
    if (!container) return;

    const lang = window.SiteI18n ? window.SiteI18n.getLang() : "pl";
    container.innerHTML = "";

    const list = state.projects.filter(matchesFilter);
    if (!list.length) {
      const empty = document.createElement("p");
      empty.className = "project-empty";
      empty.textContent = text("portfolio.projects.empty");
      container.appendChild(empty);
      return;
    }

    list.forEach((project) => {
      container.appendChild(buildProjectCard(project, lang));
    });

    document.dispatchEvent(new CustomEvent("ui:refresh-reveal", { detail: { root: container } }));
  }

  function bindFilters() {
    const buttons = Array.from(document.querySelectorAll("[data-filter]"));
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        state.filter = button.dataset.filter || "all";
        updateFilterButtons();
        renderProjects();
      });
    });
  }

  function initPortfolio() {
    const container = document.getElementById("projects");
    if (!container) return;

    bindFilters();
    updateFilterButtons();

    fetch(getProjectsPath())
      .then((response) => response.json())
      .then((projects) => {
        state.projects = Array.isArray(projects) ? projects : [];
        renderProjects();
      })
      .catch((error) => {
        console.warn("Failed to load projects.json", error);
        container.innerHTML = "";
        const empty = document.createElement("p");
        empty.className = "project-empty";
        empty.textContent = text("portfolio.projects.empty");
        container.appendChild(empty);
      });

    document.addEventListener("site:lang-change", renderProjects);
  }

  document.addEventListener("DOMContentLoaded", initPortfolio);
})();
