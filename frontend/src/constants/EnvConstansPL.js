//************************************GLOBAL************************************//
export const SET_DATE_TIME_RESERVATION = 1000 * 60 * 60;
export const MIN_DURATION = 1000 * 60 * 60;
export const TRANSFER_TIME = 4000 * 60 * 60;
export const MAX_TIME_LOGOUT = 1000 * 60 * 60 * 24 * 20;
export const SET_DATE_TIME_RESERVATION_MSG =
  "Data rezerwacji musi być z godzinnym wyprzedzeniem";
export const MIN_DURATION_MSG =
  "Data końca rezerwacji musi być póżniejsza od jej początku.";
export const MIN_DURATION_RENT_MSG =
  "Wybrałeś złą date zwrotu samochodu. Minimalny czas wynajmu wynosi 1 godzinę.";
export const WRONG_START_DATE_AND_TIME = "Błędnie wybrana data";
export const MIN_DURATION_RENT_EDIT_MSG =
  "Zwrot samochou musi nastąpić na 1 godzinę przed rezerwacją";
export const TIME_CLEAR_MSG = 5000;
export const OPTION_CCY = ["EUR", "USD", "PLN", "GBP"];
export const OPTION_DOC = [
  "Paszport",
  "Dowód osobisty",
  "Prawo jazdy",
  "Karta pobytu",
  "Inny",
];

//TimePicker
export const TIME_STEP = 15;
export const TIME_MIN_VALUE = new Date("01/02/2021 06:00 AM");
export const TIME_MAX_VALUE = new Date("01/02/2021 08:00 PM");
export const TIME_DEFAULT_VALUE_START = new Date("01/02/2021 01:00 PM");
export const TIME_DEFAULT_VALUE_END = new Date("01/02/2021 10:00 AM");

//Icons
export const RESERVATION_ICON = "fas fa-book-reader";
export const RENT_ICON = "fas fa-car";
export const BACK_TO_MENU = "fas fa-backward";
export const EDIT = "fas fa-pen";
export const DELETE = "fas fa-trash";
export const PICK_UP_ICON = "fas fa-arrow-circle-left";

//Delete message
export const DELETE_MESSAGE =
  "Czy jesteś pewny, że chcesz skasować użytkownika?";
export const DELETE_RESERVATION_MSG =
  "Czy jesteś pewny, że chcesz skasować rezerwacje?";

//Errors and Success
export const REQUEST_FAIL_WITH_STATUS_CODE_404 =
  "Request failed with status code 404";
export const REQUEST_FAIL_WITH_STATUS_CODE_404_PL =
  "Brak połaczenia z serwerem";
export const REQUEST_FAILED_WITH_STATUS_CODE_500 =
  "Request failed with status code 500";
export const REQUEST_FAILED_REST_OF_STATUS_CODE =
  "Błąd sieciowy. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.";
export const REQUEST_FAILED_WITH_STATUS_CODE_500_PL =
  "Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.";
export const WRONG_CREDENTIALS =
  "No active account found with the given credentials";
export const WRONG_CREDENTIALS_PL = "Niepoprawna nazwa użytkownika lub hasło";
export const REGISTRATION_NO_ALREADY_EXIST =
  "Podany kod rejestracyjny już istnieje";
export const NAME_ALREADY_EXIST = "Podana nazwa już istnieje";
export const ERROR_UPLOAD_PICTURE =
  "Błąd sieciowy. Zdjęcie nie zostało dodane.";
export const ENTERED_PASSWORD_ARE_NOT_THE_SAME =
  "Podane hasła nie są takie same";

export const SUCCESS_MESSAGE_EDIT_RESERVATION =
  "Rezerwacja została zmieniona pomyślnie";
export const SUCCESS_LOCATION_ADD = "Lokalizacja została dodana do listy";
export const SUCCESS_CAR_ADD = "Samochód został dodany do listy";
export const SUCCESS_CAR_EDIT = "Dane samochodu zostały zminione poprawnie";
export const SUCCESS = "Success";
export const SUCCESS_PICK_UP = "Samochód został odebrany od klienta";
export const SUCCESS_EDIT_RESERVATION = "Operacja zakończona sukcesem";

export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_1 =
  "zakres dat istnieje dla dataStart";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_2 =
  "zakres dat istnieje dla dataEnd";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_3 = "zawarty zakres dat";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_4 =
  "zakres dat najmu istnieje dla dataStart";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_5 =
  "zakres dat najmu istnieje dla dataEnd";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_6 =
  "zawarty zakres dat dla najmu";

export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG =
  "Rezerwacja w tych przedziałach czasu już istnieje dla daty początkowej.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG =
  "Rezerwacja w tych przedziałach czasu już istnieje dla daty końcowej.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG =
  "Rezerwacja w tych przedziałach czasu już istnieje.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG =
  "Najem w tych przedziałach czasu już istnieje dla daty początkowej.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG =
  "Najem w tych przedziałach czasu już istnieje dla daty końcowej.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG =
  "Najem w tych przedziałach czasu już istnieje.";

