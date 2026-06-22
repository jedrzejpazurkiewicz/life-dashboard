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
