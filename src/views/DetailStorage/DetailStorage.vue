<script setup lang="ts">
import { ref, computed } from "vue";
import Image from "primevue/image";
import Button from "primevue/button";
import HDDSVG from "@assets/img/StorageManager/HDD.svg";
import SSDSVG from "@assets/img/StorageManager/SSD.svg";
import warningSVG from "@assets/img/StorageManager/warning.svg";
//
import { storageInfoMap, reloadServiceData } from "@views/StorageManager/controlData.ts";
import { convertSizeToReadable } from "@utils/tools.ts";
import { useRoute, useRouter } from "vue-router";
import useEstablishRAID from "@views/ProcessStorageModals/controlView.ts";
import {
    nameStorage,
    onlyFormatSingleStorageSpace,
    formatePath,
} from "@views/ProcessStorageModals/controlData.ts";
import { storage /* disk */ } from "@network/index.ts";
/* import { DiskInfo } from "@icewhale/zimaos-localstorage-openapi"; */

const { showEstablishRAID } = useEstablishRAID();
const route = useRoute();
const router = useRouter();
const storageName = route.params.storageName as string;
import { STORAGE_NAME_ENUM } from "@views/StorageManager/const.ts";
import { sysStorageInfo } from "@views/StorageManager/controlData.ts";

let storageInfo = computed(() => {
    if (storageName === STORAGE_NAME_ENUM.System) {
        return sysStorageInfo;
    }

    return storageInfoMap.get(storageName);
});

// format or disband function
const showCheckFormat = (): void => {
    nameStorage.value = storageInfo.value?.label ?? "";
    onlyFormatSingleStorageSpace.value = true;
    formatePath.value = storageInfo.value?.path ?? "";
    showEstablishRAID("CreateStorage", {
        onClose: () => {
            // router.go(-1)
            onlyFormatSingleStorageSpace.value = false;
        },
    });
};
const isLoadingDisabledButton = ref<boolean>(false);
const disabledStorage = async (): Promise<void> => {
    isLoadingDisabledButton.value = true;
    await storage
        .deleteStorage(storageInfo.value?.path ?? "")
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
        })
        .finally(() => {
            isLoadingDisabledButton.value = false;
        });
};
</script>
<template>
    <!-- Storage Info List -->
    <div class="mt-6 mb-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            {{ $t("Hard Drive") }}
        </span>
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
                        {{ storageInfo?.driveName }}
                    </span>
                </div>
                <div class="flex">
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                        {{
                            $t("Total{size}", { size: convertSizeToReadable(storageInfo?.size ?? 0) })
                        }}
                        /</span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto']">{{
                        convertSizeToReadable(storageInfo?.used ?? 0)
                    }}</span>
                </div>
            </div>

            <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']">
                {{ storageInfo?.health ? $t("Healthy") : $t("Unhealthy") }}
            </span>
        </div>
    </div>
    <!-- General -->
    <div class="mt-6 space-y-2" v-if="storageName !== STORAGE_NAME_ENUM.System">
        <div class="">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                {{ $t("General") }}
            </span>
        </div>

        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="warningSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                {{ $t("Format and Disable") }}
            </span>

            <Button :label="$t('Format')" severity="accent" size="medium" @click="showCheckFormat" class="mr-4"></Button>
            <Button :label="$t('Disable')" severity="accent" size="medium" @click="disabledStorage"
                :loading="isLoadingDisabledButton"></Button>
        </div>
    </div>
</template>