//Button
export const BTN_BACK = "Powrót";
export const BTN_NEW_USER = "Nowy użytkownik";
export const BTN_NEW_CAR = "Nowy samochód";
export const BTN_NEW_LOCALISATION = "Nowa lokalizacja";
export const BTN_EDIT = "Edycja";
export const BTN_DELETE = "Kasuj";
export const SUBMIT_BTN = "Zaloguj się";
export const BTN_CHANGE = "Zmień";
export const BTN_SAVE = "Zapisz";
export const BTN_CALENDAR = "Kalendarz";
export const BTN_SHOW = "Pokaż";
export const BTN_ADD_PICTURE = "Dodaj zdjęcie";
export const BTN_ADD_RESRVATION = "Dodaj rezerwacje";
export const BTN_PICK_UP = "Obierz";
export const BTN_RENT = "Najem";
export const BTN_RESRVATION = "Rezerwuj";
export const BTN_SHOW_MORE = "Pokaż";
export const BTN_WRAP_OUT = "Zwiń";
export const BTN_NEXT = "Dalej";
export const BTN_SEARCH = "Wyszukaj";

//Options
export const OPTION_0 = "0";

//Conditions
export const CONDITION_RENT = "Najem";
export const CONDITION_DELAY_RENT = "Najem opóźniony";
export const CONDITION_RESERVATION = "Rezerwacja";
export const CONDITION_DELAY_RESERVATION = "Rezerwacja opóźniona";

//************************************COMPONENTS************************************//

//************Header************//
export const HEADER_LOCATIONS = "Lokalizacje";
export const HEADER_RESERVATIONS = "Rezerwacje";
export const HEADER_RESERVATIONS_NEW = "Nowa";
export const HEADER_RESERVATIONS_SEARCH = "Szukaj";
export const HEADER_USER = "User";
export const HEADER_USER_MY_PROFILE = "Mój profil";
export const HEADER_USER_MY_ADMIN = "Admin";
export const HEADER_USER_MY_LOGOUT = "Wyloguj się";

//************Login************//
//Title
export const LOGIN_TITLE = "Wypożyczalnia samochodów";
export const LOGIN_SUBTITLE = "Logowanie do systemu";
export const LOGIN_USER_NAME_TITLE = "Nazwa użytkownika";
export const LOGIN_PASSWORD = "Hasło";

//Placeholder
export const LOGIN_USER_NAME_PLACEHOLDER = "Nazwa użytkownika";
export const LOGIN_PASSWORD_PLACEHOLDER = "Hasło";

//Validators
export const LOGIN_USER_NAME_REQUIRED = "Pole wymagane";
export const LOGIN_USER_NAME_MIN_LENGTH =
  "Nazwa uzytkownika musi składać się z przynajmniej 2 liter";
export const LOGIN_USER_NAME_PATTERN = "Można używać tylko liter";
export const LOGIN_PASSWORD_REQUIRED = "Pole wymagane";
export const LOGIN_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";

//************MainPage************//
export const MAINPAGE_TITLE = "Wybierz lokalizacje";

//************MyProfile************//
//Title
export const MY_PROFILE_TITLE = "Zmiana hasła";
export const MY_PROFILE_USERNAME_TITLE = "Nazwa użytkownika";
export const MY_PROFILE_EMAIL_TITLE = "Email";
export const MY_PROFILE_PASSWORD_TITLE = "Hasło";
export const MY_PROFILE_CONFIRM_PASSWORD_TITLE = "Potwierdź hasło";

//Placeholder
export const MY_PROFILE_USERNAME_PLACEHOLDER = "Brak nazwy użytkownika";
export const MY_PROFILE_EMAIL_PLACEHOLDER = "Brak adresu email";
export const MY_PROFILE_PASSWORD_PLACEHOLDER = "Hasło";
export const MY_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER = "Potwierdź hasło";

//Validators
export const MY_PROFILE_USERNAME_REQUIRED = "Pole wymagane";
export const MY_PROFILE_USERNAME_MIN_LENGTH =
  "Nazwa uzytkownika musi składać się z przynajmniej 2 liter";
export const MY_PROFILE_USERNAME_PATTERN = "Można uzywać tylko liter";
export const MY_PROFILE_EMAIL_PATTERN = "Niepoprawny format email";
export const MY_PROFILE_PASSWORD_REQUIRED = "Pole wymagane";
export const MY_PROFILE_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";
export const MY_PROFILE_CONFIRM_PASSWORD_REQUIRED = "Pole wymagane";
export const MY_PROFILE_CONFIRM_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";

//Succes message
export const MY_PROFILE_SUCCESS_MSG = "Hasło zostało zmienione";
export const MY_PROFILE_PASSWORD_ARE_NOT_THE_SAME =
  "Podane hasła nie są takie same";

//************Admin************//
export const ADMIN_USERS_TITLE = "Użytkownicy";
export const ADMIN_LOCATIONS_TITLE = "Lokalizacje";
export const ADMIN_CARS_TITLE = "Samochody";

//************UsersList************//
export const USERS_LIST_TITLE = "Lista użytkowników";

//************CreateUser************//
//Title
export const CREATE_USER_TITLE = "Utwórz konto";
export const CREATE_USER_NAME_TITLE = "Nazwa użytkownika";
export const CREATE_USER_EMAIL_TITLE = "Email";
export const CREATE_USER_PASSWORD_TITLE = "Hasło";
export const CREATE_USER_CONFIRM_PASSWORD_TITLE = "Powtórz hasło";

//Placeholder
export const CREATE_USER_NAME_PLACEHOLDER = "Brak nazwy użytkownika";
export const CREATE_USER_EMAIL_PLACEHOLDER = "Brak adresu email";
export const CREATE_USER_PASSWORD_PLACEHOLDER = "Hasło";
export const CREATE_USER_CONFIRM_PASSWORD_PLACEHOLDER = "Potwierdź hasło";

