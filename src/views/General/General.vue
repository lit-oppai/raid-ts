<script setup lang="ts">
import { ref, onMounted, computed, /* watch */ } from 'vue';
import Dropdown from 'primevue/dropdown';
import InputSwitch from 'primevue/inputswitch';
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import api from '@icewhale/icewhale-v1-api';
import { messageBus } from '@icewhale/ui-utils';
import useBaseStore from '@/store/baseStore.ts';
import { Languages, SearchEngines, TutorialApps } from "./const.ts";

const { t } = useI18n();
const toast = useToast();
const store = useBaseStore();
const language = ref<string>('');
const searchEngine = ref<string>('');
const rssSwitch = ref<boolean>(false);
const recommendSwitch = ref<boolean>(false);
const tutorialSwitch = ref<Array<string>>([]);

const automountUSB = ref<boolean>(true);
const showNewsFeed = ref<boolean>(true);
const device = ref<string>("");
const selectedApps = ref<Array<string>>([]);
const tutorialAppsCheckList = ref<{ [key: string]: boolean }>({});
const isRaspberryPi = computed(() => device.value.toLowerCase().indexOf("raspberry") >= 0);


// watch(() => tutorialSwitch, (val) => {
//     selectedApps.value = val;
//     val.forEach(item => tutorialAppsCheckList.value[item] = true);
// });
onMounted(() => {
    api.users.getCustomStorage("system").then(res => {
        const data = res.data.data;
        language.value = data.lang;
        searchEngine.value = data.search_engine;
        rssSwitch.value = data.rss_switch;
        recommendSwitch.value = data.recommend_switch;
        tutorialSwitch.value = data.tutorial_switch;
    });
})
function onChangeSettings(source: string) {
    switch (source) {
        // case "searchEngine":
        //     const oldSearchEngine = searchEngine.value;
        //     searchEngine.value = searchEngine.value?.url || searchEngine;
        //     onSaveSettings().catch(e => {
        //         toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
        //         // rewind to old value
        //         searchEngine = oldSearchEngine;
        //         searchEngine.value = SearchEngines.find(item => item.url === oldSearchEngine);
        //     });
        //     break;
        // case "searchEngineSwitch":
        //     const oldSearchEngineSwitch = searchEngineSwitch;
        //     searchEngineSwitch = showSearchBar.value;
        //     onSaveSettings().catch(e => {
        //         toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
        //         // rewind to old value
        //         searchEngineSwitch = oldSearchEngineSwitch;
        //         showSearchBar.value = oldSearchEngineSwitch;
        //     });
        //     break;
        case "lang":
            // const oldLang = store.casaos_lang;
            onSaveSettings().then(() => {
                store.setLang(language.value || store.casaos_lang);

            }).catch(e => {
                toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
                // rewind to old value
                // store.setLang(oldLang);
                // language.value = Languages.find(item => item.lang === oldLang);
            });
            break;
        case "rssSwitch":
            // const oldRssSwitch = rssSwitch;
            rssSwitch.value = showNewsFeed.value;
            onSaveSettings().then(() => {
                rssSwitch.value = showNewsFeed.value;
            }).catch(e => {
                toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
                // rewind to old value
                // rssSwitch.value = oldRssSwitch;
                showNewsFeed.value = !showNewsFeed.value;
            });
            break;
        // case "recommendSwitch":
        //     const oldRecommendSwitch = recommendSwitch;
        //     recommendSwitch = showRecomand.value;
        //     onSaveSettings().catch(e => {
        //         toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
        //         // rewind to old value
        //         recommendSwitch = oldRecommendSwitch;
        //         showRecomand.value = oldRecommendSwitch;
        //     });
        //     break;
        // case "tutorialSwitch":
        //     const oldTutorialSwitch = tutorialSwitch;
        //     tutorialSwitch = selectedApps.value;
        //     onSaveSettings().catch(e => {
        //         toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
        //         // rewind to old value
        //         tutorialSwitch = oldTutorialSwitch;
        //         selectedApps.value = oldTutorialSwitch;
        //         oldTutorialSwitch.forEach(item => {
        //             tutorialAppsCheckList.value[item] = true;
        //         });
        //     });
        //     break;
        default:
            break;
    }
}

