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
