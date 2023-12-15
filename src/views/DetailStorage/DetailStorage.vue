<script setup lang="ts">
import { ref } from 'vue';
import Image from "primevue/image";
import Button from "primevue/button";
import HDDSVG from "@assets/img/StorageManager/HDD.svg";
import SSDSVG from "@assets/img/StorageManager/SSD.svg";
import warningSVG from "@assets/img/StorageManager/warning.svg";
//
import {
    storageInfoMap,
    reloadServiceData,
} from "@views/StorageManager/controlData.ts";
import { convertSizeToReadable } from "@utils/tools.ts";
import { useRoute, useRouter } from "vue-router";
import { showEstablishRAID } from "@views/EstablishRAID/controlView.ts";
import { nameStorage, formatePath } from "@views/EstablishRAID/controlData.ts";
import { storage } from "@network/index.ts";

const route = useRoute();
const router = useRouter();
const storageName = route.params.storageName as string;
import { EnumStorageNames } from '@views/StorageManager/const.ts';
import { sysStorageInfo } from '@views/StorageManager/controlData.ts';
let storageInfo = storageInfoMap.get(storageName);
if (storageName === EnumStorageNames.System) {
    storageInfo = sysStorageInfo;
}

// format or disband function
// 命名
import { storageNameCollection } from '@views/StorageManager/controlData.ts';
const showCheckFormat = (): void => {
    nameStorage.value = (storageInfo && storageNameCollection.beNamed(storageInfo.type)) ?? storageInfo?.label ?? "";
    formatePath.value = storageInfo?.path ?? "";
    showEstablishRAID("CreateStorage");
};
const isLoadingDisabledButton = ref<boolean>(false);
const disabledStorage = async (): Promise<void> => {
    isLoadingDisabledButton.value = true
    await storage
        .deleteStorage(storageInfo?.path ?? "")
        .then((res) => {
            if (res.status === 200) {
                router.push({ name: "storage" });
                reloadServiceData();
            } else {
                console.log("delete failed");
            }
        })
        .catch((err) => {
            console.log(err);
        }).finally(() => {
            isLoadingDisabledButton.value = false
        });
};
</script>
<template>
    <!-- Storage Info List -->
    <div class="mt-6 mb-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']"> Storage </span>
    </div>
    <div class="os_bg_white_card mt-2">
        <div class="flex px-3 space-x-3 items-center rounded-md os_list">
            <div class="w-6 h-6 flex justify-center items-center">
                <Image :src="HDDSVG" class="h-6 w-6" v-if="storageInfo?.type === 'HDD'"></Image>
                <Image :src="SSDSVG" class="h-6 w-6" v-else></Image>
            </div>
            <div class="flex-grow flex flex-col py-2 space-y-1">
                <div>
                    <span class="text-zinc-800 text-base font-medium font-['Roboto'] leading-6">
                        {{ storageInfo?.name }}
                    </span>
                </div>
                <div class="flex">
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">Total {{
                        convertSizeToReadable(storageInfo?.size ?? 0) }} /</span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto']">{{
                        convertSizeToReadable(storageInfo?.used ?? 0)
                    }}</span>
                </div>
            </div>

            <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']">
                {{ storageInfo?.health ? 'Healthy' : 'Unhealthy' }}
            </span>
        </div>
    </div>
    <!-- General -->
    <div class="mt-6 space-y-2" v-if="storageName !== EnumStorageNames.System">
        <div class="">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']"> General </span>
        </div>

        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="warningSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                Format and Disband
            </span>

            <Button label="Format" severity="accent" size="medium" @click="showCheckFormat" class="mr-4"></Button>
            <Button label="Disable" severity="accent" size="medium" @click="disabledStorage" :loading="isLoadingDisabledButton"></Button>
        </div>
    </div>
</template>
