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

## [25.05.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Habitica** — dopamina po każdym check-offie: awatar dostaje XP i złoto w 0.5 sekundy od kliknięcia; party system karze całą grupę za niespełniony Daily jednego gracza — silniejsza motywacja niż jakiekolwiek powiadomienie push
- **Duolingo** — Streak Freeze zmniejszył churn o 21% u użytkowników zagrożonych utratą streaka; system lig (30 osób/liga, tygodniowy ranking XP) powoduje 40% wyższe zaangażowanie niż brak lig; Friend Quests jako kooperacja
- **Anki** — po każdej fiszce cztery przyciski: Again / Hard / Good / Easy — każda odpowiedź kalibruje indywidualny `easiness_factor` i precyzyjnie przesuwa datę następnej powtórki; brak tego mechanizmu = niedoskonałe SM-2
- **Clozemaster** — "Fluency Fast Track" priorytetyzuje top-1000 najczęstszych słów w języku; słowa poza tą listą oznaczone jako "rzadkie" i pomijane na początku nauki
- **Edgewonk** — Setup Checklist: przed każdym tradem lista warunków do odhaczenia (np. "clear market structure ✓, R:R > 2:1 ✓, no news events ✓"); po miesiącu tabela pokazuje trades z 100% checklistą vs z pominięciami — winrate rozchodzi się dramatycznie
- **TradesViz** — AI chatbot Q&A: wpisujesz po angielsku "What was my best day of the week?" i system zapytuje własną bazę danych, zwraca odpowiedź w 2 sekundy bez klikania w filtry
- **Daylio** — killer feature: tagi aktywności (do 150 własnych ikon), a po 30+ wpisach automatyczna korelacja "Twoja energia jest o 2.4 wyższa w dni z siłownią niż bez" — psychologia behawioralna bez żadnego wysiłku użytkownika
- **Calistree** — wizualne drzewo umiejętności: każdy węzeł to ćwiczenie, strzałki pokazują prerequisites; przy wejściu na węzeł: "wymagane X pull-ups × Y reps — masz Z, brakuje W" — czytelny dystans do celu elite

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Checklist przed Tradem + Compliance Rate w Statystykach**
   Przed zapisaniem każdego tradu wymuś przejście przez krótką checklistę (5–7 pól, edytowalnych przez użytkownika w ustawieniach): np. "Struktura rynku czytelna ✓ / Czekałem na potwierdzenie ✓ / R:R ≥ 2:1 ✓ / Brak ważnych newsów ✓ / Stan emocjonalny OK ✓". Każde pole to checkbox — można odznaczyć i zapisać trade z niepełną checklistą, ale system zapisuje % kompletności. W zakładce Statystyki tradingu dodaj tabelę: **Compliance 100% → osobny WR i avg R:R** vs **Compliance < 80% → osobny WR i avg R:R**. Oba wiersze aktualizowane w czasie rzeczywistym.
   *Dlaczego warto: Edgewonk ogłosił checklistę jako swój najchętniej cytowany feature. Różnica w winrate między tradem wziętym po pełnej checkliście a tradem impulsywnym wynosi typowo 20–35 punktów procentowych — mając własne dane za 60 dni, ta tabela eliminuje nadmiarowe ryzyko szybciej niż jakakolwiek reguła psychologiczna. Dla prop-tradera walczącego o funded account to różnica między zaliczeniem a resetem.*
   *Inspiracja: Edgewonk Setup Checklists*

2. **[Review] — Tagi Aktywności + Korelacja z Energią po 30 Dniach**
   W module Review, bezpośrednio pod suwakiem energii (1–10), dodaj siatkę 12 szybkich tagów aktywności (ikon 32×32px, single-tap toggle): 🏋️ Siłownia / 🧊 Zimny prysznic / 📈 Trading / 📚 Nauka / ☀️ Wyjście na słońce / 🧠 Medytacja / 🎮 Gaming > 2h / 📱 Social media > 2h / 🍺 Alkohol / 😴 Mało snu / 👥 Spotkanie towarzyskie / 🎵 Muzyka/relaks. Tagi zapisuj w nowej tabeli `review_activity_tags`. Po 30+ wpisach w zakładce Statystyki pokaż sekcję "Co wpływa na Twoją energię": lista tagów posortowana wg różnicy avg energii (dni z tagiem vs bez). Przykład: "🏋️ Siłownia: +2.1 | 📱 Social media > 2h: −1.8".
   *Dlaczego warto: Daylio zbudował lojalność milionów użytkowników właśnie na tej korelacji — jest to "aha moment", który sprawia że użytkownik nie może przestać uzupełniać dziennika, bo staje się ciekawy co jeszcze się okaże. Dla 19-latka budującego nawyki to pierwsze prawdziwe dane o sobie zamiast intuicji. Technicznie: tabela many-to-many między wpisami a tagami, 10 linii SQL do korelacji, jeden widok w Statystykach.*
   *Inspiracja: Daylio Activity Correlations*

3. **[Polski] — Streak Freeze Tokeny + Ocena Trudności Słowa (Again/Hard/Good/Easy)**
   Dwie zmiany w jednej paczce: (a) **Streak Freeze**: za każdy pełny tydzień (7×5 słów) użytkownik dostaje 1 token Freeze (max 2 w rezerwie). Baner "Streak: 🔥 14 dni | Freeze: 🧊×2" widoczny na górze modułu Polski i na Dashboardzie. Gdy nie dodasz słów w danym dniu, system automatycznie zużywa jeden Freeze i streak trwa — zero resetu. (b) **Ocena trudności po quizie**: zamiast jednego "OK" cztery przyciski: **Znowu** (wraca jutro) / **Trudne** (wraca za 2 dni) / **Dobre** (wraca za 7 dni) / **Łatwe** (wraca za 14 dni). Dane te uzupełniają istniejące SM-2 o precyzyjne calibrowanie interwałów per słowo.
   *Dlaczego warto: Duolingo zmierzył, że Streak Freeze redukuje churn o 21% u użytkowników zagrożonych utratą streaka. Reset po jednym zapomnianym dniu to najczęstszy powód porzucenia nawyku — nie brak motywacji, tylko poczucie "i tak już zepsute". Ocena trudności to zaś brakujące ogniwo SM-2 — bez niej algorytm nie może dostosować easiness_factor do Twoich konkretnych słabych punktów.*
   *Inspiracja: Duolingo Streak Freeze, Anki Again/Hard/Good/Easy*

4. **[Kalistenika] — Drzewo Umiejętności Elite (Muscle-up / Planche / Front Lever)**
   Dodaj nową zakładkę "Drzewo Umiejętności" w module Kalistenika. Wyświetl interaktywny SVG DAG z 5 węzłami-celami na górze: **Muscle-up**, **Planche**, **Front Lever**, **Handstand Push-up**, **Pistol Squat**. Każdy cel ma 4–6 węzłów-prerequisites poniżej (np. Muscle-up ← Pull-up ×10 + Dip ×15 + Negative muscle-up ×5). Kolor węzła: 🔴 zablokowany / 🟡 w trakcie / 🟢 odblokowany — automatycznie na podstawie logów sesji z Kalisteniki. Kliknięcie węzła: popup "Pull-up: masz 7 reps, potrzebujesz 10 — zostało ~3 sesje przy obecnym tempie". Drzewo wyłącznie CSS/SVG, zero zewnętrznych bibliotek.
   *Dlaczego warto: Calistree i Boostcamp zbudowały swoje core retention na tym jednym widoku. Kalistenika bez drzewa to logowanie w próżnię — nie ma oczywistej odpowiedzi na "po co te 6 sesji tygodniowo?". Drzewo nadaje każdej sesji konkretny cel hierarchiczny i sprawia, że postęp jest widoczny bez dokładania ciężarów (czego kalistenika z definicji nie oferuje). Dla 19-latka próbującego muscle-up to silniejsza motywacja niż jakikolwiek streak.*
   *Inspiracja: Calistree, Boostcamp*

5. **[Dashboard] — "Zapytaj swoje dane" — Claude Q&A po Polsku**
   Na dole Dashboardu dodaj małe pole input z placeholderem "Zapytaj o swoje statystyki...". Po wpisaniu pytania (np. "Ile słów nauczyłem się w maju?" / "Który dzień tygodnia mam najwyższą energię?" / "Ile zysku zrobiłem w ostatnich 30 dniach?") — wywołaj Claude API z system promptem zawierającym schemat bazy danych SQLite i ostatnie 90 dni danych w JSON. Claude zwraca gotową odpowiedź w 1–2 zdaniach po polsku. Odpowiedź pojawia się inline pod inputem bez nowego widoku. Cache w localStorage na 1h dla identycznych pytań.
   *Dlaczego warto: TradesViz AI Q&A to jeden z najwyżej ocenianych features ich platformy — zamiast klikać przez 5 ekranów filtrów, dostajesz odpowiedź w 3 sekundy. Przy rosnącej bazie danych (trading, słowa, treningi, wpisy dziennika) ręczne szukanie wzorców staje się coraz trudniejsze. Mając już Claude w projekcie (generowanie słów i podsumowania), koszt dodania Q&A to ~50 linii kodu + jeden nowy endpoint API.*
   *Inspiracja: TradesViz AI Chatbot, Notion AI*

---

## [01.06.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Tradervue** — przemysłowy standard dla stock/futures traderów; wyróżniający feature to "Best Exit Analysis" z wykresem MAE/MFE (maksymalny niekorzystny vs korzystny ruch na każdym tradzie) — pokazuje dosłownie ile procent ruchu zostało zmarnowane przez zbyt wczesne wyjście
- **Reflectly** — dziennik oparty na CBT i positive psychology; nie zbiera wolnego tekstu, tylko prowadzi przez sekwencję pytań naprowadzających po każdym wpisie — "Co konkretnie sprawiło, że czułeś X?" zamiast zostawić użytkownika z pustym polem
- **Progression App** — kalistenika; hall of fame "Personal Records" jako osobna zakładka: każde ćwiczenie z datą pobicia rekordu, ikoną nowego PR i podświetleniem w neonowym kolorze gdy rekord zostanie pobity podczas aktualnej sesji
- **Loop Habit Tracker** — statystyki dzienne rozbite na "najlepszą porę dnia" i "najlepszy dzień tygodnia" dla każdego nawyku — dane z całej historii, nie z ostatnich 7 dni — pozwalają dopasować nawyk do biologicznego rytmu zamiast do "po prostu rano"
- **Clozemaster Fluency Fast Track** — priorytetyzacja słownictwa wg częstotliwości użycia: top-1000 najczęstszych słów dostają czerwoną etykietę "kluczowe", słowa poza top-5000 — szarą "rzadkie"; użytkownik widzi natychmiast czy uczy się słów przydatnych czy ciekawostek leksykalnych
- **Notion Life OS (Areas of Life)** — cotygodniowy radar/pająk z 6 osiami życia (Zdrowie / Finanse / Nauka / Relacje / Praca / Rozrywka); każda oś to % tygodniowego celu — jeden widok zastępuje przeglądanie 6 modułów po kolei
- **Madbarz** — wbudowany timer odpoczynku z wibrotonowaniem między setami; po sesji jedna grafika z kołem: czas aktywny vs czas odpoczynku vs czas sesji — "39% czasu pracowałeś" jako konkretna metryka intensywności
- **Day One (Morning Pages)** — specjalny tryb "Morning Pages": wolny strumień świadomości 3 minuty po wstaniu, bez formatowania, bez promptów; funkcja "On This Day" pokazuje wpis sprzed dokładnie roku i 2 lat automatycznie na górze każdego nowego wpisu

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Wykres MAE/MFE i "% Przechwyconego Ruchu"**
   Dla każdego zapisanego tradu przechowuj dwa dodatkowe pola: `mae_pips` (maksymalne obsunięcie zanim trade poszedł w twoją stronę) i `mfe_pips` (maksymalny ruch w twoją stronę zanim zamknąłeś). Oblicz `captured_pct = actual_gain / mfe * 100`. W statystykach dodaj scatter plot: oś X = MFE w pipsach/punktach, oś Y = ile % tego ruchu zostało zrealizowane — idealne wyjścia grupują się przy 70–90% w prawym górnym rogu. Pod wykresem jedna liczba: "Średnio kapturujesz **X%** dostępnego ruchu". Jeśli X < 50%, problem leży w zarządzaniu pozycją, nie w selekcji setupów.
   *Dlaczego warto: Tradervue zbudował "Best Exit Analysis" jako flagship feature płatnego planu — doświadczeni traderzy twierdzą, że ten jeden widok pokazał im gdzie tracą pieniądze mimo dodatniego P&L. Dla prop-tradera na FTMO/TopStep różnica między 45% a 70% captured move to różnica między przejściem a resetem konta. Technicznie: 2 nowe pola w tabeli trades, 1 endpoint do obliczeń, 1 SVG scatter plot.*
   *Inspiracja: Tradervue Best Exit Analysis*

