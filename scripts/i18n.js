(function () {
  const STORAGE_KEY = "site_lang";
  const DEFAULT_LANG = "pl";
  const SUPPORTED_LANGS = ["pl", "en"];
  let activeLang = DEFAULT_LANG;
  let initialized = false;

  const translations = {
    pl: {
      "nav.home": "Strona główna",
      "nav.portfolio": "Portfolio",
      "nav.games": "Gry",
      "nav.primary": "Nawigacja glowna",
      "nav.polyrush": "Polyrush: Endless Runner",
      "nav.language": "Język strony",
      "nav.switch.pl": "PL",
      "nav.switch.en": "EN",
      "footer.contactPrefix": "Kontakt:",

      "home.meta.title": "Jachsu Games | Indie Game Studio",
      "home.meta.description": "Niezależne studio tworzące gry mobilne. Projekty: Polyrush, portfolio i eksperymenty techniczne.",
      "home.meta.ogTitle": "Jachsu Games",
      "home.meta.ogDescription": "Indie studio, gry mobilne i projekty techniczne.",
      "home.hero.eyebrow": "Jachsu Games",
      "home.hero.title": "Tworzymy szybkie gry mobilne i dopracowane doświadczenia",
      "home.hero.lead": "Budujemy projekty, które łączą prostą mechanikę, czytelny design i konkretne decyzje produktowe.",
      "home.hero.ctaPortfolio": "Zobacz portfolio",
      "home.hero.ctaPlay": "Profil Google Play",
      "home.hero.kicker": "Skupienie: gameplay loop, UX i iteracyjne wydania.",
      "home.hero.previewLabel": "Podglad gry Polyrush: Endless Runner",
      "home.highlights.title": "Co dowozimy",
      "home.highlights.card1.title": "Szybkie prototypy",
      "home.highlights.card1.text": "Walidacja mechanik i decyzji UX na wczesnym etapie projektu.",
      "home.highlights.card2.title": "Techniczne zaplecze",
      "home.highlights.card2.text": "Od gameplayu po backendowe eksperymenty wspierające rozwój produktu.",
      "home.highlights.card3.title": "Jakość release",
      "home.highlights.card3.text": "Czytelna nawigacja, dostępność i strona gotowa pod mobile-first.",
      "home.latest.title": "Aktualnie promowane",
      "home.latest.text": "Polyrush: Endless Runner to prosty, casualowy endless runner na Androida.",
      "home.latest.cta": "Strona gry",
      "home.studio.title": "O studiu",
      "home.studio.text1": "Jachsu Games to niezależne studio skoncentrowane na grach mobilnych i lekkich produktach cyfrowych.",
      "home.studio.text2": "Stack obejmuje m.in. Godot Engine, iteracyjny proces projektowania oraz analityczne podejście do UX.",

      "portfolio.meta.title": "Portfolio | Jan Freda | Jachsu Games",
      "portfolio.meta.description": "Portfolio projektów: gry mobilne, backend i eksperymenty produktowe Jana Fredy.",
      "portfolio.meta.ogTitle": "Portfolio Jana Fredy",
      "portfolio.meta.ogDescription": "Gry mobilne, backend i design produktu.",
      "portfolio.hero.eyebrow": "Jan Freda",
      "portfolio.hero.title": "Projektuję i rozwijam produkty od pomysłu do wdrożenia",
      "portfolio.hero.lead": "Case'y łączące gameplay, architekturę i nacisk na użyteczność. Każdy projekt to konkretna hipoteza i mierzalny efekt.",
      "portfolio.hero.ctaGithub": "Profil GitHub",
      "portfolio.hero.ctaPlay": "Google Play",
      "portfolio.metrics.projects.label": "4+",
      "portfolio.metrics.projects.desc": "Aktywne projekty",
      "portfolio.metrics.focus.label": "Product + Code",
      "portfolio.metrics.focus.desc": "Od UX po implementację",
      "portfolio.metrics.stack.label": "Mobile / Backend",
      "portfolio.metrics.stack.desc": "Godot, API, frontend",
      "portfolio.metrics.label": "Metryki portfolio",
      "portfolio.filters.title": "Moje projekty",
      "portfolio.filters.toolbarLabel": "Filtry projektów",
      "portfolio.filters.all": "Wszystkie",
      "portfolio.filters.game": "Gry",
      "portfolio.filters.backend": "Backend",
      "portfolio.filters.web": "Web",
      "portfolio.card.roleLabel": "Zakres:",
      "portfolio.card.stackLabel": "Stack:",
      "portfolio.card.placeholder": "Brak podglądu",
      "portfolio.actions.details": "Szczegoly",
      "portfolio.actions.github": "GitHub",
      "portfolio.actions.live": "Google Play",
      "portfolio.actions.link": "Link",
      "portfolio.actions.comingSoon": "Coming soon",
      "portfolio.actions.repo": "Repo",
      "portfolio.projects.empty": "Brak projektów dla wybranego filtra.",
      "portfolio.aboutme.eyebrow": "Jachsu Games",
      "portfolio.aboutme.title": "Niezależne studio tworzące gry mobilne i systemy backendowe",
      "portfolio.aboutme.lead": "Projektuję, rozwijam i wdrażam produkty cyfrowe – od prototypu po publikację w sklepach mobilnych.",
      "portfolio.aboutme.point1.title": "Gry mobilne",
      "portfolio.aboutme.point1.text": "Tworzenie gier w Godot i Unreal: mechaniki, UI, testy oraz publikacja w Google Play i przygotowanie pod iOS.",
      "portfolio.aboutme.point2.title": "Architektura i backend",
      "portfolio.aboutme.point2.text": "Projektowanie i implementacja API oraz mikroserwisów (C#, .NET, REST). Integracja z klientem i API Gateway.",
      "portfolio.aboutme.point3.title": "Model biznesowy",
      "portfolio.aboutme.point3.text": "Monetyzacja przez reklamy i mikropłatności. Dystrybucja globalna w Google Play i App Store.",
      "portfolio.about.title": "Workflow",
      "portfolio.about.lead": "Pracuję iteracyjnie: od szybkiego prototypu do stabilnego release.",
      "portfolio.about.item1.title": "1. Discovery",
      "portfolio.about.item1.text": "Definicja celu, odbiorcy i metryk sukcesu.",
      "portfolio.about.item2.title": "2. Build",
      "portfolio.about.item2.text": "Implementacja z naciskiem na czytelność kodu i UX.",
      "portfolio.about.item3.title": "3. Polish",
      "portfolio.about.item3.text": "Testy, optymalizacja i domknięcie detali produktu.",
      "portfolio.next.title": "Masz pomysł na projekt?",
      "portfolio.next.lead": "Chętnie pomogę zaprojektować i dostarczyć kolejną iterację produktu.",
      "portfolio.next.contactLabel": "Kontakt e-mail:",
      "portfolio.next.ctaEmail": "Napisz mail",
      "portfolio.next.ctaGithub": "Sprawdź kod",
      "portfolio.noscript.title": "Podstawowa lista projektów (tryb bez JavaScript):",

      "polyrush.meta.title": "Polyrush: Endless Runner | Jachsu Games",
      "polyrush.meta.description": "Polyrush: Endless Runner to prosty, casualowy endless runner na Androida. Krotkie sesje, szybkie decyzje i rosnace tempo.",
      "polyrush.meta.ogTitle": "Polyrush: Endless Runner",
      "polyrush.meta.ogDescription": "Polyrush: Endless Runner - prosty, casualowy endless runner od Jachsu Games.",
      "polyrush.hero.eyebrow": "Jachsu Games",
      "polyrush.hero.title": "Polyrush: Endless Runner",
      "polyrush.hero.lead": "Prosty, casualowy endless runner na Androida. Krótkie sesje, rosnące tempo i czysty skill.",
      "polyrush.hero.ctaStore": "Google Play",
      "polyrush.hero.ctaDev": "Profil dewelopera",
      "polyrush.hero.ctaPolicy": "Privacy Policy",
      "polyrush.features.title": "Gameplay",
      "polyrush.features.text": "Jedno tapnięcie, szybkie decyzje i coraz wyższe tempo. Idealne na krótkie sesje.",
      "polyrush.loop.title": "Tryb gry",
      "polyrush.loop.item1": "Rytmiczne przeszkody i rosnąca prędkość.",
      "polyrush.loop.item2": "Krótka pętla rozgrywki i szybki restart.",
      "polyrush.loop.item3": "Minimalistyczny styl i czytelne kolory.",
      "polyrush.gallery.title": "Galeria",
      "polyrush.gallery.lead": "Materiały promocyjne i wybrane ujęcia z gry.",
      "polyrush.cta.title": "Dołącz do biegu",
      "polyrush.cta.lead": "Sprawdź grę w Google Play i śledź kolejne aktualizacje.",
      "polyrush.cta.primary": "Pobierz teraz",
      "polyrush.cta.secondary": "Strona główna"
    },
    en: {
      "nav.home": "Home",
      "nav.portfolio": "Portfolio",
      "nav.games": "Games",
      "nav.primary": "Primary navigation",
      "nav.polyrush": "Polyrush: Endless Runner",
      "nav.language": "Site language",
      "nav.switch.pl": "PL",
      "nav.switch.en": "EN",
      "footer.contactPrefix": "Contact:",

      "home.meta.title": "Jachsu Games | Indie Game Studio",
      "home.meta.description": "Independent studio building mobile games. Projects: Polyrush, portfolio, and technical experiments.",
      "home.meta.ogTitle": "Jachsu Games",
      "home.meta.ogDescription": "Indie studio, mobile games, and technical projects.",
      "home.hero.eyebrow": "Jachsu Games",
      "home.hero.title": "We build fast mobile games and polished experiences",
      "home.hero.lead": "Our projects combine simple mechanics, clear design, and pragmatic product decisions.",
      "home.hero.ctaPortfolio": "View portfolio",
      "home.hero.ctaPlay": "Google Play profile",
      "home.hero.kicker": "Focus: gameplay loop, UX, and iterative releases.",
      "home.hero.previewLabel": "Polyrush: Endless Runner preview",
      "home.highlights.title": "What we deliver",
      "home.highlights.card1.title": "Rapid prototyping",
      "home.highlights.card1.text": "Early validation of mechanics and UX choices.",
      "home.highlights.card2.title": "Technical backbone",
      "home.highlights.card2.text": "From gameplay to backend experiments supporting product growth.",
      "home.highlights.card3.title": "Release quality",
      "home.highlights.card3.text": "Accessible navigation, clean semantics, and mobile-first readiness.",
      "home.latest.title": "Currently featured",
      "home.latest.text": "Polyrush: Endless Runner is a simple, casual endless runner for Android.",
      "home.latest.cta": "Game page",
      "home.studio.title": "About the studio",
      "home.studio.text1": "Jachsu Games is an independent studio focused on mobile games and lightweight digital products.",
      "home.studio.text2": "The stack includes Godot Engine, iterative design workflows, and UX-driven decision making.",

      "portfolio.meta.title": "Portfolio | Jan Freda | Jachsu Games",
      "portfolio.meta.description": "Project portfolio: mobile games, backend systems, and product experiments by Jan Freda.",
      "portfolio.meta.ogTitle": "Jan Freda Portfolio",
      "portfolio.meta.ogDescription": "Mobile games, backend, and product design.",
      "portfolio.hero.eyebrow": "Jan Freda",
      "portfolio.hero.title": "I design and build products from concept to release",
      "portfolio.hero.lead": "Selected work combining gameplay, architecture, and usability. Each project is built around a clear hypothesis and measurable outcome.",
      "portfolio.hero.ctaGithub": "GitHub profile",
      "portfolio.hero.ctaPlay": "Google Play",
      "portfolio.metrics.projects.label": "4+",
      "portfolio.metrics.projects.desc": "Active projects",
      "portfolio.metrics.focus.label": "Product + Code",
      "portfolio.metrics.focus.desc": "From UX to implementation",
      "portfolio.metrics.stack.label": "Mobile / Backend",
      "portfolio.metrics.stack.desc": "Godot, APIs, frontend",
      "portfolio.metrics.label": "Portfolio metrics",
      "portfolio.filters.title": "My projects",
      "portfolio.filters.toolbarLabel": "Project filters",
      "portfolio.filters.all": "All",
      "portfolio.filters.game": "Games",
      "portfolio.filters.backend": "Backend",
      "portfolio.filters.web": "Web",
      "portfolio.card.roleLabel": "Scope:",
      "portfolio.card.stackLabel": "Stack:",
      "portfolio.card.placeholder": "No preview",
      "portfolio.actions.details": "Details",
      "portfolio.actions.github": "GitHub",
      "portfolio.actions.live": "Google Play",
      "portfolio.actions.link": "Link",
      "portfolio.actions.comingSoon": "Coming soon",
      "portfolio.actions.repo": "Repo",
      "portfolio.projects.empty": "No projects for this filter.",
      "portfolio.aboutme.eyebrow": "Jachsu Games",
      "portfolio.aboutme.title": "Indie studio building mobile games and backend systems",
      "portfolio.aboutme.lead": "I design, build, and ship digital products—from prototypes to store releases.",
      "portfolio.aboutme.point1.title": "Mobile games",
      "portfolio.aboutme.point1.text": "Game development in Godot and Unreal: gameplay, UI, testing, Google Play release, and iOS readiness.",
      "portfolio.aboutme.point2.title": "Architecture & backend",
      "portfolio.aboutme.point2.text": "API and microservices (C#, .NET, REST), client integration, and an API Gateway setup.",
      "portfolio.aboutme.point3.title": "Business model",
      "portfolio.aboutme.point3.text": "Monetization via ads and in-app purchases. Global distribution on Google Play and the App Store.",
      "portfolio.about.title": "Workflow",
      "portfolio.about.lead": "I work iteratively: from fast prototype to stable release.",
      "portfolio.about.item1.title": "1. Discovery",
      "portfolio.about.item1.text": "Define target, audience, and success metrics.",
      "portfolio.about.item2.title": "2. Build",
      "portfolio.about.item2.text": "Implementation with strong focus on code clarity and UX.",
      "portfolio.about.item3.title": "3. Polish",
      "portfolio.about.item3.text": "Testing, optimization, and final product refinement.",
      "portfolio.next.title": "Have a project idea?",
      "portfolio.next.lead": "I can help design and deliver the next product iteration.",
      "portfolio.next.contactLabel": "Contact email:",
      "portfolio.next.ctaEmail": "Send email",
      "portfolio.next.ctaGithub": "Browse code",
      "portfolio.noscript.title": "Basic project list (no JavaScript mode):",

      "polyrush.meta.title": "Polyrush: Endless Runner | Jachsu Games",
      "polyrush.meta.description": "Polyrush: Endless Runner is a simple, casual endless runner for Android. Short sessions, quick decisions, increasing speed.",
      "polyrush.meta.ogTitle": "Polyrush: Endless Runner",
      "polyrush.meta.ogDescription": "Polyrush: Endless Runner, a simple, casual endless runner by Jachsu Games.",
      "polyrush.hero.eyebrow": "Jachsu Games",
      "polyrush.hero.title": "Polyrush: Endless Runner",
      "polyrush.hero.lead": "A simple, casual endless runner for Android. Short sessions, rising speed, pure skill.",
      "polyrush.hero.ctaStore": "Google Play",
      "polyrush.hero.ctaDev": "Developer profile",
      "polyrush.hero.ctaPolicy": "Privacy Policy",
      "polyrush.features.title": "Gameplay",
      "polyrush.features.text": "One tap, fast decisions, and increasing pace. Perfect for short sessions.",
      "polyrush.loop.title": "Game loop",
      "polyrush.loop.item1": "Rhythmic obstacles and increasing speed.",
      "polyrush.loop.item2": "Short gameplay loop and quick restart.",
      "polyrush.loop.item3": "Minimalist style and clean color language.",
      "polyrush.gallery.title": "Gallery",
      "polyrush.gallery.lead": "Promo materials and selected gameplay shots.",
      "polyrush.cta.title": "Join the run",
      "polyrush.cta.lead": "Play on Google Play and follow upcoming updates.",
      "polyrush.cta.primary": "Download now",
      "polyrush.cta.secondary": "Home page"
    }
  };

  function normalizeLang(input) {
    if (!input || typeof input !== "string") return DEFAULT_LANG;
    const base = input.toLowerCase().slice(0, 2);
    return SUPPORTED_LANGS.includes(base) ? base : DEFAULT_LANG;
  }

  function t(key, lang) {
    const selected = translations[lang || activeLang] || {};
    const fallback = translations[DEFAULT_LANG] || {};
    return selected[key] || fallback[key] || key;
  }

  function hasTranslation(key, lang) {
    const selected = translations[lang || activeLang] || {};
    const fallback = translations[DEFAULT_LANG] || {};
    return Object.prototype.hasOwnProperty.call(selected, key) || Object.prototype.hasOwnProperty.call(fallback, key);
  }

  function applyTranslations() {
    const selector = "[data-i18n], [data-i18n-content], [data-i18n-aria-label], [data-i18n-title], [data-i18n-alt]";
    document.querySelectorAll(selector).forEach((element) => {
      if (element.dataset.i18n && hasTranslation(element.dataset.i18n)) {
        element.textContent = t(element.dataset.i18n);
      }
      if (element.dataset.i18nContent && hasTranslation(element.dataset.i18nContent)) {
        element.setAttribute("content", t(element.dataset.i18nContent));
      }
      if (element.dataset.i18nAriaLabel && hasTranslation(element.dataset.i18nAriaLabel)) {
        element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
      }
      if (element.dataset.i18nTitle && hasTranslation(element.dataset.i18nTitle)) {
        element.setAttribute("title", t(element.dataset.i18nTitle));
      }
      if (element.dataset.i18nAlt && hasTranslation(element.dataset.i18nAlt)) {
        element.setAttribute("alt", t(element.dataset.i18nAlt));
      }
    });

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      const isActive = button.dataset.langSwitch === activeLang;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
    });

    document.documentElement.setAttribute("lang", activeLang);
  }

  function getLang() {
    return activeLang;
  }

  function setLang(nextLang, options) {
    const settings = options || {};
    activeLang = normalizeLang(nextLang);

    if (settings.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, activeLang);
      } catch (error) {
        // localStorage may be blocked in privacy modes.
      }
    }

    applyTranslations();
    document.dispatchEvent(new CustomEvent("site:lang-change", { detail: { lang: activeLang } }));
    return activeLang;
  }

  function init() {
    if (initialized) return;
    initialized = true;

    let storedLang = "";
    try {
      storedLang = localStorage.getItem(STORAGE_KEY) || "";
    } catch (error) {
      storedLang = "";
    }

    const htmlLang = document.documentElement.getAttribute("lang") || "";
    const browserLang = navigator.language || "";
    activeLang = normalizeLang(storedLang || htmlLang || browserLang);
    applyTranslations();
  }

  window.SiteI18n = {
    getLang,
    setLang,
    t,
    init,
    applyTranslations
  };
})();