//Validators
export const CREATE_USER_NAME_REQUIRED = "Pole wymagane";
export const CREATE_USER_NAME_MIN_LENGTH =
  "Nazwa użytkownika musi składać się z przynajmniej 2 liter";
export const CREATE_USER_NAME_PATTERN = "Można używać tylko liter";

export const CREATE_USER_EMAIL_PATTERN = "Niepoprawny format email";

export const CREATE_USER_PASSWORD_REQUIRED = "Pole wymagane";
export const CREATE_USER_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";

export const CREATE_USER_CONFIRM_PASSWORD_REQUIRED = "Pole wymagane";
export const CREATE_USER_CONFIRM_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";

//************UserEdit************//
//Title
export const USER_EDIT_TITLE = "Edycja Użytkownika";
export const USER_EDIT_NAME_TITLE = "Nazwa użytkownika";
export const USER_EDIT_EMAIL_TITLE = "Email";
export const USER_EDIT_CHANGE_PASSWORD_TITLE =
  "Chcę zmienić hasło pracownika/użytkownika";
export const USER_EDIT_PASSWORD_TITLE = "Hasło";
export const USER_EDIT_CONFIRM_PASSWORD_TITLE = "Powtórz hasło";
export const USER_EDIT_ADMIN_TITLE = "Admin";

//Placeholder
export const USER_EDIT_NAME_PLACEHOLDER = "Brak nazwy użytkownika";
export const USER_EDIT_EMAIL_PLACEHOLDER = "Brak adresu email";
export const USER_EDIT_PASSWORD_PLACEHOLDER = "Hasło";
export const USER_EDIT_CONFIRM_PASSWORD_PLACEHOLDER = "Potwierdź hasło";

//Validators
export const USER_EDIT_NAME_REQUIRED = "Pole wymagane";
export const USER_EDIT_NAME_MIN_LENGTH =
  "Nazwa użytkownika musi składać się z przynajmniej 2 liter";
export const USER_EDIT_NAME_PATTERN = "Można używać tylko liter";

export const USER_EDIT_EMAIL_PATTERN = "Niepoprawny format email";

export const USER_EDIT_PASSWORD_REQUIRED = "Pole wymagane";
export const USER_EDIT_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";

export const USER_EDIT_CONFIRM_PASSWORD_REQUIRED = "Pole wymagane";
export const USER_EDIT_CONFIRM_PASSWORD_MIN_LENGTH =
  "Hasło musi mieć przynajmniej 8 znaków";

//************Localisation************//
export const LOCALISATION_TITLE = "Lista lokalizacji";
export const LACK_OF_LOCALISATION = "Brak lokalizacji";

//************LocationEdit************//
//Title
export const LOCATION_EDIT_TITLE = "Edytowanie lokalizacji";
export const LOCATION_EDIT_LOCATION_NAME_TITLE = "Nazwa lokalizacji";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_TITLE = "Nazwa skrócona";
export const LOCATION_EDIT_CHOOSE_PICTURE = "Wybierz zdjęcie";

//Placeholder
export const LOCATION_EDIT_LOCATION_NAME_PLACEHOLDER = "Brak nazwy lokalizacji";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_PLACEHOLDER =
  "Brak nazwy skróconej";

//Validators
export const LOCATION_EDIT_LOCATION_NAME_REQUIRED = "Pole wymagane";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_REQUIRED = "Pole wymagane";
export const LOCATION_EDIT_LOCATION_NAME_MIN_LENGTH =
  "Nazwa lokalizacji musi składać się z przynajmniej 10 liter";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_MIN_LENGTH =
  "Nazwa lokalizacji musi składać się z przynajmniej 2 litery";
export const LOCATION_EDIT_LOCATION_NAME_PATTERN = "Można uzywać tylko liter";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_PATTERN =
  "Można uzywać tylko liter";

//************NewLocation************//
//Title
export const NEW_LOCATION_TITLE = "Utwórz Lokalizacje";
export const NEW_LOCATION_LOCATION_NAME_TITLE = "Nazwa lokalizacji";
export const NEW_LOCATION_LOCATION_SHORT_NAME_TITLE = "Nazwa skrócona";
export const NEW_LOCATION_CHOOSE_PICTURE = "Wybierz zdjęcie";

//Placeholder
export const NEW_LOCATION_LOCATION_NAME_PLACEHOLDER = "Brak nazwy lokalizacji";
export const NEW_LOCATION_LOCATION_SHORT_NAME_PLACEHOLDER =
  "Brak nazwy skróconej";

//Validators
export const NEW_LOCATION_LOCATION_NAME_REQUIRED = "Pole wymagane";
export const NEW_LOCATION_LOCATION_SHORT_NAME_REQUIRED = "Pole wymagane";
export const NEW_LOCATION_LOCATION_NAME_MIN_LENGTH =
  "Nazwa lokalizacji musi składać się z przynajmniej 10 liter";
export const NEW_LOCATION_LOCATION_SHORT_NAME_MIN_LENGTH =
  "Nazwa lokalizacji musi składać się z przynajmniej 2 litery";
export const NEW_LOCATION_LOCATION_NAME_PATTERN = "Można uzywać tylko liter";
export const NEW_LOCATION_LOCATION_SHORT_NAME_PATTERN =
  "Można uzywać tylko liter";

//************CarsAdmin************//
export const CARS_ADMIN_TITLE = "Lista samochodów";