2. **[Kalistenika] — Hall of Fame Rekordów z Datami**
   Dodaj zakładkę "PRy" (Personal Records) w module Kalistenika. Tabela z wierszami dla każdego ćwiczenia: **Ćwiczenie | Rekord (max reps × sets) | Data pobicia | Poprzedni rekord**. Podczas zapisywania sesji — jeśli nowy wynik bije rekord, automatycznie wyświetl baner "🏆 NOWY REKORD! Pull-up: 12 reps (poprzednio: 10, 14.03.2026)" z animacją neonowego bordera przez 3 sekundy. Na stronie głównej Kalisteniki przy każdym ćwiczeniu mała ikona 🏆 jeśli PR był bity w ciągu ostatnich 14 dni. Historia PRów dostępna w tooltipie: kliknij ćwiczenie → mini wykres liniowy rekordu w czasie.
   *Dlaczego warto: W kalistenice nie ma talerzy do dokładania, więc rekordów nie widać gołym okiem jak na siłowni — bez dedykowanego widoku trening pull-upów przez 3 miesiące wygląda jak stagnacja, choć rekordy są bite regularnie. Progression App i Boostcamp opierają retencję użytkowników właśnie na "PR moment" — chwili gdy baner pojawia się na ekranie. To najbardziej czytelny dowód postępu siłowego dla 19-latka budującego bazę kalistenyczną.*
   *Inspiracja: Progression App, Boostcamp*

3. **[Statystyki] — Tygodniowy Radar Life Balance (6 osi)**
   Dodaj zakładkę "Balans" z interaktywnym SVG radar chart (hexagon). 6 osi, każda 0–100%: **Kalistenika** (sesje w tygodniu / 6), **Polski** (słowa dodane / 35), **Trading** (sesje zalogowane / 5), **Zadania** (ukończone HIGH/MEDIUM / zaplanowane), **Dziennik** (wieczorne wpisy / 7), **Energia** (avg z wpisów / 10, skalowane do 100%). Wypełniony hexagon = idealny tydzień. Zaciemniona partia = zaniedbany obszar. Hover na wierzchołku: tooltip ze szczegółami. Pod radarem auto-generowany tekst: "Ten tydzień: mocne — Trading i Kalistenika. Wymaga uwagi — Polski (43%)."
   *Dlaczego warto: Notion Life OS templates stały się popularne dokładnie przez ten widok — ludzie orientują się, że maksymalizują jeden obszar życia kosztem innych. Przy 6 modułach sprawdzanie każdego osobno zajmuje 3 minuty; radar daje odpowiedź "co zaniedbałem?" w 2 sekundy. Neonowy hexagon na ciemnym tle #080F0A to też jeden z najlepiej wyglądających elementów UI dla dark glassmorphism — zero zewnętrznych bibliotek, czyste SVG.*
   *Inspiracja: Notion Life OS Areas of Life, Obsidian Life OS template*

4. **[Dashboard] — "Poranny Briefing" — Karta Dnia na Starcie**
   Przy pierwszym otwarciu Dashboardu każdego dnia przed godziną 12:00 wyświetl collapsible card na samej górze, nad sekcją nawyków. Karta zawiera 4 linijki: 🏋️ **Trening dziś**: [typ sesji z 6-dniowego planu, np. "Pull — plecy/biceps"] | 📚 **Słowa do dodania**: [X/5 lub "Cel spełniony ✅"] | 📋 **Zadania HIGH na dziś**: [1–3 zadania HIGH priority z modułu Zadania] | 🔋 **Wczorajsza energia**: [X/10 z wieczornego wpisu]. Karta chowa się po kliknięciu lub po 15 minutach. Nie generuje się po południu — tylko przy porannym otwarciu.
   *Dlaczego warto: Notion Life OS i każdy poważny system produktywności startuje od "morning briefing" integrującego wszystkie obszary przed pierwszym działaniem. Teraz żeby wiedzieć co masz na dziś, musisz wejść do 4 różnych modułów — ta karta eliminuje tę potrzebę w 5 sekund. Technicznie: 4 proste query do istniejących tabel + localStorage z datą ostatniego wyświetlenia. Koszt implementacji to może 2 godziny.*
   *Inspiracja: Notion Life OS Morning Dashboard, Day One Morning Pages*

5. **[Review] — Pytanie Naprowadzające Claude'a po Zapisaniu Wpisu**
   Po kliknięciu "Zapisz" w module Review i wygenerowaniu AI summary — jeśli pole "Co poprawić" ma mniej niż 40 znaków lub zawiera słowa-wytrychy ("nic", "ok", "dobrze", "normalnie", "trochę") — Claude automatycznie wysyła jedno krótkie pytanie naprowadzające wyświetlane jako małe pole pod podsumowaniem: np. "Wymieniasz _[tekst z pola]_ — co **konkretnie** możesz zrobić jutro żeby to zmienić? Jedna rzecz, możliwa do wykonania." Użytkownik może odpowiedzieć (odpowiedź dołącza się do wpisu w bazie) lub kliknąć "Pomiń". Brak wieloturowej konwersacji — jedno pytanie, jedna opcjonalna odpowiedź.
   *Dlaczego warto: Reflectly zbudował lojalność na tym mechanizmie — wymuszanie jednego głębokiego pytania przemienia powierzchowny wpis ("za mało spałem") w konkretny plan działania ("jutro śpię o 23:00 i wyłączam telefon o 22:30"). Obecna aplikacja zbiera AI summary, ale nie prowadzi do refleksji — wpis zostaje odczytany i zamknięty bez zmiany zachowania. Day One ma analogiczny feature "Go Deeper" który jest najwyżej oceniany przez użytkowników. Technicznie: detekcja krótkiego/generycznego tekstu + jedno dodatkowe wywołanie Claude API (< 100 tokenów prompt).*
   *Inspiracja: Reflectly CBT Prompts, Day One "Go Deeper" AI*

---

## [08.06.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **TradesViz** — nowa funkcja Prop Firm Compliance Center (2026): osobny panel dla FTMO/TopStep/Apex z aktualnym drawdownem vs limitem, alertem gdy przekroczysz 80% dziennej straty i prognozą "pozostało X dni do końca wyzwania" — eliminuje ręczne monitorowanie reguł w osobnym arkuszu
- **Loop Habit Tracker** — analiza "Kiedy robisz nawyki": heatmapa % completion per dzień tygodnia z całej historii (nie z ostatnich 7 dni); wyraźnie widać że piątki i niedziele to statystyczne dołki dla większości nawyków — informacja do optymalizacji planu, nie powód do wyrzutów sumienia
- **Day One** — "On This Day": przy otwieraniu dziennika automatycznie pojawia się wpis z dokładnie rok temu i 2 lata temu — jeden z najwyżej ocenianych feature'ów w recenzjach App Store 2025, bo wywołuje refleksję longitudinalną bez żadnego wysiłku użytkownika
- **Babbel** — nauka oparta na poziomach CEFR (A1/A2/B1/B2): każde słowo i każda lekcja są tagowane poziomem, użytkownik widzi "Osiągnięto poziom A2" jako konkretny milestone zamiast abstrakcyjnej liczby słów; psychologicznie silniejszy punkt kontrolny niż surowy licznik
- **Streaks** (iOS) — "All-time best" wyświetlony tuż obok "Current streak" z mini-wykresem poprzednich streaków (np. "Twoje rekordy: 47d, 31d, 28d — obecny: 12d"); historyczny kontekst motywuje inaczej niż sam licznik, bo pokazuje że jesteś zdolny do dłuższych serii
- **Clozemaster Radio** — tryb pasywnej nauki: zdania w języku docelowym czytane głosem, po 3 sekundach tłumaczenie, hands-free; 15 minut "radia" podczas biegania lub spaceru = ok. 50 zdań kontekstowych bez patrzenia w ekran — dociera do grupy użytkowników której flashcardy nie wciągają
- **Reflectly** — widok "Emotional Patterns": po 30+ wpisach aplikacja pokazuje wykresy nastrojów według dnia tygodnia i godziny dnia — "Twoja piątkowa energia jest o 1.8 wyższa niż środowa" bez żadnej dodatkowej akcji ze strony użytkownika; korelacje które sam byś nie zobaczył
- **Finch** — aplikacja wraca łagodnie po przerwie: brak powiadomień "zawiodłeś", zamiast tego ptak jest smutny ale wita cię bez kary po powrocie — kluczowa różnica psychologiczna dla użytkowników z anxiety przed "zniszczonym" streakiem

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Panel "Firma Prop na Żywo" z Paskiem Compliance i Alertami**
   W Trading Journal dodaj collapsible sekcję "Firma Prop" konfigurowaną jednorazowo: użytkownik wybiera firmę z listy (FTMO / TopStep / Apex / Własne reguły) i wpisuje: wielkość konta, max dzienna strata w USD, max drawdown całkowity. System automatycznie sumuje dzisiejsze trade'y i pokazuje: pasek od 0% do 100% wypełnienia dziennego limitu straty (zielony 0–60%, żółty 60–85%, czerwony 85–100% z animacją pulsowania), jedną linijkę "Dziś: −$187 z $500 limitu (37.4%)" i drugą "Drawdown: −$1.240 z $3.000 max (41.3%)". Dane resetują się o północy automatycznie. Gdy dzisiejszy P&L przekroczy 90% limitu — wyświetl modal: "⚠️ Zbliżasz się do limitu dziennej straty FTMO. Pozostało $50. Czy na pewno chcesz otworzyć nowy trade?" z przyciskami Kontynuuj / Zatrzymaj sesję.
   *Dlaczego warto: TradesViz wprowadził Prop Firm Compliance Center w 2026 jako jeden z najszybciej adoptowanych feature'ów — prop-traderzy tracą funded account przez naruszenie reguł w emocjonalnym momencie, nie przez złą strategię. Masz już moduł śledzenia firm prop, ale brak live compliance powoduje że ryzyko musisz monitorować w głowie podczas każdego trade'u — to generuje dodatkowy stres i błędy kognitywne dokładnie wtedy gdy najmniej możesz sobie na nie pozwolić. Technicznie: jedno pole konfiguracyjne w LocalStorage + jeden SUM query z filtrów po dacie.*
   *Inspiracja: TradesViz Prop Firm Compliance Center*

