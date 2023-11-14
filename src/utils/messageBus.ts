import WUJIE_PROPS from "@utils/primaryProps.ts";
import { api } from "@/network";

// Function:
// Send message to message bus.
// TODO: Need to transform to socket.io.
function messageBus(name: string, params?: string | { [key: string]: any }) {
    type messageTypes = keyof typeof Messages;
    if (name as messageTypes in Messages) {
        const payload = (Messages[name as messageTypes] as Function)(params);
        return api.post(`/v2/message_bus/event/casaos-ui/${payload.name}`, payload.properties);
    }
    return Promise.reject(`messageBus: ${name} messageType is not defined`);
}

interface MessageBusPayload {
    name: string;
    sourceID: string;
    properties: {
        access_id: string;
        device_id: string;
        casaos_lang: string;
        [key: string]: any;
    };
}

const sourceID = "casaos-ui";
const intermediateProcessor = (
    name: string,
    payload: { [key: string]: any } = {}
): MessageBusPayload => {
    return {
        name,
        sourceID,
        properties: {
            access_id: WUJIE_PROPS.access_id || "",
            device_id: WUJIE_PROPS.device_id || "",
            casaos_lang: WUJIE_PROPS.casaos_lang || "",
            ...payload,
        },
    }
};

// TODO: Need to extract common methods to an npm package.
const Messages = {
    global_newvisit: () => {
        return intermediateProcessor(`${sourceID}:global:global_newvisit`);
    },
    global_visit: () => {
        return intermediateProcessor(`${sourceID}:global:global_visit`);
    },
    account_setting: () => {
        return intermediateProcessor(`${sourceID}:topbar:account_setting`);
    },
    account_setting_logout: () => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_showsearchbar`
        );
    },
    dashboardsetting: () => {
        return intermediateProcessor(`${sourceID}:topbar:dashboardsetting_setting`);
    },
    dashboardsetting_showsearchbar: (isTrue: boolean) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_showsearchbar`,
            { value: isTrue }
        );
    },
    dashboardsetting_searchengine: (whichSearchengine: string) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_searchengine`,
            { value: whichSearchengine }
        );
    },
    dashboardsetting_language: (whichLanguage: string) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_language`,
            { value: whichLanguage }
        );
    },
    dashboardsetting_webuiport: (num: number) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_webuiport`,
            { value: num }
        );
    },
    dashboardsetting_wallpaper: (wallpaper: string) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_wallpaper`,
            { value: wallpaper }
        );
    },
    dashboardsetting_showexistingapp: (isShow: boolean) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_showexistingapp`,
            { value: isShow }
        );
    },
    dashboardsetting_news: (isShow: boolean) => {
        return intermediateProcessor(`${sourceID}:topbar:dashboardsetting_news`, {
            value: isShow,
        });
    },
    dashboardsetting_automountusb: (isShow: boolean) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_automountusb`,
            { value: isShow }
        );
    },
    dashboardsetting_versionavailable_show: (isTrue: boolean) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_versionavailable_show`,
            { value: isTrue }
        );
    },
    dashboardsetting_versionupdate: (isTrue: boolean) => {
        return intermediateProcessor(
            `${sourceID}:topbar:dashboardsetting_versionupdate`,
            { value: isTrue }
        );
    },
    dashboardsetting_reboot: () => {
        return intermediateProcessor(`${sourceID}:topbar:dashboardsetting_reboot`);
    },
    dashboardsetting_shutdown: () => {
        return intermediateProcessor(`${sourceID}:topbar:dashboardsetting_shutdown`);
    },
    terminallogs: () => {
        return intermediateProcessor(`${sourceID}:topbar:terminallogs`);
    },
    terminallogs_terminal: () => {
        return intermediateProcessor(`${sourceID}:topbar:terminallogs_terminal`);
    },
    terminallogs_connect: () => {
        return intermediateProcessor(`${sourceID}:topbar:terminallogs_connect`);
    },
    terminallogs_logs: () => {
        return intermediateProcessor(`${sourceID}:topbar:terminallogs_logs`);
    },

    widget_systemstatus: (status: string) => {
        return intermediateProcessor(`${sourceID}:topbar:widget_systemstatus`, {
            value: status,
        });
    },
    widget_cpu: () => {
        return intermediateProcessor(`${sourceID}:widget:widget_cpu`);
    },
    widget_ram: () => {
        return intermediateProcessor(`${sourceID}:widget:widget_ram`);
    },
    widget_storagemanager: () => {
        return intermediateProcessor(`${sourceID}:widget:widget_storagemanager`);
    },
    storagemanager_storage: () => {
        return intermediateProcessor(`${sourceID}:widget:storagemanager_storage`);
    },
    storagemanager_createstorage: () => {
        return intermediateProcessor(
            `${sourceID}:widget:storagemanager_createstorage`
        );
    },
    storagemanager_mergestorage: () => {
        return intermediateProcessor(
            `${sourceID}:widget:storagemanager_mergestorage`
        );
    },
    storagemanager_drive: () => {
        return intermediateProcessor(`${sourceID}:widget:storagemanager_drive`);
    },
    widget_widgetsetting: () => {
        return intermediateProcessor(`${sourceID}:widget:widget_widgetsetting`);
    },

    searchbar_show: () => {
        return intermediateProcessor(`${sourceID}:searchbar:searchbar_show`);
    },
    searchbar_search: () => {
        return intermediateProcessor(`${sourceID}:searchbar:searchbar_search`);
    },

    youshouldknow_show: (isShow: boolean) => {
        return intermediateProcessor(
            `${sourceID}:youshouldknow:youshouldknow_show`,
            { value: isShow }
        );
    },
    youshouldknow_slide: () => {
        return intermediateProcessor(
            `${sourceID}:youshouldknow:youshouldknow_slide`
        );
    },
    youshouldknow_cardclose: () => {
        return intermediateProcessor(
            `${sourceID}:youshouldknow:youshouldknow_cardclose`
        );
    },
    youshouldknow_cardaction: () => {
        return intermediateProcessor(
            `${sourceID}:youshouldknow:youshouldknow_cardaction`
        );
    },

    apps_open: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_open`, { value: name });
    },
    apps_setting: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_setting`, {
            value: name,
        });
    },
    apps_checkupdate: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_checkupdate`, {
            value: name,
        });
    },
    apps_clone: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_checkupdate`, {
            value: name,
        });
    },
    apps_uninstall: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_uninstall`, {
            value: name,
        });
    },
    apps_restart: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_restart`, {
            value: name,
        });
    },
    apps_stop: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_stop`, { value: name });
    },
    appsexsiting_open: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:appsexsiting_open`, {
            value: name,
        });
    },
    appsexsiting_setting: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:appsexsiting_setting`, {
            value: name,
        });
    },
    appscustom_open: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:appscustom_open`, {
            value: name,
        });
    },
    appscustom_setting: (name: string) => {
        return intermediateProcessor(`${sourceID}:app:appscustom_setting`, {
            value: name,
        });
    },
    apps_custominstall: () => {
        return intermediateProcessor(`${sourceID}:app:apps_custominstall`);
    },
    apps_external: () => {
        return intermediateProcessor(`${sourceID}:app:apps_external`);
    },

    connect_news: () => {
        return intermediateProcessor(`${sourceID}:connect:connect_news`);
    },
    connect_feedback: () => {
        return intermediateProcessor(`${sourceID}:connect:connect_feedback`);
    },
    connect_discord: () => {
        return intermediateProcessor(`${sourceID}:connect:connect_discord`);
    },
    connect_github: () => {
        return intermediateProcessor(`${sourceID}:connect:connect_github`);
    },
    connect_sharecasaos: () => {
        return intermediateProcessor(`${sourceID}:connect:connect_sharecasaos`);
    },

    appstore_install: (name: string) => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_install`, {
            value: name,
        });
    },
    appstore_detail: (name: string) => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_detail`, {
            value: name,
        });
    },
    appstorecommunity_install: (name: string) => {
        return intermediateProcessor(
            `${sourceID}:appstore:appstorecommunity_install`,
            { value: name }
        );
    },
    appstorecommunity_detail: (name: string) => {
        return intermediateProcessor(
            `${sourceID}:appstore:appstorecommunity_detail`,
            { value: name }
        );
    },
    appstore_slide: () => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_slide`);
    },
    appstore_type: (type: string) => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_type`, {
            value: type,
        });
    },
    appstore_sort: (type: string) => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_sort`, {
            value: type,
        });
    },
    appstore_custominstall: () => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_custominstall`);
    },
    appstore_close: () => {
        return intermediateProcessor(`${sourceID}:appstore:appstore_close`);
    },
    //files
    files_open: (peerid: string) => {
        return intermediateProcessor(`${sourceID}:app:apps_open:files`, {
            value: peerid,
        });
    },
    // local message, params: { action, payload, name }
    mircoapp_communicate: (params: {
        action: string;
        name: string;
        payload: string | { [key: string]: any };
    }) => {
        const payload = typeof params === "string" ? { value: params } : params;
        return intermediateProcessor(
            `${sourceID}:app:mircoapp_communicate`,
            payload
        );
    },
};

export { Messages };

export default messageBus;
