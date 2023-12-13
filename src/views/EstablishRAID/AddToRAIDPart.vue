<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Image from 'primevue/image'
// import diskSVG from '@assets/img/StorageManager/disk.svg';
import HDDSVG from '@assets/img/StorageManager/HDD.svg'
import SSDSVG from '@assets/img/StorageManager/SSD.svg'
import cryingFaceSVG from '@assets/img/EstablishRAID/cryingFace.svg'
import { disk } from '@network/index.ts'
import { Disk } from '@icewhale/zimaos-localstorage-openapi'
import { convertSizeToReadable } from "@utils/tools.ts";
const newDiskStatus = ref<Disk[]>()
const loadNewDiskStatus = async () => {
    await disk.getDisks('show').then(res => {
        newDiskStatus.value = res.data.data?.filter(
            item => item?.free && item?.health === 'true'
        )
    })
}

// 最小的盘尺寸
// 获取选择的硬盘
import {
    selectedFidDisk,
    expansionMinDiskSize
} from '@views/EstablishRAID/controlData.ts'
onMounted(async () => {
    await loadNewDiskStatus()
    selectedFidDisk.value =
        newDiskStatus.value?.find(
            item => item.size && item.size >= expansionMinDiskSize.value
        )?.path ?? ''
})
</script>

<template name="AddToRAIDPart">
    <template v-if="true">
        <div class="mt-6 mb-4">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                Select s new hard drive of at least 447GB
            </span>
        </div>
        <div class="flex flex-col gap-2">
            <!-- Traversing Part -->
            <label class="flex items-center h-10 bg-white rounded-md border border-neutral-300 gap-2 px-3 cursor-pointer"
                v-for="(item, index) in newDiskStatus" :key="index" :for="`select${index}`" :class="{
                    'opacity-50':
                        item && item.size && expansionMinDiskSize > item.size
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
            暂无硬盘可用
        </div>
    </template>
</template>
