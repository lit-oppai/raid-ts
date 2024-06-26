<script setup lang="ts">
import { watch, ref, computed }   from "vue";
import { RAIDStrategy }           from "./controlData.d";
import {
    selectStorageList,
    selectRAIDStrategy,
    context,
    stepByStep,
} from "./controlData";
import { SSDStatus, HDDStatus }   from "@views/StorageManager/controlData.ts";
import {
    expansionMinDiskSize,
    currentStepName,
    currentStep,
} from "@views/ProcessStorageModals/controlData.ts";

import { convertSizeToReadable }  from "@icewhale/ui-utils";
import SelectStrategy             from "./SelectStrategy.vue";
import Button                     from "primevue/button";
import { NPopover }               from "naive-ui";

const strategies: RAIDStrategy[] = ["RAID0", "RAID1", "RAID5"];
const sortedArray = Array.from(new Map([...SSDStatus, ...HDDStatus])).sort(
    (a, b) => (a[0] > b[0] ? 1 : -1),
);
const allDiskStatus = new Map(sortedArray);
// 不可选
const storageDisabled: (number | string)[] = [];
// 可选
const storageSelectable: (number | string)[] = [];
// 无硬盘
const storageNone: (number | string)[] = [];

let countSelectDisk = 1;
for (let [key, item] of allDiskStatus) {
    // 不可选
    if (!item.exit) {
        // 无硬盘
        storageNone.push(key);
    }
    // The function of the selectable disk has two environmental requirements:
    // 1.Create a Raid array.
    // 2.Expand the Raid array.
    // An unhealthy disk has various possible problems.
    else if (
        item?.unused &&
        item.health &&
        item.size !== undefined &&
        item.size >= expansionMinDiskSize.value
    ) {
        // 可选
        storageSelectable.push(key);
    } else {
        // 不可选
        storageDisabled.push(key);
    }

    // prepare select disk list.
    if (selectStorageList.value.length < 3 && ((selectRAIDStrategy.value === "RAID5" && countSelectDisk <= 3) || (selectRAIDStrategy.value !== "RAID5" && countSelectDisk <= 2)) && item?.unused && item.health) {
        countSelectDisk++;
        selectStorageList.value = [...selectStorageList.value, key];
    }
}

const calculateRAIDCapacity = (strategy: RAIDStrategy, diskList: number[]) => {
    let totalSize = 0,
        minSize = 0;
    diskList.forEach((diskSize) => {
        totalSize += diskSize ?? 0;
        minSize = minSize !== 0 ? Math.min(diskSize, minSize) : diskSize ?? 0;
    });
    switch (strategy) {
        case "RAID0":
            return totalSize;
        case "RAID1":
            return minSize;
        case "RAID5":
            // 至少三块硬盘
            if (diskList.length > 2) {
                return minSize * (diskList.length - 1);
            } else {
                return 0;
            };
        default:
            return 0;
    }
};
let availableSpacePercentage = ref(0),
    readunantSpacePercentage = ref(0),
    availableSpace = ref(0),
    availableSpaceByStorageSpace = ref(0);
if (selectRAIDStrategy.value) {
    availableSpaceByStorageSpace.value = calculateRAIDCapacity(
        selectRAIDStrategy.value,
        diskListByStorageSpace.value.map(
            (item) => allDiskStatus.get(item)?.size ?? 0,
        ),
    );
}

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
                    ? (((minSize * 100) / totalSize)?.toFixed(
                          0,
                      ) as unknown as number)
                    : 0;
                readunantSpacePercentage.value =
                    100 - availableSpacePercentage.value;
                break;
            case "RAID5":
                // 至少三块硬盘
                if (totleValue.length > 2) {
                    availableSpace.value = minSize * (totleValue.length - 1);
                    availableSpacePercentage.value = (
                        (minSize * (totleValue.length - 1) * 100) /
                        totalSize
                    )?.toFixed(0) as unknown as number;
                    readunantSpacePercentage.value =
                        100 - availableSpacePercentage.value;
                } else {
                    availableSpace.value = 0;
                    availableSpacePercentage.value = 0;
                    readunantSpacePercentage.value = 0;
                }
                break;
        }
    },
    { immediate: true },
);
import { DISK_UI_TYPE }           from "@views/StorageManager/controlData.d";
import { useI18n }                from "vue-i18n";
const { t } = useI18n();
const obtainCurrentDiskCardDescription = (item: DISK_UI_TYPE, key: string) => {
    // 扩容页面&当前磁盘列表中的磁盘
    // 空槽
    if (storageNone.includes(key)) {
        return "Empty";
    }
    // in current disk list of storage space
    else if (diskListByStorageSpace.value.includes(key)) {
        return t("Current");
    }
    // in other disk list of storage space
    else if (!item?.unused) {
        return `Used`;
    }
    // 没有被占用&磁盘太小
    else if (
        item.size &&
        diskListByStorageSpace.value.length &&
        item.size < expansionMinDiskSize.value
    ) {
        return `Disable`;
    }
    // No unhealthy disk is occupied.
    else if (item?.unused && !item.health) {
        return item.type;
    }
    // 可选
    else if (storageSelectable.includes(key)) {
        return item.type;
    } else {
        return "Unknown";
    }
};

