<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from "vue";
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
// import InputText from 'primevue/inputtext'
import InputNumber from "primevue/inputnumber";
import { useToast } from "primevue/usetoast";
import BaseInfoAndBackground from "./BaseInfoAndBackground.vue";
import { useI18n } from "vue-i18n";
import api from "@icewhale/ui-v1-api";
import { messageBus } from "@icewhale/ui-utils";
import useBaseStore from "@/store/baseStore.ts";
import { Languages, SearchEngines, TutorialApps } from "./const.ts";

const { t } = useI18n();
const toast = useToast();
const store = useBaseStore();
const language = ref<{ lang: string; name: string }>();
const searchEngine = ref<{ url: string; name: string }>();
let oldSearchEngineUrl: string = "";
const inputTextElement = ref();
const inputPort = ref<number>(0);
let oldPort: number = 80;
const rssSwitch = ref<boolean>(false);
const tutorialSwitch = ref<Array<string>>([]);

const automountUSB = ref<boolean>(true);
const showNewsFeed = ref<boolean>(true);
const device = ref<string>("");
const selectedApps = ref<Array<string>>([]);
const tutorialAppsCheckList = ref<{ [key: string]: boolean }>({});
const isRaspberryPi = computed(
    () => device.value.toLowerCase().indexOf("raspberry") >= 0
);
const portInputIconClass = computed(() => {
    return inputTextElement.value?.focused || inputPort.value !== oldPort
        ? "casa-check-outline cursor-pointer"
        : "casa-edit-outline cursor-pointer";
});
const isInputPortTextActive = computed(() => {
    return inputTextElement.value?.focused;
});

watch(
    () => tutorialSwitch.value,
    (val) => {
        selectedApps.value = val;
        val.forEach((item) => (tutorialAppsCheckList.value[item] = true));
    }
);
onMounted(() => {
    getPort();
    api.users.getCustomStorage("system").then((res) => {
        const data = res.data.data;

        language.value = Languages.find((item) => item.lang === store.casaos_lang);
        // searchEngine.value = data.search_engine
        searchEngine.value = SearchEngines.find((item) => item.url === data.search_engine);
        oldSearchEngineUrl = searchEngine.value?.url || "";
        rssSwitch.value = data.rss_switch;
        // recommendSwitch.value = data.recommend_switch;
        tutorialSwitch.value = data.tutorial_switch;
    });
});

function getPort() {
    return api.sys.getServerPort().then((res) => {
        if (res.data.success === 200) {
            inputPort.value = oldPort = Number(res.data.data);
        }
    });
}

function onChangeSettings(source: string) {
    console.log(source, "source", searchEngine.value);

    switch (source) {
        case "searchEngine":
            // const oldSearchEngineUrl = searchEngine.value;
            // searchEngine.value = searchEngine.value?.url || searchEngine;
            onSaveSettings()
                .then((res) => {
                    if (res.success === 200) {
                        oldSearchEngineUrl = searchEngine.value?.url || "";
                    }
                })
                .catch((e) => {
                    toast.add({
                        severity: "error",
                        summary: "Save failed",
                        detail: e.data?.message || e.message,
                        life: 5000,
                    });
                    // rewind to old value
                    // searchEngine = oldSearchEngineUrl;
                    searchEngine.value = SearchEngines.find(
                        (item) => item.url === oldSearchEngineUrl
                    );
                });
            break;
        case "lang":
            onSaveSettings()
                .then(() => {
                    store.setLang(language.value?.lang || store.casaos_lang);
                })
                .catch((e) => {
                    toast.add({
                        severity: "error",
                        summary: "Save failed",
                        detail: e.data?.message || e.message,
                        life: 5000,
                    });
                });
            break;
        case "rssSwitch":
            rssSwitch.value = showNewsFeed.value;
            onSaveSettings()
                .then(() => {
                    rssSwitch.value = showNewsFeed.value;
                })
                .catch((e) => {
                    toast.add({
                        severity: "error",
                        summary: "Save failed",
                        detail: e.data?.message || e.message,
                        life: 5000,
                    });
                    showNewsFeed.value = !showNewsFeed.value;
                });
            break;
        case "tutorialSwitch":
            const oldTutorialSwitch = tutorialSwitch.value;
            tutorialSwitch.value = selectedApps.value;
            onSaveSettings().catch((e) => {
                toast.add({
                    severity: "error",
                    summary: "Save failed",
                    detail: e.data?.message || e.message,
                    life: 5000,
                });
                // rewind to old value
                tutorialSwitch.value = oldTutorialSwitch;
                selectedApps.value = oldTutorialSwitch;
                oldTutorialSwitch.forEach((item) => {
                    tutorialAppsCheckList.value[item] = true;
                });
            });
            break;
        default:
            break;
    }
}

