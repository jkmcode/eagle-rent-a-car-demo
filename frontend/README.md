layout:
https://elements.envato.com/adminox-responsive-admin-dashboard-frontend-EFZQA4
http://nazox-v-light.angular.themesdesign.in/

Stack Techniczny
css startowy theme: Flatly : bootswatch.com

Plan Projektu:

LOGOWANIE:

1. Zarządzanie kontami pracowników (Autentykacja i autoryzacja tokenowa)
   1.1

   - Tworzenie konta dla uzytkownika może zrobić tylko Amin (isStaff) oraz SuperUser(IsAdmin).

     1.2

   - Edycje hasła wszytskich pracowników mozę dokonać Amin (isStaff) oraz SuperUser(IsAdmin).
   - User (pracownik) może zmieniać tylko własne hasło (nazwa używkownika jest niezmienialna).
   - Przy funkcjonalności 'powiadomienia pracowników' email jest obowiązkowy oraz zmienialny tylko przez Amina (isStaff) oraz SuperUsera(IsAdmin).
   - Uzytkownik może zmienić tylko swoje hasło.

     1.3

   - tylko Amin (isStaff) oraz SuperUser(IsAdmin) mogą zrobić z usera(pracownika) Admina (isStaff).
   - tylko SuperUser może zrobić z Usera (pracownika) oraz z Admina (isStaff) SuperUsera (IsAdmin).
   - tylko SuperUsera (IsAdmin) może kasować Usera (pracownika) oraz Amin (isStaff).
   - nie można dopuścić, żeby SuperUser (IsAdmin) mógł zdeaktywować innego SuperUsera.

     1.4

   - Tylko Amin (isStaff) oraz SuperUser(IsAdmin) mogą dodawać Permission dla danego uzytkownika (np.lokalizacje wypożycznych aut).
     Autoryzacja (dodatkowe permmision np. lokalizacja) może być realizowana za pomocą osobnych tabel lub poprzez grupy stworzone w panelu administracyjnym Django
   - Amin (isStaff) oraz SuperUser(IsAdmin) maja full permission.

   Ptytania:

   1. Co jeżli superUser zapomni hasła??

FUNKCJONALNOŚCI

2. User (pracownik wypożyczalni)
   2.1 Wybranie lokalizacji danej wypożyczalni aut.
   2.2 Podanie okresu wypozyczenia aut (data i godzina).
   2.3 Wybór samochodu, który jest dostępny i akceptowany przez klienta. - wydanie samochodu. - przyjęcie samochodu również wypozyczonego w innej lokalizacji.

   2.4 Do uzgodnienia (wpisywanie danych o kliencie)!!!!! --- za dodatkową opłatą za generowanie dokumentów.
   2.5 Funkcjonalności z punku 5.
   2.6 "Wróć do mnie" - np. rezerwacja auta w danej lokalizacji.
   2.7 Rezerwacja i anulowanie rezerwacji samochodu.

3. Admin (isStaff)
   3.1 Wszytskie funkcjonalności jakie ma User (pracownik).
   3.2 Dodawanie, edytowanie, kasowanie lokalizacji lub nie w przypadku lokalizacja jest dodana na sztywno.
   3.3 Dodawanie, edytowanie (blokowanie - pszy usterkach, naprawach ip.), kasowanie samochodów.
   3.4 Nadawanie uprawnień pracownikom.
   3.5 Transfer aut (Do uzgodnienia !!!!!!!!!!!!!!)

4. SuperUser (IsAdmin)
   4.1 Wszytskie funkcjonalności jakie ma Admin (isStaff).
   4.2 Dostęp do statystyk - ilośc wpożyczonyh aut w danych miesiącu/dniu/okresie. - wypożyczenie danego auta w określonym czasie. - Wypożyczenia w ramach pojedyńczej wyporzyczalni. - Inne.
5. Stany lokalizacyjne aut (flow):

   - klient wypożycza i oddaje auto w tej samej lokalizacji.
   - klient wypożycza w jednej lokalizacji i deklaruje oddanie w innej.
   - klient wypożycza w jednej lokalizacji i deklaruje oddanie w innej a oddaje jeszcze gdzie indziej.
   - kilent nie oddaje auta na czas po dacie jest wyświelany na liście na czerwono i po jakimś czasie wysyłane są emaile do pracowników, szefa, kierownika.
     (w przypadku przedłużenia wypożyczenia auta pracownik (User) będzie mógł wydłuzyć czas wypozyczenia auta jeżeli będzie ono dostępne)

   Apilkacja będzie zawierać 2 lity (auta dostępne i wypożyczone)

