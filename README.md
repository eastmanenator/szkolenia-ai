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
├── index.html          # kompletna statyczna strona HTML/CSS/JS
├── assets/
│   ├── logo.png        # logo widoczne w nawigacji
│   └── szymon.jpg      # zdjęcie prowadzącego
├── robots.txt          # dyrektywy dla robotów indeksujących
└── AGENTS.md           # instrukcje pracy dla Codex i innych agentów AI
```

## Technologia

Projekt jest statyczną stroną bez procesu budowania:

- HTML5,
- CSS osadzony w `index.html`,
- JavaScript osadzony w `index.html`,
- font Inter ładowany z Google Fonts,
- obrazy lokalne w katalogu `assets/`.

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