//************CarsCreate************//
//Title
export const CARS_CREATE_TITLE = "Dodaj nowy samochód";
export const CARS_CREATE_CAR_NAME_TITLE = "Nazwa samochodu";
export const CARS_CREATE_CAR_SHORT_NAME_TITLE = "Nazwa skrócona";
export const CARS_CREATE_CAR_REGISTRATION_NO_TITLE = "Numer rejestracyjny";
export const CARS_CREATE_CAR_MAIN_LOCATION_TITLE = "Lokalizacja początkowa";
export const CARS_CREATE_CHOOSE_PICTURE = "Wybierz zdjęcie";

//Placeholder
export const CARS_CREATE_CAR_NAME_PLACEHOLDER = "Brak nazwy samochodu";
export const CARS_CREATE_CAR_SHORT_NAME_PLACEHOLDER = "Brak nazwy skróconej";
export const CARS_CREATE_CAR_REGISTRATION_NO_PLACEHOLDER =
  "Brak kodu rejestracyjnego";

//Validators
export const CARS_CREATE_CAR_NAME_REQUIRED = "Pole wymagane";
export const CARS_CREATE_CAR_NAME_MIN_LENGTH =
  "Nazwa samochodu musi składać się z przynajmniej 10 znaków";

export const CARS_CREATE_CAR_SHORT_NAME_REQUIRED = "Pole wymagane";
export const CARS_CREATE_CAR_SHORT_NAME_MIN_LENGTH =
  "Nazwa samochodu musi składać się z przynajmniej 2 znaków";

export const CARS_CREATE_CAR_REGISTRATION_NO_REQUIRED = "Pole wymagane";
export const CARS_CREATE_CAR_REGISTRATION_MIN_LENGTH =
  "Kod rejestracyjny musi składać się przynajmniej z 6 znaków";

export const CARS_CREATE_CAR_MAIN_LOCATION_REQUIRED = "Pole wymagane";

//************CarsEdit************//
//Title
export const CARS_EDIT_TITLE = "Edycja samochodu";
export const CARS_EDIT_CAR_NAME_TITLE = "Nazwa samochodu";
export const CARS_EDIT_CAR_SHORT_NAME_TITLE = "Nazwa skrócona";
export const CARS_EDIT_CAR_REGISTRATION_NO_TITLE = "Numer rejestracyjny";
export const CARS_EDIT_CAR_MAIN_LOCATION_TITLE = "Lokalizacja początkowa";
export const CARS_EDIT_CAR_NEW_MAIN_LOCATION_TITLE =
  "Nowa lokalizacja początkowa";
export const CARS_EDIT_CHECKBOX_READY_FOR_RENT = "Gotowy do wynajmu";

//Placeholder
export const CARS_EDIT_CAR_NAME_PLACEHOLDER = "Brak nazwy samochodu";
export const CARS_EDIT_CAR_SHORT_NAME_PLACEHOLDER = "Brak nazwy skróconej";
export const CARS_EDIT_CAR_REGISTRATION_NO_PLACEHOLDER =
  "Brak kodu rejestracyjnego";

//Validators
export const CARS_EDIT_CAR_NAME_REQUIRED = "Pole wymagane";
export const CARS_EDIT_CAR_NAME_MIN_LENGTH =
  "Nazwa samochodu musi składać się z przynajmniej 10 znaków";

export const CARS_EDIT_CAR_SHORT_NAME_REQUIRED = "Pole wymagane";
export const CARS_EDIT_CAR_SHORT_NAME_MIN_LENGTH =
  "Nazwa samochodu musi składać się z przynajmniej 2 znaków";

export const CARS_EDIT_CAR_REGISTRATION_NO_REQUIRED = "Pole wymagane";
export const CARS_EDIT_CAR_REGISTRATION_MIN_LENGTH =
  "Kod rejestracyjny musi składać się przynajmniej z 6 znaków";

export const CARS_EDIT_CAR_NEW_MAIN_LOCATION_REQUIRED = "Pole wymagane";

//************UploadImage************//
export const UPLOAD_IMAGE_REGISTRATION_NO_TITLE = "Numer rejestracyjny:";
export const UPLOAD_IMAGE_CHOOSE_PICTURE = "Wybierz zdjęcie";

//************CarShow************//
export const CAR_SHOW_REGISTRATION_NO_TITLE = "Numer rejestracyjny:";

//************CarLocationList************//
// Title
export const CAR_LOCATION_LIST_TITLE = "Lokalizacja: ";
export const CAR_LOCATION_LIST_RENT_SUBTITLE = "Lista samochodów do wynajęcia";
export const CAR_LOCATION_LIST_IN_USE_SUBTITLE = "Lista samochodów w użyciu";
export const CAR_LOCATION_LIST_TO_DO_SUBTITLE = "Lista zadań na dziś";
export const CAR_LOCATION_LIST_RESERVATIONS_SUBTITLE =
  "Lista dostępnych aut do rezerwacji";
export const CAR_LOCATION_LIST_EDIT_RESERVATION_SUBTITLE =
  "Lista aut posiadających rezerwacje";
export const CAR_LOCATION_LIST_EDIT_RESERVATION_FROM_SUBTITLE =
  "Rezerwacja od:";
export const CAR_LOCATION_LIST_IN_USE_DATE_SUBTITLE = "W użyciu do: ";
export const CAR_LOCATION_LIST_OTHER_LOCATISATION =
  "Samochód w innej lokalizacji";
export const CAR_LOCATION_LIST_FILTERS = "Filtry";