function onSaveSettings(): Promise<any> {
    const settings = {
        lang: language.value?.lang || "",
        search_engine: searchEngine.value?.url || "",
        rss_switch: rssSwitch.value,
        // recommend_switch: recommendSwitch.value,
        tutorial_switch: tutorialSwitch.value,
        existing_apps_switch: true, // NOTICE: show other Docker container app is disabled now
    };
    return api.users.setCustomStorage("system", settings).then((res) => res.data.data);
}

function onToggleUSBAutoMount() {
    if (automountUSB.value) {
        messageBus("dashboardsetting_automountusb", "true");
        if (isRaspberryPi.value) {
            toast.add({
                severity: "warn",
                summary: "Notice",
                detail: t(
                    "Enabling this function may cause boot failures when the Raspberry Pi device is booted from USB"
                ),
                life: 5000,
            });
        }
        return api.sys.toggleUsbAutoMount({ state: "on" }).catch((e) => {
            toast.add({
                severity: "error",
                summary: "Save failed",
                detail: e.data?.message || e.message,
                life: 5000,
            });
            automountUSB.value = false;
        });
    } else {
        messageBus("dashboardsetting_automountusb", "false");
        return api.sys.toggleUsbAutoMount({ state: "off" }).catch((e) => {
            toast.add({
                severity: "error",
                summary: "Save failed",
                detail: e.data?.message || e.message,
                life: 5000,
            });
            automountUSB.value = true;
        });
    }
}

function onCheckApps(item: string, event?: MouseEvent) {
    event?.stopPropagation();
    tutorialAppsCheckList.value[item] = !tutorialAppsCheckList.value[item];
    selectedApps.value = Object.keys(tutorialAppsCheckList.value).filter(
        (key) => tutorialAppsCheckList.value[key]
    );
    onChangeSettings("tutorialSwitch");
}

function onSavePort() {
    if (inputPort.value === oldPort) {
        return;
    }
    messageBus("dashboardsetting_webuiport", inputPort.value.toString());
    api.sys
        .editServerPort({ port: inputPort.value.toString() })
        .then((res) => {
            if (res.data.success === 200) {
                oldPort = inputPort.value;
                checkPortApplied();
            }
        })
        .catch((e) => {
            console.log(e);
        });
}
let timer: number = 0;
function checkPortApplied() {
    timer = setInterval(() => {
        const newUrl = `${location.protocol}//${location.hostname}:${inputPort.value}`;
        api.sys.checkUiPort(`${newUrl}/v1/gateway/port`).then((res) => {
            if (res.data.success === 200) {
                clearInterval(timer);
                const url = `${location.protocol}//${location.hostname}:${res.data.data}`;
                const parent = window?.parent ?? window;
                parent.open(url, "_self");
            }
        });
    }, 1000);
}

function focusInputText() {
    nextTick(() => {
        inputTextElement.value?.$el.querySelector("input").focus();
    });
}

function operatedPort() {
    nextTick(() => {
        if (isInputPortTextActive.value) {
            onSavePort();
        } else {
            focusInputText();
        }
    });
}

function rewindPort() {
    nextTick(() => {
        inputPort.value = oldPort;
    });
}
</script>

