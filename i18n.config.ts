import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const en = {
    navigation: {
        profile: "Profile",
    },
    profile: {
        changeLanguage: "Language",
        changeUsername: "Change Username",
        changePassword: "Change Password",
        logOut: "Log out",
    }
};

const pl = {
    navigation: {
        profile: "Profil",
    },
    profile: {
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

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;