//Button
export const CAR_LOCATION_LIST_RENT_BTN_NAME = "Najem";
export const CAR_LOCATION_LIST_IN_USE_BTN_NAME = "W użyciu";
export const CAR_LOCATION_LIST_TO_DO_BTN_NAME = "Zadania na dziś";
export const CAR_LOCATION_LIST_NEW_RESERVATION_BTN_NAME = "Nowa rezerwacja";
export const CAR_LOCATION_LIST_EDIT_RESERVATION_BTN_NAME = "Edycja rezerwacji";
export const CAR_LOCATION_LIST_FILTER_ALL_BTN_NAME = "Wszystko";
export const CAR_LOCATION_LIST_FILTER_RESERVATIONS_BTN_NAME = "Rezerwacja";
export const CAR_LOCATION_LIST_FILTER_RENTS_BTN_NAME = "Najem";
export const CAR_LOCATION_LIST_EDIT_BTN = "Edycja";
export const CAR_LOCATION_LIST_RENT_BTN = "Najem";
export const CAR_LOCATION_LIST_PICK_UP_BTN = "Odbierz";
export const CAR_LOCATION_LIST_DELETE_BTN = "Kasuj";

//List
export const CAR_LOCATION_LIST_AMOUNT_OF_POSITIONS = "Ilość pozycji: ";
export const CAR_LOCATION_LIST_RENT_TYPE = "Najem";

export const CAR_LOCATION_LIST_CONTACT_INFO_TITLE = "Dane kontaktowe:";
export const CAR_LOCATION_LIST_CONTACT_INFO_CLIENT_NAME = "Nazwa klienta:";
export const CAR_LOCATION_LIST_CONTACT_INFO_ID_NO = "Numer:";
export const CAR_LOCATION_LIST_CONTACT_INFO_TEL = "Telefon: ";
export const CAR_LOCATION_LIST_CONTACT_INFO_EMAIL = "Email: ";
export const CAR_LOCATION_LIST_CONTACT_INFO_DEPOSIT = "Kaucja: ";
export const CAR_LOCATION_LIST_CONTACT_INFO_TOTAL_PRICE = "Cena najmu: ";

//Delete
export const CAR_LOCATION_LIST_DELETE_MSG =
  "Czy jesteś pewny, że chcesz skasować rezerwacje?";

//************CarEditReservation************//

// Title
export const CAR_EDIT_RESERVATION_NO_RESERVATION_TITLE = "Nr rejestracyjny:";

//Card content
export const CAR_EDIT_RESERVATION_PHONE_NO = "Telefon :";
export const CAR_EDIT_RESERVATION_EMAIL = "Email :";

// Button
export const CAR_EDIT_RESERVATION_BACK_TO_MENU_BUTTON_NAME = "Powrót do menu";

//Delete
export const CAR_EDIT_RESERVATION_DELETE_MSG =
  "Czy jesteś pewny, że chcesz skasować rezerwacje?";

//************CarSingleEditReservation************//

//Title
export const CAR_SINGLE_EDIT_RESERVATION_TITLE = "Edycja rezerwacji";

//Form

/// Title
export const CAR_SINGLE_EDIT_RESERVATION_CUSTOMER_NAME_TITLE = "Nazwa klienta";
export const CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_TYPE_TITLE =
  "Rodzaj dokumentu";
export const CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_NO_TITLE = "Numer dokumentu";
export const CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_TITLE = "Numer telefonu";
export const CAR_SINGLE_EDIT_RESERVATION_EMAIL_TITLE = "Email";
export const CAR_SINGLE_EDIT_RESERVATION_RENT_FROM_TITLE = "Rezerwacja od";
export const CAR_SINGLE_EDIT_RESERVATION_RENT_TO_TITLE = "Rezerwacja do";
export const CAR_SINGLE_EDIT_RESERVATION_TIME_TITLE = "Godzina";
export const CAR_SINGLE_EDIT_RESERVATION_REGISTRATION_NO =
  "Numer rejestracyjny: ";
export const CAR_SINGLE_EDIT_RESERVATION_LOCATISATION_SUBTITLE =
  "Miejsce odbioru samochodu: ";
export const CAR_SINGLE_EDIT_RESERVATION_SUBTITLE =
  "Nowe miejsce odbioru samochodu";
export const CAR_SINGLE_EDIT_RESERVATION_ADDITIONAL_INFO_TITLE =
  "Uwagi do rezerwacji";

/// Placeholder
export const CAR_SINGLE_EDIT_RESERVATION_NO_CUSTOMER_NAME =
  "Brak nazwy klienta";
export const CAR_SINGLE_EDIT_RESERVATION_DATE_FROM = "Data początkowa";
export const CAR_SINGLE_EDIT_RESERVATION_DATE_TO = "Data końcowa";

/// Validations
export const CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_MSG =
  "Nazwa klienta musi składać się z przynajmniej 10 liter";
export const CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_VALUE = 10;
export const CAR_SINGLE_EDIT_RESERVATION_REQUIRED_CLIENT_NAME =
  "Nazwa wynajmującego jest wymagana";
export const CAR_SINGLE_EDIT_RESERVATION_SELECT_FROM_THE_LIST =
  "Należy wybrać z listy";
export const CAR_SINGLE_EDIT_RESERVATION_DOCUMENT_NO_REQUIRED =
  "Numer dokumentu jest wymagany";
export const CAR_SINGLE_EDIT_RESERVATION_INPROPER_PHONE_NO =
  "Niepoprawny numer telefonu";
export const CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_REQUIRED =
  "Numer telefonu jest wymagany";
export const CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_MSG =
  "Numer telefonu może zawirać nie więcej niż 15 znaków";
