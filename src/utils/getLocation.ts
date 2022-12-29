import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

const LANGUAGE_KEY = "lang_setings";

export default {
    type: "languageDetector",
    async: true,
    init: () => { },
    detect: async function (callback: (lang: string) => void) {
        try {
            // I cannot use storage utiles becouse fof the callback. 
            await AsyncStorage.getItem(LANGUAGE_KEY).then((language) => {
                if (language) {
                    return callback(language);
                } else {
                    return callback(Localization.locale);
                }
            });
        } catch (error) {
            console.log("Geting localization", error);
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