2. **[Review] — "Tego Dnia w Zeszłym Roku" — Automatyczna Karta Retrospekcyjna**
   Na początku strony Review, przed polami do wypełnienia, wykonaj SELECT do bazy szukający wpisów z datą ±1 dzień od (today − 365 dni). Jeśli wpis istnieje — wyświetl collapsed card z nagłówkiem "📅 Rok temu (8 czerwca 2025):" + pierwszych 80 znaków z pola "co poszło dobrze" + ocena energii "🔋 7/10". Kliknięcie rozwiją pełny wpis w trybie tylko do odczytu. Karta chowa się automatycznie po 90 sekundach lub gdy użytkownik kliknie pierwsze pole formularza. Brak wpisu sprzed roku = brak karty, bez żadnych komunikatów zastępczych ani pustych placeholderów.
   *Dlaczego warto: Day One "On This Day" jest najwyżej ocenianą funkcją aplikacji według recenzji App Store — użytkownicy opisują ją jako "główny powód dla którego piszę codziennie". Konfrontacja z własnym tekstem sprzed roku ujawnia wzrost i regresje bez żadnej analizy — działa silniej niż jakikolwiek wykres progresji. Dla kogoś w wieku 19 lat budującego się od zera: za rok ta karta pokaże konkretną różnicę między dwiema wersjami siebie w jednym widoku. Technicznie: jeden dodatkowy SQL query przy ładowaniu strony Review, zero nowych tabel, ~15 linii kodu.*
   *Inspiracja: Day One "On This Day"*

3. **[Polski] — Tagi Poziomów CEFR (A1/A2/B1/B2) dla Słów + Progress Bar przez Poziomy**
   Rozszerz prompt Claude'a generującego nowe słowa o jedno pole: `"cefr_level": "A2"`. Dodaj kolumnę `cefr_level` do tabeli słów w Prisma — migracja jednolinijkowa. Na stronie Polski zastąp jedną dużą liczbę "Nauczyłeś się 127 słów" czterema kolorowymi chipami: 🟢 A1: 43 | 🔵 A2: 61 | 🟡 B1: 18 | 🔴 B2: 5. Nad chipami dodaj pasek postępu: "Droga do B1: opanuj 100 słów A2 — masz 61, brakuje 39 (61%)". W quizie słowa A1/A2 dostają wyższy priorytet od SM-2 niż B1/B2 — uczeń najpierw solidnie zapamiętuje fundament. Na Dashboardzie badge zmień z "5/5 słów" na "A2: 61% opanowane". Mastered toggle przy słowie automatycznie zalicza je do poziomu i aktualizuje pasek.
   *Dlaczego warto: Babbel i Duolingo oparły cały system motywacji na CEFR — bo "nauczyłem się 200 słów" nie mówi nic o tym czy jesteś gotowy rozmawiać. Obecnie cel "5 nowych słów dziennie" może generować losowy mix A1 i C1 bez żadnej logiki — uczysz się słowa "abstrakcja" zanim solidnie znasz "dom". Milestone "Osiągnąłem A2" jest kilkanaście razy bardziej motywujący niż "mam 143 słowa w bazie" bo ma znaczenie w realnym świecie. Claude generuje słowa i tak — dodanie jednego pola do promptu kosztuje dosłownie 0 dodatkowych tokenów.*
   *Inspiracja: Babbel CEFR progression, Duolingo level milestones*

4. **[Statystyki] — "Twój Optymalny Dzień Tygodnia" per Nawyk — 7 Mini-Słupków**
   W zakładce Statystyki, pod obecną siatką 7-dniową, dodaj sekcję "Wzorce tygodniowe". Dla każdego z 3 nawyków (sport / journaling / tiktok<30min) oblicz % completion per dzień tygodnia z CAŁEJ historii danych, nie z ostatnich 7 dni — query: `SELECT strftime('%w', date) as dow, AVG(CASE WHEN completed THEN 1.0 ELSE 0.0 END) FROM habits GROUP BY dow`. Wyświetl jako 7 pionowych mini-słupków (Pn–Nd) wypełnionych neonową zielenią proporcjonalnie do procentu — słupek 91% jest prawie pełny, 48% do połowy. Pod każdym nawykiem dwie linijki tekstu: "✅ Najlepsze: wt, śr (89%)" i "⚠️ Najtrudniejsze: pt, nd (54%)". Cała sekcja: ~20 linii SQL + 7 div-elementów Tailwind — zero zewnętrznych bibliotek.
   *Dlaczego warto: Loop Habit Tracker oferuje tę analizę od lat i jest to jeden z najczęściej cytowanych feature'ów przez zaawansowanych użytkowników. Wielu ludzi ma nawyk który "nie działa" w piątek — nie z braku motywacji, ale bo piątek to biologicznie inny dzień. Mając te dane możesz świadomie zaplanować "piątkową wersję" nawyku (krótszą, lżejszą) albo zaakceptować ~60% compliance i nie traktować tego jako porażki. Bez tej analizy nie wiadomo nawet gdzie jest systemowy problem, a streak wygląda jak przypadkowy ciąg sukcesów i porażek.*
   *Inspiracja: Loop Habit Tracker day-of-week analysis*

5. **[Kalistenika] — Automatyczny Timer Odpoczynku Między Setami + Wskaźnik Intensywności Sesji**
   W widoku logowania sesji, po kliknięciu "Zapisz set", automatycznie uruchom stoper widoczny na górze ekranu odliczający czas od momentu zapisu. Kolor tła stopera zmienia się co 30 sekund: 0–60s czerwony (za krótki odpoczynek), 60–120s zielony (optymalny), 120s+ żółty (długi). Przycisk "Dodaj następny set" jest widoczny przez cały czas — timer to podpowiedź, nie blokada. Na górze sesji wyświetl pasek zbiorczy: "Sesja: 14 min aktywnych | 21 min odpoczynku". Po zakończeniu sesji ("Zakończ sesję") podsumowanie zawiera jeden nowy wskaźnik: "Intensywność: 40% (czas ćwiczenia / czas łączny)" z krótkim benchmarkiem: <30% = luźny / 30–50% = umiarkowany / 50%+ = intensywny.
   *Dlaczego warto: Bez timera czas odpoczynku jest przypadkowy — często 5 minut zamiast 90 sekund, co niszczy adaptację mięśniową i sprawia że sesja trwa 90 minut zamiast 45. Madbarz i Boostcamp mają timer od lat jako jeden z podstawowych feature'ów — brak go w Kalistenice jest zauważalny już po pierwszej sesji i skutkuje prowadzeniem treningów z aplikacją Stoper otwartą obok. Wskaźnik intensywności po sesji daje obiektywne porównanie "ten trening był cięższy od poprzedniego" bez subiektywnej oceny RPE — prosta liczba zastępuje 5 minut refleksji. Technicznie: localStorage przechowuje `setLoggedAt` timestamp, stoper to setInterval w React, intensywność to jedno dzielenie przy zapisie sesji.*
   *Inspiracja: Madbarz rest timer + active/rest session analytics*

---

## [15.06.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Habitica** — drużynowe questy: gdy jeden gracz nie zrealizuje Daily, cały party traci HP — silniejsza motywacja niż jakiekolwiek powiadomienie push; awatar z RPG leveling system; pixel art estetyka odpycha dorosłych po kilku tygodniach i to jest największa słabość
- **Duolingo** — tygodniowe ligi XP (30 osób, live-ranking) powodują 15% więcej ukończonych lekcji; speakingowe ćwiczenia z postaciami gamifikowane XP goals za dłuższe odpowiedzi; brak głębi retencji — dobry na nawyk, słaby na zapamiętywanie
- **Edgewonk** — "Alternative Strategy Testing": symuluje co byś zarobił stosując INNE zasady wyjścia (np. TP 3R zamiast 2R, trailing stop) na twoich historycznych tradach — wynik w USD i WR%; "Mentor Mode": link tylko do odczytu dziennika dla coacha; ciemny interfejs, $197/rok
- **TradesViz** — Seasonality Screener (2026): heatmapa wyników miesięcznych dla tysięcy instrumentów; widać od razu że Nasdaq historycznie ma najgorszy sierpień i najlepszy styczeń; 600+ widgetów drag-and-drop; AI chatbot Q&A na własnych danych
- **Anki (FSRS-6)** — panel statystyk po każdej sesji: retention rate %, review streak, average daily reviews, lista najtrudniejszych kart; FSRS-6 wyszedł w 2025, trenowany na 700 mln recenzji od 20 tys. użytkowników
- **Daylio** — logowanie nastroju wielokrotnie w ciągu dnia (nie tylko raz wieczorem); po 90+ wpisach korelacja godziny z energią automatyczna — "twoje południe jest o 1.4 wyższe niż poranek"; custom nastroje z własnym kolorem i emoji
- **Simple Calisthenics / Progression App** — treningi podzielone na fazy: Adaptacja (2 tyg) → Hipertrofia (3 tyg) → Siła (2 tyg) → Deload (1 tydz); aplikacja sugeruje zakresy powtórzeń dla aktualnej fazy — bez tego użytkownik wchodzi w stagnację po 2 miesiącach
- **Day One** — "Morning Pages": jeden textarea, 3-minutowy countdown, strumień świadomości bez struktury zaraz po przebudzeniu; przechowywany osobno od wieczornych wpisów; "On This Day" pojawia się automatycznie jako karta na górze — najwyżej oceniany feature wg recenzji App Store

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Symulator "Co Gdyby?" — Testuj Inne Zasady Wyjścia na Swoich Danych**
   W zakładce Statystyki tradingu dodaj sekcję "Symulator wyjść". Dwa suwaki: "Alternatywny TP (+/- X pipsów od entry)" i "Trailing Stop (Y pipsów za szczytem)". Po ustawieniu parametrów system przelicza WSZYSTKIE historyczne trade'y z tych zasad i natychmiast pokazuje: łączna zmiana P&L w USD, nowy WR%, nowe avg R:R. Przykładowy wynik: "Gdybyś zamknął każdy trade 20 pipsów wcześniej: +$1.840 do P&L, WR wzrósłby z 54% do 61%". Wynik aktualizuje się w czasie rzeczywistym przy ruchu suwaka — zero dodatkowych API, wszystkie dane lokalne.
   *Dlaczego warto: Edgewonk Alternative Strategy Testing to jeden z ich najmniej kopiowanych a najwyżej cenionych feature'ów — bo wymaga danych w ustrukturyzowanej formie którą tylko dedykowany dziennik posiada. Dla prop-tradera pytanie "czy mam dobry setup ale złe wyjście?" może pozostawać bez odpowiedzi przez rok; 2 minuty w symulatorze na własnych 60 trade'ach daje konkretną liczbę. Technicznie: wszystkie pola (entry, SL, TP, actual P&L) już są w bazie; symulacja to jedno przeliczenie w JS na istniejącym zbiorze — zero nowych tabel, zero nowych API calls.*
   *Inspiracja: Edgewonk Alternative Strategy Testing*

2. **[Kalistenika] — Automatyczna Periodyzacja 8-Tygodniowa z Banerem Aktualnej Fazy**
   W ustawieniach Kalisteniki dodaj datę startu cyklu. Definiuj fazy w kodzie: Tyg 1–3 "Baza" (3×12–15 reps), Tyg 4–6 "Siła" (4×5–8 reps, wolne tempo 3-0-1), Tyg 7 "Peak" (3×max reps), Tyg 8 "Deload" (2×10 w 60% intensywności). Na górze strony Kalisteniki stały baner: "Tydzień 5/8 — Faza Siły 💪 Cel: 4×5–8 reps". Przy logowaniu sesji: zielona ramka wokół wartości w prawidłowym zakresie dla tej fazy, czerwona jeśli za dużo lub za mało. Po 8 tygodniach automatyczny modal z podsumowaniem: "Zakończono cykl. PRy pobite: 4 ćwiczenia. Następny cykl z +1 rep jako bazą?"
   *Dlaczego warto: Bez periodyzacji trening kalisteniczny łatwo wchodzi w stagnację — 3×12 przez 6 miesięcy bez zmiany bodźca przestaje dawać efekty, ale aplikacja nie daje żadnego sygnału że coś jest nie tak. Simple Calisthenics i Progression App opierają cały model progresji na fazach: adaptacja mięśniowa wymaga systematycznej zmiany bodźca, nie tylko "więcej powtórzeń". Dla 19-latka bez trenera to zastępuje wiedzę którą musieliby czytać godzinami w artykułach o periodyzacji — aplikacja mówi sama "idź w deload" zamiast trenować do przetrenowania.*
   *Inspiracja: Simple Calisthenics, Progression App*

