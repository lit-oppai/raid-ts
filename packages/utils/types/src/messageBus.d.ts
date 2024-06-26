export declare function messageBus(name: keyof typeof Messages, params?: string | {
    [key: string]: any;
}): Promise<import("axios").AxiosResponse<any, any>>;
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
export declare const Messages: {
    global_newvisit: () => MessageBusPayload;
    global_visit: () => MessageBusPayload;
    account_setting: () => MessageBusPayload;
    account_setting_logout: () => MessageBusPayload;
    dashboardsetting: () => MessageBusPayload;
    dashboardsetting_showsearchbar: (isTrue: boolean) => MessageBusPayload;
    dashboardsetting_searchengine: (whichSearchengine: string) => MessageBusPayload;
    dashboardsetting_language: (whichLanguage: string) => MessageBusPayload;
    dashboardsetting_webuiport: (num: number) => MessageBusPayload;
    dashboardsetting_wallpaper: (wallpaper: string) => MessageBusPayload;
    dashboardsetting_showexistingapp: (isShow: boolean) => MessageBusPayload;
    dashboardsetting_news: (isShow: boolean) => MessageBusPayload;
    dashboardsetting_automountusb: (isShow: boolean) => MessageBusPayload;
    dashboardsetting_versionavailable_show: (isTrue: boolean) => MessageBusPayload;
    dashboardsetting_versionupdate: (isTrue: boolean) => MessageBusPayload;
    settings_openWallpaperPanel: () => MessageBusPayload;
    setting_openUpdatePanel: () => MessageBusPayload;
    dashboardsetting_reboot: () => MessageBusPayload;
    dashboardsetting_shutdown: () => MessageBusPayload;
    terminallogs: () => MessageBusPayload;
    terminallogs_terminal: () => MessageBusPayload;
    terminallogs_connect: () => MessageBusPayload;
    terminallogs_logs: () => MessageBusPayload;
    widget_systemstatus: (status: string) => MessageBusPayload;
    widget_cpu: () => MessageBusPayload;
    widget_ram: () => MessageBusPayload;
    widget_storagemanager: () => MessageBusPayload;
    storagemanager_storage: () => MessageBusPayload;
    storagemanager_createstorage: () => MessageBusPayload;
    storagemanager_mergestorage: () => MessageBusPayload;
    storagemanager_drive: () => MessageBusPayload;
    widget_widgetsetting: () => MessageBusPayload;
    searchbar_show: () => MessageBusPayload;
    searchbar_search: () => MessageBusPayload;
    youshouldknow_show: (isShow: boolean) => MessageBusPayload;
    youshouldknow_slide: () => MessageBusPayload;
    youshouldknow_cardclose: () => MessageBusPayload;
    youshouldknow_cardaction: () => MessageBusPayload;
    apps_open: (name: string) => MessageBusPayload;
    apps_setting: (name: string) => MessageBusPayload;
    apps_checkupdate: (name: string) => MessageBusPayload;
    apps_clone: (name: string) => MessageBusPayload;
    apps_uninstall: (name: string) => MessageBusPayload;
    apps_restart: (name: string) => MessageBusPayload;
    apps_stop: (name: string) => MessageBusPayload;
    appsexsiting_open: (name: string) => MessageBusPayload;
    appsexsiting_setting: (name: string) => MessageBusPayload;
    appscustom_open: (name: string) => MessageBusPayload;
    appscustom_setting: (name: string) => MessageBusPayload;
    apps_custominstall: () => MessageBusPayload;
    apps_external: () => MessageBusPayload;
    connect_news: () => MessageBusPayload;
    connect_feedback: () => MessageBusPayload;
    connect_discord: () => MessageBusPayload;
    connect_github: () => MessageBusPayload;
    connect_sharecasaos: () => MessageBusPayload;
    appstore_install: (name: string) => MessageBusPayload;
    appstore_detail: (name: string) => MessageBusPayload;
    appstorecommunity_install: (name: string) => MessageBusPayload;
    appstorecommunity_detail: (name: string) => MessageBusPayload;
    appstore_slide: () => MessageBusPayload;
    appstore_type: (type: string) => MessageBusPayload;
    appstore_sort: (type: string) => MessageBusPayload;
    appstore_custominstall: () => MessageBusPayload;
    appstore_close: () => MessageBusPayload;
    files_open: (peerid: string) => MessageBusPayload;
    mircoapp_communicate: (params: {
        action: string;
        name: string;
        payload: string | {
            [key: string]: any;
        };
    }) => MessageBusPayload;
};
export {};
