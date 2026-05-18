# 🤖 Pomysły Agenta — Life Dashboard
> Automatycznie generowane co poniedziałek przez Claude. Nie edytuj ręcznie.

---

## [16.05.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Habitica** — gamifikacja RPG z awatarem i questami drużynowymi; karanie całej grupy za niepowodzenie jednego gracza tworzy silną motywację społeczną, ale estetyka pixel-art odpycha dorosłych użytkowników
- **Anki** — prawdziwy algorytm SM-2 (easiness factor + interwał); słowa wracają dokładnie zanim je zapomnisz, nie losowo — badania pokazują 200-300% lepszą retencję niż standardowe powtórki
- **Clozemaster** — nauka słów przez wypełnianie luk w zdaniach kontekstowych; grupowanie po częstotliwości użycia, tryb radio (pasywny słuch), widget na ekran główny
- **Duolingo** — streak freeze, ligi XP, natychmiastowy feedback; silna gamifikacja kosztem głębi — dobre do nawykowego wchodzenia, słabe dla zaawansowanej retencji
- **Edgewonk** — tagowanie emocji przy każdym tradzie (FOMO, revenge, zdyscyplinowany), cotygodniowy "Edge Finder" szukający wzorców, analiza niezrealizowanych tradów (missed trade log)
- **TradesViz** — 600+ statystyk, AI chatbot do pytań o własne dane, symulator "co gdybym wyszedł X pipsów wcześniej/później"
- **Daylio** — minimalistyczny dziennik: wybierasz nastrój + aktywności w 30 sekund; killer feature to "Rok w Pikselach" — siatka wszystkich dni roku pokolorowana nastrojem
- **Madbarz** — interaktywna mapa mięśni z podświetleniem użytych grup, slide-to-record reps, grafika kalorii/czasu na jednym ekranie po sesji
- **Day One** — wpisy z lokalizacją, pogodą, zdjęciami; AI "go deeper" które pyta o głębsze refleksje po zapisaniu wpisu
- **Finch** — wirtualny ptak jako kompan nawyków; brak kar za opuszczone dni — łagodna odpowiedzialność bez stresu; atrakcyjne dla osób z lękiem przed porażką

---

### 💡 Top 5 pomysłów

