<script setup lang="ts">
import { ref, watch }            from "vue";
import Image                     from "primevue/image";
import Button                    from "primevue/button";
import Skeleton                  from "primevue/skeleton";
import protectSVG                from "@assets/img/StorageManager/protect.svg";
import diskSVG                   from "@assets/img/StorageManager/disk.svg";
import warningSVG                from "@assets/img/StorageManager/warning.svg";
import warningRedSVG             from "@assets/img/StorageManager/warningRed.svg";
import warningIntense            from "@assets/img/StorageManager/warningIntense.svg";

import useEstablishRAID          from "@views/ProcessStorageModals/controlView.ts";
import {
    selectRAIDStrategy,
    expansionMinDiskSize,
} from "@views/ProcessStorageModals/controlData.ts";
import { RAIDStrategy }          from "@views/ProcessStorageModals/controlData.d";
import {
    reloadServiceData,
    RAIDCandidateDiskCount,
} from "@views/StorageManager/controlData.ts";

import { convertSizeToReadable } from "@icewhale/ui-utils";
import { useRoute }              from "vue-router";
import { raidAPI }               from "@network/index.ts";
import { Device }                from "@icewhale/zimaos-localstorage-openapi";
import minBy                     from "lodash/minBy";

const { showEstablishRAID, initEstablishRAID } = useEstablishRAID();
const route = useRoute();
const storageName = route.params.storageName as string;
const storagePath = route.query.path as string;
const diskInfoByStorageSpace = ref<Device[]>([]);
const storageLevel = ref<number>();

const needFirstAid = ref(false);
const needNewDisk = ref(false);
const isReady = ref(false);
const showAddingDiskButton = ref(true);

const confirm_disassembly_raids = ref(false);
const disassembly_text = ref("Disable");

// const expansionMinDiskSize = ref(0);
const isLoadingDiskInfoByStorageSpace = ref<boolean>(false);
const loadRaid = async () => {
    isLoadingDiskInfoByStorageSpace.value = true;
    await raidAPI
        .getRaids(storagePath)
        .then((res) => {
            selectRAIDStrategy.value = ("RAID" +
                res.data.data?.[0].raid_level) as RAIDStrategy;
            storageLevel.value = res.data.data?.[0].raid_level;
            diskInfoByStorageSpace.value =
                res.data.data?.[0].devices?.sort((a, b) => {
                    return Number(a.index) - Number(b.index);
                }) ?? [];

            // TODO: 为了做急救功能，此为相反的数据
            // diskInfoByStorageSpace.value[0].health = !diskInfoByStorageSpace.value[0].health;

            needFirstAid.value =
                diskInfoByStorageSpace.value.filter((i) => !i.health).length !==
                    0 || res.data.data?.[0].shortage === true;
            needNewDisk.value = res.data.data?.[0].shortage ?? false;
            expansionMinDiskSize.value =
                minBy(res.data.data?.[0].devices, "size")?.size ?? 0;
            isReady.value; //= true;
            res.data.data?.[0].status === "idle" ||
                (res.data.data?.[0].status as string) === "";
            showAddingDiskButton.value = res.data.data?.[0].shortage === true;
        })
        .finally(() => {
            isLoadingDiskInfoByStorageSpace.value = false;
        });
};

await loadRaid(); // TODO
initEstablishRAID();

// disable raidAPI
import { useRouter }             from "vue-router";
const router = useRouter();
const isLoadingDisabledButton = ref<boolean>(false);
async function disabledRaid(): Promise<void> {
    if (!confirm_disassembly_raids.value) {
        confirm_disassembly_raids.value = true;
        disassembly_text.value = "Are you sure?";
        return;
    }
    confirm_disassembly_raids.value = false;
    isLoadingDisabledButton.value = true;
    await raidAPI
        .deleteRaid(storagePath ?? "")
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
}
function deselectDisassemblyRaid(): void {
    confirm_disassembly_raids.value = false;
    disassembly_text.value = "Disable";
}

