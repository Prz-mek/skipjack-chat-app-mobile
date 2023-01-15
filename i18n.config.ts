import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import getLocation from "./src/utils/getLocation";

const en = {
    conversationList: {
        header: "Conversations",
    },
    contactsList: {
        header: "Contacts",
    },
    addContact: {
        header: "Add new contact",
    },
    createConvesation: {
        header: "Create group conversation",
        groupName: "Group name",
        buttonLabel: "Create",
        searchLabel: "Search",
    },
    profile: {
        header: "Profile",
        changeLanguage: "Language",
        changeUsername: "Change Username",
        changePassword: "Change Password",
        logOut: "Log out",
    }
};

const pl = {
    conversationList: {
        header: "Konwersacje",
    },
    contactsList: {
        header: "Kontakty",
    },
    addContact: {
        header: "Dodaj nowy kontakt",
    },
    createConvesation: {
        header: "Stwórz konwersacje grupową",
        groupName: "Nazwa grupy",
        buttonLabel: "Stwórz",
        searchLabel: "Szukaj",
    },
    profile: {
        header: "Profil",
        changeLanguage: "Język",
        changeUsername: "Zmień nazwę użytkownika",
        changePassword: "Zmień hasło",
        logOut: "Wyloguj się",
    }
};

const resources = {
    en: {
        translation: en,
    },
    pl: {
        translation: pl,
    }
}

i18n.use(initReactI18next).use(getLocation as any).init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;