<script setup lang="ts">
import { onBeforeMount /* , onMounted, onActivated, onUnmounted */ } from "vue";
import Image from "primevue/image";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import { NPopover } from "naive-ui";

import RaidSVG from "@assets/img/StorageManager/Raid.svg";
import HDDSVG from "@assets/img/StorageManager/HDD.svg";
import SSDSVG from "@assets/img/StorageManager/SSD.svg";
import warningRedSVG from "@assets/img/StorageManager/warningRed.svg";
import supermanRaidSVG from '@/assets/img/StorageManager/supermanRaid.svg'
import useEstablishRAID from "@views/ProcessStorageModals/controlView.ts";
import ZimaCubeCard from "@views/StorageManager/ZimaCubeCard.vue";
import {
    // storageInfoMap,
    // totalStorageUsageStatus,
    // RAIDCandidateDiskCount,
    // isStoragePageDataLoading,
    useStoragePageDataBindingLifecycle,
} from "./controlData.ts";
const {
    storageInfoMap,
    totalStorageUsageStatus,
    RAIDCandidateDiskCount,
    isStoragePageDataLoading,
} = useStoragePageDataBindingLifecycle();
import { convertSizeToReadable } from "@utils/tools.ts";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const { showEstablishRAID, initEstablishRAID } = useEstablishRAID();
const route = useRoute();
const router = useRouter();
const isFirstRoutePath = computed(() => route.matched.length === 1);
const sysRate = computed(() => {
    return totalStorageUsageStatus.value
        ? (
            (totalStorageUsageStatus.value?.SystemUsage /
                (totalStorageUsageStatus.value?.SystemUsage +
                    totalStorageUsageStatus.value?.DataFree +
                    totalStorageUsageStatus.value?.DataUsage)) *
            100
        ).toFixed(0)
        : 0;
});
const dataRate = computed(() => {
    return (
        (totalStorageUsageStatus.value?.DataUsage /
            (totalStorageUsageStatus.value?.SystemUsage +
                totalStorageUsageStatus.value?.DataFree +
                totalStorageUsageStatus.value?.DataUsage)) *
        100
    ).toFixed(0);
});
const freeRate = computed(() => {
    return (
        (totalStorageUsageStatus.value?.DataFree /
            (totalStorageUsageStatus.value?.SystemUsage +
                totalStorageUsageStatus.value?.DataFree +
                totalStorageUsageStatus.value?.DataUsage)) *
        100
    ).toFixed(0);
});
const filesUsageRate = computed(() => {
    return (
        (totalStorageUsageStatus.value?.FilesUsage /
            (totalStorageUsageStatus.value?.FilesUsage +
                totalStorageUsageStatus.value?.FilesFree)) *
        100
    ).toFixed(0);
});
const filesFreeRate = computed(() => {
    return totalStorageUsageStatus.value?.FilesFree
        ? (
            (totalStorageUsageStatus.value?.FilesFree /
                (totalStorageUsageStatus.value?.FilesUsage +
                    totalStorageUsageStatus.value?.FilesFree)) *
            100
        ).toFixed(0)
        : 100;
});
onBeforeMount(() => {
    // console.log("onBeforeMount");
    initEstablishRAID();
});
// onMounted(() => {
//     console.log("onMounted");
// });
// onActivated(() => {
//     console.log("onActivated");
// });
// onUnmounted(() => {
//     console.log("onUnmounted");
// });
const goToStorageDetailPage = (isRaid: boolean, label: string) => {
    const path: string = storageInfoMap.get(label)?.path ?? "";
    if (isRaid) {
        if (path === "") {
            console.error("path is empty");
            return;
        }
        router.push({
            path: `/storage/DetailRaidStorage/${label}`,
            query: { path },
        });
    } else {
        router.push(`/storage/DetailStorage/${label}`);
    }
};

// 检测错误信息
import { unhealthyLabel } from "@views/StorageManager/controlData.ts";
</script>

