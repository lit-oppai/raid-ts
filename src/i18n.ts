import { createI18n } from "vue-i18n";
import en_US from "@assets/lang/en_US.json";
import messages from "@assets/lang";
import { WritableComputedRef } from "vue"

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
//         i18n.global.locale = lang as unknown as WritableComputedRef<languageSchema>;
//         localStorage.setItem("lang", lang);
//     }
// }
const locale = i18n.global.locale as WritableComputedRef<languageSchema>;
export const switchLanguage = (lang: languageSchema) => {
    locale.value = lang;
}

export default i18n;