6. Tranfer samochodów
   6.1 Baza Auto (dodatkowe pola)

   - nazwa lokalizacji
   - flaga (w drodze) -- zmieniania na podstawie przycisku "transferuj" oraz "samochód stransferowany"
   - flaga (wróć do mnie)
     Sposób 1 : zmienia się na True w momencie gdy realizacja wypożyczenia już wypożycznego auta
     ma być za 24h. Zmienia się na False kiedy samochód zostanie dostarczony na miejsce.
     Sposób 2 : flaga zmienia się na podstawie checkboxa którego napiska pracownik (User).
     Sposób 3 = Sposób 1 + Sposób 2

     6.2 Historia zmian w bazie Auto

7. Alerty
   7.1 Nie oddany samochód (potencjana kradzież).
   7.2 Zdyt mało lub zbyt dużo samochodów w danej lokalizacji.
   7.3 Nie wykonany tranfer samochdu w wyznaczonym czasie (np. korki, nikt po niego nie pojechał).
   7.4 Brak samochdu dla określonej rezerwacji (zarezerwowane auto nie jest w danej lokalizacji np. jest "porzucone" przez klienta).

Zadania:

--- EditLoction ImageUpload nie działa jeszcze zmiana zdjęcia (pisze ze nie ma autoryzacji) --- brak obsług błędów

--- Calendzarz (daty wstecz powinny być za disable)

--- Rezerwacja (nie można zarezerwować tego samego auta z tą sama datą), useState w formularzu rezerwacji musi się resetować za każdym wywołanie SubmitHandlera, anulowanie rezerwacji

--- Mamy Strefe czasową przy dodawaniu dat rezerwacji (tzeba przetestować czy nie będzie zmieniał godziny na róznych serverach)

--- Wpisanie do calendarza dnych z reserwacji

Error
---Podczas zmiany hasła użytkownia powstaje bład jak tylko przesyłam same hasło do backendu:
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

Rozwiązanie:
--- Nastąpiło zapętlenie ponieważ cały czas wykonywał się warunek w UseEffect w MyProfile. Z tego względu trzeba kasować bierzące stany.
dispatchem uruchomliśmy dispatch({type:USER_UPDATE_PROFILE_RESET}) co doprowadziło ze nie było success na true i warunek się już nie
wywoływał. Powyższy bład powstał ponieważ React wykrył to zapętlenie. Jak sie cofneliśmy na inną podstronę React musiał utrzymywać w pamięci dane które nie wpływały na bierzącą podstrone ( nie były używane w DOM).

W userList miałem problem z renderowaniem listy użytowników. TypeError: Cannot read properties of undefined (reading 'map')

Rozwiązanie:
--- Za pierwszym razem lista użytkowników pobrana z Redux myła undefined (dlatego bład powstał). Po chwili za pomocą UseEffecta lista userów nie była już undefinated.
Zrobiłem renderowanie warunkowe gdzie w pierwszym przypadku jest warunek z Loaderem, drugi z Errorem a trzeci z Listą uresów.
Dzięki temu mogłem korzystać z listy userów która została rerenderowana przez UseEffecta.

Pytania
-- Czy ustawiać błędy na jakiś czas czy nie?? (NewLocation, Localisation)
-- Czy edycje zdjęcia w lokalizacji robimy jak w samochodach??

To DO:

-- Uzytkownik -- obsługa błedów dla całości
-- CarRent -- lista walut i rodzaje dokumentów mogłaby być w jednej zmiennej środowiskowej (dokończyć dla pozostałych komponentów)
-- CARLISTBYLOCATION dokończyć zmienne środowiskowe
-- klucz traci swoją warzność po 30 dniach (chyba) i trzeba się przelogować. należy cofnąć użytjownika do logowania lub przy włanczaniu głównego menu oddowić localstorage.
-- Wyłączyć funkcjonalność "Wróć do mnie" RentCar, CarReservation, carRentEdit (dokończyć dla CarReservation, carRentEdit i inne)
-- Wygląg komponentu Login
-- kasuje rezerwacje jak dajemy na najem w zadania na dziś
-- w mainpage poprawic button (powiiny być traktowne jako tło -- link bo otwierania nowych kart -- teraz pojawia się zdjęcie w nowym linku)
-- lista utworzonych rezerwacji dla konkretnego pracownika oraz lista skasowanych rezerwacji (dostęne do 7 dni)
-- imie, nazwisko, nazwa samochodu 6 znaków

