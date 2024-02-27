<template>
    <Dialog v-model:visible="visible" :header="t('Change wallpaper')" modal :draggable="false"
        class="w-[40rem] rounded-2lg overflow-hidden header-split-line footer-split-line" closeIcon="casa-close-outline"
        :pt="{
            headerTitle: { class: '!text-base !font-semibold' }
        }">
        <div class="w-full">
            <div class="w-auto my-12 mx-[42px] relative border-6 border-custom-black-2 shadow-wallpaper rounded-2xl overflow-hidden bg-cover	bg-no-repeat bg-center transition-background duration-500"
                :style="[backgroundStyleObject]">
                <!-- old background fade out placeholder -->
                <Image class="w-full" :src="placeholder" />
                <!-- <Image class="absolute inset-0 aa" :class="{ fadeIn: animate }" :src="wallpaperUrl"/> -->
                <Image class="absolute top-[14.8%] left-[8.3%] width-[24%]" :src="previewWidget" />
            </div>
            <div class="w-full h-[140px] flex">
                <Image imageClass="h-full" class="mr-4 my-3 border border-transparent rounded-md overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-wallpeper-hover"
                    :class="{ 'shadow-wallpeper-hover': wallpaperUrl === wallpaper01 }" :src="wallpaper01"
                    @click.native="selectBuiltInWallpaper(wallpaper01)" />
                <Image imageClass="h-full" class="mr-4 my-3 border border-transparent rounded-md overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-wallpeper-hover"
                    :class="{ 'shadow-wallpeper-hover': wallpaperUrl === wallpaper02 }" :src="wallpaper02"
                    @click.native="selectBuiltInWallpaper(wallpaper02)" />
                <div id="upload-wallpaper" class="grow my-3 middle bg-gray-100 border border-transparent rounded-md overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-wallpeper-hover">
                    <Image v-if="isUpLoading" imageClass="w-12 h-12" :src="loadingSvg" />
                    <div v-else class="text-[3rem] casa-picture-upload-outline"></div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="w-full h-8">
                <Button class="h-full px-4 mr-2 rounded-3xl text-white float-right bg-custom-blue-1 hover:bg-custom-blue-2"
                    :label="t('Apply')" unstyled @click="onConfirmWallpaper">
                </Button>
                <Button class="h-full px-4 mr-2 rounded-3xl float-right border hover:border-custom-gray-2"
                    :label="t('Cancel')" unstyled @click="close">
                </Button>
            </div>
        </template>
    </Dialog>
    <Toast position="top-center"></Toast>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import Image from "primevue/image";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Uploader from "simple-uploader.js";

import { baseURL } from "@network/socket";
// import useBaseStore from "@/store/baseStore";
// import useSettingStore from "@/store/settingStore";
// import { stopMaskPropagation, transformServerUrl, unTransformServerUrl } from "@/utils";

import wallpaper01 from "@assets/img/General/zimaos01.jpg";
import wallpaper02 from "@assets/img/General/zimaos02.jpg";
import placeholder from "@assets/img/General/placeholder.png";
import loadingSvg from "@assets/img/General/loading.svg";
import previewWidget from "@assets/img/General/preview-widget.svg";
// import api from "@/network/api";
import api from "@icewhale/icewhale-v1-api";
// import messageBus from "@/events";
import { messageBus } from "@icewhale/ui-utils";

const props = defineProps<{
    wallpaperUrl: string,
}>();
const emit = defineEmits(["update:wallpaperUrl"]);

const { t } = useI18n();
const toast = useToast();
// const store = useBaseStore();
// const settingStore = useSettingStore();

const visible = ref(false);
const animate = ref(false);
const isUpLoading = ref(false);
// const wallpaperUrl = ref(settingStore.wallpaperUrl);
const wallpaperType = ref("Built-in");
const wallpaperNamespace = "wallpaper";
const attributes = { accept: "image/png, image/jpeg, image/svg+xml, image/bmp, image/png, image/gif" };
const targetUrl = computed(() => {
    return `${location.protocol}//${baseURL}/v1/users/current/image/${wallpaperNamespace}?token=${localStorage.getItem("access_token")}&type=wallpaper`;
});
const backgroundStyleObject = computed(() => {
    return {
        backgroundImage: `url(${props.wallpaperUrl})`
    };
});