function onSaveSettings(): Promise<any> {
    const settings = {
        lang: store.casaos_lang,
        search_engine: searchEngine.value,
        rss_switch: rssSwitch.value,
        recommend_switch: recommendSwitch.value,
        tutorial_switch: tutorialSwitch.value,
        existing_apps_switch: true, // NOTICE: show other Docker container app is disabled now
    };
    return api.users.setCustomStorage("system", settings)
        .then(res => res.data.data)
}

function onToggleUSBAutoMount() {
    if (automountUSB.value) {
        messageBus("dashboardsetting_automountusb", "true");
        if (isRaspberryPi.value) {
            toast.add({ severity: "warn", summary: "Notice", detail: t("Enabling this function may cause boot failures when the Raspberry Pi device is booted from USB"), life: 5000 });
        }
        return api.sys.toggleUsbAutoMount({ state: "on" }).catch(e => {
            toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
            automountUSB.value = false;
        });
    } else {
        messageBus("dashboardsetting_automountusb", "false");
        return api.sys.toggleUsbAutoMount({ state: "off" }).catch(e => {
            toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
            automountUSB.value = true;
        });
    }
}

function onCheckApps(item: string, event?: MouseEvent) {
    event?.stopPropagation();
    tutorialAppsCheckList.value[item] = !tutorialAppsCheckList.value[item];
    selectedApps.value = Object.keys(tutorialAppsCheckList.value).filter(key => tutorialAppsCheckList.value[key]);
    onChangeSettings("tutorialSwitch");
}
</script>

<template>
    <div>
        Info
    </div>

    <div class="space-y-2">
        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-language-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('Language') }}
            </div>
            <Dropdown v-model="language" :options="Languages" optionLabel="name" checkmark :highlightOnSelect="false"
                class="w-full md:w-14rem" @change="onChangeSettings('lang')" />
        </div>

        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-search-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('Search Engine') }}
            </div>
            <Dropdown v-model="searchEngine" :options="SearchEngines" optionLabel="name" checkmark
                :highlightOnSelect="false" class="w-full md:w-14rem" @change="onChangeSettings('searchEngine')" />
        </div>

        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-port-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('WebUI Port') }}
            </div>
            <Dropdown v-model="searchEngine" :options="SearchEngines" optionLabel="name" checkmark
                :highlightOnSelect="false" class="w-full md:w-14rem" @change="onChangeSettings('lang')" />
        </div>

        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-usb-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('USB Auto-Mount') }}
            </div>
            <InputSwitch class="sm" v-model="automountUSB" @change="onToggleUSBAutoMount" />
        </div>

        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-news-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('News Feeds') }}
            </div>
            <InputSwitch class="sm" v-model="showNewsFeed" @change="onChangeSettings('rssSwitch')" />
        </div>

        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-display-applications-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('Tips') }}
            </div>
            <Dropdown class="w-40 sm" panelClass="sm p-0" v-model="selectedApps" :options="TutorialApps"
                @change="onCheckApps($event.value, $event.originalEvent as MouseEvent)">
                <template #value="slotProps">
                    <div class="flex items-center">
                        {{ slotProps.value.length }} items
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="h-8 flex items-center" @click.capture="onCheckApps(slotProps.option, $event)">
                        <Checkbox class="base ml-2" v-model="tutorialAppsCheckList[slotProps.option]" :binary="true" />
                        <span class="text-sm grow ml-2"> {{ slotProps.option }} </span>
                    </div>
                </template>
            </Dropdown>
        </div>
    </div>
</template>
