# Instrukcje dla agentów AI

## Kontekst projektu

Repozytorium zawiera statyczny, jednostronicowy landing page szkolenia
„Akademia AI – Textilimpex”. Strona jest po polsku i prowadzi użytkownika do
zewnętrznego formularza rejestracji. Nie ma frameworka, bundlera, menedżera
pakietów ani automatycznego zestawu testów.

Najważniejsze pliki:

- `index.html` — semantyczna struktura, treść, metadane SEO, skrócone terminy,
  ceny, dane kontaktowe i linki CTA,
- `styles.css` — wszystkie style, breakpointy i animacje,
- `main.js` — wszystkie interakcje oraz szczegółowe dane harmonogramu w
  `scheduleEditions`,
- `assets/` — lokalne grafiki, logo, favikony i obraz social media,
- `build.js` — skrypt Node niewymagający zależności, dodający hashe do URL-i
  zasobów,
- `.github/workflows/static.yml` — wdrożenie katalogu głównego do GitHub Pages,
- `README.md` — dokumentacja projektu i mapa miejsc edycji.

## Fakty wymagające spójności

Przed zmianą treści sprawdź powiązane wystąpienia w `index.html` i `main.js`.
Obecna oferta obejmuje:

- 8 modułów i 64 godziny zegarowe,
- cenę bazową 6 400 zł,
- wkład własny 448 zł dla osoby fizycznej przy dofinansowaniu 93%, bez
  dodatkowej dopłaty,
- wkład własny 960 zł dla firmy/pracownika przy dofinansowaniu 85%,
- dofinansowanie do 93% dla osoby fizycznej i 85% dla firmy/pracownika,
- Łódź, Textilimpex Sp. z o.o., ul. Traugutta 25,
- edycje stacjonarne oraz hybrydowe od października 2026 do stycznia 2027,
- prowadzącego Szymona Kapturkiewicza.

Daty startu edycji są zdublowane celowo: kafelki i karta „Najbliższy start” są
w `index.html`, natomiast pełne daty zjazdów, godziny, tryb i koniec rekrutacji
są w `scheduleEditions` w `main.js`. Zmiana harmonogramu wymaga synchronizacji
obu plików. Zachowaj też zgodność ceny i dofinansowania między hero, sekcją
korzyści, cennikiem oraz metadanymi SEO.

## Zasady zmian

1. Zachowaj prostą architekturę statyczną, chyba że użytkownik wyraźnie zleci
   migrację.
2. Nie dodawaj zależności, frameworków, bundlerów ani nowego kroku build bez
   uzasadnionej potrzeby.
3. Treść widoczna dla użytkownika ma pozostać w języku polskim.
4. Zachowaj nowoczesny charakter B2B: ciemny granat, pomarańczowe akcenty,
   jasna typografia i istniejące zmienne CSS.
5. Style zapisuj w `styles.css`, JavaScript w `main.js`; nie dodawaj stylów ani
   skryptów inline do `index.html`.
6. Używaj istniejącej konwencji klas i semantycznego HTML.
7. Nie dopisuj ręcznie parametrów `?v=...` do ścieżek. Robi to `build.js` w CI.
8. Nie uruchamiaj `build.js` bezpośrednio w roboczym drzewie do zwykłej
   weryfikacji — skrypt przepisuje `index.html` i `styles.css`.
9. Nie otaczaj importów lub skryptów blokami `try/catch`. Projekt używa
   klasycznego, zewnętrznego skryptu z `defer`, bez modułów.
10. Nie zmieniaj adresu canonical, Open Graph, Twitter ani formularza bez
    sprawdzenia wszystkich powiązanych odwołań.

## Obrazy, SEO i publiczne pliki

- Informacyjne obrazy muszą mieć znaczący `alt`; dekoracyjne powinny mieć
  pusty `alt` i odpowiednie ukrycie przed technologiami asystującymi.
- Tła sekcji są dostępne jako AVIF, WebP i JPG. Przy ich wymianie zachowaj
  komplet formatów, właściwe wymiary i układ `<picture>`.
- Aktualizuj `<title>`, meta description i dane social tylko wtedy, gdy nadal
  wiernie opisują stronę.
- Gdy zmieni się publiczna struktura lub pojawi się mapa witryny, zaktualizuj
  `robots.txt`. W razie zmiany ikon sprawdź również `site.webmanifest`.

## Dostępność i UX

- Wszystkie linki, przyciski, akordeon, filtry i modal muszą działać klawiaturą.
- Zachowaj widoczny `:focus-visible`.
- Poprawnie aktualizuj stany ARIA, m.in. `aria-expanded` i `aria-pressed`.
- Po zamknięciu modala focus powinien wracać do kafelka, który go otworzył.
- Nowe animacje muszą respektować `prefers-reduced-motion`.
- CTA powinny prowadzić do istniejącej sekcji albo aktualnego formularza.

## Weryfikacja

Po każdej zmianie wykonaj co najmniej:

```bash
git diff --check
```

Po zmianach wyglądu lub działania uruchom:

```bash
python3 -m http.server 4173
```

Sprawdź stronę w przeglądarce na desktopie i urządzeniu mobilnym. Zweryfikuj
akordeon, filtry edycji, modal harmonogramu (w tym zamykanie przez Escape i
kliknięcie tła), CTA, przewijanie, przycisk „do góry”, focus oraz wariant
`prefers-reduced-motion`. Jeśli środowisko pozwala, wykonaj zrzut ekranu.

## Wdrożenie

Workflow `.github/workflows/static.yml` działa po pushu do `main` i ręcznie.
Na świeżym checkoutcie uruchamia `node build.js`, a następnie publikuje katalog
główny w GitHub Pages. Źródła w repozytorium mają pozostać bez hashy zasobów.