3. **[Polski] — Panel Statystyk Nauki: Retention Rate + Najtrudniejsze Słowa + Sprawność Tygodniowa**
   Dodaj zakładkę "Statystyki" w module Polski. Cztery bloki: (a) **Retention Rate** — wielka neonowa cyfra "78%" obliczona jako % poprawnych odpowiedzi z ostatnich 30 dni quiz-sesji; (b) **Mini-sparkline 30 dni** — słupki z liczbą powtórzonych słów dziennie, szare gdzie brak sesji; (c) **Najtrudniejsze 5 słów** — lista słów z najwyższą liczbą błędnych odpowiedzi + przycisk "Przejdź do quizu tylko z nimi"; (d) **Sprawność tygodniowa** — "5/7 dni z quizem ten tydzień" jako pasek postępu. Brak tych metryk = nauka w ciemno.
   *Dlaczego warto: Anki Stats page to jeden z powodów dla których zaawansowani użytkownicy nie migrują do prostszych narzędzi — liczby mówią czy algorytm faktycznie działa. Obecny moduł Polski zbiera dane do SM-2 ale nie prezentuje żadnych metryk skuteczności: można codziennie klikać quiz i nigdy nie wiedzieć że retention rate wynosi 42% (cała nauka zmarnowana). "Najtrudniejsze słowa" eliminują losowość sesji powtórkowej — klikasz przycisk i ćwiczysz dokładnie te słowa które wymagają pracy. Technicznie: dwa proste query do tabeli quiz_results, jeden komponent React.*
   *Inspiracja: Anki Statistics Page*

4. **[Dashboard] — Historia Streaków: Rekordy + Mini-Wykres Przeszłych Serii**
   Bezpośrednio pod obecnym wskaźnikiem "🔥 12-day streak" dla każdego nawyku dodaj drugą linię: "Rekordy: 47d · 31d · 28d" (3 najdłuższe zakończone serie) oraz mini-wykres SVG (80×20px) z pionowymi słupkami proporcjonalnymi do długości — chronologicznie, aktualny streak jako pulsujący słupek po prawej. Kliknięcie w mini-wykres otwiera modal z pełną historią streaków (data start, data koniec, długość w dniach).
   *Dlaczego warto: Streaks (iOS) pokazuje tę informację jako standard i jest jednym z najczęściej chwalonych designów w kategorii habit trackers. Psychologicznie kluczowe: kiedy po przerwaniu 3-dniowego streaka widzisz że historycznie robiłeś 47 dni — to dowód zdolności, nie klęska; czyni też obecną serię 12-dniową zrozumiałą w kontekście czy to dobra passa czy słaba. Bez historii jeden zły tydzień może wyglądać jak brak możliwości mimo że dane mówią coś innego. Technicznie: query po tabeli habits z algorytmem obliczania streaków (max 25 linii SQL), wynik cachowany na czas sesji.*
   *Inspiracja: Streaks App (iOS) — All-Time Best Streak Display*

5. **[Review] — Tryb Poranny: 3 Minuty Strumienia Świadomości przed Południem**
   Dodaj na stronie Review drugi formularz wejścia zależny od pory dnia: "Poranek" widoczny 5:00–11:59, "Wieczór" widoczny 17:00–23:59. Tryb Poranek = jeden duży textarea z placeholderem "Napisz przez 3 minuty — cokolwiek. Bez struktury, bez oceniania." + countdown timer 3:00 który startuje przy pierwszym keystroke. Zero pól strukturalnych, zero AI summary. Jeden przycisk "Zapisz". Wpis trafia do bazy z `entry_type = 'morning'`, widoczny w archiwum jako inaczej oznaczony kafelek. Filtrowanie archiwum po typie: Wszystkie / Poranki / Wieczory.
   *Dlaczego warto: Day One "Morning Pages" jest opisywany przez użytkowników jako feature który "zmienił ich poranek" — 3 minuty strumienia świadomości bez oceny czyści głowę przed planowaniem dnia skuteczniej niż lista zadań. Obecna aplikacja ma wyłącznie wieczorny dziennik — jeśli rano pojawi się ważna myśl, lęk przed czymś albo plan który trzeba uchwycić, nie ma gdzie tego zapisać w kontekście self-improvement. Technicznie: nowa kolumna `entry_type ENUM('morning', 'evening')` w tabeli Review, warunkowy routing po godzinie, jeden formularz bez wywoływania Claude API — minimalna zmiana schematu, maksymalny efekt użytkowy.*
   *Inspiracja: Day One Morning Pages*

---

## [22.06.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Habitica** — party quests gdzie porażka jednego gracza zadaje obrażenia całej drużynie; awatar RPG leveluje w 0.5s po każdym check-offie; pixel-art estetyka zniechęca dorosłych po kilku tygodniach, ale mechanizm natychmiastowej nagrody dopaminowej to najlepiej przebadany pattern w hab-tech
- **Duolingo** — tygodniowe ligi XP (30 osób, live-ranking); wbudowane ćwiczenia speaking z gamifikowanymi XP goals; silny nawyk, słaba retencja długoterminowa; przyciski Again/Hard/Good/Easy w wersji premium Practice Hub
- **Anki (FSRS-6)** — panel statystyk po każdej sesji: retention rate %, najtrudniejsze karty, average daily reviews; FSRS-6 trenowany na 700 mln recenzji, redukuje liczbę powtórek o 20–30% vs SM-2
- **Clozemaster** — "Fluency Fast Track" priorytetyzuje top-1000 najczęstszych słów; tryb Radio: zdania czytane głosem, tłumaczenie po 3 sekundach — pasywna nauka hands-free; pogrupowanie słów wg częstotliwości użycia (top-1000 / top-5000 / rzadkie)
- **Edgewonk** — "Alternative Strategy Testing" symuluje wynik alternatywnych zasad wyjścia na historycznych tradach; analiza wyników wg godziny dnia i dnia tygodnia; Tiltmeter jako wizualny wskaźnik stanu emocjonalnego
- **TradesViz** — Seasonality Screener 2026: heatmapa wyników tygodniowo-miesięcznych per instrument; AI chatbot Q&A na własnych danych; 600+ widgetów drag-and-drop
- **Daylio** — logowanie nastroju wielokrotnie w ciągu dnia; automatyczna korelacja aktywności z energią po 30+ wpisach bez dodatkowego wysiłku użytkownika; custom nastroje z własnym emoji i kolorem
- **Simple Calisthenics / Progression App** — zdefiniowane fazy cyklu (Adaptacja → Hipertrofia → Siła → Deload); aplikacja sugeruje zakres powtórzeń dla aktualnej fazy i automatycznie sygnalizuje przejście między fazami

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Heatmapa Wyników wg Godziny i Dnia Tygodnia**
   W zakładce Statystyki tradingu dodaj widok "Kiedy handluję najlepiej?". Wyświetl siatkę: kolumny = Pn–Pt, wiersze = godziny (np. 09:00–22:00 co godzinę). Kolor każdej komórki = winrate w tej godzinie+dzień (zielony ≥60%, żółty 40–59%, czerwony <40%, szary = brak danych). Query: `SELECT strftime('%H', opened_at) as hour, strftime('%w', opened_at) as dow, AVG(CASE WHEN pnl > 0 THEN 1.0 ELSE 0.0 END) as wr FROM trades GROUP BY hour, dow`. Pod heatmapą dwie linijki podsumowania: "✅ Twoja najlepsza pora: wtorek 14:00–16:00 (71% WR)" i "⚠️ Unikaj: piątek po 18:00 (23% WR, 6 tradów)". Całość: ~25 linii SQL + CSS Grid bez zewnętrznych bibliotek.
   *Dlaczego warto: Edgewonk i TradesViz mają tę analizę jako jeden z najchętniej używanych widoków — doświadczeni traderzy twierdzą, że odkrycie "moje poniedziałkowe trade'y mają WR 28%" eliminuje jedną klasę błędów bez żadnej zmiany strategii. Dla prop-tradera na FTMO handlowanie w złej porze dnia może być różnicą między zaliczeniem a resetem. Żaden poprzedni raport nie zaproponował tej analizy dla Trading Journal — dane z entry timestamp już są w bazie, koszt implementacji to dosłownie 30 linii kodu.*
   *Inspiracja: Edgewonk time-of-day analytics, TradesViz Seasonality Screener*

2. **[Dashboard] — Automatyczne Korelacje Cross-Modułowe: "Co napędza Twoją wydajność?"**
   Raz w tygodniu (niedziela 23:00) uruchom w tle query obliczające korelacje między modułami za ostatnie 90 dni i zapisz wyniki do tabeli `cross_correlations`. Trzy konkretne obliczenia: (a) avg `energy_rating` z Review w dniach z zalogowaną sesją kalisteniku vs bez; (b) winrate tradingowy w dniach po treningu vs bez; (c) liczba słów quizowanych w dniach z `energy_rating ≥ 7` vs ≤ 4. Na Dashboardzie, poniżej siatki nawyków, stały collapsible card "📊 Twoje wzorce (ostatnie 90 dni)" z max 3 automatycznie generowanymi zdaniami: "🏋️ W dni po treningu Twoja energia jest wyższa o **+2.1 pkt** (7.8 vs 5.7) | 📈 Winrate po treningu: **61%** vs 47% bez treningu | 📚 Uczysz się **2.3× więcej słów** gdy energia ≥ 7". Card odświeża się co tydzień.
   *Dlaczego warto: Daylio zbudował lojalność milionów na autokorelacjach — ale tylko między nastrój a aktywności z ręcznych tagów. Life Dashboard ma PEŁNE dane z 6 modułów i może robić korelacje których żadna aplikacja na rynku nie oferuje (trading ↔ trening ↔ energia ↔ nauka). To jest realny "second brain" — widok który mówi ci czy Twoja ranna rutyna robi cokolwiek mierzalnego. Technicznie: 3 SQL query z AVG + GROUP BY, wyniki w osobnej tabeli, jeden komponent React — zero zewnętrznych bibliotek, zero API calls.*
   *Inspiracja: Daylio Activity Correlations, Notion Life OS "Areas" cross-reference*

3. **[Życie Calendar] — Klikalne Komórki z Mini-Profilem Dnia**
   W obecnym kalendarzu życia (siatka od 30.08.2006 do 30.08.2056) załaduj przy inicializacji dane ze wszystkich modułów dla dni z istniejącymi rekordami (JOIN po dacie). Każda komórka z danymi zmienia kolor na jaśniejszy neonowy gradient zamiast jednorodnej szarości. Kliknięcie w komórkę otwiera slide-in panel (nie modal, żeby nie zasłaniać siatki) z mini-profilem dnia: 🔋 Energia: 7/10 | 🏋️ Trening: Pull | 📚 Słowa: +5 | 📈 Trading: +$230 | 📝 pierwsze 60 znaków z Review. Dni bez danych pokazują tylko datę. Siatka przyszłości pozostaje szara i nieinteraktywna.
   *Dlaczego warto: Obecny Life Calendar to piękny ale martwy widok — nikt nie wraca do niego po pierwszym "wow". Dodanie danych przekształca go w najpiękniejszą nawigację po własnej historii: zamiast scrollować archiwum Review, klikasz w siatce i widzisz pełny dzień. Żadna aplikacja na rynku nie oferuje tej kombinacji — wizualnego grid lat-życia z live danymi per dzień. Technicznie: JOIN po `date::DATE` między tabelami Review, TrainingSession, VocabWords, Trade — jeden denormalizowany query przy ładowaniu strony, wyniki cachowane w localStorage per tydzień.*
   *Inspiracja: Daylio "Year in Pixels", Day One "On This Day", Notion daily notes*