const uploader = new Uploader({
    target: targetUrl.value,
    singleFile: true,
    testChunks: false,
    uploadMethod: "POST",
    allowDuplicateUploads: true,
    chunkSize: 1024 * 1024 * 1024 * 1024
});

// watch(() => settingStore.wallpaperUrl, (newVal) => {
watch(() => props.wallpaperUrl, (newVal) => {
    if (newVal) {
        // wallpaperUrl.value = newVal;
        emit("update:wallpaperUrl", newVal);
    }
});

// watch(() => store.access_token, (newVal) => {
//     if (newVal) {
//         wallpaperType.value = newVal;
//     }
// });

function bindEvents() {
    uploader.assignBrowse(document.getElementById("upload-wallpaper"), false, true, attributes);
    uploader.on("filesSubmitted", () => {
        isUpLoading.value = true;
        uploader.upload();
    });
    uploader.on("fileError", () => {
        isUpLoading.value = false;
        toast.add({ severity: "error", summary: t("Upload failed, please try again!"), detail: "" });
    });
    uploader.on("fileSuccess", (rootFile: any, file: any, message: string) => {
        isUpLoading.value = false;
        console.info("upload wallpaper success", rootFile, file);
        const res = JSON.parse(message);
        // debugger
        if (res.success === 200) {
            const path = `SERVER_URL${res.data.online_path}&time=${Date.now()}`;
            // wallpaperUrl.value = transformServerUrl(path);
            emit("update:wallpaperUrl", transformServerUrl(path));
            wallpaperType.value = "Upload";
        } else {
            toast.add({ severity: "error", summary: res.message, detail: "" });
        }
    });
}

function unbindEvents() {
    uploader.off("filesSubmitted");
    uploader.off("fileError");
    uploader.off("fileSuccess");
}

function selectBuiltInWallpaper(path: string) {
    // wallpaperUrl.value = path;
    emit("update:wallpaperUrl", path);
    wallpaperType.value = "Built-in";
    animate.value = true;
}


function onConfirmWallpaper() {
    if (isUpLoading.value) {
        toast.add({ severity: "info", summary: t("Uploading"), detail: "" });
        return;
    }
    api.users.setCustomStorage(wallpaperNamespace, { path: unTransformServerUrl(props.wallpaperUrl), from: wallpaperType.value })
        .then((res: any) => {
            if (res.data.success === 200) {
                messageBus("dashboardsetting_wallpaper", res.data.data.path.toString());
                // settingStore.wallpaper.path = wallpaperUrl.value;
                // settingStore.wallpaper.from = wallpaperType.value;
                // settingStore.wallpaper.path = props.wallpaperUrl;
                // settingStore.wallpaper.from = wallpaperType.value;
                close();
            } else {
                throw new Error(res.data.message);
            }
        })
        .catch((e: any) => {
            toast.add({ severity: "error", summary: e.data?.message || e.message, detail: "" });
        });
}

function open() {
    visible.value = true;
    nextTick(() => {
        bindEvents();
        stopMaskPropagation();
    });
}
function close() {
    unbindEvents();
    nextTick(() => {
        visible.value = false;
    });
}
function toggle() {
    visible.value ? close() : open();
}

function stopMaskPropagation() {
    const mask = document.getElementsByClassName("p-dialog-mask")[0] as HTMLElement;
    mask?.addEventListener("click", e => e.stopPropagation(), false);
}
function transformServerUrl(serverUrl: string) {
    return serverUrl.replace('SERVER_URL', `${location.protocol}//${baseURL}`);
}
function unTransformServerUrl(serverUrl: string) {
    return serverUrl.replace(`${location.protocol}//${baseURL}`, 'SERVER_URL');
}

defineExpose({
    open,
    close,
    toggle,
});
</script>

<style scoped lang="scss"></style>
