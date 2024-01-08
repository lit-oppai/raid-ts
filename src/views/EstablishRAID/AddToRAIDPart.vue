<script setup lang="ts">
import { ref, onMounted } from "vue";
import Image from "primevue/image";
import Button from "primevue/button";
import { stepByStep } from "./controlData.ts";
import { closeEstablishRAID } from "./controlView";
// import diskSVG from '@assets/img/StorageManager/disk.svg';
import HDDSVG from "@assets/img/StorageManager/HDD.svg";
import SSDSVG from "@assets/img/StorageManager/SSD.svg";
import cryingFaceSVG from "@assets/img/EstablishRAID/cryingFace.svg";
import { disk } from "@network/index.ts";
import { Disk } from "@icewhale/zimaos-localstorage-openapi";
import { convertSizeToReadable } from "@utils/tools.ts";
const newDiskStatus = ref<Disk[]>();
const loadNewDiskStatus = async () => {
    await disk.getDisks("show").then((res) => {
        newDiskStatus.value = res.data.data?.filter(
            (item) => item?.free && item?.health === "true"
        );
    });
};

// 最小的盘尺寸
// 获取选择的硬盘
import {
    selectedFidDisk,
    expansionMinDiskSize,
} from "@views/EstablishRAID/controlData.ts";
onMounted(async () => {
    await loadNewDiskStatus();
    selectedFidDisk.value =
        newDiskStatus.value?.find(
            (item) => item.size && item.size >= expansionMinDiskSize.value
        )?.path ?? "";
});
import { isExitNewDisk } from "@views/EstablishRAID/controlData.ts";
import { watch } from "vue";
watch(newDiskStatus, (val) => {
    if (val?.length) {
        isExitNewDisk.value = true;
    } else {
        isExitNewDisk.value = false;
    }
});
</script>

<template name="AddToRAIDPart">
    <template v-if="newDiskStatus?.length">
        <div class="mt-6 mb-4 px-6">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                {{
                    $t("Select a new hard drive of at least {size}", {
                        size: convertSizeToReadable(expansionMinDiskSize),
                    })
                }}
            </span>
        </div>
        <div class="flex flex-col gap-2 px-6">
            <!-- Traversing Part -->
            <label class="flex items-center h-10 bg-white rounded-md border border-neutral-300 gap-2 px-3 cursor-pointer"
                v-for="(item, index) in newDiskStatus" :key="index" :for="`select${index}`" :class="{
                    'opacity-50': item && item.size && expansionMinDiskSize > item.size,
                }">
                <Image :src="item.type === 'HDD' ? HDDSVG : SSDSVG" class="h-6 w-6"></Image>
                <span class="align-baseline text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ item.model }} -
                    {{ convertSizeToReadable(item.size as number) }}
                </span>
                <div class="flex-grow"></div>
                <input type="radio" :id="`select${index}`" :value="item.path" v-model="selectedFidDisk"
                    v-if="item && item.size && expansionMinDiskSize <= item.size" />
            </label>
        </div>
    </template>
    <template v-else>
        <div class="flex h-full flex-col items-center justify-center bg-white rounded-xl">
            <Image :src="cryingFaceSVG"> </Image>
            {{ $t("No available hard drives") }}
        </div>
    </template>
    <div class="flex-grow"></div>
    <div class="space-x-4 flex justify-end h-16 px-6 pb-6 pt-3 shrink-0 border-t-2">
        <Button :label="$t('Add')" severity="primary" size="medium" @click="stepByStep('next')"
            v-show="isExitNewDisk" :disabled="!selectedFidDisk"></Button>
        <Button :label="$t('Close')" severity="primary" size="medium" @click="closeEstablishRAID" v-show="!isExitNewDisk
            "></Button>
    </div>
</template>