4. **[Dashboard] — Tygodniowy Wynik Punktowy 0–100 z Literową Oceną**
   Oblicz każdej niedzieli (lub na żądanie kliknięciem) jedną liczbę agregującą cały tydzień: **Habits** 30pkt (3 nawyki × 7 dni proporcjonalnie), **Kalistenika** 20pkt (sesje/6), **Polski** 20pkt (słowa/35), **Review** 15pkt (wpisy/7), **Trading zalogowany** 15pkt (min. 1 sesja lub trade). Suma 0–100 przeliczona na ocenę: 90–100 = A+, 80–89 = A, 70–79 = B, 60–69 = C, <60 = D. W prawym górnym rogu Dashboardu stały widget: duża neonowa cyfra "83" z literą "A" obok. Pod liczbą: "vs zeszły tydzień: +7 pkt 📈". Historia wyników tygodniowych zapisywana do tabeli `weekly_scores`, widoczna w Statystykach jako wykres liniowy z zaznaczonymi minimum i maximum.
   *Dlaczego warto: Żaden z poprzednich raportów nie zaproponował agregacji tygodniowej do jednej liczby — a to jest dokładnie to co Habitica robi z level-up po dobrym tygodniu i co sprawia że zaangażowanie nie gaśnie po miesiącu. Dla osoby żonglującej 6 modułami jednocześnie, single metric zastępuje oglądanie 6 osobnych progress barów. Porównanie "week-over-week" jest też silniejszym motywatorem niż streak bo nie zeruje się po złym dniu — widać trend w górę mimo jednej słabej sesji. Technicznie: 6 query do istniejących tabel, jeden zapis do nowej tabeli weekly_scores — < 2h implementacji.*
   *Inspiracja: Habitica XP leveling, Loop Habit Tracker "Habit Strength %", Finch weekly progress*

5. **[Polski] — Wymowa Słów przez Web Speech API (Audio w Quizie, Zero Kosztów)**
   W trybie quiz, przy każdej fiszce, dodaj ikonę 🔊 obok słowa. Kliknięcie uruchamia `window.speechSynthesis.speak(new SpeechSynthesisUtterance(word))` z `lang='pl-PL'` — bez żadnego zewnętrznego API, bez kosztów, zero latencji. Dodaj toggle "Auto-play" w nagłówku quizu: gdy włączony, każde nowe słowo jest automatycznie czytane 1 sekundę po wyświetleniu fiszki. W formularzu dodawania nowych słów: po zapisaniu automatycznie odtwórz wymowę jako potwierdzenie. Całość: ~12 linii JavaScript, zero nowych zależności, zero nowych tabel.
   *Dlaczego warto: Clozemaster Radio i Duolingo speaking exercises dowodzą, że uczenie się słów bez słyszenia wymowy to nauka połowiczna — mózg buduje reprezentację ortograficzną ale nie fonetyczną, co utrudnia rozumienie mowy i mówienie. Web Speech API obsługuje `pl-PL` we wszystkich nowoczesnych przeglądarkach bez zezwolenia, bez konta, bez API key. To jest dosłownie najprostszy ze wszystkich feature'ów we wszystkich raportach — 12 linii kodu — a nikt go jeszcze nie zaproponował. Dla kogoś uczącego się polskiego jako obcego języka efekt jest natychmiastowy i odczuwalny od pierwszej sesji.*
   *Inspiracja: Clozemaster Radio (pasywna nauka audio), Duolingo speaking exercises*

---

