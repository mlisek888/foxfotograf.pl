# foxfotograf.pl

Strona FoxFotograf (Marcin Lis): statyczna strona zbudowana w [Eleventy](https://www.11ty.dev/), hostowana na IQHost, edytowana przez [Pages CMS](https://app.pagescms.org). Po każdej zmianie GitHub Actions buduje stronę i wgrywa ją przez FTP (`.github/workflows/wdrozenie.yml`).

## Jak edytować stronę (dla Marcina)

1. Wejdź na **https://app.pagescms.org** i zaloguj się kontem GitHub.
2. Wybierz repozytorium strony.
3. W menu po lewej masz:
   - **Aktualności** – dodawanie i edycja wpisów. Kliknij „Add an entry”, wpisz tytuł, datę, krótki opis, dodaj zdjęcie i treść, kliknij **Save**.
   - **Ustawienia strony** – nagłówek i zdjęcie na górze strony, telefon, e-mail, adres, komunikat o rezerwacjach fotobudek, lista galerii w Strefie klienta.
   - **Dokumenty** – regulamin i RODO fotobudki.
4. Po zapisaniu strona sama się przebuduje. Zmiany są widoczne na foxfotograf.pl po ok. 1–2 minutach.

Zdjęcia możesz wrzucać w pełnej rozdzielczości, prosto z aparatu. Strona sama zrobi z nich lekkie wersje (AVIF/WebP) w kilku rozmiarach.

Zgłoszenia z formularzy (kontakt i potwierdzenie rezerwacji) przychodzą na adres e-mail ustawiony w **Ustawieniach strony → Dane kontaktowe**. Wysyła je skrypt `formularz.php` na hostingu.

Jeśli zmiana nie pojawia się na stronie, zajrzyj na GitHubie w zakładkę **Actions**: czerwony krzyżyk oznacza błąd wgrywania.

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
- `src/static/.htaccess` – HTTPS, przekierowania starych adresów z WordPressa, cache
- `src/formularz.njk` – skrypt PHP wysyłający formularze (generowany jako `/formularz.php`)
- `.github/workflows/wdrozenie.yml` – budowanie i wgrywanie przez FTP (sekrety `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, zmienna `FTP_DIR`)
- `.pages.yml` – konfiguracja panelu Pages CMS
