<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { install } from "@network/index.ts";
import { messageBus } from "@icewhale/ui-utils";

const releaseBackgroundPath = ref<string>("");
const imageLoaded = ref<boolean>(false);
const releaseCode = ref<string>("");
const releaseVersion = ref<string>("");

onMounted(() => {
    getRealeaseInfo();
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
</script>

<template>
    <Skeleton v-if="!imageLoaded" width="100%" height="11rem" />
    <div v-if="imageLoaded" class="w-full h-[11rem] relative text-center text-white">
        
        <img class="absolute w-full h-full object-cover rounded-xl -z-10" :src="releaseBackgroundPath" />
        <div class="text-sm pt-4">ZimaOS</div>
        <div class="text-3xl font-semibold pt-1">
            {{ releaseCode }}
        </div>
        <Button class="mt-8" :label="$t(`Update`)" severity="primary" size="medium" @click="callUpdatePanel"></Button>
        <div class="text-xs pt-2">
            {{ $t("ZiamOS {releaseVersion} is available", { releaseVersion: releaseVersion }) }}
        </div>
    </div>
</template>
