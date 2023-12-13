<script setup lang="ts">
import { watch, ref } from "vue";
import { RAIDStrategy } from "./controlData.d";
import { selectStorageList, selectRAIDStrategy, context } from "./controlData";
import { SSDStatus, HDDStatus } from "@views/StorageManager/controlData.ts";
import { expansionMinDiskSize } from "@views/EstablishRAID/controlData.ts";
import { convertSizeToReadable } from "@utils/tools.ts";
import SelectStrategy from "./SelectStrategy.vue";
import { NPopover } from "naive-ui";
// const list = typeof RAIDStrategy
const strategies: RAIDStrategy[] = ["RAID0", "RAID1", "RAID5"];
// const allDiskTemp = new Map([...SSDStatus, ...HDDStatus]);
const sortedArray = Array.from(new Map([...SSDStatus, ...HDDStatus])).sort((a, b) =>
    a[0] > b[0] ? 1 : -1
);
const allDiskStatus = new Map(sortedArray);
// 不可选
const storageDisabled: (number | string)[] = [];
// const storageDisabledMap = new Map();
// 选中
// const selectStorageList = ref<(number | string)[]>([]);
// 可选
const storageSelectable: (number | string)[] = [];
// 无硬盘
const storageNone: (number | string)[] = [];

for (let [key, item] of allDiskStatus) {
    // 不可选
    if (!item.exit) {
        // 无硬盘
        storageNone.push(key);
    } else if (item?.unused && item.size && item.size >= expansionMinDiskSize.value) {
        // 可选
        storageSelectable.push(key);
    } else {
        // 不可选
        storageDisabled.push(key);
    }
}
let availableSpacePercentage = ref(0),
    readunantSpacePercentage = ref(0),
    availableSpace = ref(0),
    availableSpaceByStorageSpace = ref(0);
diskListByStorageSpace.value.forEach((item) => {
    availableSpaceByStorageSpace.value += allDiskStatus.get(item)?.size ?? 0;
});

watch(
    selectStorageList,
    (newVal) => {
        const totleValue = [...newVal, ...diskListByStorageSpace.value];
        // 置空逻辑
        if (totleValue.length === 0) {
            availableSpacePercentage.value = 0;
            readunantSpacePercentage.value = 0;
            return;
        }
        // 选择逻辑
        let totalSize = 0,
            minSize = 0;
        totleValue.forEach((item) => {
            totalSize += allDiskStatus.get(item)?.size ?? 0;
            minSize =
                minSize !== 0
                    ? Math.min(minSize, allDiskStatus.get(item)?.size ?? 0)
                    : allDiskStatus.get(item)?.size ?? 0;
        });
        switch (selectRAIDStrategy.value) {
            case "RAID0":
                availableSpace.value = totalSize;
                availableSpacePercentage.value = 100;
                readunantSpacePercentage.value = 0;
                break;
            case "RAID1":
                availableSpace.value = minSize;
                availableSpacePercentage.value = minSize
                    ? ((((minSize * 100) / totalSize)?.toFixed(0) as unknown) as number)
                    : 0;
                readunantSpacePercentage.value = 100 - availableSpacePercentage.value;
                break;
            case "RAID5":
                // 至少三块硬盘
                if (totleValue.length > 2) {
                    availableSpace.value = minSize * (totleValue.length - 1);
                    availableSpacePercentage.value = ((
                        (minSize * (totleValue.length - 1) * 100) /
                        totalSize
                    )?.toFixed(0) as unknown) as number;
                    readunantSpacePercentage.value = 100 - availableSpacePercentage.value;
                } else {
                    availableSpace.value = 0;
                    availableSpacePercentage.value = 0;
                    readunantSpacePercentage.value = 0;
                }
                break;
        }
    },
    { immediate: true }
);
import { UI_DISK_INFO_TYPE } from "@views/StorageManager/controlData.d";
const obtainCurrentDiskCardDescription = (item: UI_DISK_INFO_TYPE, key: string) => {
    // 扩容页面&当前磁盘列表中的磁盘
    if (diskListByStorageSpace.value.includes(key)) {
        return "Current";
    }
    // 被占用
    else if (item?.RaidAssignment) {
        return `${item?.RaidAssignment}`;
    }
    // 没有被占用&磁盘太小
    else if (item.size && item.size < expansionMinDiskSize.value) {
        return `太小`;
    }
    // 可选
    else if (storageSelectable.includes(key)) {
        return item.type;
    }
    // 空槽
    else {
        return "Empty";
    }
};

