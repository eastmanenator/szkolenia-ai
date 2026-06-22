# Akademia AI – Textilimpex

Jednostronicowa strona landing page promująca szkolenie **Akademia AI** organizowane przez Textilimpex w Łodzi. Projekt prezentuje program 70-godzinnych warsztatów dla właścicieli firm, managerów i liderów biznesu zainteresowanych praktycznym wdrażaniem sztucznej inteligencji w organizacji.

## Cel projektu

Strona ma zachęcać do rejestracji zainteresowania szkoleniem poprzez jasne przedstawienie:

- wartości programu i korzyści biznesowych,
- grupy docelowej szkolenia,
- 8-modułowego programu warsztatowego,
- zasad dofinansowania do 93%,
- sylwetki prowadzącego,
- informacji organizacyjnych oraz kontaktu.

## Struktura

```text
.
├── index.html          # struktura HTML strony
├── styles.css          # wszystkie style CSS
├── main.js             # cały JavaScript
├── build.js            # wersjonowanie zasobów (cache-busting) przy deployu
├── assets/             # zasoby graficzne (logo, zdjęcia, tła sekcji)
├── robots.txt          # dyrektywy dla robotów indeksujących
├── AGENTS.md           # instrukcje pracy dla Codex i innych agentów AI
└── .github/workflows/static.yml  # deploy na GitHub Pages
```

## Technologia

Projekt jest statyczną stroną bez bundlera ani frameworka:

- HTML5 w `index.html`,
- CSS w osobnym pliku `styles.css`,
- JavaScript w osobnym pliku `main.js`,
- font Inter ładowany z Google Fonts,
- obrazy lokalne w katalogu `assets/`,
- lekki skrypt `build.js` (czysty Node) wersjonujący zasoby przy deployu.

### Wersjonowanie zasobów (cache-busting)

Aby po wdrożeniu przeglądarki i CDN na pewno pobrały nowe wersje plików, `build.js`
dopisuje do odwołań do `styles.css`, `main.js` oraz obrazków parametr
`?v=<hash treści pliku>`. Skrót zmienia się tylko wtedy, gdy zmieni się zawartość
pliku, więc niezmienione zasoby nadal korzystają z cache.

Skrypt jest idempotentny, nie ma żadnych zależności i uruchamiany jest automatycznie
w GitHub Actions tuż przed publikacją (krok w `.github/workflows/static.yml`). Pliki
źródłowe w repozytorium pozostają „czyste” — hashe wstrzykiwane są wyłącznie w pipeline.
Ręczne uruchomienie (np. do podglądu wyniku):

```bash
node build.js
```

## Uruchomienie lokalne

Najprościej otworzyć plik `index.html` w przeglądarce albo uruchomić prosty serwer HTTP:

```bash
python3 -m http.server 8000
```

Następnie przejdź do `http://localhost:8000`.

## Główne sekcje strony

- Hero z najważniejszym komunikatem i CTA.
- Sekcja „Dla kogo”.
- Sekcja korzyści.
- Akordeon z 8 modułami programu.
- Cennik i informacje o dofinansowaniu.
- Cytat ekspercki.
- Profil prowadzącego.
- Informacje organizacyjne i dane kontaktowe.
- Sekcja rejestracji kierująca do formularza zewnętrznego.

## Zasady rozwoju

- Zachowuj prostą, statyczną architekturę projektu.
- Nie dodawaj frameworków ani bundlera bez wyraźnej potrzeby.
- Dbaj o dostępność: semantyczny HTML, widoczny focus, poprawne opisy obrazów i działanie z klawiatury.
- Zachowuj spójność wizualną z obecną paletą: granat, pomarańcz, biel i odcienie szarości.
- Po zmianach wizualnych sprawdzaj stronę w widoku desktopowym i mobilnym.