export const CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_VALUE = 15;
export const CAR_SINGLE_EDIT_RESERVATION_INPROPER_EMAIL =
  "Niepoprawny format email";
export const CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED =
  "Pole wymagane";
export const CAR_SINGLE_EDIT_RESERVATION_REQUIRED_LOCATION =
  "Lokalizacja wymagana";

/// Options
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_0 = "0";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_PASSPORT = "Paszport";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_ID = "Dowód osobisty";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_DRIVING_LICENSE = "Prawo jazdy";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_OTHER = "Inne";

/// Button
export const CAR_SINGLE_EDIT_RESERVATION_BUTTON_NAME = "Edycja";

//************CarRent************//

//Title
export const CAR_RENT_TITLE = "Wynajem auta";
export const CAR_RENT_RENT_BASED_ON_RESERVATION =
  "Wynajem auta na podstawie rezerwacji";

//Form

/// Title
export const CAR_RENT_CUSTOMER_NAME_TITLE = "Nazwa klienta";
export const CAR_RENT_DUCUMENT_TYPE_TITLE = "Rodzaj dokumentu";
export const CAR_RENT_DUCUMENT_NO_TITLE = "Numer dokumentu";
export const CAR_RENT_PHONE_NO_TITLE = "Numer telefonu";
export const CAR_RENT_EMAIL_TITLE = "Email";
export const CAR_RENT_RENT_FROM_TITLE = "Rezerwacja od";
export const CAR_RENT_RENT_TO_TITLE = "Najem do";
export const CAR_RENT_TIME_TITLE = "Godzina";
export const CAR_RENT_DEPOSIT_TITLE = "Wysokość kaucji";
export const CAR_RENT_DEPOSIT_IS_PAID_TITLE = "Kaucja została zapłacona";
export const CAR_RENT_TOTAL_PRICE_TITLE = "Cena najmu";
export const CAR_RENT_DEPOSIT_CURRENCY_TITLE = "Rodzaj waluty";
export const CAR_RENT_TOTAL_PRICE_IS_PAID_TITLE = "Płatność z góry";
export const CAR_RENT_NOTE_MSG_TITLE = "Dodatkowe informacje";
export const CAR_RENT_LOCATION_TITLE = "Lokalizacja oddania samochodu";
export const CAR_RENT_COME_BACK_TITLE = "Wróć do mnie";
export const CAR_RESERVATION_BUTTON_BACK_TO_MENU = "Powrót";

/// Subtitle
export const CAR_RENT_GENERAL_INFO_SUBTITLE = "Podstawowe informacje";
export const CAR_RENT_PAYMENTS_SUBTITLE = "Płatności";
export const CAR_RENT_TAKE_BACK_SUBTITLE = "Odbiór samochodu";
export const CAR_RENT_NO_REGISTRATION_SUBTITLE = "Numer rejestracyjny:";
export const CAR_RENT_LOCATISATION_SUBTITLE = "Bieżąca lokalizacja:";

/// Placeholder
export const CAR_RENT_NO_CUSTOMER_NAME = "Brak nazwy klienta";
export const CAR_RENT_DATE_FROM = "Data początkowa";
export const CAR_RENT_TO_FROM = "Data końcowa";

/// Validations
export const CAR_RENT_MIN_LENGTH_MSG =
  "Nazwa klienta musi składać się z przynajmniej 10 liter";
export const CAR_RENT_MIN_LENGTH_VALUE = 10;
export const CAR_RENT_REQUIRED_CLIENT_NAME =
  "Nazwa wynajmującego jest wymagana";
export const CAR_RENT_SELECT_FROM_THE_LIST = "Należy wybrać z listy";
export const CAR_RENT_DOCUMENT_NO_REQUIRED = "Numer dokumentu jest wymagany";
export const CAR_RENT_INPROPER_PHONE_NO = "Niepoprawny numer telefonu";
export const CAR_RENT_PHONE_NO_REQUIRED = "Numer telefonu jest wymagany";
export const CAR_RENT_MAX_LENGTH_MSG =
  "Numer telefonu może zawirać nie więcej niż 15 znaków";
export const CAR_RENT_MAX_LENGTH_VALUE = 15;
export const CAR_RENT_INPROPER_EMAIL = "Niepoprawny format email";
export const CAR_RENT_DATE_AND_TIME_REQUIRED = "Pole wymagane";
export const CAR_RENT_REQUIRED_DEPOSIT = "Pole wymagane";
export const CAR_RENT_IS_PAID_REQUIRED = "Kaucja musi być zapłacona";
export const CAR_RENT_INPROPER_DEPOSIT = "Niepoprawny format ceny depozytu";
export const CAR_RENT_INPROPER_TOTAL_PRICE = "Nieprawidłowy format ceny najmu";
export const CAR_RENT_REQUIRED_TOTAL_PRICE = "Pole wymagane";
export const CAR_RENT_REQUIRED_LOCATION = "Lokalizacja wymagana";

/// Options
export const CAR_RENT_OPTION_0 = "Brak nazwy klienta";

//Error handling
export const CAR_RENT_CREATE_MSG = "Najem został dokonany";
export const CAR_RENT_ERROR_HANDLING_SUCCESS = "Car was rent";
export const CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7 =
  "samochód nie został odebrany od klienta";
export const CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7_MSG =
  "Ten samochód nie został odebrany od klienta.";

