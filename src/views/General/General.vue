<script setup lang="ts">
import { ref, onMounted, /* watch */ } from 'vue';
import Dropdown from 'primevue/dropdown';
import { useToast } from "primevue/usetoast";
import api from '@icewhale/icewhale-v1-api';
import useBaseStore from '@/store/baseStore.ts';
import { Languages, /* SearchEngines, */ /* TutorialApps */ } from "./const.ts";

const toast = useToast();
const store = useBaseStore();
const language = ref<string>('');
const searchEngine = ref<string>('');
const rssSwitch = ref<boolean>(false);
const recommendSwitch = ref<boolean>(false);
const tutorialSwitch = ref<Array<string>>([]);


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
        // case "rssSwitch":
        //     const oldRssSwitch = rssSwitch;
        //     rssSwitch = showNewsFeed.value;
        //     onSaveSettings().catch(e => {
        //         toast.add({ severity: "error", summary: "Save failed", detail: e.data?.message || e.message, life: 5000 });
        //         // rewind to old value
        //         rssSwitch = oldRssSwitch;
        //         showNewsFeed.value = oldRssSwitch;
        //     });
        //     break;
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
</script>

<template>
    <div>
        Info
    </div>

    <div class=" space-y-2">
        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-language-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('Language') }}
            </div>
            <Dropdown v-model="language" :options="Languages" optionLabel="name" checkmark :highlightOnSelect="false"
                class="w-full md:w-14rem" @change="onChangeSettings('lang')" />
        </div>

        <div class="flex items-center px-4 py-2.5 bg-white rounded-lg">
            <div class="casa-language-outline mr-3 text-2xl leading-6"></div>
            <div class="grow">
                {{ $t('Search Engine') }}
            </div>
            <Dropdown v-model="language" :options="Languages" optionLabel="name" checkmark :highlightOnSelect="false"
                class="w-full md:w-14rem" @change="onChangeSettings('lang')" />
        </div>
    </div>
</template>
