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
      "nav.menu.open": "Otwórz menu",
      "nav.menu.close": "Zamknij menu",
      "nav.theme": "Przełącz motyw",
      "nav.primary": "Nawigacja glowna",
      "nav.polyrush": "Polyrush (archiwum)",
      "nav.cosmidle": "Cosmidle: Idle Space Shooter",
      "nav.language": "Język strony",
      "nav.switch.pl": "PL",
      "nav.switch.en": "EN",
      "nav.infograf": "Infograf",
      "footer.contactPrefix": "Kontakt:",

      "home.meta.title": "Jachsu Games | Indie Game Studio",
      "home.meta.description": "Jachsu Games: Infograf — układanki obrazkowe i ciekawostki. Poznaj naszą nową grę oraz Cosmidle.",
      "home.meta.ogTitle": "Jachsu Games",
      "home.meta.ogDescription": "Infograf — układaj obrazki i odkrywaj ciekawostki. Dostępna w Google Play od 25 października 2026.",
      "home.hero.eyebrow": "Jachsu Games · Nasza nowa gra",
      "home.hero.ctaGame": "Poznaj Infograf",
      "home.hero.ctaGames": "Zobacz nasze gry",
      "home.hero.previewAlt": "Infograf — układanka z leśnym krajobrazem",
      "home.games.polyrush.status": "Wycofana ze sklepu",
      "home.games.cosmidle.status": "Otwarte testy",
      "home.games.archive": "Zobacz projekt",
      "home.hero.title": "Infograf",
      "home.hero.lead": "Układaj obrazki, odkrywaj ciekawostki i buduj własną kolekcję. Spokojna gra logiczna dla dzieci i dorosłych.",
      "home.hero.kicker": "Dostępna w Google Play od 25 października 2026.",
      "home.hero.previewLabel": "Infograf — podgląd gry",
      "home.highlights.title": "Co dowozimy",
      "home.highlights.card1.title": "Szybkie prototypy",
      "home.highlights.card1.text": "Walidacja mechanik i decyzji UX na wczesnym etapie projektu.",
      "home.highlights.card2.title": "Techniczne zaplecze",
      "home.highlights.card2.text": "Mechaniki, systemy zapisu i integracje wspierające rozwój gier mobilnych.",
      "home.highlights.card3.title": "Jakość release",
      "home.highlights.card3.text": "Czytelna nawigacja, dostępność i strona gotowa pod mobile-first.",
      "home.studio.title": "O studiu",
      "home.studio.text1": "Jachsu Games to niezależne studio skoncentrowane na grach mobilnych i lekkich produktach cyfrowych.",
      "home.studio.text2": "Stack obejmuje m.in. Godot Engine, iteracyjny proces projektowania oraz analityczne podejście do UX.",
      "home.games.cosmidle.text": "Rozwijaj flotę, zbieraj zasoby i walcz w kosmosie.",
      "home.games.details": "Poznaj grę",
      "home.games.infograf.status": "Dostępna w Google Play",
      "home.games.infograf.text": "Układaj obrazki i odkrywaj ciekawostki. Dostępna w Google Play od 25 października 2026.",
      "home.games.lead": "Poznaj Infograf i Cosmidle oraz zajrzyj do archiwum naszych projektów.",
      "home.games.polyrush.text": "Archiwalny endless runner na Androida. Gra została wycofana ze sklepu.",
      "home.games.store": "Google Play",
      "home.games.title": "Nasze gry",

      "portfolio.meta.title": "Portfolio | Jan Freda | Jachsu Games",
      "portfolio.meta.description": "Portfolio Jana Fredy: Polyrush, Cosmidle, Infograf i strona Jachsu Games.",
      "portfolio.meta.ogTitle": "Portfolio Jana Fredy",
      "portfolio.meta.ogDescription": "Gry mobilne, projektowanie rozgrywki i produkty cyfrowe.",
      "portfolio.hero.eyebrow": "Jan Freda",
      "portfolio.hero.title": "Projektuję i rozwijam produkty od pomysłu do wdrożenia",
      "portfolio.hero.lead": "Case'y łączące gameplay, architekturę i nacisk na użyteczność. Każdy projekt to konkretna hipoteza i mierzalny efekt.",
      "portfolio.hero.ctaGithub": "Profil GitHub",
      "portfolio.hero.ctaPlay": "Google Play",
      "portfolio.metrics.projects.label": "4",
      "portfolio.metrics.projects.desc": "Projekty w portfolio",
      "portfolio.metrics.focus.label": "Product + Code",
      "portfolio.metrics.focus.desc": "Od UX po implementację",
      "portfolio.metrics.stack.label": "Mobile / Web",
      "portfolio.metrics.stack.desc": "Gry mobilne i frontend",
      "portfolio.metrics.label": "Metryki portfolio",
      "portfolio.filters.title": "Moje projekty",
      "portfolio.filters.toolbarLabel": "Filtry projektów",
      "portfolio.filters.all": "Wszystkie",
      "portfolio.filters.game": "Gry",
      "portfolio.filters.web": "Web",
      "portfolio.card.roleLabel": "Zakres:",
      "portfolio.card.stackLabel": "Stack:",
      "portfolio.card.placeholder": "Brak podglądu",
      "portfolio.actions.details": "Szczegóły",
      "portfolio.actions.github": "GitHub",
      "portfolio.actions.live": "Google Play",
      "portfolio.actions.link": "Link",
      "portfolio.actions.repo": "Repo",
      "portfolio.projects.empty": "Brak projektów dla wybranego filtra.",
      "portfolio.aboutme.eyebrow": "Jachsu Games",
      "portfolio.aboutme.title": "Niezależne studio tworzące gry mobilne i produkty cyfrowe",
      "portfolio.aboutme.lead": "Projektuję, rozwijam i wdrażam produkty cyfrowe – od prototypu po publikację w sklepach mobilnych.",
      "portfolio.aboutme.point1.title": "Gry mobilne",
      "portfolio.aboutme.point1.text": "Tworzenie gier w Godot i Unreal: mechaniki, UI, testy oraz publikacja w Google Play i przygotowanie pod iOS.",
      "portfolio.aboutme.point2.title": "Systemy i integracje",
      "portfolio.aboutme.point2.text": "Systemy progresji i zapisu, integracje platformowe oraz czytelna struktura projektu ułatwiająca rozwój gry.",
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
      "portfolio.actions.policy": "Polityka prywatności",

      "polyrush.meta.title": "Polyrush: Endless Runner | Jachsu Games",
      "polyrush.meta.description": "Polyrush: Endless Runner — archiwalna gra Jachsu Games na Androida, wycofana ze sklepu.",
      "polyrush.meta.ogTitle": "Polyrush: Endless Runner",
      "polyrush.meta.ogDescription": "Archiwum projektu Polyrush: Endless Runner. Gra została wycofana ze sklepu.",
      "polyrush.hero.eyebrow": "Jachsu Games · Archiwum",
      "polyrush.hero.status": "Wycofana ze sklepu",
      "polyrush.hero.ctaInfograf": "Poznaj Infograf",
      "polyrush.hero.title": "Polyrush: Endless Runner",
      "polyrush.hero.lead": "Archiwalny endless runner na Androida. Gra została wycofana ze sklepu; tutaj znajdziesz opis projektu i galerię.",
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
      "polyrush.cta.title": "Poznaj nasze nowe gry",
      "polyrush.cta.lead": "Polyrush został wycofany ze sklepu. Zobacz Infograf — naszą nową grę logiczną.",
      "polyrush.cta.primary": "Poznaj Infograf",
      "polyrush.cta.secondary": "Strona główna",

      "cosmidle.meta.title": "Cosmidle: Idle Space Shooter | Jachsu Games",
      "cosmidle.meta.description": "Cosmidle: Idle Space Shooter na Androida. Rozwijaj flotę, zbieraj zasoby i walcz w kosmosie.",
      "cosmidle.meta.ogTitle": "Cosmidle: Idle Space Shooter",
      "cosmidle.meta.ogDescription": "Kosmiczny idle shooter od Jachsu Games. Zobacz galerię i grę w Google Play.",
      "cosmidle.hero.eyebrow": "Jachsu Games",
      "cosmidle.hero.status": "Otwarte testy",
      "cosmidle.hero.title": "Cosmidle: Idle Space Shooter",
      "cosmidle.hero.lead": "Wkrocz do kosmosu i rozwijaj swój statek w niekończącej się przygodzie idle shooter.",
      "cosmidle.hero.ctaStore": "Google Play · Otwarte testy",
      "cosmidle.hero.ctaDev": "Profil dewelopera",
      "cosmidle.hero.ctaPolicy": "Polityka prywatności",
      "cosmidle.features.title": "O grze",
      "cosmidle.features.text": "Zbieraj ulepszenia, strzelaj do asteroid i rozbudowuj swój statek bez końca.",
      "cosmidle.loop.title": "Główne cechy",
      "cosmidle.loop.item1": "Niekończąca się rozgrywka idle.",
      "cosmidle.loop.item2": "Zapisy w chmurze i osiągnięcia z Google Play Games.",
      "cosmidle.loop.item3": "Mechanika ulepszeń statku kosmicznego.",
      "cosmidle.cta.title": "Rozpocznij misję",
      "cosmidle.cta.lead": "Dołącz do otwartych testów Cosmidle w Google Play.",
      "cosmidle.cta.primary": "Dołącz do testów",
      "cosmidle.cta.secondary": "Strona główna",
      "cosmidle.banner.alt": "Cosmidle — statek kosmiczny na tle gwiazd",
      "cosmidle.footer.delete": "Usuń konto i dane",
      "cosmidle.gallery.alt1": "Cosmidle — statek w sektorze Home Orbit",
      "cosmidle.gallery.alt2": "Cosmidle — walka z asteroidami",
      "cosmidle.gallery.alt3": "Cosmidle — drzewko stałych ulepszeń Core",
      "cosmidle.gallery.alt4": "Cosmidle — ulepszenia gospodarki i uzbrojenia",
      "cosmidle.gallery.lead": "Zrzuty z gry: lot przez kosmos, walka, drzewko rozwoju i ulepszenia.",
      "cosmidle.gallery.swipe": "Przesuń, aby zobaczyć kolejne zdjęcia →",
      "cosmidle.gallery.title": "Zobacz Cosmidle w akcji",
      "cosmidle.hero.ctaGallery": "Zobacz galerię",
      "cosmidle.icon.alt": "Ikona gry Cosmidle",

      "infograf.cover.alt": "Infograf — układanka z leśnym krajobrazem",
      "infograf.features.facts.text": "Połącz układanie obrazków z poznawaniem faktów.",
      "infograf.features.facts.title": "Odkrywaj ciekawostki",
      "infograf.features.picture.text": "Dopasowuj elementy układanki i odkrywaj kolejne ilustracje.",
      "infograf.features.picture.title": "Układaj obrazki",
      "infograf.features.progress.text": "Odblokowuj obrazki w galerii i wracaj do rozpoczętych układanek.",
      "infograf.features.progress.title": "Rozwijaj kolekcję",
      "infograf.features.title": "Obrazki, wiedza i spokojna rozgrywka",
      "infograf.hero.ctaAbout": "O grze",
      "infograf.hero.ctaPolicy": "Polityka prywatności",
      "infograf.hero.eyebrow": "Jachsu Games · Nowa gra",
      "infograf.hero.lead": "Układaj obrazki, odkrywaj ciekawostki i powiększaj swoją galerię. Gra logiczna dla dzieci i dorosłych.",
      "infograf.icon.alt": "Ikona gry Infograf — panda mała",
      "infograf.hero.ctaGallery": "Zobacz galerię",
      "infograf.ctaPlay": "Pobierz w Google Play",
      "infograf.gallery.title": "Zobacz Infograf w grze",
      "infograf.gallery.lead": "Wybierz kategorię, ułóż obrazek, odwróć go i odkryj ciekawostkę.",
      "infograf.gallery.swipe": "Przesuń, aby zobaczyć kolejne zdjęcia →",
      "infograf.gallery.alt1": "Infograf — Wybór kategorii układanek",
      "infograf.gallery.alt2": "Infograf — Samouczek z pandą małą",
      "infograf.gallery.alt3": "Infograf — Układanie leśnego krajobrazu",
      "infograf.gallery.alt4": "Infograf — Odkrywanie sztuki Hiroshige",
      "infograf.gallery.alt5": "Infograf — Ciekawostka na odwrocie obrazka",
      "infograf.gallery.alt6": "Infograf — Kolekcja ukończonych obrazków",
      "infograf.hero.title": "Infograf",
      "infograf.launch.secondary": "Zobacz pozostałe gry",
      "infograf.launch.text": "Infograf jest już dostępny w Google Play. Premiera odbyła się 25 października 2026.",
      "infograf.launch.title": "Zagraj w Infograf",
      "infograf.meta.description": "Infograf — układanki obrazkowe i ciekawostki od Jachsu Games. Dostępna w Google Play od 25 października 2026.",
      "infograf.meta.ogDescription": "Układaj obrazki i odkrywaj ciekawostki. Dostępna w Google Play od 25 października 2026.",
      "infograf.meta.ogTitle": "Infograf — Jachsu Games",
      "infograf.meta.title": "Infograf | Jachsu Games",
      "infograf.release.date": "25 października 2026",
      "infograf.release.label": "Premiera:",
      "infograf.status": "Dostępna w Google Play"
    },
    en: {
      "nav.home": "Home",
      "nav.portfolio": "Portfolio",
      "nav.games": "Games",
      "nav.menu.open": "Open menu",
      "nav.menu.close": "Close menu",
      "nav.theme": "Toggle theme",
      "nav.primary": "Primary navigation",
      "nav.polyrush": "Polyrush (archive)",
      "nav.cosmidle": "Cosmidle: Idle Space Shooter",
      "nav.language": "Site language",
      "nav.switch.pl": "PL",
      "nav.switch.en": "EN",
      "nav.infograf": "Infograf",
      "footer.contactPrefix": "Contact:",

      "home.meta.title": "Jachsu Games | Indie Game Studio",
      "home.meta.description": "Jachsu Games: Infograf — picture puzzles and facts. Discover our new game and Cosmidle.",
      "home.meta.ogTitle": "Jachsu Games",
      "home.meta.ogDescription": "Infograf — solve picture puzzles and discover facts. Available on Google Play since October 25, 2026.",
      "home.hero.eyebrow": "Jachsu Games · Our new game",
      "home.hero.ctaGame": "Discover Infograf",
      "home.hero.ctaGames": "Explore our games",
      "home.hero.previewAlt": "Infograf — forest landscape puzzle",
      "home.games.polyrush.status": "Removed from store",
      "home.games.cosmidle.status": "Open testing",
      "home.games.archive": "View project",
      "home.hero.title": "Infograf",
      "home.hero.lead": "Solve picture puzzles, discover facts, and build your collection. A relaxing puzzle game for children and adults.",
      "home.hero.kicker": "Available on Google Play since October 25, 2026.",
      "home.hero.previewLabel": "Infograf — game preview",
      "home.highlights.title": "What we deliver",
      "home.highlights.card1.title": "Rapid prototyping",
      "home.highlights.card1.text": "Early validation of mechanics and UX choices.",
      "home.highlights.card2.title": "Technical backbone",
      "home.highlights.card2.text": "Mechanics, save systems, and integrations that support mobile game development.",
      "home.highlights.card3.title": "Release quality",
      "home.highlights.card3.text": "Accessible navigation, clean semantics, and mobile-first readiness.",
      "home.studio.title": "About the studio",
      "home.studio.text1": "Jachsu Games is an independent studio focused on mobile games and lightweight digital products.",
      "home.studio.text2": "The stack includes Godot Engine, iterative design workflows, and UX-driven decision making.",
      "home.games.cosmidle.text": "Grow your fleet, collect resources, and battle across space.",
      "home.games.details": "Explore the game",
      "home.games.infograf.status": "Available on Google Play",
      "home.games.infograf.text": "Solve picture puzzles and discover facts. Available on Google Play since October 25, 2026.",
      "home.games.lead": "Discover Infograf and Cosmidle, and explore our project archive.",
      "home.games.polyrush.text": "An archived endless runner for Android. The game has been removed from the store.",
      "home.games.store": "Google Play",
      "home.games.title": "Our games",

      "portfolio.meta.title": "Portfolio | Jan Freda | Jachsu Games",
      "portfolio.meta.description": "Jan Freda’s portfolio: Polyrush, Cosmidle, Infograf, and the Jachsu Games website.",
      "portfolio.meta.ogTitle": "Jan Freda Portfolio",
      "portfolio.meta.ogDescription": "Mobile games, gameplay design, and digital products.",
      "portfolio.hero.eyebrow": "Jan Freda",
      "portfolio.hero.title": "I design and build products from concept to release",
      "portfolio.hero.lead": "Selected work combining gameplay, architecture, and usability. Each project is built around a clear hypothesis and measurable outcome.",
      "portfolio.hero.ctaGithub": "GitHub profile",
      "portfolio.hero.ctaPlay": "Google Play",
      "portfolio.metrics.projects.label": "4",
      "portfolio.metrics.projects.desc": "Portfolio projects",
      "portfolio.metrics.focus.label": "Product + Code",
      "portfolio.metrics.focus.desc": "From UX to implementation",
      "portfolio.metrics.stack.label": "Mobile / Web",
      "portfolio.metrics.stack.desc": "Mobile games and frontend",
      "portfolio.metrics.label": "Portfolio metrics",
      "portfolio.filters.title": "My projects",
      "portfolio.filters.toolbarLabel": "Project filters",
      "portfolio.filters.all": "All",
      "portfolio.filters.game": "Games",
      "portfolio.filters.web": "Web",
      "portfolio.card.roleLabel": "Scope:",
      "portfolio.card.stackLabel": "Stack:",
      "portfolio.card.placeholder": "No preview",
      "portfolio.actions.details": "Details",
      "portfolio.actions.github": "GitHub",
      "portfolio.actions.live": "Google Play",
      "portfolio.actions.link": "Link",
      "portfolio.actions.repo": "Repo",
      "portfolio.projects.empty": "No projects for this filter.",
      "portfolio.aboutme.eyebrow": "Jachsu Games",
      "portfolio.aboutme.title": "Indie studio building mobile games and digital products",
      "portfolio.aboutme.lead": "I design, build, and ship digital products—from prototypes to store releases.",
      "portfolio.aboutme.point1.title": "Mobile games",
      "portfolio.aboutme.point1.text": "Game development in Godot and Unreal: gameplay, UI, testing, Google Play release, and iOS readiness.",
      "portfolio.aboutme.point2.title": "Systems & integrations",
      "portfolio.aboutme.point2.text": "Progression and save systems, platform integrations, and a clear project structure that supports game development.",
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
      "portfolio.actions.policy": "Privacy Policy",

      "polyrush.meta.title": "Polyrush: Endless Runner | Jachsu Games",
      "polyrush.meta.description": "Polyrush: Endless Runner — an archived Jachsu Games title for Android, removed from the store.",
      "polyrush.meta.ogTitle": "Polyrush: Endless Runner",
      "polyrush.meta.ogDescription": "Polyrush: Endless Runner project archive. The game has been removed from the store.",
      "polyrush.hero.eyebrow": "Jachsu Games · Archive",
      "polyrush.hero.status": "Removed from store",
      "polyrush.hero.ctaInfograf": "Discover Infograf",
      "polyrush.hero.title": "Polyrush: Endless Runner",
      "polyrush.hero.lead": "An archived endless runner for Android. The game has been removed from the store; explore the project and gallery here.",
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
      "polyrush.cta.title": "Discover our new games",
      "polyrush.cta.lead": "Polyrush has been removed from the store. Explore Infograf, our new puzzle game.",
      "polyrush.cta.primary": "Discover Infograf",
      "polyrush.cta.secondary": "Home page",

      "cosmidle.meta.title": "Cosmidle: Idle Space Shooter | Jachsu Games",
      "cosmidle.meta.description": "Cosmidle: Idle Space Shooter for Android. Grow your fleet, collect resources, and battle across space.",
      "cosmidle.meta.ogTitle": "Cosmidle: Idle Space Shooter",
      "cosmidle.meta.ogDescription": "A space idle shooter by Jachsu Games. View the gallery and game on Google Play.",
      "cosmidle.hero.eyebrow": "Jachsu Games",
      "cosmidle.hero.status": "Open testing",
      "cosmidle.hero.title": "Cosmidle: Idle Space Shooter",
      "cosmidle.hero.lead": "Enter space and upgrade your ship in an endless idle shooter adventure.",
      "cosmidle.hero.ctaStore": "Google Play · Open testing",
      "cosmidle.hero.ctaDev": "Developer profile",
      "cosmidle.hero.ctaPolicy": "Privacy Policy",
      "cosmidle.features.title": "About",
      "cosmidle.features.text": "Collect upgrades, shoot asteroids, and expand your ship endlessly.",
      "cosmidle.loop.title": "Key Features",
      "cosmidle.loop.item1": "Endless idle gameplay loop.",
      "cosmidle.loop.item2": "Cloud saves and achievements via Google Play Games.",
      "cosmidle.loop.item3": "Deep spaceship upgrade mechanics.",
      "cosmidle.cta.title": "Start your mission",
      "cosmidle.cta.lead": "Join Cosmidle’s open test on Google Play.",
      "cosmidle.cta.primary": "Join the test",
      "cosmidle.cta.secondary": "Home page",
      "cosmidle.banner.alt": "Cosmidle — spaceship against a starry background",
      "cosmidle.footer.delete": "Delete account and data",
      "cosmidle.gallery.alt1": "Cosmidle — spaceship in the Home Orbit sector",
      "cosmidle.gallery.alt2": "Cosmidle — asteroid combat",
      "cosmidle.gallery.alt3": "Cosmidle — permanent Core upgrade tree",
      "cosmidle.gallery.alt4": "Cosmidle — economy and weapon upgrades",
      "cosmidle.gallery.lead": "Gameplay screenshots: space flight, combat, the development tree, and upgrades.",
      "cosmidle.gallery.swipe": "Swipe to see more screenshots →",
      "cosmidle.gallery.title": "See Cosmidle in action",
      "cosmidle.hero.ctaGallery": "View gallery",
      "cosmidle.icon.alt": "Cosmidle game icon",

      "infograf.cover.alt": "Infograf — forest landscape puzzle",
      "infograf.features.facts.text": "Combine picture puzzles with learning new facts.",
      "infograf.features.facts.title": "Discover facts",
      "infograf.features.picture.text": "Fit puzzle pieces together and discover new illustrations.",
      "infograf.features.picture.title": "Solve picture puzzles",
      "infograf.features.progress.text": "Unlock gallery pictures and return to unfinished puzzles.",
      "infograf.features.progress.title": "Grow your collection",
      "infograf.features.title": "Pictures, facts, and relaxing puzzles",
      "infograf.hero.ctaAbout": "About the game",
      "infograf.hero.ctaPolicy": "Privacy Policy",
      "infograf.hero.eyebrow": "Jachsu Games · New game",
      "infograf.hero.lead": "Solve picture puzzles, discover facts, and grow your gallery. A puzzle game for children and adults.",
      "infograf.icon.alt": "Infograf game icon — red panda",
      "infograf.hero.ctaGallery": "View gallery",
      "infograf.ctaPlay": "Get it on Google Play",
      "infograf.gallery.title": "See Infograf in action",
      "infograf.gallery.lead": "Choose a category, solve a picture puzzle, flip it over, and discover a fact.",
      "infograf.gallery.swipe": "Swipe to see more screenshots →",
      "infograf.gallery.alt1": "Infograf — Choosing a puzzle category",
      "infograf.gallery.alt2": "Infograf — Red panda tutorial",
      "infograf.gallery.alt3": "Infograf — Solving a forest landscape",
      "infograf.gallery.alt4": "Infograf — Discovering Hiroshige’s art",
      "infograf.gallery.alt5": "Infograf — A fact on the back of a picture",
      "infograf.gallery.alt6": "Infograf — A collection of completed pictures",
      "infograf.hero.title": "Infograf",
      "infograf.launch.secondary": "Explore our other games",
      "infograf.launch.text": "Infograf is now available on Google Play. Released on October 25, 2026.",
      "infograf.launch.title": "Play Infograf",
      "infograf.meta.description": "Infograf — picture puzzles and facts by Jachsu Games. Available on Google Play since October 25, 2026.",
      "infograf.meta.ogDescription": "Solve picture puzzles and discover facts. Available on Google Play since October 25, 2026.",
      "infograf.meta.ogTitle": "Infograf — Jachsu Games",
      "infograf.meta.title": "Infograf | Jachsu Games",
      "infograf.release.date": "October 25, 2026",
      "infograf.release.label": "Released:",
      "infograf.status": "Available on Google Play"
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
