import { defineStore } from "pinia";
// import { validLangList } from "@/assets/lang";
import langList from "@/assets/lang";
import { switchLanguage, languageSchema } from "@/i18n";
// import { nanoid } from "nanoid";

// const accessId = nanoid();

const userStr = localStorage.getItem("user");

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
        const user = userStr !== null
            ? JSON.parse(userStr)
            : {
                id: 0,
                username: "zimaos host",
                nickname: "zimaos host",
                role: "",
                avatar: "",
                created_at: 0,
                updated_at: 0,
                description: "",
                email: "",
            };

        return {
            casaos_lang: "en_us",
            version: "",
            //   device: {
            //     device_model: "",
            //     device_name: "",
            //     device_id: "",
            //     hash: "",
            //     initialized: true,
            //     lan_ipv4: [],
            //     os_version: "",
            //     port: 80,
            //   },
            //   hardwareInfo: {
            //     cpu: {
            //       model: "intel",
            //       num: 1,
            //       percent: 0,
            //       power: {
            //         timestamp: 0,
            //         value: 0,
            //       },
            //       temperature: 25,
            //     },
            //     mem: {
            //       available: 0,
            //       free: 0,
            //       total: 0,
            //       used: 0,
            //       usedPercent: 0,
            //     },
            //     net: [
            //       {
            //         name: "eth",
            //         bytesSent: 0,
            //         bytesRecv: 0,
            //         packetsSent: 0,
            //         packetsRecv: 0,
            //         errin: 0,
            //         errout: 0,
            //         dropin: 0,
            //         dropout: 0,
            //         fifoin: 0,
            //         fifoout: 0,
            //         state: "up",
            //         time: 0,
            //       }
            //     ],
            //     sys_disk: {
            //       avail: 0,
            //       health: "true",
            //       size: 0,
            //       used: 0,
            //     },
            //     sys_usb: [],
            //   },
            //   isMobile: false,
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