## [29.06.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Myfxbook** — platforma weryfikacji wyników tradingowych; killer feature: jeden klik generuje publiczny, kryptograficznie zweryfikowany link z P&L, drawdownem i winratem — mentorzy i prop firmy używają tego do oceny traderów przed przekazaniem funded accountu; prywatność kontrolowana per-pole (możesz ukryć lot size, ale pokazać WR%)
- **Boostcamp** — darmowy tracker siłowy z programami kalisteniki ("Overcoming Gravity" Steve'a Lowa); tygodniowy tonnaż per partia mięśniowa (sylwetka przód/tył świeci intensywnością proporcjonalną do sumy kg), szacowany 1RM liczony automatycznie ze każdego setu wzorem Epley'a (masa × (1 + reps/30)), RPE i RIR jako opcjonalne pola per set
- **Fabulous** — apka rytuałów opartych na nauce behawioralnej Duke University; specjalność: sekwencja kroków ze stoperem dla każdego, wizualna ścieżka zamiast checkboxów; "anchor habits" — każda nowa czynność przyczepia się do istniejącej (kawa → medytacja → zimny prysznic); guided weekly planning jako osobny niedzielny rytuał
- **Finch** — wirtualny ptak kompan; unikalny mechanizm: ukończone cele dnia zamieniają się na "energię" dla ptaka, który odblokowuje podróże do nowych miejsc i stroje; odznaki milestoneowe za kamienie milowe (pierwsza seria 7 dni, 100 celów, itd.); zero kar za pominięte dni — powrót po przerwie jest ciepły
- **Way of Life** — habit tracker z pełną siatką miesięczną 30/31 dni zamiast 7-dniowej; kolor każdej komórki = ✅/❌/⬜ dla każdego nawyku; "rok w jednym widoku" — 12 kolumn miesięcznych jednocześnie widoczne, wzorce sezonowe czytelne bez żadnych wykresów
- **Clozemaster Radio** — tryb hands-free: apka czyta zdania głosem, 3 sekundy przerwy, czyta tłumaczenie, przechodzi do następnego — 50 kontekstowych słów podczas biegania lub między setami kalisteniki bez jednego dotknięcia ekranu; dowiedziono +40% lepszej retencji vs same flashcardy
- **Tradervue** — profesjonalny dziennik tradingowy; moduł "Commission Report": całkowite prowizje zapłacone brokerowi, prowizja jako % brutto P&L, wykres Gross P&L (linia zielona) vs Net P&L po prowizjach (linia biała) — dla aktywnych day-traderów różnica bywa 20-40 punktów procentowych WR; feature dostępny wyłącznie w płatnym planie
- **Strong App** — wiodący tracker siłowy iOS/Android; szacowany 1RM liczony ze każdego setu wzorem Epley'a i wyświetlany jako wykres progresji per ćwiczenie; użytkownicy cytują "widzenie jak 1RM rośnie o 1 kg co tydzień" jako główny powód nie porzucania apki po 2 miesiącach — nawet gdy trening subiektywnie stoi w miejscu

---

### 💡 Top 5 pomysłów

1. **[Kalistenika] — Tygodniowy Tonnaż w kg + Opcjonalne RPE przy Każdym Secie**
   Przy logowaniu sesji, obok pola "reps", dodaj opcjonalne pole RPE z szybkim wyborem przycisków: **6 · 7 · 8 · 9 · 10** (skala 6–10 jak w siłowni; 6 = bardzo lekko, 10 = absolutne maksimum). Pole domyślnie puste — nie blokuje zapisu. Równolegle, automatycznie obliczaj tonnage każdego setu: `reps × weight_kg`; przy ćwiczeniach z ciężarem ciała użyj edytowalnej masy ciała z profilu użytkownika (domyślnie 75 kg). W zakładce Statystyki Kalisteniki dodaj wykres słupkowy tygodniowego tonażu: 12 ostatnich tygodni na osi X, suma kg na osi Y, zielony słupek gdy tydzień bije rekord. Nad wykresem jedno zdanie: "Ten tydzień: **3.240 kg** (+12% vs poprzedni | rekord wszech czasów: 3.820 kg)". W podsumowaniu po "Zakończ sesję": czas sesji, liczba setów, tonnaż sesji, oraz jeśli podano RPE — "Średnie RPE: 7.8 (umiarkowanie ciężko)". Technicznie: jedno INT pole `rpe` i jedno FLOAT pole `tonnage` w tabeli `exercise_logs`, `tonnage` obliczane przy zapisie setu (`reps * weight`), jeden `SUM(tonnage) GROUP BY week` query do wykresu.
   *Dlaczego warto: Boostcamp Pro i Strong App cytują tonnage jako flagship feature — to jedyny obiektywny miernik obciążenia w kalistenice gdzie nie dokłada się talerzy. "Trenuję od 3 miesięcy i nie widzę progresu" to iluzja — przy rosnącym tonnażu progres jest, tylko niewidoczny bez liczby. RPE uzupełnia: sam tonnage nie mówi czy sesja była łatwa czy na granicy sił — RPE 9 przy 2.800 kg jest ciężej niż RPE 7 przy 3.200 kg. Dla 19-latka budującego bazę kalistenyczną przez lata to najprecyzyjniejszy dowód na to że trening działa, niezależnie od subiektywnego samopoczucia w danym dniu.*
   *Inspiracja: Boostcamp Pro Weekly Volume Tracking, Strong App 1RM & Tonnage*

2. **[Trading Journal] — Raport Prowizji: Gross P&L vs Net P&L po Kosztach Transakcji**
   Dodaj pole `commission_usd` (DECIMAL(8,2), domyślnie 0.00) do każdego tradu. W formularzu: trzecia linijka po P&L — "Prowizja/spread: $___" z pre-wypełnieniem domyślną prowizją z ustawień konta (jednorazowa konfiguracja: np. "$3.50 per lot" lub "5 pips spread"). W zakładce Statystyki tradingu dodaj sekcję "Koszty transakcji": (a) wielka neonowa cyfra "**−$847**" = łączna prowizja za bieżący miesiąc; (b) wykres: **Gross P&L** (zielona linia) vs **Net P&L** (biała linia) tygodniowo — wizualna szczelina między liniami to koszt aktywności; (c) automatyczny insight: "Prowizje stanowią **X%** Twojego brutto zysku" lub "Każdy trade kosztuje Cię średnio **Y pipsów** zanim zarobisz pierwszy cent". Jeśli X > 30%: czerwony alert "⚠️ Wysokie koszty transakcji — rozważ rzadsze, selektywniejsze wejścia lub tańszego brokera". Technicznie: jedno pole DECIMAL w tabeli `trades`, suma prowizji to jeden SUM query, wykres używa istniejącego systemu SVG/Recharts z dodatkową linią.
   *Dlaczego warto: Tradervue ma Commission Report wyłącznie w płatnym planie i jest to jeden z największych "eye-opener" momentów dla aktywnych traderów — wielu day-traderów nie zdaje sobie sprawy, że gross P&L to +$1.200 a net po prowizjach to +$380. Prop firmy (FTMO, Apex) liczą challenge po prowizjach — ignorowanie ich przy ocenie strategii fałszuje obraz o 10–40% i prowadzi do błędnych wniosków o skuteczności setupu. Żaden z poprzednich 7 raportów nie zaproponował tego pomysłu mimo że jest jednym z najłatwiejszych do implementacji i najbardziej bolesnych do zignorowania.*
   *Inspiracja: Tradervue Commission Reports*

3. **[Polski] — Tryb "Radio": Automatyczne Audio-Powtórki Hands-Free Bez Ekranu**
   Na stronie Polski dodaj przycisk "**▶ Radio**" obok przycisku "Zacznij Quiz". Kliknięcie uruchamia tryb hands-free: apka automatycznie przechodzi przez WSZYSTKIE słowa zaplanowane na dzisiejszą powtórkę (z kolejki SM-2). Dla każdego słowa sekwencja: ① Web Speech API czyta polskie słowo głosem `pl-PL`, ② 2.5 sekundy ciszy, ③ czyta angielskie tłumaczenie, ④ 1.5 sekundy przerwy → następne słowo. Zero klikania, zero patrzenia w ekran. Na górze: pasek "Radio: **12/43** — pozostało ~5 min" + przyciski "⏸ Pauza" i "⏭ Pomiń". Po zakończeniu wszystkich słów: modal "📻 Odsłuchano 43 słowa. Zacząć teraz quiz powtórkowy?" (Tak / Zapisz na później). Słowa odsłuchane w trybie Radio NIE zaliczają się automatycznie jako "przejrzane" — Radio to ekspozycja, nie weryfikacja. Technicznie: zero nowych tabel, zero API calls — wyłącznie `speechSynthesis.speak()` + `setTimeout()` w pętli przez tablicę `dueWords`. Dosłownie ~25 linii JavaScript.
   *Dlaczego warto: Poprzedni raport (22.06) zaproponował przycisk 🔊 per słowo i auto-play w quizie — to był krok w dobrym kierunku. Radio to inna klasa UX: nie klikasz nic, nie patrzysz w ekran, możesz ćwiczyć kalistenikę i słuchać jednocześnie. Clozemaster Radio jest opisywany przez użytkowników jako "game changer podczas biegania i ćwiczeń" — dokładnie Twoja sytuacja między setami push-upów. Dla osoby która ma 43 słowa do powtórki — 5 minut słuchania bez ekranu jest realnie łatwiejsze do wciśnięcia w dzień niż uruchamianie quizu.*
   *Inspiracja: Clozemaster Radio Mode*

4. **[Dashboard] — Niedzielny Rytuał Planowania: 3-Krokowy Wizard Celów Tygodnia**
   Co niedzielę między 17:00 a 23:59, przy pierwszym otwarciu Dashboardu, wyświetl full-screen overlay (nie małego modala — pełny ekran żeby nie było pokusy zamknięcia) z trzema krokami:

   **Krok 1 — Retrospekcja** (auto, 10 sekund patrzenia): 5 liczb zeszłego tygodnia — Kalistenika X/6 sesji, Słowa X/35, Trading X sesji, Dziennik X/7, Energia avg X/10. Duże cyfry, zielone/czerwone. Przycisk "Dalej →".

   **Krok 2 — Cele na ten tydzień** (30–60 sekund): 5 edytowalnych pól pre-wypełnionych inteligentnym domyślnym (jeśli zeszły tydzień był 4/6 sesji → domyślne "5 sesji", jeśli 6/6 → "6 sesji"). Format: lewa kolumna = moduł, prawa = cel liczbowy. Przycisk "Zapisz i zacznij tydzień →".

   **Krok 3 — Jeden Insight Claude'a** (opcjonalny, 2–3 sekundy generowania): "Na podstawie Twojego tygodnia (energia avg 6.2, 4/6 sesji, winrate 48%) — jeden konkretny nawyk który może poprawić najsłabszy obszar:" → 1-2 zdania po polsku. Fallback jeśli API > 5s: pusty krok, bez blokowania.

   Cele zapisują się do tabeli `weekly_goals` (5 TINYINT pól + data tygodnia). Przez cały tydzień mini-widget "Cele tygodnia" na Dashboardzie: 5 linii z auto-zaktualizowanymi liczbami z modułów i checkboxem-stanem ✅/🟡/❌.
   *Dlaczego warto: Fabulous zbudował retencję na guided rituals — klucz to że WSZYSTKIE kroki są w jednym flow, nie w ukrytym menu. Żaden z poprzednich 7 raportów nie zaproponował mechanizmu świadomego wyznaczania celów na tydzień — a to jest fundament GTD, OKR i każdego systemu produktywności. Bez planowania wszystkie inne pomysły są reaktywne: śledzisz co było, nie decydujesz co będzie. Mini-widget przez cały tydzień sprawia, że cele są widoczne każdego dnia, nie tylko w niedzielę. Technicznie: mała tabela `weekly_goals`, jeden LocalStorage klucz z datą ostatniego wyświetlenia, jedno wywołanie Claude API (< 200 tokenów).*
   *Inspiracja: Fabulous guided weekly planning ritual, Notion Life OS Weekly Review*

5. **[Life Dashboard] — Galeria Osiągnięć: Odblokowane Odznaki za Kamienie Milowe**
   Stwórz nową stronę "Osiągnięcia" w nawigacji. Zdefiniuj w kodzie 20–25 odznak zgrupowanych w 5 kategorii:

   🏋️ **Kalistenika**: "Pierwsze 10 sesji", "Seria 30 dni z rzędu", "Tonnaż 10.000 kg łącznie", "Pierwsze 1.000 Pull-upów"
   📚 **Polski**: "100 słów w słowniku", "30 dni z quizem z rzędu", "500 słów opanowanych (mastered)"
   📈 **Trading**: "Pierwsze 10 tradów zalogowanych", "Miesiąc bez naruszenia reguł prop firm", "Breakeven po prowizjach"
   📓 **Review**: "7 wpisów z rzędu", "365 wpisów łącznie", "Pierwszy wpis z energią 10/10"
   🔥 **Ogólne**: "Pierwszy pełny tydzień (wszystkie moduły)", "Seria 100 dni nawyku sport", "180 dni od startu aplikacji"

   Każda odznaka: okrągła ikona (emoji na neonowym gradientowym tle), nazwa, data odblokowania — lub "🔒 Zablokowane: [warunek]". Przy odblokowaniu: toast notification "🏆 Nowa odznaka: Pierwsze 1.000 Pull-upów!" widoczny przez 4 sekundy, zapis do tabeli `achievements (id, unlocked_at)`. Na Dashboardzie, pod siatką nawyków: 3 ostatnio odblokowane odznaki jako mini-row z emoji + datą.
   *Dlaczego warto: Finch i Habitica udowodniły, że odznaki milestoneowe trzymają użytkowników DŁUGO po tym jak nowość apki przemija — bo dają poczucie tożsamości trwałej niezależnie od aktualnego streaka. Odznaka "Pierwsze 1.000 Pull-upów" jest dowodem który przeżyje jakikolwiek zły tydzień. Technicznie jest to najlepsza proporcja wartość/koszt ze wszystkich pomysłów w tym raporcie: tabela z 2 kolumnami, trigger-check w każdym POST endpoincie (kilka linii per endpoint), jeden komponent React z galerią. Brak odznak w aplikacji która śledzi tak wiele danych to brakujące ogniwo emocjonalne — liczby bez kamieni milowych są suche.*
   *Inspiracja: Finch achievement gallery & energy unlocks, Habitica badge system*

---

## [06.07.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje
- **Strong App (iOS/Android)** — wiodący tracker siłowy; przy każdym ćwiczeniu pokazuje "Poprzednio: 3×8 @ 90 kg, 3 tygodnie temu" eliminując szukanie w historii przed każdym setem; szacowany 1RM z każdego zestawu wzorem Epley'a (ciężar × (1 + powt./30)) wyświetlany jako wykres tygodniowy — użytkownicy cytują "widzenie jak 1RM rośnie o 1 kg co tydzień" jako główny powód nie porzucania aplikacji po 2 miesiącach mimo że "subiektywnie stoją w miejscu"
- **Tradervue** — profesjonalny dziennik tradingowy z importem CSV z 80+ brokerów; Commission Report: dwie linie na wykresie — Gross P&L (zielona) i Net P&L po prowizjach (biała); szczelina między liniami to wizualny koszt aktywności; moment gdy traderzy odkrywają że prowizje pochłaniają 30–40% brutto P&L opisywany jest jako "eye-opener który zmienił moje podejście do częstotliwości handlu"
- **Myfxbook** — platforma weryfikacji wyników tradingowych; jeden klik generuje publiczny, kryptograficznie zweryfikowany link z P&L, drawdownem i winratem; prywatność kontrolowana per-pole (możesz ukryć lot size, ale pokazać WR%) — prop firmy i mentorzy używają tego jako standardowy dowód wiarygodności tradera; nic równoważnego nie istnieje w żadnym dzienniku budowanym własnoręcznie
- **TradesViz AI Coach (2025)** — uruchamia 16 deterministycznych testów statystycznych na twoich tradach i rankinguje wyniki według wpływu na P&L; krytyczny brak: zero wykrywania zachowań emocjonalnych (revenge trading, tilt) — użytkownicy tagują je ręcznie; AI Q&A pozwala pytać o własne dane po angielsku w 2 sekundy bez klikania przez filtry; 600+ widgetów drag-and-drop — ale zbyt dużo opcji prowadzi do paraliżu konfiguracji
- **Duolingo Practice Hub (2025)** — celowa powtórka wyłącznie trudnych słów wybranych przez algorytm; system lig XP (30 osób, live-ranking tygodniowy) podnosi zaangażowanie o 40% vs brak lig; krytyczny brak: aplikacja nie śledzi balansu kategorii gramatycznych — można ukończyć kurs z 80% rzeczowników i 5% czasowników bez żadnego ostrzeżenia
- **Way of Life** (habit tracker) — pełna siatka miesięczna 30/31 dni z WSZYSTKIMI nawykami jednocześnie w jednym widoku; 12 miesięcy side-by-side ujawnia wzorce sezonowe (np. "lipiec systematycznie słaby dla sportu") które tygodniowe widoki całkowicie ukrywają — jeden wzrok zastępuje przeglądanie 12 osobnych tygodniowych wykresów
- **Reflectly** — ustrukturyzowane prompty CBT prowadzą przez sekwencję pytań zamiast zostawiać pusty textarea; po 30+ wpisach z podobnymi motywami aplikacja zaczyna zadawać bardziej ukierunkowane pytania o ten obszar — samonauka systemu bez żadnej konfiguracji użytkownika
- **Habitica** — kluczowy insight tej tygodniowej analizy: nie RPG-awatar trzyma użytkowników, lecz 0.5-sekundowa pętla natychmiastowej nagrody po każdym kliknięciu (variable ratio reinforcement); trzy typy zadań (Habits / Dailies / To-Dos) zapobiegają mieszaniu nawyku "ćwicz sport" z jednorazowym "wyślij maila" — ta separacja to realna słabość której brakuje w module Zadania

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Import Tradów z CSV Brokera: Koniec Ręcznego Logowania**
   Dodaj stronę "Import" w Trading Journal z drag-and-drop strefą na plik CSV. Zdefiniuj jeden prosty format kolumn który obsługują prawie wszystkie platformy: `date, time, symbol, direction (BUY/SELL), entry_price, exit_price, lots, pnl_usd`. Po wrzuceniu pliku: parser wyświetla podgląd tabeli pierwszych 5 wierszy i pyta "Importować X tradów?" z mapowaniem kolumn (dropdown per kolumna na wypadek innej kolejności nagłówków). Po zatwierdzeniu — masowe wstawianie do tabeli `trades` z dodatkowym polem `source = 'csv_import'`. Pola emocjonalne (emotion_tag, notes, psychology_tag) pozostają puste do uzupełnienia ręcznie po imporcie. Osobny przycisk "Eksportuj do CSV" działa w odwrotną stronę — dump całej tabeli trades do pliku pobieranego w przeglądarce. Technicznie: natywny `<input type="file" accept=".csv">` + ~60 linii parsera CSV w JavaScript bez zewnętrznych zależności + jeden `prisma.trade.createMany()`.
   *Dlaczego warto: Po 8 tygodniach raportów i 40 zaproponowanych pomysłach brak importu CSV to najbardziej rażący gap techniczny w całej aplikacji. Tradervue i TradesViz budują swój biznes na automatycznym imporcie — bo ręczne logowanie jest powodem #1 porzucenia dziennika tradingowego. Przy 20 tradach tygodniowo, 5 minut logowania per sesja × 4 tygodnie = 80 minut na administrację zamiast analizę. Co ważniejsze: MAE/MFE, heatmapy godzinowe, compliance panele i wszystkie poprzednie pomysły są bezużyteczne bez danych — a danych nie będzie jeśli logowanie boli. To jedyna funkcja której implementacja nie daje nowych pomysłów, tylko usuwa barierę która blokuje wszystkie istniejące.*
   *Inspiracja: Tradervue broker CSV import (80+ brokerów), TradesViz automated imports*

2. **[Kalistenika] — Szacowany 1RM Wzorem Epley'a + Wykres Siły w Czasie**
   Dla ćwiczeń z dodatkowym obciążeniem (weighted pull-up, weighted dip, weighted push-up z plecakiem): po każdym zapisanym secie oblicz `est_1rm = (bodyweight_kg + added_weight_kg) × (1 + reps / 30)`. Wartość `bodyweight_kg` pochodzi z jednorazowo edytowalnego pola w ustawieniach profilu. Wynik zapisz w kolumnie `est_1rm FLOAT` tabeli `exercise_logs`. Na karcie ćwiczenia dodaj dwa elementy: (a) duża neonowa cyfra "**Szac. 1RM: 94 kg**" — największy `est_1rm` z ostatnich 7 dni; (b) wykres liniowy SVG (160×50px) z est_1RM per tydzień za ostatnie 12 tygodni — trend rosnący to zielona linia, plateau to szara. Gdy nowy set bije dotychczasowy rekord est_1RM dla danego ćwiczenia: toast "📈 Nowy rekord siły: weighted pull-up ~97 kg (poprzednio: 93 kg, 2 tygodnie temu)". Dla ćwiczeń czysto z masą ciała: wyświetl "Ekwiwalent siły: X% BW" obliczony z max reps wzorem odwrotnym (kalibracja).
   *Dlaczego warto: Strong App i Boostcamp cytują wykres 1RM jako feature #1 który powoduje powroty do aplikacji po 6 miesiącach gdy progres jest subiektywnie niewidoczny. W kalistenice bez sztangi jedyną obiektywną miarą siły jest estymowany 1RM — bez niego "ćwiczę od roku" brzmi jak stagnacja nawet gdy real progress to 20% wzrost siły. Wzór Epley'a ma dokładność ±5% co wystarczy dla trendu. W 8 poprzednich raportach zaproponowano RPE i tonnage — 1RM to brakujące trzecie ogniwo trójkąta metryk siłowych. Bez żadnego z tych trzech liczb kalistenika jest "logowaniem w próżnię"; mając wszystkie trzy, trening ma mierzalny dowód że działa.*
   *Inspiracja: Strong App 1RM progression chart, Boostcamp Epley formula per set*

3. **[Zadania] — Macierz Eisenhowera: Widok 2×2 Pilne × Ważne zamiast Jednej Listy**
   Dodaj opcjonalne pole `urgent BOOLEAN DEFAULT false` do każdego zadania — toggle jednym kliknięciem bezpośrednio na karcie zadania (bez otwierania formularza). Dodaj nową zakładkę "Macierz" w module Zadania. Widok: CSS Grid 2×2, każdy kwadrant z kolorowym nagłówkiem:
   - **Q1 Pilne + HIGH**: ciemna czerwień — "🔥 Teraz"
   - **Q2 Niepilne + HIGH**: ciemna zieleń — "📅 Zaplanuj"
   - **Q3 Pilne + MEDIUM/LOW**: ciemna amber — "⚡ Skróć lub pomiń"
   - **Q4 Niepilne + MEDIUM/LOW**: ciemna szarość — "🗑️ Eliminuj"
   Zadania z istniejącej listy wpadają automatycznie do kwadranta. Jeśli Q1 ma > 3 zadania: pulsujący czerwony border jako ostrzeżenie "pożar za pożarem". Na Dashboardzie nowy badge pod sekcją nawyków: "📅 Q2: 4 ważne niezaplanowane" — przypomnienie że ważne-niepilne zadania zamienią się w pilne jeśli nie zostaną wpisane w kalendarz.
   *Dlaczego warto: Obecna lista HIGH/MEDIUM/LOW spłaszcza dwa niezależne wymiary — ważność i pilność — w jeden slider, co prowadzi do klasycznego błędu: robienia rzeczy pilnych-nieważnych (Q3: "odpowiedz na maila") zamiast ważnych-niepilnych (Q2: "przygotuj się do challenge FTMO"). Żaden z 8 poprzednich raportów nie zaproponował zmiany struktury Zadań — tylko ich wizualizacji z zewnątrz. Macierz Eisenhowera to podstawa zarządzania czasem używana w GTD, OKR i każdym poważnym systemie produktywności. Technicznie: jedno BOOLEAN pole i jeden widok React z CSS Grid — migracja jednolinijkowa, zero nowych endpointów.*
   *Inspiracja: Covey "7 Habits" Eisenhower Matrix, Notion task matrix view*

4. **[Polski] — Analiza Kategorii Gramatycznych z Inteligentnym Balansem Promptu**
   Rozszerz prompt Claude'a generującego nowe słowa o jedno pole w odpowiedzi JSON: `"grammar_category": "rzeczownik|czasownik|przymiotnik|przysłówek|wyrażenie"`. Dodaj kolumnę `grammar_category VARCHAR(30)` do tabeli słów — migracja jednolinijkowa. Na stronie Polski, nad listą słów, wyświetl poziomy pasek podziału (5 proporcjonalnych sekcji): 🔵 Rzeczowniki · 🟢 Czasowniki · 🟡 Przymiotniki · 🟠 Przysłówki · ⚪ Inne. Pod paskiem auto-generated insight: jeśli czasowniki < 15% → "⚠️ Masz tylko X% czasowników — rdzeń każdego polskiego zdania to czasownik. Claude dostosuje następne sugestie."; jeśli przymiotniki < 10% → analogiczne ostrzeżenie. Inteligentna rekalibracja: gdy klikasz "Generuj nowe słowa przez Claude" a któraś kategoria jest poniżej progu, automatycznie modyfikuj prompt: "zaproponuj tym razem 3 czasowniki i 2 rzeczowniki" zamiast generycznego "zaproponuj 5 słów". W liście słów: kolorowa kropka kategorii obok każdego wpisu.
   *Dlaczego warto: Duolingo nie śledzi balansu gramatycznego i jest to jedna z najczęstszych krytyk zaawansowanych użytkowników — można przejść cały kurs z 80% rzeczownikami i nie umieć zbudować zdania bo brakuje czasowników. Przy uczeniu się słówek bez struktury (cel "5 słów dziennie") kategorie rozkładają się przypadkowo. Żaden z 8 poprzednich raportów nie dotknął składu gramatycznego słownika — a to jest podstawowy problem każdej niezdyscyplinowanej nauki vocabulary. Technicznie jest to prawdopodobnie najtańszy pomysł ze wszystkich 45 poprzednich: zero nowych tabel, jedno pole w Prisma, jedno zdanie więcej w prompcie Claude — a zmiana w jakości nauki jest natychmiastowa i mierzalna.*
   *Inspiracja: Luka w Duolingo Practice Hub (brak śledzenia kategorii), Babbel's grammatical balance in lesson planning*

5. **[Review / Dashboard] — Szybki Check-in Nastroju × 3 razy Dziennie (5 sekund, bez wchodzenia do Review)**
   Dodaj nowy komponent "Nastrój teraz" widoczny stale na Dashboardzie jako jedna pozioma belka: 5 emoji przycisków (😴 Bez energii · 😕 Słabo · 😐 Ok · 🙂 Dobrze · ⚡ Świetnie) + rząd 4 optional tagów single-tap (🏋️ Trening · 📈 Trading · 📚 Nauka · 😴 Mało snu). Kliknięcie emoji + opcjonalnego tagu = jeden rekord w nowej tabeli `mood_checkins (id, timestamp, mood_score INT 1-5, tag VARCHAR, time_slot VARCHAR)`. System auto-przydziela `time_slot`: "Rano" 5:00–11:59 / "Południe" 12:00–16:59 / "Wieczór" 17:00+. Jeden wpis per slot per dzień — jeśli wpis dla slotu już istnieje, belka pokazuje "edytuj" z aktualnym emoji. W wieczornym Review: suwak energii 1–10 pre-wypełnia się wartością z wieczornego quick mood × 2 jeśli istnieje. W Statystykach: nowy wykres "Energia w ciągu dnia" — krzywa łącząca średnie Rano/Południe/Wieczór za ostatnie 30 dni. Przykładowy auto-wygenerowany insight: "Twoje południe jest systematycznie o 1.7 gorsze od poranka (5.2 vs 6.9) — zaplanuj wymagające zadania (Q2) na rano."
   *Dlaczego warto: Obecna aplikacja ma jeden pomiar energii per dzień — wieczorny suwak. To zbyt mało żeby zobaczyć rytm dobowy: "moje poniedziałkowe południa są systematycznie słabe" to inny i bardziej użyteczny wniosek niż "poniedziałki są złe". Daylio multi-log users odkrywają wzorce intraday których nikt nie zobaczyłby przy jednym wieczornym wpisie — Daylio opisuje to jako "insight który sprawia że nie mogę przestać wypełniać aplikacji". Żaden z 8 poprzednich raportów nie zaproponował pomiarów śróddziennych — 40 pomysłów dotyczyło analizy jednego dziennego punktu danych. Quick mood celowo NIE wchodzi do modułu Review (który ma pełen formularz) — jest na Dashboardzie żeby friction był bliski zeru: 2 kliknięcia, 5 sekund, nie wymaga myślenia.*
   *Inspiracja: Daylio multiple daily entries, Reflectly intraday mood tracking*

---

## [13.07.2026] — Raport tygodniowy

### 🔍 Zbadane aplikacje

- **Myfxbook** — platforma weryfikacji wyników forex; killer feature: analiza win rate osobno dla pozycji LONG vs SHORT oraz per instrument (waluta/indeks) — ujawnia systematyczną asymetrię której trader sam nie zauważy przez miesiące; jeden klik generuje publiczny, kryptograficznie zweryfikowany PDF z P&L i drawdownem — prop firmy i mentorzy używają tego jako standardowy dowód wiarygodności
- **Clozemaster** — pakiety tematyczne słownictwa (Rodzina / Praca / Jedzenie / Sport / Emocje / Podróże); nauka w semantycznych klastrach daje ~2× lepszą retencję niż losowe flashcardy bo mózg indeksuje powiązane pojęcia razem; podział wg częstotliwości (top-1000 / top-5000 / rzadkie) pozostaje najsilniejszym filtrem priorytetów
- **Habitica** — kluczowy nowy insight po głębszej analizie: to NIE awatar RPG zatrzymuje użytkowników długoterminowo, lecz twarda separacja 3 typów: Habits (bez daty), Dailies (codziennie), To-Dos (jednorazowe) — mieszanie nawyku "ćwicz sport" z zadaniem "wyślij maila" w jednej liście to strukturalna wada wspólna dla wielu life-OS apps
- **Finch** — mechanizm "energy dla ptaka": każda ukończona aktywność zamienia się w punkty energii zamieniające się na podróże ptaka do nowych miejsc i stroje — oddziela nagrodę fizyczną (ptak rośnie) od kary (brak); zero powiadomień "zawiodłeś"; powrót po 2-tygodniowej przerwie jest ciepły — ptaszek czeka, nie umiera
- **Anki (FSRS-6)** — nowy algorytm 2025 trenowany na 700 milionach recenzji od 20 tys. użytkowników; zmniejsza liczbę potrzebnych powtórek o 20–30% vs SM-2 przy tej samej retencji; panel statystyk po sesji: retention rate %, average daily reviews, lista najtrudniejszych kart — benchmark dla każdego systemu spaced repetition
- **Duolingo Practice Hub (2025)** — celowa powtórka tylko najtrudniejszych słów wybranych przez algorytm zamiast losowej sesji; krytyczna luka którą zidentyfikowali sami użytkownicy: brak śledzenia balansu gramatycznego — można ukończyć kurs z 80% rzeczowników i 5% czasowników bez żadnego ostrzeżenia (Life Dashboard już ma przewagę po raporcie 06.07)
- **Loop Habit Tracker** — "Habit Strength %": ważona średnia ostatnich 28 dni z exponential decay na starszych dniach zamiast binarnego streaka; jeden pominięty dzień po 3 tygodniach obniża wynik z 94% do 87% zamiast zerowować — psychologicznie dokładniejsze i mniej destrukcyjne przy podróżach czy chorobie
- **Madbarz** — "Previous Session" widoczna na górze każdego ćwiczenia podczas logowania: "Poprzednia sesja: Pull-up — 3×10, 4 dni temu" eliminuje szukanie w historii przed każdym setem; bez tej linii użytkownik zaczyna set bez wiedzy co pobił ostatnio — Strong App identyfikuje to jako feature #1 zwiększający konsekwencję treningu

---

### 💡 Top 5 pomysłów

1. **[Trading Journal] — Statystyki Long vs Short + Win Rate per Instrument**
   W zakładce Statystyki tradingu dodaj sekcję "Asymetria kierunku i instrumentów". Pierwsza tabela (2 wiersze): kolumna Kierunek (LONG / SHORT), kolumny — Liczba tradów / Win Rate % / Avg R:R / Avg P&L per trade. Przykładowy wynik: "LONG: 47 tradów, 63% WR, R:R 1.9 | SHORT: 21 tradów, 31% WR, R:R 0.8". Poniżej druga mini-tabela: "Win rate per instrument" — każdy unikalny symbol z bazy (NQ, ES, EURUSD, GBPJPY itp.) jako wiersz z tymi samymi kolumnami, posortowany malejąco po P&L. Jeśli WR jednego kierunku jest > 20 pkt procentowych niższy od drugiego → automatyczny alert w collapsible card: "⚠️ Twoje shorty mają o 32 punkty % niższy WR niż longi — czy kryteria wejścia są symetryczne? Rozważ ograniczenie shortowania do trendowych rynków". Query: `SELECT direction, COUNT(*), AVG(CASE WHEN pnl>0 THEN 1.0 ELSE 0.0 END) as wr, AVG(rr) FROM trades GROUP BY direction` + analogiczne `GROUP BY symbol`. Zero nowych tabel, < 15 linii SQL.
   *Dlaczego warto: Myfxbook pokazuje analizę per kierunek i per instrument jako jeden z pierwszych widoków po połączeniu konta — i jest to najczęstszy "eye-opener" nowych użytkowników, bo wielu prop-traderów jest systemowo dobrzy wyłącznie w jednym kierunku i nie wiedzą o tym przez miesiące. Dla Nasdaq day-tradera: shortowanie po wyprzedaży vs longowanie w silnym trendzie to zupełnie różne konteksty rynkowe — merged WR ukrywa tę różnicę i fałszuje ocenę strategii. Żaden z 9 poprzednich raportów nie zaproponował rozbicia statystyk per kierunek mimo że `direction` (BUY/SELL) to pole obecne w tabeli od początku.*
   *Inspiracja: Myfxbook direction & symbol analytics*

2. **[Dashboard] — Miesięczne "Wrapped" Przez Claude'a: Raport Tożsamości na Pierwsze Dni Miesiąca**
   W pierwszych 7 dniach nowego miesiąca, przy otwarciu Dashboardu, wyświetl pulsujący baner "📊 Twój Czerwiec — gotowy na podsumowanie?" z jednym przyciskiem "Generuj". Kliknięcie wysyła Claude API prompt z danymi całego poprzedniego miesiąca (schemat JSON z bazy): sesje kalisteniku (ile, avg tonnage, pobite PRy), słowa (ile nowych, retencja % z quiz_results), trading (brutto P&L, WR%, liczba tradów), energy avg z Review, nawyki completion %. Claude zwraca strukturę: (a) 5 neonowych liczb highlight (np. "23 sesje treningowe · 147 słów · +$1.240 brutto · 7.1/10 energia · 89% nawykow"); (b) "Najlepszy tydzień: 16–22 czerwca — dlaczego?"; (c) "Jeden obszar który wyraźnie urósł vs maj"; (d) "Jedno ostrzeżenie: wzorzec wymagający uwagi"; (e) "Zdanie do zapamiętania: [cytat z wpisu o najwyższej energii w miesiącu]". Wynik cachowany w tabeli `monthly_reports (month DATE, content JSONB, generated_at)` — jedno wywołanie API per miesiąc. Widok full-screen glassmorphism card z przyciskiem "Zapisz do archiwum" → dostępny zawsze w nowej zakładce Statystyki → Archiwum miesięczne.
   *Dlaczego warto: Spotify Wrapped stał się globalnym fenomenem bo poczucie "mój rok/miesiąc w liczbach" jest emocjonalnie silniejsze niż codzienne metryki — daje poczucie zamknięcia cyklu i motywację do następnego. Raport tygodniowy (zaproponowany 18.05) to inny poziom abstrakcji: tygodniowe patrzysz przez pryzmat nawyków, miesięczne przez pryzmat tożsamości ("jakim byłem człowiekiem w czerwcu?"). Dla 19-latka budującego siebie przez rok: archiwum 12 raportów to dokumentacja wzrostu której żadna inna aplikacja nie zaoferuje w tej formie. Technicznie: ~ 800 tokenów Claude API (< $0.01 per raport) + jedna tabela z JSON — najniższy koszt spośród wszystkich pomysłów wymagających AI.*
   *Inspiracja: Spotify Wrapped, Notion Life OS monthly review, Daylio Year in Review*

3. **[Polski] — Pakiety Tematyczne: Naucz Się Słów z Jednej Domeny Rozmowy na Raz**
   Zdefiniuj w kodzie 8 pakietów tematycznych: 🏠 Dom i codzienność / 👨‍💼 Praca i finanse / 🥗 Jedzenie i zdrowie / 🏋️ Sport i ciało / 💬 Emocje i relacje / 🌍 Podróże i miejsca / 📚 Nauka i technologia / ⏰ Czas i rutyna. Dodaj kolumnę `topic_pack VARCHAR(50)` do tabeli słów (migracja jednolinijkowa) i rozszerz prompt Claude'a o pole `"topic_pack": "Sport i ciało"`. Na stronie Polski dodaj poziomy selektor nad listą: 8 kolorowych chipów, jeden aktywny (klikalny, zapisywany w localStorage). Przy kliknięciu "Generuj słowa przez Claude": domyślnie generuje z aktywnego pakietu zamiast losowo — można nadpisać. Pasek postępu per pakiet: "🏋️ Sport i ciało: 23 słowa, 17 opanowanych (74%)". W quizie nowy tryb "Pakiet": quiz zawiera wyłącznie słowa z jednego wybranego tematu — idealne do przygotowania się do konkretnej rozmowy. Lista słów filtrowalna chipem z lewej kolumny bez przeładowania strony.
   *Dlaczego warto: Clozemaster i Babbel grupują słownictwo tematycznie i jest to jeden z najczęściej chwalonych aspektów struktury nauki — mózg buduje sieć semantyczną gdy słowa są sąsiednie kontekstowo, nie losowe. Obecny cel "5 słów dziennie" może przez miesiąc generować mix sportowy, kulinarny i biznesowy bez wzorca — użytkownik zna słowa izolowane ale nie klaster umożliwiający rozmowę na konkretny temat. Cel "chcę rozmawiać po polsku na siłowni" → aktywujesz pakiet Sport → uczysz 30 słów z tej domeny → możesz to zrobić po 2 tygodniach. Żaden z 9 poprzednich raportów nie zaproponował tematycznej struktury słownika mimo że to fundament pedagogiki językowej. Technicznie: jedno pole Prisma, 8 stringów w config, modyfikacja promptu — zero nowych endpointów.*
   *Inspiracja: Clozemaster topic packs, Babbel thematic course units*

4. **[Kalistenika] — "Poprzednia Sesja" Widoczna Przy Logowaniu Setów + Auto-Alert Spadku Formy**
   Dwa powiązane ulepszenia: (a) **Poprzednia sesja**: podczas logowania aktualnej sesji, nad każdym ćwiczeniem wyświetl jedną szarą linię "Ostatnio: 3×10 pull-up @ BW+5kg, 4 dni temu" — pobieraną z ostatniego wpisu dla danego ćwiczenia. Zero klikania, zero szukania w historii — informacja pojawia się automatycznie. Technicznie: jeden JOIN per ćwiczenie do tabeli `exercise_logs ORDER BY logged_at DESC LIMIT 1`. (b) **Auto-alert przetrenowania**: po zapisaniu sesji oblicz "wydajność" jako `SUM(reps × sets)` dla kluczowych ćwiczeń (pull-up, dip, push-up) i porównaj z rolling 21-dniową średnią. Jeśli bieżąca sesja jest > 15% poniżej tej średniej — zapisz flagę. Jeśli DWIE kolejne sesje mają flagę → przy następnym otwarciu Kalisteniki wyświetl collapsible alert: "⚠️ Forma poniżej średniej 2 sesje z rzędu (Pull-up: avg 10.2 → 8 i 7.5). Rozważ deload: 3–4 dni z objętością −40%." Przycisk "Tak, robię deload" wycisza alert na 7 dni.
   *Dlaczego warto: Strong App i Madbarz cytują "poprzednią sesję widoczną przy logowaniu" jako feature #1 zwiększający konsekwencję — bez tej linii każdy set zaczyna się bez wiedzy co pobił poprzednio, co prowadzi do albo zbyt łatwych albo zbyt ciężkich prób. Auto-alert przetrenowania jest zaś lukę którą żadna aplikacja kalisteniku nie wypełnia dobrze: Progression App ma periodyzację, Madbarz ma timer — ale żadna nie mówi "twoje ciało daje sygnał że potrzebujesz odpoczynku". Dla 19-latka trenującego bez trenera to zastępnik oceny doświadczonego instruktora. Żaden z 9 poprzednich raportów nie zaproponował obu tych usprawnień — razem to mniej niż 30 linii kodu z bardzo wysokim efektem UX.*
   *Inspiracja: Strong App "last session" display, Madbarz session history, Boostcamp performance regression*

5. **[Statystyki / Trading Journal] — Eksport Raportu do PDF: Podziel się z Mentorem lub Prop Firmą**
   W module Statystyki i w zakładce Statystyki Trading Journal dodaj przycisk "⬇️ Eksportuj PDF" w prawym górnym rogu. Po kliknięciu: przeglądarka generuje PDF po stronie klienta przy użyciu natywnego `window.print()` z dedykowanym arkuszem `@media print` (zero zewnętrznych bibliotek w wersji MVP; opcjonalnie `jsPDF + html2canvas` dla bardziej zaawansowanej wersji). PDF dla wybranego zakresu (7d / 30d / 90d) zawiera: (a) nagłówek z imieniem, datą generowania, zakresem; (b) sekcja Trading: equity curve SVG, WR%, avg R:R, max drawdown, liczba tradów, compliance rate jeśli wdrożono; (c) sekcja Rozwój: siatka nawyków 30-dniowa, tonnage Kalisteniki per tydzień, retencja słów %, avg energy. Plik zapisywany jako `raport_13-07-2026.pdf`. Wersja "trading-only" z paskiem prop firm to dokument gotowy do wysłania do mentora FTMO lub do archiwum aplikującego o challenge.
   *Dlaczego warto: Myfxbook PDF export jest standardem używanym przez prop-traderów przy aplikowaniu o funded accounts i przy pracy z mentorem — zewnętrzny dokument daje wiarygodność której screenshot nie daje. Budowanie dziennika bez możliwości wyjęcia danych "na zewnątrz" tworzy silo: wszystko widać w aplikacji, ale coaching, review z mentorem i archiwizacja poza aplikacją są niemożliwe. Żaden z 9 poprzednich raportów nie zaproponował eksportu — skupialiśmy się wyłącznie na analizach in-app. Technicznie `@media print` z kilkoma dodatkowymi stylami Tailwind to 2–3 godziny pracy i zero nowych zależności npm; wynik to profesjonalny dokument użyteczny poza aplikacją i niemożliwy do uzyskania bez tej jednej funkcji.*
   *Inspiracja: Myfxbook PDF/CSV export, Tradervue trade reports for mentors*

---
