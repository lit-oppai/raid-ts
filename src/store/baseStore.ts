import { defineStore } from "pinia";
import langList from "@/assets/lang";
import { switchLanguage,languageSchema } from "@/i18n";

export type userSchema = {
    id: number;
    username: string;
    nickname: string;
    role: string;
    avatar: string;
    created_at: number;
    updated_at: number;
    description: string;
    email: string;
};

export type deviceSchema = {
    device_model: string;
    device_name: string;
    device_id: string;
    hash: string;
    initialized: true;
    lan_ipv4: [];
    os_version: "";
    port: 80;
};

const useBaseStore = defineStore("store", {
    state: () => {
        return {
            casaos_lang: "en_us",
            version: ""
        };
    },
    getters: {
    },
    actions: {
        updateVersion(version: string) {
            this.version = version;
            localStorage.setItem("version", version);
        },
        async setLang(lang: string) {
            if (lang in langList) {
                const validLang: languageSchema = lang as languageSchema;
                if (validLang === this.casaos_lang) {
                    return;
                }
                this.casaos_lang = validLang;
                localStorage.setItem("lang", validLang);
                switchLanguage(validLang);
                // send to all possible valid micro-apps
                const { messageBus } = (await (() => import("@icewhale/ui-utils"))());
                messageBus("dashboardsetting_language", validLang);
            }
        },
    },
});

const store = useBaseStore();

if (localStorage.getItem("lang")) {
    store.setLang(localStorage.getItem("lang") as string);
}
if (localStorage.getItem("version")) {
    store.updateVersion(localStorage.getItem("version") as string);
}

export default useBaseStore;