TO DISCUSS:
-- Paginacja (Wszędzie)
-- zrozumieć dobrze funkcje timezone() na backendzie
-- filtry na w zadanich na dzis nie działą przy rezerwacji opóżnionej --- sprawdzić czy działa
-- Jak otwieramy CarRentEdit przez 'zadania na dziś' przycuskiem Edit to uruchomiamy action 'getRentDetailsByCarId'. We wiusie pobieramy rekord metodą GET (wtedy jest wszytsko w porzątku). Gdy zmieniamy metode z GET na FILTER to dochodzi do zapętlenia useEffecta który w list dependecy ma rent (jeżeli nie ma rent w list dependency to jest okey). --- Dowiedzieć się dlaczego dochodzi do zapętlenia
-- Jednolity format wyświetlania daty (ZADANIE DLA MAMY)

STYLING:
--ujednolicić przysiki jak jest w "W użyciu" oraz wszytskie przysicki muszą być jednakowej długości. Kolory przycisków zgodnie ze słownikiem
--rozszerzyć kalendarz na małym ekranie + smartfony
--w navbarze skasować superUser i IsAdmin. Dodać lokalizację

SŁOWNIK KOLORÓW:
Najem - niebieski
Kalendarz -
Odbierz -
Edycja -

<!-- -- edycja samochodu uwzględniając zniecie nie działa okey -->
<!-- -- "ZADANIA NA DZIŚ" rozwijane informacje powinny być tylko dla jednego rekordu -->
<!-- -- "CarRentEdit" -- Dopłata za wydłużony czas najmu -- pole przyjmuje warość 0 na samym początku -->
<!-- -- jak nacisne drugi raz "W uzyciu" to wychodzi kasza (nie pobiera danych) -->
<!-- -- ogarnąć kalendarz na małym ekranie -->
<!-- -- Calendar musi mieć zmieniony 'all day' na 'cały dzień' -->
<!-- --Edycja rezerwacji -- w minutach powstał błąd. Jak zmieniasz minuty ręcznie w dacie koncowej to zmienia minuty w dacie startu -->
<!-- -- w Uzyciu powinniśmy dać napis ze najm jest opóźniony -->
<!-- -- w "Najmij" wystąpił bład na backend nr.lini 688 -- KeyError: 'id_res' żle przekazywane id rezerwacji -->
<!-- -- probelm z warunekiem dat i godziny w CarRent (czas najmu musi wynosić 1godzine - raz działa raz nie działa) -->
<!-- -- Co jeżeli samochód jest zarezerwowany? Czy powinien pojawiać się w liście samochodów do wynajęcia?? (jeżeli tak to dodać kalendaż do CarRent) -->
<!-- -- "ZADANIA NA DZIŚ" Najem opóżniony działa 0 1 godzine za późno (chyba timzone to powoduje albo czas ustawiony w Bazie danyh) -->

<!-- -- "CarRentEdit" -- funkcja ktora rozwija Informacje o kliencie i informacje o płatnościach. -->

<!-- -- "ZADANIA NA DZIŚ" nie zrealizowane rezerwacje, które nie zostały zdezaktywowane co nie pozwolni na najem lub nową rezerwacje. Należy skasować niezdezaktywowaną rezerwacje. -->

<!-- -- zrobić więcej informacji odnośnie zadania na dziś (rezerwacje, najem) -->

<!-- -- zmienić kmentarze w formularzach na reseration jak jest zrobione w CarSingleEditReservation -->
<!-- -- inaczej nazwać ClassName w formularzach 'Pole wymagane' w car reservation i car edit reservation -->
<!-- -- Dokończyć obsługe błedów w carPickup -->

<!-- -- W CarsSerializerRents, CarsSerializerReservation powinniśmy dodać daty końcowe najmu i początkowe rezerwacji -->

<!-- -- dokończy z zmiennymi środowiskowymi w carReservation (została obsługa błędów) -->

