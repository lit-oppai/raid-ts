<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ThunderboltSketch from "./ThunderboltSketch.vue";
import NetworkSketch from "./NetworkSketch.vue";
import NetworkProSketch from "./NetworkProSketch.vue";
import RemoteLoginCard from "./RemoteLoginCard.vue";
import NicCard from "./NicCard.vue";
import { network, device } from "@network/index.ts";
import { NetWorkInterfaceStatus } from "@icewhale/zimaos-openapi";

const NicDataList = ref<NetWorkInterfaceStatus[]>();
const isNormalLevel = ref<boolean>(false);
// RMEAKER: font thunderbolt number is 10
const fontThunderbolt = computed((): NetWorkInterfaceStatus[] => {
    return NicDataList.value?.filter((item) => item.index == 10) ?? [];
});
// REMAKER: protogenesis NIC number is 1-9
const protogenesisNicDataList = computed(() => {
    return NicDataList.value?.filter((item) => item.index >= 0 && item.index < 10) ?? [];
});
// REMAKER: extend NIC number is -1
const ExtendNicDataList = computed(() => {
    return NicDataList.value?.filter((item) => item.index === -1) ?? [];
});
onMounted(() => {
    network.getNetworkInterfaces().then((res) => {
        if (res.status === 200) {
            NicDataList.value = res.data;
        }
    });
    device.getDeviceInfo().then((res) => {
        if (res.status === 200 && res.data.device_model !== "ZimaCube") {
            isNormalLevel.value = false;
        }
    });
});
</script>

<template>
    <!-- Sketch -->
    <div class="flex justify-center items-end space-x-3 active mt-[2.5rem]">
        <ThunderboltSketch :data=fontThunderbolt />
        <NetworkSketch v-if="isNormalLevel" :NicDataList="protogenesisNicDataList" />
        <NetworkProSketch v-else :NicDataList="protogenesisNicDataList" />
        <div class="flex absolute space-x-[247px] text-neutral-400 text-xs font-normal">
            <div v-t="`Font`"></div>
            <div v-t="`Back`"></div>
        </div>
    </div>

    <!-- Remote Login -->
    <RemoteLoginCard class="mt-6"></RemoteLoginCard>

    <!-- NIC -->
    <NicCard class="mt-2" v-for="item in ExtendNicDataList" :name="item.product" :state="item.ip !== ''"
        :theoretical-speed="item.theoretical_speed" :negotiated-speed="item.negotiated_speed"></NicCard>

    <div class="w-[624px] my-3">
        <span class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-none">
            {{ $t("Privacy Service Agreement.content") }}
        </span>
        <span class="text-sky-600 text-xs font-normal font-['Roboto'] leading-none">
            {{ $t("Privacy Service Agreement.title") }}
        </span>
    </div>

    <div class="w-[624px]">
        <span class="text-sky-600 text-xs font-normal font-['Roboto'] leading-none">
            {{ $t("Install ZimaClient") }}
        </span>
        <span class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-none">
            {{ $t("Install ZimaClient content") }}
        </span>
    </div>
</template>

<style></style>