// extened capacity
import { diskListByStorageSpace } from "@views/EstablishRAID/controlData.ts";
// const determineWhetherSelectable = (key: string) => {
//     // 可选择盘
//     storageSelectable.includes(key)
// };
</script>

<template name="SelectRAIDPart">
    <!-- 外框布局 -->
    <div class="space-y-6 mt-6">
        <!-- select strategy -->
        <!-- 扩容没有策略选择 -->
        <div class="flex space-x-4" v-if="context !== 'Modify'">
            <SelectStrategy v-for="strategy in strategies" :key="strategy" :strategy="strategy"
                @click="selectStorageList = []"></SelectStrategy>
        </div>
        <!-- Please select the desired hard disk -->
        <div>
            <div class="mb-2">
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    {{
                        context !== "Modify"
                        ? `Please select the desired hard disk`
                        : `Select the hard drive(s) you want to add`
                    }}
                </span>
            </div>

            <!-- 磁盘选择 -->
            <div class="flex space-x-2">
                <template v-for="[key, item] in allDiskStatus" :key="key">
                    <input :disabled="[...storageNone, ...storageDisabled].includes(key)" type="checkbox" class="hidden"
                        :id="`check${key}`" :value="key" v-model="selectStorageList" />

                    <NPopover trigger="hover" :disabled="!item.exit" placement="bottom">
                        <template #trigger>
                            <label :for="`check${key}`" :class="{
                                'bg-gray-50 opacity-50': storageNone.includes(key as string),
                                'bg-gray-50': storageDisabled.includes(key),
                                'bg-slate-50 text-sky-600 cursor-pointer': storageSelectable.includes(key) && !selectStorageList.includes(key),
                                'bg-sky-600 text-white cursor-pointer': selectStorageList.includes(key),
                            }" class="h-20 flex-1 rounded-md flex flex-col items-center justify-around">
                                <span class="text-center text-base font-semibold font-['Roboto']">
                                    {{ key }}
                                </span>
                                <span></span>
                                <span class="text-center text-xs font-normal font-['Roboto']">
                                    {{ obtainCurrentDiskCardDescription(item, key) }}
                                </span>
                            </label>
                        </template>
                        <div v-if="item?.RaidAssignment">Used by {{ item?.RaidAssignment }}</div>
                        <div v-else-if="item?.unused">未使用的磁盘</div>
                        <div v-else-if="context === 'Modify' && item.size && item.size < expansionMinDiskSize
                            ">
                            至少 {{ convertSizeToReadable(expansionMinDiskSize) }}
                        </div>
                        <div v-else>{{ item?.type }} Used</div>
                    </NPopover>
                </template>
            </div>

            <!-- 选择的磁盘信息展示 -->
            <div class="flex flex-col space-y-1 mt-4">
                <template v-for="key in [...selectStorageList, ...diskListByStorageSpace]" :key="key">
                    <div class="flex items-center h-10 bg-gray-50 rounded-md pr-4">
                        <span class="ml-1 w-[34px] text-center text-neutral-400">
                            {{ key }}
                        </span>
                        <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                            {{ allDiskStatus.get(key)?.name }}
                        </span>
                        <span class="flex-grow text-neutral-400 text-xs font-normal font-['Roboto']">
                        </span>
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto']"> </span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto']">
                            {{ convertSizeToReadable(allDiskStatus.get(key)?.size ?? 0) }}
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <!-- Estimated usage -->
        <div>
            <div class="mb-2 flex justify-between">
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Estimated usage
                </span>
                <div>
                    <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']">
                        {{context !== "Modify" ? "Estimated available" : "Expected expansion from 100GB to"}}
                    </span>
                    <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                        {{ convertSizeToReadable(availableSpace) }}
                    </span>
                </div>
            </div>

            <div class="flex rounded-sm overflow-hidden">
                <span class="h-2 bg-emerald-400" :style="{ width: `${availableSpacePercentage}%` }"></span>
                <span class="h-2 bg-amber-500" :style="{ width: `${readunantSpacePercentage}%` }"></span>
            </div>

            <div class="flex space-x-4 mt-2">
                <div class="space-x-1">
                    <span class="bg-emerald-400 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">Estimated available</span>
                </div>
                <div class="space-x-1 flex-grow">
                    <span class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">Protection and
                        redundancy</span>
                </div>
                <div>
                    <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']">
                        {{ selectRAIDStrategy }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
