# foxfotograf.pl

Strona FoxFotograf (Marcin Lis): statyczna strona zbudowana w [Eleventy](https://www.11ty.dev/), hostowana na Netlify, edytowana przez [Pages CMS](https://app.pagescms.org).

## Jak edytować stronę (dla Marcina)

1. Wejdź na **https://app.pagescms.org** i zaloguj się kontem GitHub.
2. Wybierz repozytorium strony.
3. W menu po lewej masz:
   - **Aktualności** – dodawanie i edycja wpisów. Kliknij „Add an entry”, wpisz tytuł, datę, krótki opis, dodaj zdjęcie i treść, kliknij **Save**.
   - **Ustawienia strony** – nagłówek i zdjęcie na górze strony, telefon, e-mail, adres, komunikat o rezerwacjach fotobudek, lista galerii w Strefie klienta.
   - **Dokumenty** – regulamin i RODO fotobudki.
4. Po zapisaniu strona sama się przebuduje. Zmiany są widoczne na foxfotograf.pl po ok. 1–2 minutach.

Zdjęcia możesz wrzucać w pełnej rozdzielczości, prosto z aparatu. Strona sama zrobi z nich lekkie wersje (AVIF/WebP) w kilku rozmiarach.

Zgłoszenia z formularzy (kontakt i potwierdzenie rezerwacji) przychodzą e-mailem z Netlify. Wszystkie są też w panelu Netlify → **Forms**.

## Dla programisty

```bash
npm install
npm start        # podgląd na http://localhost:8080
npm run build    # gotowa strona w _site/
```

- `src/index.njk` – strona główna (sekcje: ślub, fotobudki, komunia, usługi, o mnie, strefa klienta, aktualności, kontakt)
- `src/_data/strona.json` – teksty i dane edytowalne w panelu
- `src/wpisy/` – aktualności (Markdown)
- `src/strony/` – regulamin, RODO
- `src/static/_redirects` – przekierowania starych adresów z WordPressa
- `.pages.yml` – konfiguracja panelu Pages CMS
- Formularze działają przez Netlify Forms (`data-netlify="true"`).