<template>
    <div v-if="isFirstRoutePath">
        <!-- Storage Sketch Part -->
        <div class="storage_image">
            <ZimaCubeCard></ZimaCubeCard>
        </div>
        <!-- Storage Usage Part -->
        <div class="storage_useage os_bg_white_card flex flex-col px-4 py-3">
            <!-- Title -->
            <div class="w-full flex justify-between">
                <div class="flex items-center space-x-1.5">
                    <span class="text-zinc-800 text-base font-semibold font-['Roboto'] leading-normal">ZimaCube</span>
                    <i class="casa-right-outline text-base os_list_action_icon"
                        @click="goToStorageDetailPage(false, 'ZimaOS-HD')"></i>
                </div>
                <div class="space-x-1">
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">{{
                        $t("Available")
                    }}</span>
                    <span class="text-zinc-800 text-base font-semibold font-['Roboto'] leading-normal">
                        {{ convertSizeToReadable(totalStorageUsageStatus.FilesFree) }}
                    </span>
                </div>
            </div>
            <!-- process bar -->
            <!-- TODO: Respondency -->
            <div class="flex space-x-3 mt-1">
                <!-- System info -->
                <div class="w-[120px] flex-shrink-0 grid grid-cols-2 gap-y-2">
                    <div class="col-span-2 flex flex-nowrap rounded-sm overflow-hidden cursor-help">
                        <NPopover trigger="hover">
                            <template #trigger>
                                <div class="bg-amber-500 h-2" :style="`width:${sysRate}%`"></div>
                            </template>
                            <div>
                                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">
                                    {{ $t("System") }}
                                </span>
                            </div>
                            <div>
                                <span class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                                    {{ convertSizeToReadable(totalStorageUsageStatus?.SystemUsage || 0) }}
                                </span>
                            </div>
                        </NPopover>
                        <NPopover trigger="hover">
                            <template #trigger>
                                <div class="bg-violet-500 h-2" :style="`width:${dataRate}%`"></div>
                            </template>
                            <div>
                                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">
                                    {{ $t("Data") }}
                                </span>
                            </div>
                            <div>
                                <span class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                                    {{ convertSizeToReadable(totalStorageUsageStatus?.DataUsage || 0) }}
                                </span>
                            </div>
                        </NPopover>
                        <NPopover trigger="hover">
                            <template #trigger>
                                <div class="bg-gray-100 h-2" :style="`width:${freeRate}%`"></div>
                            </template>
                            <div>
                                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">
                                    {{ $t("Available") }}
                                </span>
                            </div>
                            <div>
                                <span class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                                    {{ convertSizeToReadable(totalStorageUsageStatus?.DataFree || 0) }}
                                </span>
                            </div>
                        </NPopover>
                    </div>
                    <div class="space-x-1 flex items-center">
                        <span class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">
                            {{ $t("System") }}
                        </span>
                    </div>
                    <div class="space-x-1 flex items-center">
                        <span class="bg-violet-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">
                            {{ $t("Data") }}
                        </span>
                    </div>
                </div>
                <!-- Storage info -->
                <div class="flex-grow space-y-2">
                    <!-- Storage process bar -->
                    <div class="col-span-2 flex flex-nowrap rounded-sm overflow-hidden cursor-help">
                        <NPopover trigger="hover">
                            <template #trigger>
                                <div class="bg-green-400 h-2" :style="`width:${filesUsageRate}%`"></div>
                            </template>
                            <div>
                                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">
                                    {{ $t("Files") }}
                                </span>
                            </div>
                            <div>
                                <span class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                                    {{ convertSizeToReadable(totalStorageUsageStatus?.FilesUsage) }}
                                </span>
                            </div>
                        </NPopover>
                        <NPopover trigger="hover">
                            <template #trigger>
                                <div class="bg-gray-100 h-2" :style="`width:${filesFreeRate}%`"></div>
                            </template>
                            <div>
                                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">
                                    {{ $t("Available") }}
                                </span>
                            </div>
                            <div>
                                <span class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                                    {{ convertSizeToReadable(totalStorageUsageStatus?.FilesFree) }}
                                </span>
                            </div>
                        </NPopover>
                    </div>
                    <!-- Storage remake -->
                    <div class="flex justify-between">
                        <div class="space-x-1 flex items-center">
                            <span class="bg-green-400 w-1.5 h-1.5 rounded-sm inline-block"></span>
                            <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">{{
                                $t("Files")
                            }}</span>
                        </div>
                        <div class="h-4 flex items-center">
                            <span class="text-neutral-400 text-xs font-normal font-['Roboto']">{{
                                convertSizeToReadable(
                                    totalStorageUsageStatus.FilesFree + totalStorageUsageStatus.FilesUsage
                                )
                            }}/
                            </span>
                            <span class="text-zinc-800 text-xs font-normal font-['Roboto']">{{
                                $t("{size} Used", {
                                    size: convertSizeToReadable(totalStorageUsageStatus.FilesUsage),
                                })
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Data Space Part -->
        <div class="flex mt-6 mb-2">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-tight">{{
                $t("Storage Space")
            }}</span>
        </div>
        <div v-if="isStoragePageDataLoading" class="w-full">
            <Skeleton height="5.75rem"></Skeleton>
            <Skeleton height="8.25rem"></Skeleton>
        </div>
        <div v-else-if="RAIDCandidateDiskCount === 0 && storageInfoMap.size === 0"
            class="flex flex-col items-center justify-center">
            <Image :src="supermanRaidSVG"></Image>
            <span>
                Shut down and insert the hard drive, while supporting RAID0, RAID1 and RAID5.
            </span>
        </div>
        <div v-else>
            <!-- notice or create RAID -->
            <div class="os_bg_white_card" v-if="RAIDCandidateDiskCount > 0 || unhealthyLabel">
                <div class="flex px-3 space-x-3 items-center h-10 rounded-md bg-rose-100 cursor-pointer"
                    v-if="unhealthyLabel" @click="goToStorageDetailPage(true, unhealthyLabel)">
                    <div class="w-6 h-6 flex justify-center items-center">
                        <Image :src="warningRedSVG" class="text-base fill-red-500"></Image>
                    </div>
                    <div class="flex-grow text-orange-500 text-sm font-normal font-['Roboto'] leading-6">
                        {{ $t("Detected hard drive damaged") }}
                    </div>
                    <div class="w-6 h-6 rounded os_list_action_icon">
                        <i class="casa-right-outline text-base"></i>
                    </div>
                </div>
                <div class="flex px-3 space-x-3 items-center h-10 rounded-md bg-blue-100 cursor-pointer"
                    v-else-if="RAIDCandidateDiskCount > 0" @click="$router.push('/storage/DiscoverNewHardDrive')">
                    <div class="w-6 h-6 flex justify-center items-center">
                        <div class="self-center flex justify-evenly bg-sky-500 w-4 h-4 rounded-full">
                            <i class="text-white text-xs font-normal font-['Roboto']">{{
                                RAIDCandidateDiskCount
                            }}</i>
                        </div>
                    </div>
                    <div class="flex-grow text-sky-500 text-sm font-normal font-['Roboto'] leading-6">
                        {{ $t("Discover the new hard drive") }}
                    </div>
                    <div class="w-6 h-6 rounded os_list_action_icon">
                        <i class="casa-right-outline text-base"></i>
                    </div>
                </div>

                <div v-if="RAIDCandidateDiskCount > 1" class="flex px-3 space-x-3 items-center h-10 rounded-md os_list">
                    <div class="w-6 h-6 flex justify-center items-center">
                        <Image :src="RaidSVG" />
                    </div>
                    <div class="flex-grow text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                        {{ $t("Combine hard drive space by RAID.") }}
                    </div>
                    <div class="flex-shrink-0">
                        <!-- TODO：  1、统一组件 2、两个盘应该为灰色 -->
                        <Button :label="$t('Create')" :severity="RAIDCandidateDiskCount > 2 ? 'primary' : 'neutral'"
                            size="medium" @click="showEstablishRAID('Create')"></Button>
                    </div>
                </div>
            </div>

            <!-- Disk Info List -->
            <div class="os_bg_white_card mt-2" v-if="storageInfoMap.size > 0">
                <!-- Traversing -->
                <div class="flex px-3 space-x-3 items-center rounded-md os_list active:bg-gray-200 cursor-pointer"
                    v-for="[label, item] in storageInfoMap" :key="label"
                    @click="goToStorageDetailPage(item.raid, item.name)">
                    <div class="w-6 h-6 flex justify-center items-center">
                        <Image :src="HDDSVG" v-if="item.type === 'HDD'" />
                        <Image :src="SSDSVG" v-else-if="item.type === 'SSD'" />
                        <Image :src="RaidSVG" v-else />
                    </div>
                    <div class="flex-grow flex flex-col py-2 space-y-1">
                        <div class="flex items-center">
                            <span class="text-zinc-800 text-base font-medium font-['Roboto'] leading-6">
                                {{ item.name }}
                            </span>
                            <span class="mx-1 px-1 py-px bg-rose-100 rounded gap-0.5 flex justify-center items-center"
                                v-if="!item.health">
                                <Image :src="warningRedSVG" class="h-4 w-4 fill-orange-500"></Image>
                                <span class="text-orange-500 text-xs font-normal font-['Roboto'] self-baseline">
                                    {{ $t("Damaged") }}
                                </span>
                            </span>
                        </div>
                        <div class="flex" v-if="item.health">
                            <span class="text-zinc-800 text-xs font-normal font-['Roboto']">{{
                                item.type
                            }}</span>
                            <span class="text-neutral-400 text-xs font-normal font-['Roboto'] whitespace-pre">
                                · {{ convertSizeToReadable(item.size) }}/
                            </span>
                            <span class="text-zinc-800 text-xs font-normal font-['Roboto']">
                                {{
                                    $t("{size} Used", { size: convertSizeToReadable(item.used ?? 0) })
                                }}</span>
                        </div>
                        <div v-else>
                            <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                                {{
                                    $t(
                                        "The data has been locked for read-only access. Click to enter the recovery process."
                                    )
                                }}
                            </span>
                        </div>
                    </div>

                    <div class="w-6 h-6 rounded os_list_action_icon">
                        <i class="casa-right-outline text-base"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- TODO:<Suspense> is an experimental feature and its API will likely change. -->
    <Suspense v-else>
        <router-view></router-view>
    </Suspense>
</template>