1. **[Kalistenika] — Interaktywna SVG Heatmapa Mięśni**
   Dodaj SVG sylwetkę człowieka (przód + tył) na stronie Kalisteniki. Po każdej zapisanej sesji automatycznie podświetlaj grupy mięśniowe odpowiadające typowi treningu (Push → klatka/triceps/barki, Pull → plecy/biceps, Legs → nogi/pośladki, Core → brzuch). Intensywność koloru (#22C55E z różną przezroczystością) = liczba setów. W widoku tygodniowym pokaż sumaryczną heatmapę — zaniedbana lub przeciążona partia widoczna natychmiast bez liczenia czegokolwiek.
   *Dlaczego warto: Przy 6-dniowym planie bardzo łatwo o brak balansu — wizualna mapa pokazuje to w 1 sekundę, zanim skończy się tydzień i zaczną boleć stawy. To też najczęstszy "wow feature" aplikacji pokroju Madbarz, który zatrzymuje użytkowników.*
   *Inspiracja: Madbarz*

2. **[Trading Journal] — Tagowanie Emocji + Raport Psychologiczny**
   Przy dodawaniu każdego tradu dodaj obowiązkowy tag "Stan psychiczny": 🟢 Zdyscyplinowany / 🟡 Niepewny / 🔴 FOMO / 🔴 Revenge trading / 🔴 Zmęczony/rozkojarzony. W sekcji Statystyki tradingu pokaż tabelę: liczba tradów, winrate i średnie R:R osobno dla każdej kategorii. Np. "Zdyscyplinowane: 68% WR, R:R 2.1 — FOMO: 29% WR, R:R 0.7" to twarda liczba, która zmienia zachowanie szybciej niż jakakolwiek zasada.
   *Dlaczego warto: Edgewonk zbudował cały biznes na tym jednym pomyśle. Większość strat prop-traderów pochodzi z emocjonalnych wejść, a nie złej strategii. Mając własne dane za 3 miesiące, widać to dosłownie w procentach.*
   *Inspiracja: Edgewonk*

3. **[Polski] — Prawdziwy Algorytm SM-2 zamiast Losowych Powtórek**
   Obecny "spaced review" to prawdopodobnie losowanie ze starego słownika. Zaimplementuj SM-2: każde słowo przechowuje `easiness_factor` (domyślnie 2.5) i `next_review_date`. Po każdej odpowiedzi w quizie aktualizuj EF i oblicz interwał (1 → 6 → 14 → X dni). Na Dashboardzie i na stronie Polski pokaż badge "📚 X słów do powtórki dziś" — gdy badge wynosi 0, cel dnia jest spełniony. Słowo ocenione źle wraca następnego dnia; dobrze znane — za kilka tygodni.
   *Dlaczego warto: Anki udowodnił tę metodę milionom użytkowników. Cel "5 nowych słów dziennie" jest bez sensu, gdy po 2 miesiącach zapominasz 80% starszych słów bo quiz je pomija. SM-2 gwarantuje że każde słowo zostanie zapamiętane długoterminowo przy minimalnym czasie powtórek.*
   *Inspiracja: Anki*

4. **[Statystyki / Review] — "Rok w Pikselach" — Siatka Energii**
   W module Statystyki dodaj zakładkę "Rok". Wyświetl siatkę 12 kolumn × do 31 wierszy (lub 52 × 7 jak Life Calendar), gdzie każda komórka = jeden dzień, kolor = ocena energii z wieczornego dziennika: 1-3 ciemnoczerwony, 4-6 żółty, 7-10 neonowo-zielony (#4ADE80). Brak wpisu = szara komórka (motywacja do codziennego uzupełniania). Hover na komórce pokazuje tooltip z pierwszym zdaniem z "Co poszło dobrze".
   *Dlaczego warto: Daylio zrobił z tego swój killer feature — natychmiastowy wzrokowy obraz całego roku. Przy stylu life-OS który budujesz, takie widoki są ważniejsze niż wykresy słupkowe — jeden wzrok i widzisz czy Marzec był lepszy od Kwietnia bez czytania 30 wpisów. Technicznie to ~15 linii kodu w SQLite + SVG/CSS.*
   *Inspiracja: Daylio*

5. **[Dashboard] — Mini Sparkline P&L 7 Dni + Progress Ringi Modułów**
   Na głównym dashboardzie, bezpośrednio pod sekcją nawyków, dodaj dwa elementy: (a) rząd 7 kolorowych mini-słupków pokazujących P&L ostatnich 7 sesji tradingowych (zielony = zysk w USD, czerwony = strata, szary = brak sesji) z łącznym wynikiem tygodnia — bez wchodzenia do Trading Journal; (b) przy każdym module (Kalistenika, Polski, Zadania) mały okrągły ring (SVG `stroke-dasharray`) z procentem celu tygodniowego, np. "4/6 sesji" lub "23/35 słów". Kliknięcie przechodzi do modułu.
   *Dlaczego warto: Dobry dashboard daje odpowiedź "jak idzie?" w 3 sekundy bez nawigacji. Teraz trzeba klikać w każdy moduł z osobna. Sparkline P&L to dokładnie to co Robinhood pokazuje na ekranie głównym — psychologicznie ważne żeby widzieć trend bez otwierania pełnego raportu.*
   *Inspiracja: TradesViz, Robinhood*

---

## [18.05.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Habitica** — system RPG z awatarem; trzy typy tasków (Habits / Dailies / To-Dos) dają czytelne rozgraniczenie czego brakuje w jednym module Zadania
- **Loop Habit Tracker** — algorytm "Habit Strength" (0–100%) jako ważona średnia krocząca 4 tygodni; jeden pominięty dzień nie zeruje całego paska, tylko go obniża o kilka punktów
- **Streaks** — integracja z Apple Health do automatycznego oznaczania nawyków (np. "30 min ruchu" bez ręcznego klikania); zero manual input dla fizycznych aktywności
- **Finch** — wirtualny ptak jako "companion" nawyków; brak kar za opuszczone dni — zamiast streaku resetu masz smutnego ptaka, co okazuje się skuteczniejsze psychologicznie
- **Clozemaster** — nauka słów przez cloze deletion (zdanie z luką do uzupełnienia); słowa pogrupowane wg częstotliwości użycia (top 1000 / top 5000 / rzadkie)
- **Edgewonk** — zakładka "Missed Trades" gdzie logujesz trade który widziałeś ale nie wziąłeś, a po zamknięciu rynku oznaczasz: "słusznie pominięty" vs "stracona okazja"; po miesiącu widać wzorzec niezdecydowania
- **Progression** (calisthenics app) — zdefiniowane łańcuchy progresji (push-up → diamond → archer → one-arm); pasek "X/Y reps do odblokowania następnej wariacji" jako główna motywacja
- **Notion Life OS** — tygodniowy przegląd (Weekly Review) jako osobny widok syntetyzujący wszystkie dzienne wpisy; hierarchia Daily → Weekly → Monthly → Yearly review

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Dziennik Spudowanych Tradów**
   Dodaj drugą zakładkę "Spudowane" w module Trading Journal. Formularz: instrument, planowany entry/exit, powód pominięcia (za późno / strach / brak setupu / złamanie zasad), oraz co faktycznie się stało z tym ruchem. Po zamknięciu sesji zaznacz każdy wpis jako "dobrze że nie wziąłem ✅" lub "stracona okazja ❌". W statystykach pokaż sumę "potencjalnego P&L ze spudowanych okazji" — jeśli liczba jest mocno ujemna, masz problem z nadmierną ostrożnością; jeśli mocno pozytywna, twój filtr działa.
   *Dlaczego warto: Edgewonk zbudował cały produkt na tym pomyśle i jest to ich najbardziej chwalone feature. Analiza tradów które NIE zostały wzięte ujawnia wzorce wahania i braku zaufania do setupu — rzeczy niewidoczne w samym equity curve. Dla prop-tradera kluczowe jest wiedzieć czy traci przez złe wejścia, czy przez pomijanie dobrych.*
   *Inspiracja: Edgewonk Missed Trades*

2. **[Polski] — Nauka przez Uzupełnianie Luk (Cloze Deletion)**
   Kiedy Claude sugeruje nowe słowo, zawsze dołącz do niego 2 przykładowe zdania z naturalnym kontekstem użycia (zapisywane w bazie razem ze słowem). W trybie quiz dodaj drugi typ ćwiczenia: wyświetl jedno zdanie z luką `____` gdzie powinno być uczone słowo, użytkownik wpisuje odpowiedź lub wybiera z 4 opcji. Obok obecnego trybu flashcard (PL→EN / EN→PL), "tryb zdaniowy" staje się trzecim wariantem quizu przełączanym jednym switchem.
   *Dlaczego warto: Clozemaster ma miliony użytkowników którzy przenieśli się z Duolingo właśnie dlatego, że kontekst zdaniowy trzykrotnie przyspiesza retencję. Dla trudnych polskich słów wiedza "że słowo istnieje" to za mało — trzeba wiedzieć jak je połączyć z resztą zdania. Technicznie wystarczy dodać pole `sentence_example_1` i `sentence_example_2` do tabeli słów i rozbudować quiz o nowy typ.*
   *Inspiracja: Clozemaster*

3. **[Kalistenika] — Łańcuch Progresji Ćwiczeń z Paskiem Odblokowywania**
   Zdefiniuj w kodzie drzewa progresji dla kluczowych ćwiczeń: pompki → pompki diamentowe (cel: 3×12) → pompki archer (cel: 3×10) → pompka na jednej ręce; pull-up → wide-grip → archer pull-up → one-arm negative. Na karcie każdego ćwiczenia w Kalistenice pokaż mini pasek: "Archer Push-up: 8/12 reps — 3 sesje do odblokowania". Gdy osiągniesz próg — animacja confetti i komunikat "ODBLOKOWANO: Pompka Archer 🎉". Historia odblokowanych wariacji jest widoczna na osi czasu.
   *Dlaczego warto: Aplikacja Progression zbudowała cały swój sukces na tym mechaniźmie. Przy treningu kalisteniku, gdzie nie dokładasz talerzy do sztangi, poczucie postępu jest trudniejsze do uchwycenia niż w siłowni. Łańcuch progresji daje cel do każdej sesji zamiast logowania w próżnię — to najczęściej cytowany powód pozostawania w aplikacjach calistenicznych.*
   *Inspiracja: Progression App*

4. **[Dashboard / Statystyki] — "Siła Nawyku" % zamiast samego Streaku**
   Zastąp lub uzupełnij obecny wskaźnik "🔥 X-day streak" o metrykę "Siła Nawyku" w procentach (0–100%). Wzór: ważona średnia z ostatnich 28 dni, gdzie nowsze dni mają wyższy współczynnik (exponential decay na starszych). Przykład: 4 tygodnie codziennie = ~95%, jeden opuszczony dzień po 3 tygodniach = ~88% (nie 0%). Pokaż trzy mini-pierścienie obok siebie dla każdego z 3 nawyków. Tooltip wyjaśnia wzór jednym zdaniem.
   *Dlaczego warto: Streak zerujący się po jednym dniu to najkruchsza możliwa metryka — psychologicznie niszczy miesiące pracy w 24h. Loop Habit Tracker udowodnił że % siły jest dokładniejszy (oddaje rzeczywistą solidność nawyku) i bardziej motywujący (jeden zły dzień nie wygląda jak katastrofa). Dla kogoś kto podróżuje lub choruje — brak totalne resetu czyni metrykę dużo bardziej prawdziwą.*
   *Inspiracja: Loop Habit Tracker*

5. **[Review] — Automatyczny Cotygodniowy Przegląd Claude'a w Poniedziałek**
   Przy pierwszym otwarciu Dashboardu w poniedziałek wyświetl collapsible card "Przegląd Tygodnia (AI)". Claude automatycznie kompiluje z ostatnich 7 wpisów wieczornych: średni poziom energii (np. 6.7/10), listę 3 najczęściej powtarzających się tematów z "co poszło dobrze", 2 wzorce z "co poprawić", i ocenę czy plan z niedzielnego wpisu był realizowany w tygodniu. Card chowa się po przeczytaniu (localStorage) i generuje się ponownie dopiero za tydzień.
   *Dlaczego warto: Obecna aplikacja zbiera dzienne dane ale nigdzie ich nie syntezuje. Notion Life OS i prawie każdy poważny system produktywności zakłada strukturę Daily→Weekly→Monthly review — bez warstwy tygodniowej dziennik to tylko archiwum, a nie narzędzie do zmiany. Technicznie to jedno wywołanie Claude API z kontekstem 7 ostatnich wpisów, wynik cachowany w bazie na 7 dni.*
   *Inspiracja: Notion Life OS, Day One AI prompts*

---