// ejct disk
// const operationEjectLoading = ref<boolean>(false);
const pathOperationEject = ref<string>("");
async function ejectDiskFromRaid(path: string): Promise<void> {
    // operationEjectLoading.value = true;
    pathOperationEject.value = path;
    await raidAPI
        .updateRaid({
            path: storagePath ?? "",
            action: "remove",
            devices: [path],
        })
        .then((res) => {
            if (res.status === 200) {
                // loadRaid(); // Prohibited to use because the restart data is not saved on the server.
                showAddingDiskButton.value = false;
                needNewDisk.value = true;
            } else {
                console.log("eject failed");
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            pathOperationEject.value = "";
        });
}

watch(
    () => showAddingDiskButton.value === false && needNewDisk.value === true,
    (v) => {
        diskInfoByStorageSpace.value = v
            ? diskInfoByStorageSpace.value.filter((i) => i.health)
            : diskInfoByStorageSpace.value;
    }
);

// power off
import { messageBus }            from "@icewhale/ui-utils";
const targetPawerOff = (): void => {
    messageBus("mircoapp_communicate", {
        action: "power_off",
        name: "icewhale_settings",
    });
};

// open first aid page
import { needFirstAidRaid }      from "@views/ProcessStorageModals/controlData.ts";
const openFirstAid = (): void => {
    needFirstAidRaid.value = storagePath ?? "";
    showEstablishRAID("FirstAid");
};

// extened capacity
import {
    diskListByStorageSpace,
    extendRaidPath,
    nameStorage,
} from "@views/ProcessStorageModals/controlData.ts";
import { INDEX_TO_DISK_HUB_MAP } from "@views/StorageManager/const.ts";
function getDiskHubIndex(index: number): string {
    return INDEX_TO_DISK_HUB_MAP.get(index) ?? "";
}
const extenedCapacity = (): void => {
    // perpare data
    selectRAIDStrategy.value = ("RAID" + storageLevel.value) as RAIDStrategy;
    // expansionMinDiskSize 已经赋值
    diskListByStorageSpace.value = diskInfoByStorageSpace.value.map((item) => {
        return INDEX_TO_DISK_HUB_MAP.get(item.index as number);
    }) as string[];
    extendRaidPath.value = storagePath ?? "";
    nameStorage.value = storageName ?? "";
    showEstablishRAID("Modify");
};
</script>
<template>
    <template v-if="isLoadingDiskInfoByStorageSpace">
        <Skeleton height="1.25rem" width="6rem"></Skeleton>
        <Skeleton height="17rem"></Skeleton>
        <Skeleton height="1.25rem" width="6rem"></Skeleton>
        <Skeleton height="2.75rem"></Skeleton>
        <Skeleton height="1.25rem" width="6rem"></Skeleton>
        <Skeleton height="6rem"></Skeleton>
    </template>
    <template v-else>
        <!-- Warnning Info -->
        <div
            class="w-full px-3 py-2.5 bg-rose-100 rounded-md justify-start items-center gap-2 inline-flex mt-4"
            v-if="needFirstAid"
        >
            <Image :src="warningIntense"></Image>
            <span
                class="grow shrink basis-0 text-orange-500 text-sm font-normal font-['Roboto'] align-baseline"
            >
                {{
                    needNewDisk
                        ? $t(
                              "The data has been locked for read-only access. Please add new hard drive(s)."
                          )
                        : $t(
                              `The data has been locked for read-only access. Please replace it for recovery operations.`
                          )
                }}
            </span>
        </div>
        <!-- Hard Drive Part -->
        <div class="mt-6 mb-2 mr-0.5">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                {{ $t("Hard Drive") }}
            </span>
        </div>
        <div class="bg-white rounded-lg space-y-1 p-3">
            <!-- Traversing -->
            <div v-for="(item, index) in diskInfoByStorageSpace" :key="index">
                <div class="flex items-center bg-gray-50 rounded-md h-10 pr-3">
                    <span class="ml-1 w-[34px] text-center text-neutral-400">
                        <!-- TODO: API 补充 index 之后，去掉替补 index -->
                        {{ getDiskHubIndex(item.index || index) }}
                    </span>
                    <span
                        class="text-zinc-800 text-sm font-medium font-['Roboto']"
                    >
                        {{ item.model }}
                    </span>
                    <span
                        class="mx-3 px-1 py-px bg-rose-100 rounded gap-0.5 flex justify-center items-center"
                        v-if="!item.health"
                    >
                        <Image
                            :src="warningRedSVG"
                            class="h-4 w-4 fill-orange-500"
                        ></Image>
                        <span
                            class="text-orange-500 text-xs font-normal font-['Roboto'] self-baseline"
                        >
                            {{ $t("Damaged") }}
                        </span>
                    </span>
                    <span class="flex-grow"></span>
                    <span
                        class="text-right text-neutral-400 text-xs font-normal font-['Roboto'] mr-1"
                        v-if="item.health"
                    >
                        {{
                            item.health === true
                                ? $t("Healthy")
                                : $t("Unhealthy")
                        }}
                    </span>
                    <Button
                        :loading="pathOperationEject === item.path"
                        :label="$t('Eject')"
                        severity="primary"
                        size="medium"
                        @click="ejectDiskFromRaid(item.path as string)"
                        v-else-if="isReady"
                    ></Button>
                </div>
            </div>

            <div
                class="flex items-center bg-gray-50 rounded-md h-10 px-3 gap-4"
                v-if="needNewDisk"
            >
                <span
                    class="text-neutral-400 text-sm font-normal font-['Roboto']"
                    v-if="showAddingDiskButton"
                >
                    {{
                        $t("Need new hard drive · At least {size}", {
                            size: convertSizeToReadable(expansionMinDiskSize),
                        })
                    }}
                </span>
                <span
                    class="text-neutral-400 text-sm font-normal font-['Roboto']"
                    v-else
                >
                    {{
                        $t(
                            "The hard drive has been ejected. Please power off, replace and restart."
                        )
                    }}
                </span>
                <span class="flex-grow"></span>
                <!-- TODO：添加 socket 到框架，以触发 -->
                <Button
                    :label="$t('Add')"
                    severity="primary"
                    size="medium"
                    @click="openFirstAid"
                    v-if="showAddingDiskButton"
                ></Button>
                <Button
                    :label="$t('Power off')"
                    severity="primary"
                    size="medium"
                    @click="targetPawerOff()"
                    v-else
                ></Button>
            </div>

            <!-- Not has the new disk & Raid is helthy. -->
            <div
                class="pt-2 px-1"
                v-if="RAIDCandidateDiskCount == 0 && !needNewDisk"
            >
                <span
                    class="text-neutral-400 text-sm font-normal font-['Roboto']"
                >
                    {{
                        $t(
                            "After inserting a new hard drive, you can expand the current RAID capacity."
                        )
                    }}
                </span>
            </div>
        </div>

        <!-- Data Protect -->
        <div class="mt-6 space-y-2" v-if="selectRAIDStrategy !== 'RAID0'">
            <div class="mr-0.5">
                <span
                    class="text-neutral-400 text-sm font-normal font-['Roboto']"
                >
                    {{ $t("Data Protection") }}
                </span>
            </div>
            <div class="bg-white rounded-lg flex flex-col">
                <div class="h-10 flex items-center px-4">
                    <Image :src="protectSVG" class="h-6 w-6"></Image>
                    <span
                        class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3"
                    >
                        {{ $t("Verification and Recovery") }}
                    </span>

                    <span
                        class="text-right text-neutral-400 text-sm font-normal font-['Roboto']"
                        v-if="needFirstAid"
                    >
                        {{ $t("Protecting · Read-only") }}
                    </span>
                    <span
                        class="text-right text-neutral-400 text-sm font-normal font-['Roboto']"
                        v-else
                    >
                        {{ $t("In Protection") }}
                    </span>
                </div>
                <template v-if="needFirstAid">
                    <div class="w-full h-px bg-gray-200"></div>
                    <div class="h-9 flex items-center px-4 pb-1">
                        <i
                            class="w-6 flex items-center justify-center casa-alert-outline text-base text-rose-500"
                        ></i>
                        <span
                            class="text-neutral-400 text-xs font-normal font-['Roboto'] flex-grow ml-3"
                        >
                            {{
                                $t(
                                    `Replace a hard drive of at least {size} to restore functionality.`,
                                    {
                                        size: convertSizeToReadable(
                                            expansionMinDiskSize
                                        ),
                                    }
                                )
                            }}
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <!-- General -->
        <div class="mt-6 space-y-2">
            <div class="mr-0.5">
                <span
                    class="text-neutral-400 text-sm font-normal font-['Roboto']"
                >
                    {{ $t("General") }}
                </span>
            </div>

            <!-- TODO0 无损坏 && raid5 && 存在空槽位 -->
            <div
                class="bg-white rounded-lg h-11 flex items-center px-4"
                v-if="
                    storageLevel === 5 &&
                    !needFirstAid &&
                    RAIDCandidateDiskCount
                "
            >
                <Image :src="diskSVG" class="h-6 w-6"></Image>
                <span
                    class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3"
                >
                    {{ $t("Expand capacity") }}
                </span>

                <Button
                    :label="$t('Add Drive')"
                    severity="secondary"
                    size="medium"
                    @click="extenedCapacity"
                ></Button>
            </div>

            <div class="bg-white rounded-lg h-11 flex items-center px-4">
                <Image :src="warningSVG" class="h-6 w-6"></Image>
                <span
                    class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3"
                >
                    {{ $t("Format and Disable") }}
                </span>

                <Button
                    :label="$t(disassembly_text)"
                    severity="accent"
                    size="medium"
                    @click="disabledRaid"
                    @focusout="deselectDisassemblyRaid"
                    :loading="isLoadingDisabledButton"
                ></Button>
            </div>
        </div>
    </template>
</template>
