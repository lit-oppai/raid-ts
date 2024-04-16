<script setup lang="ts">
import { ref, onMounted }                   from "vue";
import Button                               from "primevue/button";
import Skeleton                             from "primevue/skeleton";
import PImage                               from "primevue/image";
import { messageBus }                       from "@icewhale/ui-utils";
import { install, appStoreAPI, composeApi } from "@network/index.ts";
import { UpgradableAppInfoStatusEnum }      from "@icewhale/casaos-appmanagement-openapi";
import supermanRaidSVG                      from "@/assets/img/StorageManager/supermanRaid.svg";
import { showTitle }                        from "@/i18n.ts";
import { useRoute }                         from "vue-router";

const route = useRoute();
const isUpdateSys = ref<boolean>(route.query.isUpdateSys === "true");
const releaseBackgroundPath = ref<string>("");
const imageLoaded = ref<boolean>(false);
const releaseCode = ref<string>("");
const releaseVersion = ref<string>("");
const upgradableAppList = ref<any[]>([
    {
        status: "idle",
        store_app_id: "unifi-network-application",
        title: '{"custom":"","en_us":"Unifi Network Application"}',
        version: "latest",
        icon: supermanRaidSVG,
    },
    {
        status: "updating",
        store_app_id: "chatgpt-next-web",
        title: '{"en_us":"ChatGPT Next Web"}',
        version: "v2.11.3",
        icon: supermanRaidSVG,
    },
]);

onMounted(() => {
    getRealeaseInfo();
    getUpgradableAppList();
});

function getRealeaseInfo() {
    install.getRelease().then(({ data }) => {
        const img = new Image();
        img.onload = onImageLoad;
        releaseBackgroundPath.value =
            data.data?.background ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Central_Californian_Coastline%2C_Big_Sur_-_May_2013.jpg/1200px-Central_Californian_Coastline%2C_Big_Sur_-_May_2013.jpg";

        img.src = releaseBackgroundPath.value;
        releaseCode.value = data.data?.code ?? "HULUWA-DAWA";
        releaseVersion.value = data.data?.version ?? "0.0.0";
    });
}
function callUpdatePanel() {
    messageBus("setting_openUpdatePanel");
}
function onImageLoad() {
    imageLoaded.value = true;
}

function getUpgradableAppList() {
    appStoreAPI.upgradableAppList().then(({ data }) => {
        upgradableAppList.value = data.data || [];
    });
}
function upgradeApp(store_app_id: string) {
    composeApi.updateComposeApp(store_app_id).then(() => {
        getUpgradableAppList();
    });
}
</script>

<template>
    <Skeleton
        v-if="!imageLoaded && isUpdateSys"
        width="100%"
        height="11rem"
        class="mt-6"
    />
    <div
        v-else-if="isUpdateSys"
        class="mt-6 w-full h-[11rem] relative overflow-hidden text-center text-white"
    >
        <img
            class="absolute w-full h-full object-cover rounded-xl -z-10"
            :src="releaseBackgroundPath"
        />
        <div class="text-sm pt-4">ZimaOS</div>
        <div class="text-3xl font-semibold pt-1">
            {{ releaseCode }}
        </div>
        <Button
            class="mt-8"
            :label="$t(`Update`)"
            severity="primary"
            size="medium"
            @click="callUpdatePanel"
        ></Button>
        <div class="text-xs pt-2">
            {{
                $t("ZiamOS {releaseVersion} is available", {
                    releaseVersion: releaseVersion,
                })
            }}
        </div>
    </div>
    <div class="mt-6 space-y-2">
        <div
            class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5 ml-0.5"
        >
            {{ $t("Apps update") }}
        </div>
        <div
            v-for="item in upgradableAppList"
            class="bg-white w-full h-[68px] px-3 py-4 flex justify-center items-center space-x-3 rounded-lg"
        >
            <PImage :src="item.icon" class="w-6 h-6"></PImage>
            <div class="flex-1 flex flex-col space-y-1">
                <span
                    class="text-zinc-800 text-base font-medium font-['Roboto'] leading-normal"
                    >{{ showTitle(JSON.parse(item.title)) }}</span
                >
                <span
                    class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-4"
                    >{{ item.version }}</span
                >
            </div>
            <Button
                v-if="item.status === UpgradableAppInfoStatusEnum.Idle"
                class="grow-0"
                :label="$t('Update')"
                severity="secondary"
                size="medium"
                @click="upgradeApp(item.store_app_id)"
            ></Button>
            <span
                v-else
                class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-4"
            >
                {{ $t("Updating") }}...
            </span>
        </div>
    </div>
</template>
