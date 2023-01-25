import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

/**
 * Based on article:
 * author: Katsiaryna Lupachova
 * title: React Native Internationalization with i18next
 * url: https://dev.to/ramonak/react-native-internationalization-with-i18next-568n
 */

const LANGUAGE_KEY = "lang_settings";

export default {
    type: "languageDetector",
    async: true,
    init: () => { },
    detect: async function (callback: (lang: string) => void) {
        try {
            // I cannot use storage utiles becouse fof the callback. 
            await AsyncStorage.getItem(LANGUAGE_KEY).then((lang) => {
                if (lang) {
                    return callback(lang);
                } else {
                    return callback(Localization.locale);
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    cacheUserLanguage: async function (language: string) {
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, language);
        } catch (error) {
            console.log(error);
        }
    },
};