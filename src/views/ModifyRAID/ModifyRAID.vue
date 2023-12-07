<script setup lang="ts">
import { ref } from "vue";
import Image from "primevue/image";
import Button from "primevue/button";
import protectSVG from "@assets/img/StorageManager/protect.svg";
import diskSVG from "@assets/img/StorageManager/disk.svg";
import warningSVG from "@assets/img/StorageManager/warning.svg";
import warningRedSVG from "@assets/img/StorageManager/warningRed.svg";
import warningIntense from "@assets/img/StorageManager/warningIntense.svg";
// import Warning from '@assets/img/StorageManager/warning.vue';
import {
    showEstablishRAID,
    initEstablishRAID,
} from "@views/EstablishRAID/controlView.ts";
import { selectRAIDStrategy } from "@views/EstablishRAID/controlData.ts";
import { RAIDStrategy } from "@views/EstablishRAID/controlData.d";
import {
    convertSizeToReadable,
    storageInfoMap,
    reloadServiceData,
} from "@views/StorageManager/controlData.ts";
import { useRoute } from "vue-router";
import { raid } from "@network/index.ts";
import { Device } from "@icewhale/zimaos-localstorage-openapi";
import minBy from "lodash/minBy";

const route = useRoute();
const storageName = route.params.storageName as string;
const storageInfo = storageInfoMap.get(storageName);
const diskInfoByStorageSpace = ref<Device[]>([]);

const needFirstAid = ref(false);
const needNewDisk = ref(false);
const needMinSize = ref(0);

await raid.getRaids(storageInfo?.path).then((res) => {
    selectRAIDStrategy.value = ("RAID" + res.data.data?.[0].raid_level ??
        0) as RAIDStrategy;
    diskInfoByStorageSpace.value = res.data.data?.[0].devices ?? [];

    // TODO: 为了做急救功能，此为相反的数据
    // diskInfoByStorageSpace.value[0].health = !diskInfoByStorageSpace.value[0].health;

    needFirstAid.value = diskInfoByStorageSpace.value.filter((i) => !i.health).length !== 0;
    needNewDisk.value = res.data.data?.[0].shortage ?? false;
    needMinSize.value = minBy(res.data.data?.[0].devices, "size")?.size ?? 0;
});

initEstablishRAID();

// disable raid
import { useRouter } from "vue-router";
const router = useRouter();
const disabledRaid = async (): Promise<void> => {
    await raid
        .deleteRaid(storageInfo?.path ?? "")
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
        });
};
</script>
<template>
    <!-- Warnning Info -->
    <div class="w-full px-3 py-2.5 bg-rose-100 rounded-md justify-start items-center gap-2 inline-flex mt-4">
        <Image :src="warningIntense"></Image>
        <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow align-baseline">
            The data has been locked for read-only access. Please replace it for recovery
            operations.
        </span>
    </div>
    <!-- Hard Drive Part -->
    <div class="mt-6 mb-2 mr-0.5">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']"> Hard Drive </span>
    </div>
    <div class="bg-white rounded-lg space-y-1 p-3">
        <!-- Traversing -->
        <div v-for="(item, index) in diskInfoByStorageSpace" :key="index">
            <div class="flex items-center bg-gray-50 rounded-md h-10 px-3 gap-3">
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ item.model }}
                </span>
                <span class="px-1 py-px bg-rose-100 rounded justify-center items-center gap-0.5 inline-flex"
                    v-if="!item.health">
                    <Image :src="warningRedSVG" class="h-4 w-4 fill-red-500"></Image>
                    <span class="text-rose-500 text-xs font-normal font-['Roboto']"> Damaged </span>
                </span>
                <span class="flex-grow"></span>
                <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto'] mr-1" v-if="item.health">
                    {{ item.health === true ? "Healthy" : "Unhealthy" }}
                </span>
                <Button label="推出" severity="primary" size="medium" @click="showEstablishRAID('Modify')" v-else></Button>
            </div>
        </div>

        <div class="flex items-center bg-gray-50 rounded-md h-10 px-3 gap-4" v-if="needNewDisk">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                The hard drive has been ejected. Please power off, replace and restart.
            </span>
            <span class="flex-grow"></span>
            <!-- TODO：添加 socket 到框架，以触发关机 -->
            <Button label="Eject" severity="primary" size="medium"></Button>
            <Button label="Power off" severity="primary" size="medium"></Button>
            <Button label="Add" severity="primary" size="medium" @click="showEstablishRAID('FirstAid')"></Button>
        </div>

        <div class="pt-2 px-1">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                After inserting a new hard drive, you can expand the current RAID capacity.
            </span>
        </div>
    </div>

    <!-- Data Protect -->
    <div class="mt-6 space-y-2" if="storageInfo.raid_level !== 0">
        <div class="mr-0.5">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                Data Protection
            </span>
        </div>
        <div class="bg-white rounded-lg flex flex-col py-1">
            <div class="h-9 flex items-center px-4">
                <Image :src="protectSVG" class="h-6 w-6"></Image>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                    Verification and Recovery
                </span>

                <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']" v-if="needFirstAid">
                    Protecting · Read-only
                </span>
                <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']" v-else>
                    In Protection
                </span>
            </div>
            <template v-if="needFirstAid">
                <div class="w-full h-px bg-gray-200"></div>
                <div class="h-8 flex items-center px-4 pb-1">
                    <i class="casa-alert-outline text-2xl text-rose-500"></i>
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto'] flex-grow ml-3">
                        Replace a hard drive of at least {{ convertSizeToReadable(needMinSize) }}
                        to restore functionality.
                    </span>
                </div>
            </template>
        </div>
    </div>
    <!-- General -->
    <div class="mt-6 space-y-2">
        <div class="mr-0.5">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']"> General </span>
        </div>

        <!-- TODO0 无损坏 && raid5 && 存在空槽位 -->
        <div class="bg-white rounded-lg h-11 flex items-center px-4" v-if="selectRAIDStrategy === 'RAID5' && !needFirstAid">
            <Image :src="diskSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                Expand capacity
            </span>

            <Button label="Add Drive" severity="secondary" size="medium" @click="showEstablishRAID('Modify')"></Button>
        </div>

        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="warningSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                Format and Disable
            </span>

            <Button label="Disable" severity="accent" size="medium" @click="disabledRaid"></Button>
        </div>
    </div>
</template>
