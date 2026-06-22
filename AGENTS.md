# Instrukcje dla Codex

## Kontekst projektu

To statyczny landing page szkolenia „Akademia AI – Textilimpex”. Struktura:

- `index.html` — struktura HTML (semantyczna).
- `styles.css` — wszystkie style CSS.
- `main.js` — cały JavaScript.
- `assets/` — zasoby graficzne.
- `build.js` — skrypt wersjonujący (cache-busting): dopisuje `?v=<hash treści>` do odwołań do `styles.css`, `main.js` oraz obrazków. Uruchamiany automatycznie w GitHub Actions przed deployem (patrz `.github/workflows/static.yml`). Źródła w repo trzymamy „czyste” (bez hashy) — hashe wstrzykiwane są tylko w pipeline. Skrypt jest idempotentny i bez zależności (czysty Node).

## Priorytety przy zmianach

1. Zachowaj stronę jako prosty projekt statyczny, chyba że użytkownik wyraźnie poprosi o inną architekturę.
2. Nie dodawaj zależności, frameworków, bundlerów ani narzędzi build bez uzasadnionej potrzeby.
3. Utrzymuj język komunikacji strony w języku polskim.
4. Zachowuj obecny styl wizualny: ciemny granatowy layout, pomarańczowe akcenty, nowoczesny charakter B2B.
5. Dbaj o poprawność treści dotyczących szkolenia: 70 godzin, Łódź, Textilimpex, dofinansowanie do 93%, prowadzący Szymon Kapturkiewicz.

## Standardy kodu

- Preferuj semantyczny HTML.
- Utrzymuj czytelne nazwy klas zgodne z istniejącą konwencją.
- Style trzymaj w `styles.css`, a JavaScript w `main.js` — nie wstawiaj ich z powrotem inline do `index.html`.
- Nie dopisuj ręcznie `?v=...` do ścieżek zasobów — robi to automatycznie `build.js` przy deployu.
- Nie umieszczaj bloków `try/catch` wokół importów.
- Zachowuj kompatybilność z nowoczesnymi przeglądarkami bez konieczności kompilacji.

## Dostępność i UX

- Każdy obraz informacyjny powinien mieć sensowny atrybut `alt`.
- Linki i przyciski muszą mieć widoczny stan focus.
- Interakcje powinny działać klawiaturą.
- Animacje muszą respektować `prefers-reduced-motion`.
- Teksty CTA powinny być jednoznaczne i prowadzić do istniejących sekcji lub formularza.

## Testowanie zmian

Po zmianach wykonaj co najmniej:

```bash
git diff --check
```

Jeśli zmieniasz działanie lub wygląd strony, uruchom lokalny serwer, sprawdź stronę w przeglądarce i wykonaj zrzut ekranu, o ile środowisko na to pozwala.

## SEO i roboty

- Aktualizuj `robots.txt`, gdy zmieni się publiczna struktura strony lub pojawi się mapa witryny.
- Meta title i meta description w `index.html` powinny pozostać zwięzłe, konkretne i zgodne z treścią strony.