<!-- -- W car-pickUp jak wcześniej jest rozliczony klient to pisze i tak,że pole jest wymagane. Trzeba jeszcze raz odklikać, żeby chyciło. -->
<!-- -- W carPickup po relodzie dopiero pokazuje się aktualny najem samochodu -->
<!-- -- w carPickUp musze dodać wiadomość i Total Price zmienić na to co mamy w bazie (z bazy bierze nam poprzedni samochód !!!!!!!!!!!!!!) -->

<!-- -- W carRent trzeba zrobić bsługę błędów -->
<!-- -- zornic dobrą obsługe błędu na RentCar, żeby nie dało się wpiać tego samocho samochodu dwa razy lub wiecej -->
<!-- -- dodać pole "wiadmość do rezerwacji -->

<!-- -- w CarRent jak nacisne dwa razy wynajmij to zapisuje dwukrotnie auto jako wynajęte a powinien wyskoczyć bład ze pomiędzy tymi datami mamy wynajęte auto. (Chodzi o samchód Roboor 1980, KCH20O1) -->

<!-- -- Nie działa poprawnie update rezerwacji (udaje się wpisać podwójne rezerwacje i wypisuje errory ze juz taka rezerwacja istnieje)
Rozwiązanie: w endopicie updateReservation powstał konflikt nazw. W zmiennej która pobiera rekord z bazy danych rezerwacji nazywała się tak samo jak iterator w pętli for. Spowodowało to zmiane rekordu na ostatni obiekt/rekord z interatora  -->

https://stackoverflow.com/questions/61740953/reactjs-resize-image-before-upload

OPIS carRentEdit (mechanika daty i czasu)

1. Wybór daty
   -- nie posiadmy daty domyślniej/początkowej.
   -- gdy nie wybierzemy daty to po nasiśnięciu przycisku "Zmień" warunek który sparwdza czy data istnieje będzie na False co uruchomi zmenną endDateMsg, która wyświetli nam komunikat, że jest to pole wymagane.

2. Wybór godziny
   -- po włączeniu komponentu zostaje uruchomionu Use effect z komentarzem 'Set default endTimeValue' ,który ustala początkową wartość godziny (10:00).
   Wtedy zeienna 'endTimeValue' zostaje uzupełniona początkową godziną.
   -- gdy zmienimy godzine to wtedy UseEffect z komentarzem 'Set default endTimeValue' uruchomi się ale nie spełni warunku. Dzieki temu godzina nie ustawi się na wartość początkową czyli na 10:00.
   -- przy zmianie godziny zostaje uruchomiana funcja 'SubmitEndTime'. W paramentrze tej funkcji zostaje przekazany obiekt 'time', z którego możemy wyciągnąć godzine (let getTime = time.nativeEvent.text) i przypisać ją do zmiennej 'getEndTimeHoursAndMinutes' (setEndTimeGetHoursAndMinutes(getTime)).

3. Uruchomienie funcji 'submitHandler'
   -- aby data i godzina była zapisana w bazie danych, musi być złączona, ponieważ data i godzina są w jednej kolmnie w tabeli/modelu w bazie.
   Dlatego musimy na frontendzie złączyć date i godzine. Do tego używamy zmiennej lokalnej 'endDateTimeCombiner w funkcji 'submitHandler' (jest ona uruchamiana w momencie naciśnięcia przycisku "Zmień" w formularzu).
   -- do zmiennej 'endDateTimeCombiner' przypisujemy date wybraną z formularza (let endDateTimeCombiner = endDate)
   -- gdy posiadamy date i godzine zostaną spełnione dwa warunki: if(getEndTimeHoursAndMinutes) i zagnieżdżony w nim if(endDateTimeCombiner). Drugi warunek zostaje spełniony ponieważ została do niego przypisana wartość daty (let endDateTimeCombiner = endDate).
   -- w następnym etapie godzina zostaje dopisana do endDateTimeCombiner : godziny: endDateTimeCombiner.setHours(getEndTimeHoursAndMinutes.getHours()) i minuty endDateTimeCombiner.setMinutes(getEndTimeHoursAndMinutes.getMinutes())
   -- następny warunek porównuję datę i godzinę wybraną z formularza (czyli endDateTimeCombiner) z bieżącą datą najmu (currentRentDate.getTime() > newRentDate.getTime())
