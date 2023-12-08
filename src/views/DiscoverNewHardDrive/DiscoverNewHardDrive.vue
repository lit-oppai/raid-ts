<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
// import diskSVG from '@assets/img/StorageManager/disk.svg';
import HDDSVG from '@assets/img/StorageManager/HDD.svg';
import SSDSVG from '@assets/img/StorageManager/SSD.svg';
import { HDDStatus, SSDStatus, convertSizeToReadable } from '@views/StorageManager/controlData.ts';
import { stepByStep } from '@views/EstablishRAID/controlData.ts';
// const filtedArray = Array.from(new Map([...SSDStatus, ...HDDStatus])).sort((a, b) => a[0] > b[0] ? 1 : -1).filter((item) => item[1].unused);
const allDiskStatus = computed(() => {
    // TODO: 新硬盘页面， 产品要求特殊处理，加上未被挂载分区的硬盘。
    return new Map(Array.from(new Map([...SSDStatus, ...HDDStatus])).sort((a, b) => a[0] > b[0] ? 1 : -1).filter((item) => (!item[1].support) || item[1].unused));
})
import { disk } from '@network/index.ts';
const allNewDiskStatus = ref(new Map());
const loadAllNewDiskStatus = (): void => {
    disk.getDisks("show").then((res) => {
        if (res.status === 200 && res.data.data) {
            allNewDiskStatus.value = new Map(res.data.data.filter((item) => item.model !== 'System').map((item) => {
                const indexHub = ['0', '1', '2', '3', '4', '5', '6', 'A', 'B', 'C', 'D'];
                return [indexHub[item?.index ?? 0], item]
            }));
        }
    })
}

onBeforeMount(() => {
    loadAllNewDiskStatus();
})
import { closeEstablishRAID, showEstablishRAID } from '@views/EstablishRAID/controlView.ts';
import { resultRAIDInfo, nameStorage, formatePath } from '@views/EstablishRAID/controlData.ts';
import { storage } from '@network/index.ts';

const showCheckFormat = (name: string = "", path: string = ""): void => {
    nameStorage.value = name;
    formatePath.value = path;
    showEstablishRAID('CreateStorage')
}
const showEnableStorage = (name: string, path: string): void => {
    showEstablishRAID('EnableStorage')
    storage.createStorage({ path, name, format: false }).then((res) => {
        if (res.status === 200) {
            resultRAIDInfo.success = true;
            resultRAIDInfo.btnText = 'Done';
        } else {
            resultRAIDInfo.success = false;
            resultRAIDInfo.btnText = 'Restart';
        }
    }).catch((err) => {
        console.error(err);
        resultRAIDInfo.success = false;
        resultRAIDInfo.btnText = 'Restart';
    }).finally(() => {
        resultRAIDInfo.butFunc = () => {
            loadAllNewDiskStatus();
            closeEstablishRAID();
        }
        stepByStep('next');
    })
}
</script>

<template>
    <div class="">
        <!-- Traversing Part -->
        <div v-for="[label, disk] in allNewDiskStatus" :key="label">
            <div class="mt-6 mb-2">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Hard drive bay {{ label }}
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
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto']" v-if="disk.support">
                            Enable directly while preserving data.
                        </span>
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto']" v-else>
                            Please check and back up the data before formatting.
                        </span>
                        <!-- paperwork end -->

                    </div>
                    <div class="flex-grow"></div>
                    <Button label="Enable" severity="primary" size="medium"
                        @click="showEnableStorage(disk.name as string, disk.path as string)" v-if="disk.support"></Button>
                    <Button label="Format and Enable" severity="primary" size="medium"
                        @click="showCheckFormat(disk.name, disk.path)" v-else></Button>
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
                            Preserving data · {{ convertSizeToReadable(item?.size) }}
                        </span>
                        <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']" v-else>
                            Needs to be formatted · {{ convertSizeToReadable(item?.size ?? 0) }}
                        </span>
                        <!-- paperwork end -->

                        <span class="flex-grow"></span>

                        <!-- paperwork start -->
                        <Button label="Used" severity="secondary" size="small" v-if="item?.mount_point" disabled></Button>
                        <Button label="Enable" severity="secondary" size="small"
                            @click="showEnableStorage(item?.name as string, item?.path as string)"
                            v-else-if="item?.supported"></Button>
                        <Button label="Format and Enable" severity="secondary" size="small"
                            @click="showCheckFormat(item?.name, item?.path)" v-else></Button>
                        <!-- paperwork end -->

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