//************CarRentEdit************//
//Title
export const CAR_RENT_EDIT_TITLE = "Edycja najmu";
export const CAR_RENT_EDIT_NO_REGISTRATION_SUBTITLE = "Numer rejestracyjny:";
export const CAR_RENT_EDIT_GENERAL_INFO_SUBTITLE = "Informacje o kliencie";
export const CAR_RENT_EDIT_PAYMENTS_INFO_TITLE = "Informacje o płatnościach";

///General Information
export const CAR_RENT_EDIT_PHONE = "Numer telefonu: ";
export const CAR_RENT_EDIT_CLIENT_NAME = "Imię i nazwisko wynajmującego: ";
export const CAR_RENT_EDIT_DOC_TYPE = "Rodzaj dokumentu: ";
export const CAR_RENT_EDIT_EMAIL = "Email: ";
export const CAR_RENT_EDIT_DATE_FROM = "Data rozpoczęcia najmu: ";
export const CAR_RENT_EDIT_DATE_TO = "Data końca najmu: ";

///Payments Information
export const CAR_RENT_EDIT_DEPOSIT = "Kaucja: ";
export const CAR_RENT_EDIT_TOTAL_PRICE = "Cena najmu: ";
export const CAR_RENT_EDIT_TOTAL_PRICE_UNPAID = "niezapłacone";
export const CAR_RENT_EDIT_TOTAL_PRICE_PAID = "zapłacone";

//Form

///Title
export const CAR_RENT_EDIT_NOTE_TITLE = "Dodatkowe informacje";
export const CAR_RENT_EDIT_DATEPICKER_TO_TITLE = "Nowa data najmu";
export const CAR_RENT_EDIT_TIMEPICKER_TO_TITLE = "Godzina";
export const CAR_RENT_EDIT_TOTAL_PRICE_TITLE = "Dopłata";
export const CAR_RENT_EDIT_TOTAL_PRICE_CURRENCY_TITLE = "Waluta";
export const CAR_RENT_EDIT_LOCATISATION_SUBTITLE = "Miejsce zwrotu samochodu :";
export const CAR_RENT_EDIT_LOCATION_TITLE = "Nowe miejsce zwrotu samochodu";

///Placeholder
export const CAR_RENT_EDIT_DATE_DATEPICKER = "Data końcowa najmu";

///Validators
export const CAR_RENT_EDIT_DATE_AND_TIME_REQUIRED =
  "Należy podać nową date najmu";
export const CAR_RENT_EDIT_TIME_REQUIRED = "Pole wymagane";
export const CAR_RENT_EDIT_INPROPER_DATE =
  "Nowa data najmu powinna być większa od dzisiejszej daty.";
export const CAR_RENT_EDIT_INPROPER_TOTAL_PRICE = "Niepoprawny format";
export const CAR_RENT_EDIT_TOTAL_PRICE_REQUIRED = "Pole wymagane";
export const CAR_RENT_EDIT_REQUIRED_LOCATION = "Lokalizacja wymagana";

//Error handling
export const CAR_RENT_EDIT_ERROR_HANDLING_SUCCESS =
  "Operacja zakończona sukcesem";
export const CAR_RENT_EDIT_CREATE_MSG = "Edycja najmu zakończona sukcesem";
export const CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1 =
  "zakres dat istnieje dla dataEnd";
export const CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG =
  "Przedłużenie najmu pokrywa się z rezerwacją";
export const CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2 =
  "zakres dat istnieje dla dataEnd + 1h";
export const CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG =
  "Zwrot samochodu musi nastąpić na 1 godzinę przed planowaną nową rezerwacją";

//Options
export const CAR_RENT_EDIT_OPTION_0 = "0";

//************CarPickUp************//

//Title
export const CAR_PICK_UP_TITLE = "Odbierz samochód";
export const CAR_PICK_UP_GENERAL_INFO_TITLE = "Informacje ogólne";
export const CAR_PICK_UP_PAYMENTS_INFO_TITLE = "Informacje o płatnościach";

///General Information
export const CAR_PICK_UP_CLIENT_NAME = "Imię i nazwisko wynajmującego: ";
export const CAR_PICK_UP_DOC_TYPE = "Rodzaj dokumentu: ";
export const CAR_PICK_UP_PHONE = "Numer telefonu: ";
export const CAR_PICK_UP_EMAIL = "Email: ";
export const CAR_PICK_UP_DATE_FROM = "Data rozpoczęcia najmu: ";
export const CAR_PICK_UP_DATE_TO = "Data końca najmu: ";

///Payments Information
export const CAR_PICK_UP_DEPOSIT = "Kaucja: ";
export const CAR_PICK_UP_TOTAL_PRICE = "Cena najmu: ";
export const CAR_PICK_UP_TOTAL_PRICE_UNPAID = "niezapłacone";
export const CAR_PICK_UP_TOTAL_PRICE_PAID = "zapłacone";

//Form

///Title
export const CAR_PICK_UP_DEPOSIT_TITLE = "Wysokość kaucji";
export const CAR_PICK_UP_DEPOSIT_CURRENCY_TITLE = "Rodzaj waluty";
export const CAR_PICK_UP_DEPOSIT_IS_ACCOUNTED_TITLE =
  "Kaucja została rozliczona";
export const CAR_PICK_UP_TOTAL_PRICE_TITLE = "Cena najmu";
export const CAR_PICK_UP_TOTAL_PRICE_CURRENCY_TITLE = "Rodzaj waluty";
export const CAR_PICK_UP_TOTAL_PRICE_IS_ACCOUNTED_TITLE =
  "Najem został rozliczony";
export const CAR_PICK_UP_NOTE_TITLE = "Wiadomość dodatkowa";

