<script setup lang="ts">
import { onBeforeMount } from "vue";
import Image from "primevue/image";
import Button from "primevue/button";
import HDDSVG from "@assets/img/StorageManager/HDD.svg";
import SSDSVG from "@assets/img/StorageManager/SSD.svg";
import { convertSizeToReadable } from "@utils/tools.ts";
import { stepByStep } from "@views/EstablishRAID/controlData.ts";
import {
    allNewDiskStatus,
    loadAllNewDiskStatus,
} from "@views/DiscoverNewHardDrive/controlData.ts";

onBeforeMount(() => {
    loadAllNewDiskStatus();
});
import useEstablishRAID from "@views/EstablishRAID/controlView.ts";
import {
    resultRAIDInfo,
    nameStorage,
    formatePath,
} from "@views/EstablishRAID/controlData.ts";
import { storage } from "@network/index.ts";
import { collectionOfStorageNames } from "@views/StorageManager/controlData.ts";
import router from "@/pages/router";

const { showEstablishRAID, closeEstablishRAID } = useEstablishRAID();
const showCheckFormat = (type: "HDD" | "SSD", path: string = ""): void => {
    nameStorage.value = collectionOfStorageNames.beNamed(type);
    formatePath.value = path;
    showEstablishRAID("CreateStorage");
};
const showEnableStorage = (name: string, path: string): void => {
    showEstablishRAID("EnableStorage");
    storage
        .createStorage({ path, name, format: false })
        .then((res) => {
            if (res.status === 200) {
                resultRAIDInfo.success = true;
                resultRAIDInfo.btnText = "Done";
            } else {
                resultRAIDInfo.success = false;
                resultRAIDInfo.btnText = "Restart";
            }
        })
        .catch((err) => {
            console.error(err);
            resultRAIDInfo.success = false;
            resultRAIDInfo.btnText = "Restart";
        })
        .finally(() => {
            resultRAIDInfo.butFunc = async () => {
                await loadAllNewDiskStatus();
                closeEstablishRAID();
                
                if(allNewDiskStatus.value.size === 0) {
                    router.go(-1);
                }
            };
            stepByStep("next");
        });
};
</script>

<template>
    <div class="">
        <!-- Traversing Part -->
        <div v-for="[label, disk] in allNewDiskStatus" :key="label">
            <div class="mt-6 mb-2">
                <span v-t="{ path: `DiscoverNewHardDrive.driveBay{label}`, args: { label } }"
                    class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    <!-- Hard drive bay {{ label }} -->
                </span>
            </div>
            <div class="w-full bg-white rounded-lg px-4 py-3">
                <!-- Header -->
                <div class="w-full flex items-center gap-3">
                    <Image :src="HDDSVG" class="h-6 w-6" v-if="disk.type === 'HDD'"></Image>
                    <Image :src="SSDSVG" class="h-6 w-6" v-else></Image>
                    <div class="flex flex-col gap-1">
                        <span class="text-zinc-800 text-base font-medium font-['Roboto']">
                            {{ disk.model }}
                        </span>

                        <!-- paperwork start -->
                        <span v-t="`DiscoverNewHardDrive.requiresFormattingReminder.${!disk.support}`" class="text-neutral-400 text-xs font-normal font-['Roboto']">
                            <!-- Enable directly while preserving data. -->
                        </span>
                        <!-- <span class="text-neutral-400 text-xs font-normal font-['Roboto']" v-else>
                            Please check and back up the data before formatting.
                        </span> -->
                        <!-- paperwork end -->
                    </div>
                    <div class="flex-grow"></div>
                    <Button :label="$t('Enable')" severity="primary" size="medium"
                        @click="showEnableStorage(disk.name as string, disk.path as string)" v-if="disk.support"></Button>
                    <Button :label="$t('Format and Enable')" severity="primary" size="medium"
                        @click="showCheckFormat(disk.type, disk.path)" v-else></Button>
                </div>
                <!-- Content -->
                <div class="ml-9 mt-4 bg-gray-50 rounded-lg p-3 gap-2 flex flex-col" v-if="disk?.children_number ?? 0 > 0">
                    <!-- Traversing Part -->
                    <div class="rounded-md border border-gray-200 px-1.5 flex items-center h-9"
                        v-for="(item, key) in disk.children" :key="key">
                        <span class="text-zinc-800 text-xs font-medium font-['Roboto'] px-2">
                            {{ item?.name }}
                        </span>

                        <!-- paperwork start -->
                        <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']"
                            v-if="item?.mount_point">
                            {{ disk.type }} · {{ convertSizeToReadable(item?.size) }}
                        </span>
                        <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']"
                            v-else-if="item?.supported">
                            {{ $t('DiscoverNewHardDrive.item.PreservingData') }} · {{ convertSizeToReadable(item?.size) }}
                        </span>
                        <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']" v-else>
                            {{ $t('DiscoverNewHardDrive.item.NeedsToBeFormatted') }} · {{ convertSizeToReadable(item?.size ?? 0) }}
                        </span>
                        <!-- paperwork end -->

                        <span class="flex-grow"></span>

                        <!-- paperwork start -->
                        <Button :label="$t('Used')" severity="secondary" size="small" v-if="item?.mount_point" disabled></Button>
                        <Button :label="$t('Enable')" severity="secondary" size="small"
                            @click="showEnableStorage(item?.name as string, item?.path as string)"
                            v-else-if="item?.supported"></Button>
                        <Button :label="$t('Format and Enable')" severity="secondary" size="small"
                            @click="showCheckFormat(disk.type, item?.path)" v-else></Button>
                        <!-- paperwork end -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
