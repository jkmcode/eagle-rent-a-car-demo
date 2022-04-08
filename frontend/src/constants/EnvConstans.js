//************************************GLOBAL************************************//
export const SET_DATE_TIME_RESERVATION = 1000 * 60 * 60;
export const MIN_DURATION = 1000 * 60 * 60;
export const TRANSFER_TIME = 4000 * 60 * 60;
export const MAX_TIME_LOGOUT = 1000 * 60 * 60 * 24 * 20;
export const SET_DATE_TIME_RESERVATION_MSG =
  "The reservation date must be one hour in advance";
export const MIN_DURATION_MSG =
  "The reservation end date must be later than the start date.";
export const MIN_DURATION_RENT_MSG =
  "You have chosen the wrong date of returning the car. The minimum rental period is 1 hour.";
export const WRONG_START_DATE_AND_TIME = "Date selected incorrectly";
export const MIN_DURATION_RENT_EDIT_MSG =
  "The car must be returned 1 hour before booking";
export const TIME_CLEAR_MSG = 5000;
export const OPTION_CCY = ["EUR", "USD", "PLN", "GBP"];
export const OPTION_DOC = [
  "Passport",
  "Identity card",
  "Driving license",
  "esidence card",
  "Other",
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
export const DELETE_MESSAGE = "Are you sure you want to delete the user?";
export const DELETE_RESERVATION_MSG =
  "Are you sure you want to delete reservations?";

//Errors and Success
export const REQUEST_FAIL_WITH_STATUS_CODE_404 =
  "Request failed with status code 404";
export const REQUEST_FAIL_WITH_STATUS_CODE_404_PL =
  "No connection to the server";
export const REQUEST_FAILED_WITH_STATUS_CODE_500 =
  "Request failed with status code 500";
export const REQUEST_FAILED_REST_OF_STATUS_CODE =
  "Network error. Check your internet connection and run the application again.";
export const REQUEST_FAILED_WITH_STATUS_CODE_500_PL =
  "Server error or no internet access. Check your internet connection and run the application again.";
export const WRONG_CREDENTIALS =
  "No active account found with the given credentials";
export const WRONG_CREDENTIALS_PL = "Invalid username or password";
export const REGISTRATION_NO_ALREADY_EXIST =
  "Podany kod rejestracyjny już istnieje";
export const NAME_ALREADY_EXIST = "Podana nazwa już istnieje";
export const ERROR_UPLOAD_PICTURE =
  "Network error. The photo has not been added.";
export const ENTERED_PASSWORD_ARE_NOT_THE_SAME =
  "The given password  or username do not match";

export const SUCCESS_MESSAGE_EDIT_RESERVATION =
  "The reservation was changed successfully";
export const SUCCESS_LOCATION_ADD = "The location has been added to the list";
export const SUCCESS_CAR_ADD = "The car has been added to the list";
export const SUCCESS_CAR_EDIT = "The car data has been changed correctly";
export const SUCCESS = "Success";
export const SUCCESS_PICK_UP = "The car was picked up from the customer";
export const SUCCESS_EDIT_RESERVATION = "The operation was successful";

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
  "Reservations in these period of time already exist for the start date.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG =
  "Reservations in these period of time already exist for the end date.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG =
  "Reservations in these period of time already exist.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG =
  "Rentals in these time periods already exist for the start date.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG =
  "Rentals in these time periods already exist for the end date.";
export const ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG =
  "Rentals in these time periods already exist.";

//Button
export const BTN_BACK = "Return";
export const BTN_NEW_USER = "New user";
export const BTN_NEW_CAR = "New car";
export const BTN_NEW_LOCALISATION = "New location";
export const BTN_EDIT = "Edition";
export const BTN_DELETE = "Delete";
export const SUBMIT_BTN = "Sign In";
export const BTN_CHANGE = "Change";
export const BTN_SAVE = "Save";
export const BTN_CALENDAR = "Calendar";
export const BTN_SHOW = "Show";
export const BTN_ADD_PICTURE = "Add picture";
export const BTN_ADD_RESRVATION = "Add reservation";
export const BTN_PICK_UP = "Pick up";
export const BTN_RENT = "Rent";
export const BTN_RESRVATION = "Book";
export const BTN_SHOW_MORE = "Show";
export const BTN_WRAP_OUT = "Show less";
export const BTN_NEXT = "Next";
export const BTN_SEARCH = "Search";

//Options
export const OPTION_0 = "0";

//Conditions
export const CONDITION_RENT = "Rental";
export const CONDITION_DELAY_RENT = "Delayed rental";
export const CONDITION_RESERVATION = "Reservation";
export const CONDITION_DELAY_RESERVATION = "Reservation delayed";

//************************************COMPONENTS************************************//

//************Header************//
export const HEADER_LOCATIONS = "Locations";
export const HEADER_RESERVATIONS = "Reservations";
export const HEADER_RESERVATIONS_NEW = "New";
export const HEADER_RESERVATIONS_SEARCH = "Search";
export const HEADER_USER = "User";
export const HEADER_USER_MY_PROFILE = "My profile";
export const HEADER_USER_MY_ADMIN = "Admin";
export const HEADER_USER_MY_LOGOUT = "Logout";

//************Login************//
//Title
export const LOGIN_TITLE = "Car Rental";
export const LOGIN_SUBTITLE = "Login";
export const LOGIN_USER_NAME_TITLE = "User Name";
export const LOGIN_PASSWORD = "Password";

//Placeholder
export const LOGIN_USER_NAME_PLACEHOLDER = "User Name";
export const LOGIN_PASSWORD_PLACEHOLDER = "Password";

//Validators
export const LOGIN_USER_NAME_REQUIRED = "Field required";
export const LOGIN_USER_NAME_MIN_LENGTH =
  "Username must be at least 2 letters long";
export const LOGIN_USER_NAME_PATTERN = "Only letters can be used";
export const LOGIN_PASSWORD_REQUIRED = "field required";
export const LOGIN_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";

//************MainPage************//
export const MAINPAGE_TITLE = "Locations";

//************MyProfile************//
//Title
export const MY_PROFILE_TITLE = "Password change";
export const MY_PROFILE_USERNAME_TITLE = "Username";
export const MY_PROFILE_EMAIL_TITLE = "Email";
export const MY_PROFILE_PASSWORD_TITLE = "Password";
export const MY_PROFILE_CONFIRM_PASSWORD_TITLE = "Confirm password";

//Placeholder
export const MY_PROFILE_USERNAME_PLACEHOLDER = "Type username";
export const MY_PROFILE_EMAIL_PLACEHOLDER = "Type email address";
export const MY_PROFILE_PASSWORD_PLACEHOLDER = "Password";
export const MY_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER = "Confirm your password";

//Validators
export const MY_PROFILE_USERNAME_REQUIRED = "Required";
export const MY_PROFILE_USERNAME_MIN_LENGTH =
  "Username must be at least 2 letters long";
export const MY_PROFILE_USERNAME_PATTERN = "Only letters can be used";
export const MY_PROFILE_EMAIL_PATTERN = "Invalid email format";
export const MY_PROFILE_PASSWORD_REQUIRED = "Required";
export const MY_PROFILE_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";
export const MY_PROFILE_CONFIRM_PASSWORD_REQUIRED = "Required";
export const MY_PROFILE_CONFIRM_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";

//Error and Succes message
export const MY_PROFILE_SUCCESS_MSG = "Password has been changed";
export const MY_PROFILE_PASSWORD_ARE_NOT_THE_SAME =
  "The passwords provided do not match";

//************Admin************//
export const ADMIN_USERS_TITLE = "Users";
export const ADMIN_LOCATIONS_TITLE = "Locations";
export const ADMIN_CARS_TITLE = "Cars";

//************UsersList************//
export const USERS_LIST_TITLE = "User list";

//************CreateUser************//
//Title
export const CREATE_USER_TITLE = "Create an account";
export const CREATE_USER_NAME_TITLE = "User Name";
export const CREATE_USER_EMAIL_TITLE = "Email";
export const CREATE_USER_PASSWORD_TITLE = "Password";
export const CREATE_USER_CONFIRM_PASSWORD_TITLE = "Confirm password";

//Placeholder
export const CREATE_USER_NAME_PLACEHOLDER = "Type user name";
export const CREATE_USER_EMAIL_PLACEHOLDER = "Type email";
export const CREATE_USER_PASSWORD_PLACEHOLDER = "Password";
export const CREATE_USER_CONFIRM_PASSWORD_PLACEHOLDER = "Confirm password";

//Validators
export const CREATE_USER_NAME_REQUIRED = "Field required";
export const CREATE_USER_NAME_MIN_LENGTH =
  "Username must be at least 2 letters long";
export const CREATE_USER_NAME_PATTERN = "Only letters can be used";

export const CREATE_USER_EMAIL_PATTERN = "Invalid email format";

export const CREATE_USER_PASSWORD_REQUIRED = "Field required";
export const CREATE_USER_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";

export const CREATE_USER_CONFIRM_PASSWORD_REQUIRED = "Field required";
export const CREATE_USER_CONFIRM_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";

//************UserEdit************//
//Title
export const USER_EDIT_TITLE = "User Editing";
export const USER_EDIT_NAME_TITLE = "User Name";
export const USER_EDIT_EMAIL_TITLE = "Email";
export const USER_EDIT_CHANGE_PASSWORD_TITLE =
  "I want to change the user password";
export const USER_EDIT_PASSWORD_TITLE = "Password";
export const USER_EDIT_CONFIRM_PASSWORD_TITLE = "Confirm password";
export const USER_EDIT_ADMIN_TITLE = "Admin";

//Placeholder
export const USER_EDIT_NAME_PLACEHOLDER = "Type user name";
export const USER_EDIT_EMAIL_PLACEHOLDER = "Type email";
export const USER_EDIT_PASSWORD_PLACEHOLDER = "Password";
export const USER_EDIT_CONFIRM_PASSWORD_PLACEHOLDER = "Confirm password";

//Validators
export const USER_EDIT_NAME_REQUIRED = "Field required";
export const USER_EDIT_NAME_MIN_LENGTH =
  "Username must be at least 2 letters long";
export const USER_EDIT_NAME_PATTERN = "Only letters can be used";

export const USER_EDIT_EMAIL_PATTERN = "Invalid email format";

export const USER_EDIT_PASSWORD_REQUIRED = "Field required";
export const USER_EDIT_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";

export const USER_EDIT_CONFIRM_PASSWORD_REQUIRED = "Field required";
export const USER_EDIT_CONFIRM_PASSWORD_MIN_LENGTH =
  "Password must be at least 8 characters long";

//************Localisation************//
export const LOCALISATION_TITLE = "Location list";
export const LACK_OF_LOCALISATION = "No localization";

//************LocationEdit************//
//Title
export const LOCATION_EDIT_TITLE = "Editing a location";
export const LOCATION_EDIT_LOCATION_NAME_TITLE = "Location name";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_TITLE = "Short name";
export const LOCATION_EDIT_CHOOSE_PICTURE = "Choose a photo";

//Placeholder
export const LOCATION_EDIT_LOCATION_NAME_PLACEHOLDER = "Type location name";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_PLACEHOLDER = "Type short name";

//Validators
export const LOCATION_EDIT_LOCATION_NAME_REQUIRED = "Field required";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_REQUIRED = "Field required";
export const LOCATION_EDIT_LOCATION_NAME_MIN_LENGTH =
  "The location name must be at least 10 letters long";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_MIN_LENGTH =
  "The location short name must be at least 2 letters long";
export const LOCATION_EDIT_LOCATION_NAME_PATTERN = "Only letters can be used";
export const LOCATION_EDIT_LOCATION_SHORT_NAME_PATTERN =
  "Only letters can be used";

//************NewLocation************//
//Title
export const NEW_LOCATION_TITLE = "Create locations";
export const NEW_LOCATION_LOCATION_NAME_TITLE = "Location name";
export const NEW_LOCATION_LOCATION_SHORT_NAME_TITLE = "Short name";
export const NEW_LOCATION_CHOOSE_PICTURE = "Choose a photo";

//Placeholder
export const NEW_LOCATION_LOCATION_NAME_PLACEHOLDER = "Type location name";
export const NEW_LOCATION_LOCATION_SHORT_NAME_PLACEHOLDER = "Type short name";

//Validators
export const NEW_LOCATION_LOCATION_NAME_REQUIRED = "Field required";
export const NEW_LOCATION_LOCATION_SHORT_NAME_REQUIRED = "Field required";
export const NEW_LOCATION_LOCATION_NAME_MIN_LENGTH =
  "The location name must be at least 10 letters long";
export const NEW_LOCATION_LOCATION_SHORT_NAME_MIN_LENGTH =
  "The location short name must be at least 2 letters long";
export const NEW_LOCATION_LOCATION_NAME_PATTERN = "Only letters can be used";
export const NEW_LOCATION_LOCATION_SHORT_NAME_PATTERN =
  "Only letters can be used";

//************CarsAdmin************//
export const CARS_ADMIN_TITLE = "List of cars";

//************CarsCreate************//
//Title
export const CARS_CREATE_TITLE = "Add a new car";
export const CARS_CREATE_CAR_NAME_TITLE = "Car name";
export const CARS_CREATE_CAR_SHORT_NAME_TITLE = "Short name";
export const CARS_CREATE_CAR_REGISTRATION_NO_TITLE = "Registration number";
export const CARS_CREATE_CAR_MAIN_LOCATION_TITLE = "Initial location";
export const CARS_CREATE_CHOOSE_PICTURE = "Choose a photo";

//Placeholder
export const CARS_CREATE_CAR_NAME_PLACEHOLDER = "Type car name";
export const CARS_CREATE_CAR_SHORT_NAME_PLACEHOLDER = "Type short name";
export const CARS_CREATE_CAR_REGISTRATION_NO_PLACEHOLDER =
  "Type registration number";

//Validators
export const CARS_CREATE_CAR_NAME_REQUIRED = "Field required";
export const CARS_CREATE_CAR_NAME_MIN_LENGTH =
  "The name of the car must be at least 10 characters long";

export const CARS_CREATE_CAR_SHORT_NAME_REQUIRED = "Field required";
export const CARS_CREATE_CAR_SHORT_NAME_MIN_LENGTH =
  "The name of the car must be at least 2 characters long";

export const CARS_CREATE_CAR_REGISTRATION_NO_REQUIRED = "Field required";
export const CARS_CREATE_CAR_REGISTRATION_MIN_LENGTH =
  "The registration code must be at least 6 characters long";

export const CARS_CREATE_CAR_MAIN_LOCATION_REQUIRED = "Field required";

//************CarsEdit************//
//Title
export const CARS_EDIT_TITLE = "Car editing";
export const CARS_EDIT_CAR_NAME_TITLE = "Car name";
export const CARS_EDIT_CAR_SHORT_NAME_TITLE = "Short name";
export const CARS_EDIT_CAR_REGISTRATION_NO_TITLE = "Registration number";
export const CARS_EDIT_CAR_MAIN_LOCATION_TITLE = "Initial location";
export const CARS_EDIT_CAR_NEW_MAIN_LOCATION_TITLE = "New Initial location";
export const CARS_EDIT_CHECKBOX_READY_FOR_RENT = "Ready for rent";

//Placeholder
export const CARS_EDIT_CAR_NAME_PLACEHOLDER = "Type car name";
export const CARS_EDIT_CAR_SHORT_NAME_PLACEHOLDER = "Type short name";
export const CARS_EDIT_CAR_REGISTRATION_NO_PLACEHOLDER =
  "Type registration number";

//Validators
export const CARS_EDIT_CAR_NAME_REQUIRED = "Field required";
export const CARS_EDIT_CAR_NAME_MIN_LENGTH =
  "The name of the car must be at least 10 characters long";

export const CARS_EDIT_CAR_SHORT_NAME_REQUIRED = "Field required";
export const CARS_EDIT_CAR_SHORT_NAME_MIN_LENGTH =
  "The name of the car must be at least 2 characters long";

export const CARS_EDIT_CAR_REGISTRATION_NO_REQUIRED = "Field required";
export const CARS_EDIT_CAR_REGISTRATION_MIN_LENGTH =
  "The registration code must be at least 6 characters long";

export const CARS_EDIT_CAR_NEW_MAIN_LOCATION_REQUIRED = "Field required";

//************UploadImage************//
export const UPLOAD_IMAGE_REGISTRATION_NO_TITLE = "Registration number:";
export const UPLOAD_IMAGE_CHOOSE_PICTURE = "Choose a photo";

//************CarShow************//
export const CAR_SHOW_REGISTRATION_NO_TITLE = "Registration number:";

//************CarLocationList************//
// Title
export const CAR_LOCATION_LIST_TITLE = "Location: ";
export const CAR_LOCATION_LIST_RENT_SUBTITLE = "Car rental list";
export const CAR_LOCATION_LIST_IN_USE_SUBTITLE = "List of cars in use";
export const CAR_LOCATION_LIST_TO_DO_SUBTITLE = "To-do list";
export const CAR_LOCATION_LIST_RESERVATIONS_SUBTITLE =
  "List of available cars for booking";
export const CAR_LOCATION_LIST_EDIT_RESERVATION_SUBTITLE =
  "List of cars with reservations";
export const CAR_LOCATION_LIST_EDIT_RESERVATION_FROM_SUBTITLE =
  "Reservation from:";
export const CAR_LOCATION_LIST_IN_USE_DATE_SUBTITLE = "In use until: ";
export const CAR_LOCATION_LIST_OTHER_LOCATISATION =
  "Car is in a different location";
export const CAR_LOCATION_LIST_FILTERS = "Filters";

//Button
export const CAR_LOCATION_LIST_RENT_BTN_NAME = "Rent";
export const CAR_LOCATION_LIST_IN_USE_BTN_NAME = "In use";
export const CAR_LOCATION_LIST_TO_DO_BTN_NAME = "To do";
export const CAR_LOCATION_LIST_NEW_RESERVATION_BTN_NAME = "New reservation";
export const CAR_LOCATION_LIST_EDIT_RESERVATION_BTN_NAME = "Edit reservation";
export const CAR_LOCATION_LIST_FILTER_ALL_BTN_NAME = "All";
export const CAR_LOCATION_LIST_FILTER_RESERVATIONS_BTN_NAME = "Reservation";
export const CAR_LOCATION_LIST_FILTER_RENTS_BTN_NAME = "Rent";
export const CAR_LOCATION_LIST_EDIT_BTN = "Edit";
export const CAR_LOCATION_LIST_RENT_BTN = "Rent";
export const CAR_LOCATION_LIST_PICK_UP_BTN = "Pick up";
export const CAR_LOCATION_LIST_DELETE_BTN = "Delete";

//List
export const CAR_LOCATION_LIST_AMOUNT_OF_POSITIONS = "Amount: ";
export const CAR_LOCATION_LIST_RENT_TYPE = "Rent";

export const CAR_LOCATION_LIST_CONTACT_INFO_TITLE = "Contact details:";
export const CAR_LOCATION_LIST_CONTACT_INFO_CLIENT_NAME = "Client name:";
export const CAR_LOCATION_LIST_CONTACT_INFO_ID_NO = "Number:";
export const CAR_LOCATION_LIST_CONTACT_INFO_TEL = "Phone no: ";
export const CAR_LOCATION_LIST_CONTACT_INFO_EMAIL = "Email: ";
export const CAR_LOCATION_LIST_CONTACT_INFO_DEPOSIT = "Deposit: ";
export const CAR_LOCATION_LIST_CONTACT_INFO_TOTAL_PRICE = "Rental price: ";

//Delete
export const CAR_LOCATION_LIST_DELETE_MSG =
  "Are you sure you want to delete reservations?";

//************CarEditReservation************//

// Title
export const CAR_EDIT_RESERVATION_NO_RESERVATION_TITLE = "Registration number:";

//Card content
export const CAR_EDIT_RESERVATION_PHONE_NO = "Phone no :";
export const CAR_EDIT_RESERVATION_EMAIL = "Email :";

// Button
export const CAR_EDIT_RESERVATION_BACK_TO_MENU_BUTTON_NAME = "Return";

//Delete
export const CAR_EDIT_RESERVATION_DELETE_MSG =
  "Are you sure you want to delete reservations?";

//************CarSingleEditReservation************//

//Title
export const CAR_SINGLE_EDIT_RESERVATION_TITLE = "Edit reservation";

//Form

/// Title
export const CAR_SINGLE_EDIT_RESERVATION_CUSTOMER_NAME_TITLE = "Client name";
export const CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_TYPE_TITLE =
  "Type of document";
export const CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_NO_TITLE = "Document number";
export const CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_TITLE = "Phone no";
export const CAR_SINGLE_EDIT_RESERVATION_EMAIL_TITLE = "Email";
export const CAR_SINGLE_EDIT_RESERVATION_RENT_FROM_TITLE = "Reservation from";
export const CAR_SINGLE_EDIT_RESERVATION_RENT_TO_TITLE = "Reservation to";
export const CAR_SINGLE_EDIT_RESERVATION_TIME_TITLE = "Time";
export const CAR_SINGLE_EDIT_RESERVATION_REGISTRATION_NO =
  "Registration number: ";
export const CAR_SINGLE_EDIT_RESERVATION_LOCATISATION_SUBTITLE =
  "Place of picking up the car: ";
export const CAR_SINGLE_EDIT_RESERVATION_SUBTITLE =
  "New place of picking up the car";
export const CAR_SINGLE_EDIT_RESERVATION_ADDITIONAL_INFO_TITLE = "Note";

/// Placeholder
export const CAR_SINGLE_EDIT_RESERVATION_NO_CUSTOMER_NAME =
  "Type customer name";
export const CAR_SINGLE_EDIT_RESERVATION_DATE_FROM = "Start date";
export const CAR_SINGLE_EDIT_RESERVATION_DATE_TO = "End date";

/// Validations
export const CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_MSG =
  "The customer name must consist of at least 10 letters";
export const CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_VALUE = 10;
export const CAR_SINGLE_EDIT_RESERVATION_REQUIRED_CLIENT_NAME =
  "Customer name is required";
export const CAR_SINGLE_EDIT_RESERVATION_SELECT_FROM_THE_LIST =
  "Please select from the list";
export const CAR_SINGLE_EDIT_RESERVATION_DOCUMENT_NO_REQUIRED =
  "Document number is required";
export const CAR_SINGLE_EDIT_RESERVATION_INPROPER_PHONE_NO =
  "Invalid phone number";
export const CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_REQUIRED =
  "Phone number is required";
export const CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_MSG =
  "The phone number can be up to 15 characters long";
export const CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_VALUE = 15;
export const CAR_SINGLE_EDIT_RESERVATION_INPROPER_EMAIL =
  "Invalid email format";
export const CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED =
  "Field required";
export const CAR_SINGLE_EDIT_RESERVATION_REQUIRED_LOCATION =
  "Location required";

/// Options
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_0 = "0";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_PASSPORT = "Passport";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_ID = "ID card";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_DRIVING_LICENSE =
  "Driving license";
export const CAR_SINGLE_EDIT_RESERVATION_OPTION_OTHER = "Other";

/// Button
export const CAR_SINGLE_EDIT_RESERVATION_BUTTON_NAME = "Edit";

//************CarRent************//

//Title
export const CAR_RENT_TITLE = "Car rental";
export const CAR_RENT_RENT_BASED_ON_RESERVATION =
  "Rent a car based on reservation";

//Form

/// Title
export const CAR_RENT_CUSTOMER_NAME_TITLE = "Client name";
export const CAR_RENT_DUCUMENT_TYPE_TITLE = "Type of document";
export const CAR_RENT_DUCUMENT_NO_TITLE = "Document number";
export const CAR_RENT_PHONE_NO_TITLE = "Phone no.";
export const CAR_RENT_EMAIL_TITLE = "Email";
export const CAR_RENT_RENT_FROM_TITLE = "Reservation from";
export const CAR_RENT_RENT_TO_TITLE = "Rent to";
export const CAR_RENT_TIME_TITLE = "Time";
export const CAR_RENT_DEPOSIT_TITLE = "Deposit";
export const CAR_RENT_DEPOSIT_IS_PAID_TITLE = "Deposit has been paid";
export const CAR_RENT_TOTAL_PRICE_TITLE = "Rental price";
export const CAR_RENT_DEPOSIT_CURRENCY_TITLE = "Currency";
export const CAR_RENT_TOTAL_PRICE_IS_PAID_TITLE = "Payment in advance";
export const CAR_RENT_NOTE_MSG_TITLE = "Additional informatio";
export const CAR_RENT_LOCATION_TITLE = "Car pick up location";
export const CAR_RESERVATION_BUTTON_BACK_TO_MENU = "Return";

/// Subtitle
export const CAR_RENT_GENERAL_INFO_SUBTITLE = "General information";
export const CAR_RENT_PAYMENTS_SUBTITLE = "Payment";
export const CAR_RENT_TAKE_BACK_SUBTITLE = "Pick up the car";
export const CAR_RENT_NO_REGISTRATION_SUBTITLE = "Registration number:";
export const CAR_RENT_LOCATISATION_SUBTITLE = "Current location:";

/// Placeholder
export const CAR_RENT_NO_CUSTOMER_NAME = "Type customer name";
export const CAR_RENT_DATE_FROM = "Start date";
export const CAR_RENT_TO_FROM = "End date";

/// Validations
export const CAR_RENT_MIN_LENGTH_MSG =
  "The customer name must consist of at least 10 letters";
export const CAR_RENT_MIN_LENGTH_VALUE = 10;
export const CAR_RENT_REQUIRED_CLIENT_NAME = "Customer name is required";
export const CAR_RENT_SELECT_FROM_THE_LIST = "Please select from the list";
export const CAR_RENT_DOCUMENT_NO_REQUIRED = "Document number is required";
export const CAR_RENT_INPROPER_PHONE_NO = "Invalid phone number";
export const CAR_RENT_PHONE_NO_REQUIRED = "Phone number is required";
export const CAR_RENT_MAX_LENGTH_MSG =
  "The phone number can be up to 15 characters long";
export const CAR_RENT_MAX_LENGTH_VALUE = 15;
export const CAR_RENT_INPROPER_EMAIL = "Invalid email format";
export const CAR_RENT_DATE_AND_TIME_REQUIRED = "Field required";
export const CAR_RENT_REQUIRED_DEPOSIT = "Field required";
export const CAR_RENT_IS_PAID_REQUIRED = "The deposit must be paid";
export const CAR_RENT_INPROPER_DEPOSIT = "Niepoprawny format ceny depozytu";
export const CAR_RENT_INPROPER_TOTAL_PRICE = "Nieprawidłowy format ceny najmu";
export const CAR_RENT_REQUIRED_TOTAL_PRICE = "Field required";
export const CAR_RENT_REQUIRED_LOCATION = "Location required";

/// Options
export const CAR_RENT_OPTION_0 = "0";

//Error handling
export const CAR_RENT_CREATE_MSG = "Najem został dokonany";
export const CAR_RENT_ERROR_HANDLING_SUCCESS = "Car was rent";
export const CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7 =
  "samochód nie został odebrany od klienta";
export const CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7_MSG =
  "Ten samochód nie został odebrany od klienta.";

//************CarRentEdit************//
//Title
export const CAR_RENT_EDIT_TITLE = "Edit rental";
export const CAR_RENT_EDIT_NO_REGISTRATION_SUBTITLE = "Registration number:";
export const CAR_RENT_EDIT_GENERAL_INFO_SUBTITLE = "Customer information";
export const CAR_RENT_EDIT_PAYMENTS_INFO_TITLE = "Payment information";

///General Information
export const CAR_RENT_EDIT_PHONE = "Phone no: ";
export const CAR_RENT_EDIT_CLIENT_NAME = "Customer name and surname: ";
export const CAR_RENT_EDIT_DOC_TYPE = "Type of document: ";
export const CAR_RENT_EDIT_EMAIL = "Email: ";
export const CAR_RENT_EDIT_DATE_FROM = "Start date: ";
export const CAR_RENT_EDIT_DATE_TO = "End date: ";

///Payments Information
export const CAR_RENT_EDIT_DEPOSIT = "Deposit: ";
export const CAR_RENT_EDIT_TOTAL_PRICE = "Rental price: ";
export const CAR_RENT_EDIT_TOTAL_PRICE_UNPAID = "Unpaid";
export const CAR_RENT_EDIT_TOTAL_PRICE_PAID = "Paid";

//Form

///Title
export const CAR_RENT_EDIT_NOTE_TITLE = "Additional information";
export const CAR_RENT_EDIT_DATEPICKER_TO_TITLE = "New rental date";
export const CAR_RENT_EDIT_TIMEPICKER_TO_TITLE = "Time";
export const CAR_RENT_EDIT_TOTAL_PRICE_TITLE = "Additional payment";
export const CAR_RENT_EDIT_TOTAL_PRICE_CURRENCY_TITLE = "Currency";
export const CAR_RENT_EDIT_LOCATISATION_SUBTITLE =
  "Place of returning the car :";
export const CAR_RENT_EDIT_LOCATION_TITLE = "New place of returning the car";

///Placeholder
export const CAR_RENT_EDIT_DATE_DATEPICKER = "End date of the rent";

///Validators
export const CAR_RENT_EDIT_DATE_AND_TIME_REQUIRED =
  "A new rental date should be provided";
export const CAR_RENT_EDIT_TIME_REQUIRED = "Field required";
export const CAR_RENT_EDIT_INPROPER_DATE =
  "The rent date should be greater than today.";
export const CAR_RENT_EDIT_INPROPER_TOTAL_PRICE = "Invalid format";
export const CAR_RENT_EDIT_TOTAL_PRICE_REQUIRED = "Field required";
export const CAR_RENT_EDIT_REQUIRED_LOCATION = "Location required";

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
export const CAR_PICK_UP_TITLE = "Pick up the car";
export const CAR_PICK_UP_GENERAL_INFO_TITLE = "General information";
export const CAR_PICK_UP_PAYMENTS_INFO_TITLE = "Payment information";

///General Information
export const CAR_PICK_UP_CLIENT_NAME = "Customer name and surname: ";
export const CAR_PICK_UP_DOC_TYPE = "Type of document: ";
export const CAR_PICK_UP_PHONE = "Phone no.: ";
export const CAR_PICK_UP_EMAIL = "Email: ";
export const CAR_PICK_UP_DATE_FROM = "Start date: ";
export const CAR_PICK_UP_DATE_TO = "End date: ";

///Payments Information
export const CAR_PICK_UP_DEPOSIT = "Deposit: ";
export const CAR_PICK_UP_TOTAL_PRICE = "Rental price: ";
export const CAR_PICK_UP_TOTAL_PRICE_UNPAID = "Unpaid";
export const CAR_PICK_UP_TOTAL_PRICE_PAID = "Paid";

//Form

///Title
export const CAR_PICK_UP_DEPOSIT_TITLE = "Deposit";
export const CAR_PICK_UP_DEPOSIT_CURRENCY_TITLE = "Currency";
export const CAR_PICK_UP_DEPOSIT_IS_ACCOUNTED_TITLE = "Deposit is settled";
export const CAR_PICK_UP_TOTAL_PRICE_TITLE = "Rental price";
export const CAR_PICK_UP_TOTAL_PRICE_CURRENCY_TITLE = "Currency";
export const CAR_PICK_UP_TOTAL_PRICE_IS_ACCOUNTED_TITLE = "Rental is settled";
export const CAR_PICK_UP_NOTE_TITLE = "Additional information";

///Subtitle
export const CAR_PICK_UP_PAYMENTS_SUBTITLE = "Settlement with the client";

/// Validations
export const CAR_PICK_UP_ACCOUNTED_REQUIRED = "The deposit must be settled";
export const CAR_PICK_UP_IS_ACCOUNTED_TOTAL_PRICE_REQUIRED =
  "The rental must be settled";

//************CarReservation************//
// Title
export const CAR_RESERVATION_TITLE = "Car reservation";

//Form

/// Title
export const CAR_RESERVATION_CUSTOMER_NAME_TITLE = "Client name";
export const CAR_RESERVATION_DUCUMENT_TYPE_TITLE = "Type of document";
export const CAR_RESERVATION_DUCUMENT_NO_TITLE = "Document number";
export const CAR_RESERVATION_PHONE_NO_TITLE = "Phone no.";
export const CAR_RESERVATION_EMAIL_TITLE = "Email";
export const CAR_RESERVATION_RENT_FROM_TITLE = "Reservation from";
export const CAR_RESERVATION_RENT_TO_TITLE = "Rezerwacja do";
export const CAR_RESERVATION_TIME_TITLE = "Time";
export const CAR_RESERVATION_NOTE_TITLE = "Comments";
export const CAR_RESERVATION_REGISTRATION_NO = "Registration number: ";
export const CAR_RESERVATION_LOCATISATION_SUBTITLE = "Current location :";
export const CAR_RESERVATION_LOCATION_TITLE = "Car booking location";

/// Placeholder
export const CAR_RESERVATION_NO_CUSTOMER_NAME = "Type customer name";
export const CAR_RESERVATION_DATE_FROM = "Start date";
export const CAR_RESERVATION_DATE_TO = "End date";

/// Validations
export const CAR_RESERVATION_MIN_LENGTH_MSG =
  "The customer name must consist of at least 10 letters";
export const CAR_RESERVATION_MIN_LENGTH_VALUE = 10;
export const CAR_RESERVATION_REQUIRED_CLIENT_NAME = "Customer name is required";
export const CAR_RESERVATION_SELECT_FROM_THE_LIST =
  "Please select from the list";
export const CAR_RESERVATION_DOCUMENT_NO_REQUIRED =
  "Document number is required";
export const CAR_RESERVATION_INPROPER_PHONE_NO = "Invalid phone number";
export const CAR_RESERVATION_PHONE_NO_REQUIRED = "Phone number is required";
export const CAR_RESERVATION_MAX_LENGTH_MSG =
  "The phone number can be up to 15 characters long";
export const CAR_RESERVATION_MAX_LENGTH_VALUE = 15;
export const CAR_RESERVATION_INPROPER_EMAIL = "Invalid email format";
export const CAR_RESERVATION_DATE_AND_TIME_REQUIRED = "Field required";
export const CAR_RESERVATION_REQUIRED_LOCATION = "Location required";

/// Options
export const CAR_RESERVATION_OPTION_0 = "0";
export const CAR_RESERVATION_OPTION_PASSPORT = "Passport";
export const CAR_RESERVATION_OPTION_ID = "ID card";
export const CAR_RESERVATION_OPTION_DRIVING_LICENSE = "Driving license";
export const CAR_RESERVATION_OPTION_OTHER = "Other";

//Error handling
export const CAR_RESERVATION_CREATE_MSG = "Rezerwacja została dokonana";
export const CAR_RESERVATION_ERROR_HANDLING_SUCCESS = "Success";

//************SearchReservation************//
// Title
export const SEARCH_RESERVATION_TITLE = "List of cars";
export const SEARCH_RESERVATION_SUBTITLE =
  "Please select a date range for your booking";
export const SEARCH_RESERVATION_FROM_TITLE = "Start date";
export const SEARCH_RESERVATION_TIME_FROM = "Start time";
export const SEARCH_RESERVATION_TO_TITLE = "End date";
export const SEARCH_RESERVATION_TIME_TO = "End time";

/// Placeholder
export const SEARCH_RESERVATION_FROM = "Start date";
export const SEARCH_RESERVATION_TO = "End date";

/// Validations
export const SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED = "Field required";

//************FilterReservation************//
//Title
export const FILTER_RESERVATION_TITLE = "Reservations searching";
export const FILTER_RESERVATION_SUBTITLE = "List of reservations";
export const FILTER_RESERVATION_DATE_FROM = "Start date: ";
export const FILTER_RESERVATION_DATE_TO = "End date: ";
export const FILTER_RESERVATION_MORE_INFO_CLIENT = "Customer information:";
export const FILTER_RESERVATION_MORE_INFO_TEL = "Phone no: ";
export const FILTER_RESERVATION_MORE_LOCATION = "Pickup in: ";

/// Placeholder
export const FILTER_RESERVATION_SEARCH_PLACEHOLDER = "Search...";