///Subtitle
export const CAR_PICK_UP_PAYMENTS_SUBTITLE = "Rozliczenie z klientem";

/// Validations
export const CAR_PICK_UP_ACCOUNTED_REQUIRED = "Kaucja musi zostać rozliczona";
export const CAR_PICK_UP_IS_ACCOUNTED_TOTAL_PRICE_REQUIRED =
  "Najem musi zostać rozliczony";

//************CarReservation************//
// Title
export const CAR_RESERVATION_TITLE = "Rezerwacja samochodu";

//Form

/// Title
export const CAR_RESERVATION_CUSTOMER_NAME_TITLE = "Nazwa klienta";
export const CAR_RESERVATION_DUCUMENT_TYPE_TITLE = "Rodzaj dokumentu";
export const CAR_RESERVATION_DUCUMENT_NO_TITLE = "Numer dokumentu";
export const CAR_RESERVATION_PHONE_NO_TITLE = "Numer telefonu";
export const CAR_RESERVATION_EMAIL_TITLE = "Email";
export const CAR_RESERVATION_RENT_FROM_TITLE = "Rezerwacja od";
export const CAR_RESERVATION_RENT_TO_TITLE = "Rezerwacja do";
export const CAR_RESERVATION_TIME_TITLE = "Godzina";
export const CAR_RESERVATION_NOTE_TITLE = "Uwagi do rezerwacji";
export const CAR_RESERVATION_REGISTRATION_NO = "Numer rejestracyjny: ";
export const CAR_RESERVATION_LOCATISATION_SUBTITLE = "Lokalizacja bieżąca :";
export const CAR_RESERVATION_LOCATION_TITLE =
  "Lokalizacja rezerwacji samochodu";
export const CAR_RESERVATION_COME_BACK_TITLE = "Wróć do mnie";

/// Placeholder
export const CAR_RESERVATION_NO_CUSTOMER_NAME = "Brak nazwy klienta";
export const CAR_RESERVATION_DATE_FROM = "Data początkowa";
export const CAR_RESERVATION_DATE_TO = "Data końcowa";

/// Validations
export const CAR_RESERVATION_MIN_LENGTH_MSG =
  "Nazwa klienta musi składać się z przynajmniej 10 liter";
export const CAR_RESERVATION_MIN_LENGTH_VALUE = 10;
export const CAR_RESERVATION_REQUIRED_CLIENT_NAME =
  "Nazwa wynajmującego jest wymagana";
export const CAR_RESERVATION_SELECT_FROM_THE_LIST = "Należy wybrać z listy";
export const CAR_RESERVATION_DOCUMENT_NO_REQUIRED =
  "Numer dokumentu jest wymagany";
export const CAR_RESERVATION_INPROPER_PHONE_NO = "Niepoprawny numer telefonu";
export const CAR_RESERVATION_PHONE_NO_REQUIRED = "Numer telefonu jest wymagany";
export const CAR_RESERVATION_MAX_LENGTH_MSG =
  "Numer telefonu może zawirać nie więcej niż 15 znaków";
export const CAR_RESERVATION_MAX_LENGTH_VALUE = 15;
export const CAR_RESERVATION_INPROPER_EMAIL = "Niepoprawny format email";
export const CAR_RESERVATION_DATE_AND_TIME_REQUIRED = "Pole wymagane";
export const CAR_RESERVATION_REQUIRED_LOCATION = "Lokalizacja wymagana";

/// Options
export const CAR_RESERVATION_OPTION_0 = "0";
export const CAR_RESERVATION_OPTION_PASSPORT = "Paszport";
export const CAR_RESERVATION_OPTION_ID = "Dowód osobisty";
export const CAR_RESERVATION_OPTION_DRIVING_LICENSE = "Prawo jazdy";
export const CAR_RESERVATION_OPTION_OTHER = "Inne";

//Error handling
export const CAR_RESERVATION_CREATE_MSG = "Rezerwacja została dokonana";
export const CAR_RESERVATION_ERROR_HANDLING_SUCCESS = "Success";

//************SearchReservation************//
// Title
export const SEARCH_RESERVATION_TITLE =
  "Lista samochodów możliwych do rezerwacji";
export const SEARCH_RESERVATION_SUBTITLE = "Wybierz zakres dat rezerwacji";
export const SEARCH_RESERVATION_FROM_TITLE = "Data od";
export const SEARCH_RESERVATION_TIME_FROM = "Godzina od";
export const SEARCH_RESERVATION_TO_TITLE = "Data do";
export const SEARCH_RESERVATION_TIME_TO = "Godzina do";

/// Placeholder
export const SEARCH_RESERVATION_FROM = "Data początkowa";
export const SEARCH_RESERVATION_TO = "Data końcowa";

/// Validations
export const SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED = "Pole wymagane";

//************FilterReservation************//
//Title
export const FILTER_RESERVATION_TITLE = "Wyszukaj rezerwacje";
export const FILTER_RESERVATION_SUBTITLE = "Lista rezerwacji";
export const FILTER_RESERVATION_DATE_FROM = "Data od: ";
export const FILTER_RESERVATION_DATE_TO = "Data do: ";
export const FILTER_RESERVATION_MORE_INFO_CLIENT = "Informacje o kliencie:";
export const FILTER_RESERVATION_MORE_INFO_TEL = "Tel: ";
export const FILTER_RESERVATION_MORE_LOCATION = "Odbiór w: ";

/// Placeholder
export const FILTER_RESERVATION_SEARCH_PLACEHOLDER = "Wyszukaj";
