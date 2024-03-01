<script setup lang="ts">
import { reactive, ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import api from "@icewhale/icewhale-v1-api";
import { useForm } from "vee-validate";
import { device } from "@network/index.ts";
import { messageBus } from "@icewhale/ui-utils";
import { socket, baseURL } from "@network/socket";
// import WallpapersDialog from "./WallpapersDialog.vue";
import ProcotolDialog from "./ProtocolDialog.vue";
import defaultWallpaper from "/zimaos01.jpg";

const wallpaperNamespace = "wallpaper";
interface Wallpaper {
    path: string;
    from: string;
}
const wallpaper: Wallpaper = reactive({
    path: defaultWallpaper,
    from: "Built-in",
});
const name = ref<string>("");
const version = ref<string>("0.0.0");
const SN = ref<string>("ZM-2021-0001");
const editState = ref<boolean>(false);
const editName = ref<HTMLInputElement | null>(null);
// const wallpapersDialogRef = ref();
const protocolDialogRef = ref();
const backgroundStyleObject = computed(() => {
    return {
        backgroundImage: `url(${wallpaper.path})`,
    };
});

function getWallpaper() {
    api.users
        .getCustomStorage(wallpaperNamespace)
        .then((res) => {
            if (res.data.success === 200 && res.data.data !== "") {
                wallpaper.path = transformServerUrl(res.data.data.path);
                wallpaper.from = res.data.data.from;
                console.log(wallpaper, "res.data.data");
                return;
            }
        })
        .catch(() => { });
}
import { object, string } from "yup";

const { errors, defineField, handleSubmit } = useForm({
    validationSchema: object({
        NameMacSchema: string()
            .required()
            .min(3, "Too short")
            .max(20)
            .matches(/^[a-zA-Z0-9\x20\-\u4e00-\u9fa5]+$/, "Do not allow special characters"),
    }),
});
const [nameMac, nameMacAttrs] = defineField("NameMacSchema", {
    validateOnModelUpdate: true,
});
onMounted(async () => {
    getWallpaper();
    bindMessageBus();
    try {
        await getDeviceInfo();
    } catch (error) {
        console.log(error, "error");
    }
    nameMac.value = name.value;
});
onUnmounted(() => {
    unbindMessageBus();
});
function bindMessageBus() {
    socket.on("casaos-ui:topbar:dashboardsetting_wallpaper", getWallpaper);
}
function unbindMessageBus() {
    socket.off("casaos-ui:topbar:dashboardsetting_wallpaper", getWallpaper);
}
const messageNameMac = computed<string>(() => {
    return errors.value?.NameMacSchema
        ? errors.value.NameMacSchema
        : "After refreshing, the modification will take effect and previous name will become invalid.";
});
const messageClassNameMac = computed<string>(() => {
    return errors.value?.NameMacSchema
        ? "text-orange-500 bg-rose-100"
        : "text-tertiary-300 bg-tertiary-100";
});
const iconNameMac = computed<string>(() => {
    if (!editState.value) {
        return "casa-edit-outline text-gray-200";
    }
    return errors.value?.NameMacSchema
        ? "casa-warning-solid text-red-500"
        : "casa-check-outline text-greed-default cursor-pointer";
});

function selectMacName() {
    editState.value = true;
    nextTick(() => {
        editName.value?.select();
    });
}
function operateMacName() {
    editState.value ? submitMacName() : selectMacName();
}
function deselectMacName() {
    editState.value = false;
    nameMac.value = name.value;
}
function activeMacName() {
    editState.value ? "" : selectMacName();
}
function submitMacName() {
    handleSubmit(
        (values) => {
            // 成功 并保存
            device
                .putDeviceInfo({ device_name: values.NameMacSchema })
                .then((res) => {
                    if (res.status === 200) {
                        name.value = values.NameMacSchema;
                        editState.value = false;
                    }
                })
                .catch(() => {
                    nameMac.value = name.value;
                });
        },
        (v) => {
            // 失败，不允许保存
            console.log(v, "v");
        }
    )();
}
async function getDeviceInfo() {
    await device.getDeviceInfo().then((res) => {
        if (res.status === 200) {
            name.value = res.data.device_name;
            version.value = res.data?.os_version ?? "1.0.0";
            SN.value = res.data?.hash ?? "ZM-2024-0001";
        }
    });
}

function showChangeWallpaperDialog() {
    messageBus("settings_openWallpaperPanel");
}

function showProtocolDialog() {
    protocolDialogRef.value?.open();
}

function transformServerUrl(serverUrl: string) {
    return serverUrl.replace('SERVER_URL', `${location.protocol}//${baseURL}`);
}
</script>

<template>
    <div class="flex justify-center my-8">
        <!-- background -->
        <div class="basis-1/2 flex flex-row-reverse mr-2">
            <div @click="showChangeWallpaperDialog" title="Change wallpaper"
                class="relative w-[13rem] h-[7.5rem] bg-gradient-to-br from-zinc-800 from-1.44% via-zinc-600 via-50% to-black to-99% shadow-wallpaper rounded-2xl">
                <div class="absolute right-0 left-0 top-0 bottom-0 m-auto rounded-xl w-[12.5rem] h-[7rem] overflow-hidden bg-cover bg-no-repeat bg-center transition-background duration-500"
                    :style="[backgroundStyleObject]">
                    <div class="w-full h-full flex items-center justify-center group">
                        <div
                            class="bg-gray-100 h-7 px-[14px] rounded-[14px] text-sm group-hover:flex hidden items-center cursor-pointer">
                            Change Wallpaper
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- inof list -->
        <div class="basis-1/2 flex flex-col justify-center ml-2">
            <div class="relative group flex items-center justify-between w-[15rem] h-[2.25rem] group-focus-within:outline outline-gray-200 rounded"
                :class="{ outline: editState }" v-on-click-outside="deselectMacName">
                <div v-if="!editState" class="ml-2 w-full font-medium text-base truncate" @click="activeMacName">
                    {{ name }}
                </div>
                <input v-else="editState" class="ml-2 h-full w-full outline-none bg-transparent" type="text" ref="editName"
                    name="editName" id="editName" v-model="nameMac" v-bind="nameMacAttrs" />
                <div class="mr-2 hidden group-hover:block group-focus-within:block" :class="iconNameMac"
                    @click="operateMacName"></div>

                <div v-show="editState" class="absolute top-10 w-full rounded px-2 py-1 font-medium text-xs"
                    :class="messageClassNameMac">
                    {{ messageNameMac }}
                </div>
            </div>

            <div class="ml-2 font-normal text-xs mb-4 mt-1.5 cursor-pointer" @click="showProtocolDialog">
                ZimaOS {{ version }}
            </div>
            <div class="ml-2 text-neutral-500 font-normal text-xs">
                {{ $t("SN: {SN}", { SN }) }}
            </div>
        </div>
    </div>
    <ProcotolDialog ref="protocolDialogRef"></ProcotolDialog>
</template>
