<template>
    <!-- Title -->
    <div class="w-full flex justify-between">
        <div class="flex items-center space-x-1.5">
            <span
                class="text-zinc-800 text-base font-semibold font-['Roboto'] leading-normal"
                >ZimaCube</span
            >
            <i
                class="casa-right-outline text-base os_list_action_icon"
                @click="goToStorageDetailPage(false, 'ZimaOS-HD')"
            ></i>
        </div>
        <div class="space-x-1">
            <span
                class="text-neutral-400 text-xs font-normal font-['Roboto']"
                >{{ $t("Available") }}</span
            >
            <span
                class="text-zinc-800 text-base font-semibold font-['Roboto'] leading-normal"
            >
                {{ convertSizeToReadable(totalStorageUsageStatus.FilesFree) }}
            </span>
        </div>
    </div>
    <!-- process bar -->
    <!-- TODO: Respondency -->
    <div class="flex space-x-3 mt-1">
        <!-- System info -->
        <div class="w-[120px] flex-shrink-0 grid grid-cols-2 gap-y-2">
            <div
                class="col-span-2 flex flex-nowrap rounded-sm overflow-hidden cursor-help"
            >
                <NPopover trigger="hover">
                    <template #trigger>
                        <div
                            class="bg-amber-500 h-2"
                            :style="`width:${sysRate}%`"
                        ></div>
                    </template>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5"
                        >
                            {{ $t("System") }}
                        </span>
                    </div>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5"
                        >
                            {{
                                convertSizeToReadable(
                                    totalStorageUsageStatus?.SystemUsage || 0
                                )
                            }}
                        </span>
                    </div>
                </NPopover>
                <NPopover trigger="hover">
                    <template #trigger>
                        <div
                            class="bg-violet-500 h-2"
                            :style="`width:${dataRate}%`"
                        ></div>
                    </template>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5"
                        >
                            {{ $t("Data") }}
                        </span>
                    </div>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5"
                        >
                            {{
                                convertSizeToReadable(
                                    totalStorageUsageStatus?.DataUsage || 0
                                )
                            }}
                        </span>
                    </div>
                </NPopover>
                <NPopover trigger="hover">
                    <template #trigger>
                        <div
                            class="bg-gray-100 h-2"
                            :style="`width:${freeRate}%`"
                        ></div>
                    </template>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5"
                        >
                            {{ $t("Available") }}
                        </span>
                    </div>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5"
                        >
                            {{
                                convertSizeToReadable(
                                    totalStorageUsageStatus?.DataFree || 0
                                )
                            }}
                        </span>
                    </div>
                </NPopover>
            </div>
            <div class="space-x-1 flex items-center">
                <span
                    class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"
                ></span>
                <span
                    class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"
                >
                    {{ $t("System") }}
                </span>
            </div>
            <div class="space-x-1 flex items-center">
                <span
                    class="bg-violet-500 w-1.5 h-1.5 rounded-sm inline-block"
                ></span>
                <span
                    class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"
                >
                    {{ $t("Data") }}
                </span>
            </div>
        </div>
        <!-- Storage info -->
        <div class="flex-grow space-y-2">
            <!-- Storage process bar -->
            <div
                class="col-span-2 flex flex-nowrap rounded-sm overflow-hidden cursor-help"
            >
                <NPopover trigger="hover">
                    <template #trigger>
                        <div
                            class="bg-green-400 h-2"
                            :style="`width:${filesUsageRate}%`"
                        ></div>
                    </template>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5"
                        >
                            {{ $t("Files") }}
                        </span>
                    </div>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5"
                        >
                            {{
                                convertSizeToReadable(
                                    totalStorageUsageStatus?.FilesUsage
                                )
                            }}
                        </span>
                    </div>
                </NPopover>
                <NPopover trigger="hover">
                    <template #trigger>
                        <div
                            class="bg-gray-100 h-2"
                            :style="`width:${filesFreeRate}%`"
                        ></div>
                    </template>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5"
                        >
                            {{ $t("Available") }}
                        </span>
                    </div>
                    <div>
                        <span
                            class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5"
                        >
                            {{
                                convertSizeToReadable(
                                    totalStorageUsageStatus?.FilesFree
                                )
                            }}
                        </span>
                    </div>
                </NPopover>
            </div>
            <!-- Storage remake -->
            <div class="flex justify-between">
                <div class="space-x-1 flex items-center">
                    <span
                        class="bg-green-400 w-1.5 h-1.5 rounded-sm inline-block"
                    ></span>
                    <span
                        class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"
                        >{{ $t("Files") }}</span
                    >
                </div>
                <div class="h-4 flex items-center">
                    <span
                        class="text-neutral-400 text-xs font-normal font-['Roboto']"
                        >{{
                            convertSizeToReadable(
                                totalStorageUsageStatus.FilesFree +
                                    totalStorageUsageStatus.FilesUsage
                            )
                        }}/
                    </span>
                    <span
                        class="text-zinc-800 text-xs font-normal font-['Roboto']"
                        >{{
                            $t("{size} Used", {
                                size: convertSizeToReadable(
                                    totalStorageUsageStatus.FilesUsage
                                ),
                            })
                        }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, defineProps }                                                  from "vue";
import { NPopover }                                                               from "naive-ui";
import { convertSizeToReadable }                                                  from "@icewhale/ui-utils";
import { useStoragePageDataBindingLifecycle }                                     from "./controlData.ts";

const {
    // storageInfoMap,
    totalStorageUsageStatus,
    // RAIDCandidateDiskCount,
    // isStoragePageDataLoading,
} = useStoragePageDataBindingLifecycle();
const sysRate: number = 10;
/* const sysRate = computed(() => {
    return totalStorageUsageStatus.value
        ? (
            (totalStorageUsageStatus.value?.SystemUsage /
                (totalStorageUsageStatus.value?.SystemUsage +
                    totalStorageUsageStatus.value?.DataFree +
                    totalStorageUsageStatus.value?.DataUsage)) *
            100
        ).toFixed(0)
        : 0;
}); */
const dataRate = computed(() => {
    return (
        (totalStorageUsageStatus.value?.DataUsage /
            (totalStorageUsageStatus.value?.DataFree +
                totalStorageUsageStatus.value?.DataUsage)) *
        90
    ).toFixed(0);
});
const freeRate = computed(() => {
    return (
        (totalStorageUsageStatus.value?.DataFree /
            (totalStorageUsageStatus.value?.DataFree +
                totalStorageUsageStatus.value?.DataUsage)) *
        90
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

defineProps({
    goToStorageDetailPage: {
        type: Function,
        required: true,
    },
});
</script>
