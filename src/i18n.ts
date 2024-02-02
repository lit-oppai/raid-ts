import { createI18n, useI18n } from "vue-i18n";
import en_US from "@assets/lang/en_US.json";
import messages from "@assets/lang";

export type userVisibleTextCollection = typeof en_US;
export type languageSchema = keyof typeof messages;

const lang = localStorage.getItem("lang") || navigator.language.replace("-", "_");

const validLang = (lang: string) => {
    return lang in messages;
}

const i18n = createI18n({
    legacy: false,
    locale: validLang(lang) ? lang : "en_us",
    allowComposition: true,
    fallbackLocale: "en_us",
    messages
});

// export const switchLanguage = (lang: languageSchema) => {
//     if (validLang(lang)) {
//         i18n.global.locale = lang as languageSchema;
//         localStorage.setItem("lang", lang);
//     }
// }

export const switchLanguage = (lang: languageSchema) => {
    const { locale } = useI18n();
    locale.value = lang;
}

export default i18n;
