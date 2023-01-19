import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

/**
 * This part of software uses code form other software attributed below.
 * 
 * MIT License
 * 
 * Copyright (c) 2021 Katsiaryna Lupachova
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
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