// extened capacity
import { diskListByStorageSpace } from "@views/ProcessStorageModals/controlData.ts";

//
const checkNextStep = computed<boolean>(() => {
    // 选择RAID 页面
    if (currentStepName.value === "SelectRAIDPart") {
        switch (selectRAIDStrategy.value) {
            case "RAID0":
            case "RAID1":
                return selectStorageList.value.length < 2;
            case "RAID5":
                return diskListByStorageSpace.value.length
                    ? selectStorageList.value.length < 1
                    : selectStorageList.value.length < 3;
        }
    }
    return false;
});

// clean selectStorageList.
const clearSelectStorageList = (strategy: RAIDStrategy) => {
    if (strategy !== selectRAIDStrategy.value) {
        selectStorageList.value = [];
        selectRAIDStrategy.value = strategy;
    }
};
</script>

<template name="SelectRAIDPart">
    <!-- 外框布局 -->
    <div class="space-y-6 mt-6 px-6 flex-grow">
        <!-- select strategy -->
        <!-- 扩容没有策略选择 -->
        <div class="flex space-x-4" v-if="context !== 'Modify'">
            <SelectStrategy
                v-for="strategy in strategies"
                :key="strategy"
                :strategy="strategy"
                @click="clearSelectStorageList(strategy)"
            ></SelectStrategy>
        </div>
        <!-- Please select the desired hard disk -->
        <div>
            <div class="mb-2">
                <span
                    class="text-zinc-800 text-base font-semibold font-['Roboto']"
                >
                    {{
                        context !== "Modify"
                            ? $t(`Select hard drives`)
                            : $t(`Select the hard drive(s) you want to add`)
                    }}
                </span>
            </div>

            <!-- 磁盘选择 -->
            <div class="flex space-x-2">
                <template v-for="[key, item] in allDiskStatus" :key="key">
                    <input
                        :disabled="
                            [...storageNone, ...storageDisabled].includes(key)
                        "
                        type="checkbox"
                        class="hidden"
                        :id="`check${key}`"
                        :value="key"
                        v-model="selectStorageList"
                    />

                    <NPopover
                        trigger="hover"
                        :disabled="!item.exit"
                        placement="bottom"
                    >
                        <template #trigger>
                            <label
                                :for="`check${key}`"
                                :class="{
                                    'bg-gray-50 opacity-50':
                                        storageNone.includes(key as string),
                                    'bg-gray-50': storageDisabled.includes(key),
                                    'bg-slate-50 text-sky-600 cursor-pointer':
                                        storageSelectable.includes(key) &&
                                        !selectStorageList.includes(key),
                                    'bg-sky-600 text-white cursor-pointer':
                                        selectStorageList.includes(key),
                                }"
                                class="h-20 flex-1 rounded-md flex flex-col items-center justify-around"
                            >
                                <span
                                    class="text-center text-base font-semibold font-['Roboto']"
                                >
                                    {{ key }}
                                </span>
                                <span></span>
                                <span
                                    class="text-center text-xs font-normal font-['Roboto']"
                                >
                                    {{
                                        obtainCurrentDiskCardDescription(
                                            item,
                                            key,
                                        )
                                    }}
                                </span>
                            </label>
                        </template>
                        <div v-if="item?.unused && !item.health">
                            {{ $t("unhealthy") }}
                        </div>
                        <div
                            v-else-if="
                                context === 'Modify' &&
                                item.size &&
                                item.size < expansionMinDiskSize
                            "
                        >
                            {{
                                $t("At least {size}", {
                                    size: convertSizeToReadable(
                                        expansionMinDiskSize,
                                    ),
                                })
                            }}
                        </div>
                        <div v-else-if="item?.unused">
                            {{ $t("Available") }}
                        </div>
                        <div v-else>
                            {{
                                $t("Used by {assignment}", {
                                    assignment: item?.allocatedStorageSpace,
                                })
                            }}
                        </div>
                    </NPopover>
                </template>
            </div>

            <!-- 选择的磁盘信息展示 -->
            <div class="flex flex-col space-y-1 mt-4">
                <template
                    v-for="key in [
                        ...selectStorageList,
                        ...diskListByStorageSpace,
                    ].sort((a: string, b: string) => (a > b ? 1 : -1))"
                    :key="key"
                >
                    <div
                        class="flex items-center h-10 bg-gray-50 rounded-md pr-4"
                    >
                        <span
                            class="ml-1 w-[34px] text-center text-neutral-400"
                        >
                            {{ key }}
                        </span>
                        <span
                            class="text-zinc-800 text-sm font-medium font-['Roboto']"
                        >
                            {{ allDiskStatus.get(key)?.model }}
                        </span>
                        <span
                            class="flex-grow text-neutral-400 text-xs font-normal font-['Roboto']"
                        >
                        </span>
                        <span
                            class="text-neutral-400 text-xs font-normal font-['Roboto']"
                        >
                        </span>
                        <span
                            class="text-zinc-800 text-xs font-normal font-['Roboto']"
                        >
                            {{
                                convertSizeToReadable(
                                    allDiskStatus.get(key)?.size ?? 0,
                                )
                            }}
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <!-- Estimated usage -->
        <div>
            <div class="mb-2 flex justify-between">
                <span
                    class="text-zinc-800 text-base font-semibold font-['Roboto']"
                >
                    {{ $t("Estimated usage") }}
                </span>
                <div>
                    <span
                        class="text-right text-neutral-400 text-xs font-normal font-['Roboto']"
                    >
                        {{
                            context !== "Modify"
                                ? $t("Estimated available")
                                : $t("Expected expansion from {size} to", {
                                      size: convertSizeToReadable(
                                          availableSpaceByStorageSpace,
                                      ),
                                  })
                        }}
                    </span>
                    &nbsp;
                    <span
                        class="text-zinc-800 text-base font-semibold font-['Roboto']"
                    >
                        {{ convertSizeToReadable(availableSpace) }}
                    </span>
                </div>
            </div>

            <div class="flex rounded-sm overflow-hidden">
                <span
                    class="h-2 bg-emerald-400"
                    :style="{ width: `${availableSpacePercentage}%` }"
                ></span>
                <span
                    class="h-2 bg-amber-500"
                    :style="{ width: `${readunantSpacePercentage}%` }"
                ></span>
            </div>

            <div class="flex space-x-4 mt-2">
                <div class="space-x-1">
                    <span
                        class="bg-emerald-400 w-1.5 h-1.5 rounded-sm inline-block"
                    ></span>
                    <span
                        class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"
                    >
                        {{ $t("Estimated available") }}</span
                    >
                </div>
                <div class="space-x-1 flex-grow">
                    <span
                        class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"
                    ></span>
                    <span
                        class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"
                    >
                        {{ $t("Protection and redundancy") }}
                    </span>
                </div>
                <div>
                    <span
                        class="text-right text-neutral-400 text-xs font-normal font-['Roboto']"
                    >
                        {{ selectRAIDStrategy }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div
        class="space-x-4 flex justify-end h-16 px-6 pb-6 pt-3 shrink-0 border-t"
    >
        <Button
            :label="$t('Previous')"
            severity="neutral"
            size="medium"
            @click="stepByStep('prev')"
            v-show="currentStep > 0"
        ></Button>
        <Button
            :label="$t('Next')"
            severity="primary"
            size="medium"
            @click="stepByStep('next')"
            :disabled="checkNextStep"
        ></Button>
    </div>
</template>