<template>
    <BaseInfoAndBackground></BaseInfoAndBackground>

    <div class="space-y-2">
        <div class="flex items-center px-4 py-1.5 bg-white rounded-lg text-gary/primary">
            <div class="casa-language2-outline mr-3 text-2xl leading-6"></div>
            <div class="grow font-medium text-sm">
                {{ $t("Language") }}
            </div>
            <Dropdown append-to="self" panel-class="w-full" v-model="language" :options="Languages" optionLabel="name"
                checkmark :highlightOnSelect="false" class="w-[12.125rem]" @change="onChangeSettings('lang')">
                <template #option="slotProps">
                    <div
                        :class="slotProps.option.name === language?.name ? `casa-check-outline text-sky-600` : `h-4 w-4`">
                    </div>
                    <div>{{ $t(slotProps.option.name) }}</div>
                </template>
            </Dropdown>
        </div>

        <div class="flex items-center px-4 py-1.5 bg-white rounded-lg text-gary/primary">
            <div class="casa-search-outline mr-3 text-2xl leading-6"></div>
            <div class="grow font-medium text-sm">
                {{ $t("Search Engine") }}
            </div>
            <Dropdown append-to="self" panel-class="w-full" v-model="searchEngine" :options="SearchEngines"
                optionLabel="name" checkmark :highlightOnSelect="false" class="w-[12.125rem]"
                @change="onChangeSettings('searchEngine')">

                <template #option="slotProps">
                    <div
                        :class="slotProps.option.name === searchEngine?.name ? `casa-check-outline text-sky-600` : `h-4 w-4`">
                    </div>
                    <div>{{ $t(slotProps.option.name) }}</div>
                </template>
            </Dropdown>
        </div>

        <div class="flex items-center px-4 py-1.5 bg-white rounded-lg text-gary/primary">
            <div class="casa-port-outline mr-3 text-2xl leading-6"></div>
            <div class="grow font-medium text-sm">
                {{ $t("WebUI Port") }}
            </div>
            <div
                class="w-[12.125rem] group bg-transparent h-8 rounded-md flex items-center outline outline-1 outline-gray-200 hover:outline-sky-600 focus-within:outline-sky-600 focus-within:outline-custom-blue-1 focus-within:shadow-input-glory transition-input duration-200">
                <InputNumber ref="inputTextElement" :modelValue="inputPort"
                    @input="({ value }) => (inputPort = Number(value))" input-class="w-full"
                    class="py-0 grow caret-custom-blue-1 bg-transparent outline-none" @blur="rewindPort"
                    @keyup.enter="operatedPort" />
                <i class="mr-2 group-hover:text-sky-600" :class="portInputIconClass" @click="operatedPort"
                    @mousedown.prevent />
            </div>
        </div>

        <div class="flex items-center px-4 py-1.5 bg-white rounded-lg text-gary/primary">
            <div class="casa-usb-outline mr-3 text-2xl leading-6"></div>
            <div class="grow font-medium text-sm">
                {{ $t("USB auto-mount") }}
            </div>
            <InputSwitch class="sm" v-model="automountUSB" @change="onToggleUSBAutoMount" />
        </div>

        <div class="flex items-center px-4 py-1.5 bg-white rounded-lg text-gary/primary">
            <div class="casa-news-outline mr-3 text-2xl leading-6"></div>
            <div class="grow font-medium text-sm">
                {{ $t("News feed") }}
            </div>
            <InputSwitch class="sm" v-model="showNewsFeed" @change="onChangeSettings('rssSwitch')" />
        </div>

        <div class="flex items-center px-4 py-1.5 bg-white rounded-lg text-gary/primary">
            <div class="casa-display-applications-outline mr-3 text-2xl leading-6"></div>
            <div class="grow font-medium text-sm">
                {{ $t("Tips") }}
            </div>
            <Dropdown append-to="self" panel-class="w-full sm p-0" class="w-[12.125rem]" v-model="selectedApps"
                :options="TutorialApps" checkmark @change="
                    onCheckApps(
                        $event.value,
                        $event.originalEvent as MouseEvent
                    )
                    ">

                <template #value="slotProps">
                    <div class="flex items-center">{{ slotProps.value.length }} items</div>
                </template>

                <template #option="slotProps">
                    <div class="h-8 flex items-center" @click.capture="onCheckApps(slotProps.option, $event)">
                        <div
                            :class="tutorialAppsCheckList[slotProps.option] ? `casa-check-outline text-sky-600 text-base` : `h-4 w-4`">
                        </div>
                        <span class="text-sm grow ml-2">
                            {{ slotProps.option }}
                        </span>
                    </div>
                </template>
            </Dropdown>
        </div>
    </div>
</template>
