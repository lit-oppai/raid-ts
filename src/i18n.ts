import { createI18n } from "vue-i18n";
import en_US from "@assets/lang/en_US.json";
import messages from "@assets/lang";

export type userVisibleTextCollection = typeof en_US;

const lang = localStorage.getItem("lang") || navigator.language.replace("-", "_");

const validLang = (lang: string) => {
    return lang in messages;
}

const i18n = createI18n({
    locale: validLang(lang) ? lang : "en_us",
    allowComposition: true,
    fallbackLocale: "en_us",
    messages
});

export default i18n;
