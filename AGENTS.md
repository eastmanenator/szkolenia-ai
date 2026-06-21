# Instrukcje dla Codex

## Kontekst projektu

To statyczny landing page szkolenia „Akademia AI – Textilimpex”. Najważniejszym plikiem aplikacji jest `index.html`, który zawiera strukturę HTML, style CSS i skrypty JavaScript. Zasoby graficzne znajdują się w katalogu `assets/`.

## Priorytety przy zmianach

1. Zachowaj stronę jako prosty projekt statyczny, chyba że użytkownik wyraźnie poprosi o inną architekturę.
2. Nie dodawaj zależności, frameworków, bundlerów ani narzędzi build bez uzasadnionej potrzeby.
3. Utrzymuj język komunikacji strony w języku polskim.
4. Zachowuj obecny styl wizualny: ciemny granatowy layout, pomarańczowe akcenty, nowoczesny charakter B2B.
5. Dbaj o poprawność treści dotyczących szkolenia: 70 godzin, Łódź, Textilimpex, dofinansowanie do 93%, prowadzący Szymon Kapturkiewicz.

## Standardy kodu

- Preferuj semantyczny HTML.
- Utrzymuj czytelne nazwy klas zgodne z istniejącą konwencją.
- Nie przenoś CSS i JS do osobnych plików, jeśli zmiana jest niewielka i nie wymaga refaktoryzacji.
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
