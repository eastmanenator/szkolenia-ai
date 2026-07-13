# Akademia AI – Textilimpex

Statyczny, jednostronicowy landing page szkolenia **Akademia AI** organizowanego
przez Textilimpex. Strona przedstawia 64-godzinny program dla właścicieli firm,
managerów i liderów oraz kieruje do zewnętrznego formularza zgłoszeniowego.

Publiczny adres strony: <https://eastmanenator.github.io/szkolenia-ai/>

## Najważniejsze informacje

- szkolenie obejmuje 8 modułów i 64 godziny zegarowe,
- zajęcia odbywają się stacjonarnie w Łodzi lub w formule hybrydowej,
- dostępnych jest pięć edycji od października 2026 do stycznia 2027,
- cena bazowa wynosi 6 400 zł, a deklarowane dofinansowanie sięga 93%,
- prowadzącym jest Szymon Kapturkiewicz,
- rejestracja odbywa się przez formularz zewnętrzny.

Aktualne ceny, terminy i zasady dofinansowania należy zawsze weryfikować w
treści strony przed publikacją zmian.

## Architektura

Projekt nie korzysta z frameworka, bundlera ani menedżera pakietów. Nie ma
pliku `package.json` ani etapu kompilacji aplikacji.

```text
.
├── index.html                     # semantyczna struktura i treść strony
├── styles.css                     # cały wygląd i warianty responsywne
├── main.js                        # interakcje i dane szczegółowego harmonogramu
├── build.js                       # cache-busting zasobów przed wdrożeniem
├── assets/                        # obrazy, logo, favikony i grafika social media
├── site.webmanifest               # manifest aplikacji
├── robots.txt                     # dyrektywy dla robotów
├── .github/workflows/static.yml   # publikacja w GitHub Pages
├── AGENTS.md                      # instrukcje dla agentów AI
└── CLAUDE.md                      # instrukcje dla Claude Code
```

Strona używa HTML5, CSS i czystego JavaScriptu. Font Inter jest pobierany z
Google Fonts. Obrazy sekcji są podawane przez `<picture>` w formatach AVIF,
WebP i JPG; grafika hero ma dodatkowo wersję PNG.

## Sekcje i interakcje

Kolejność głównych części strony:

1. nawigacja i hero z animowanymi statystykami,
2. „Dla kogo” i „Co zyskasz”,
3. program w formie akordeonu z 8 modułami,
4. cennik i informacje o dofinansowaniu,
5. cytat ekspercki i profil prowadzącego,
6. terminy, miejsce i dane kontaktowe,
7. FAQ z wymaganiami i zasadami ukończenia,
8. rejestracja oraz stopka.

`main.js` obsługuje:

- akordeon programu,
- filtrowanie edycji szkolenia,
- modal `<dialog>` z kalendarzem i tabelą zjazdów,
- animacje wejścia sekcji i liczniki w hero,
- stan nawigacji, pasek postępu i przycisk powrotu na górę,
- płynne przewijanie linków nawigacyjnych.

Animacje są wyłączane lub upraszczane przy `prefers-reduced-motion`.

## Gdzie aktualizować treść

| Zakres | Plik | Uwagi |
| --- | --- | --- |
| Teksty, program, ceny, kafelki edycji, kontakt i CTA | `index.html` | Zachowaj treść po polsku i istniejącą hierarchię sekcji. |
| Szczegółowe daty, godziny, tryb zjazdów i terminy rekrutacji | `main.js` | Dane znajdują się w obiekcie `scheduleEditions`. |
| Kolory, layout, responsywność i animacje | `styles.css` | Korzystaj z istniejących zmiennych CSS i klas. |
| Obrazy i ikony | `assets/` | Dla teł sekcji utrzymuj komplet AVIF/WebP/JPG. |
| SEO i social preview | `<head>` w `index.html` | Canonical, Open Graph i Twitter wskazują publiczny adres GitHub Pages. |
| Formularz zgłoszeniowy | `index.html` | Ten sam zewnętrzny URL występuje w kilku CTA. |

Terminy mają dwa poziomy prezentacji: skrócone daty startu są zapisane w
`index.html`, a pełne harmonogramy w `scheduleEditions` w `main.js`. Przy zmianie
edycji trzeba zaktualizować oba miejsca oraz kartę „Najbliższy start”.

## Uruchomienie lokalne

Uruchom serwer z katalogu repozytorium:

```bash
python3 -m http.server 4173
```

Następnie otwórz <http://localhost:4173>. Ten sam sposób uruchomienia jest
zapisany w `.claude/launch.json`.

## Cache-busting

`build.js` oblicza 10-znakowy skrót SHA-256 treści zasobu i dopisuje
`?v=<hash>` do lokalnych odwołań do `styles.css`, `main.js` i plików z
`assets/`. Przetwarza `index.html` oraz `styles.css`, obsługuje także `srcset`
i `url(...)` oraz zastępuje wcześniej wygenerowany parametr wersji.

Skrypt **modyfikuje pliki źródłowe w bieżącym katalogu**. W normalnym trybie
uruchamia go wyłącznie GitHub Actions na świeżym checkoutcie przed utworzeniem
artefaktu. Nie zapisuj wygenerowanych parametrów `?v=...` w repozytorium.

## Weryfikacja zmian

Minimalna kontrola po każdej zmianie:

```bash
git diff --check
```

Po zmianach HTML, CSS lub JavaScript uruchom lokalny serwer i sprawdź co
najmniej widok desktopowy oraz mobilny. Zweryfikuj akordeon, filtry terminów,
otwieranie i zamykanie modala, CTA, przewijanie oraz widoczny focus klawiatury.
Nie ma obecnie automatycznego zestawu testów.

## Wdrożenie

Push do gałęzi `main` lub ręczne uruchomienie workflow publikuje stronę przez
`.github/workflows/static.yml`. Pipeline:

1. pobiera repozytorium,
2. konfiguruje GitHub Pages,
3. uruchamia `node build.js`,
4. wysyła katalog główny jako artefakt,
5. wdraża artefakt do GitHub Pages.
