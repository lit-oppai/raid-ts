<script setup lang="ts">
import Image from "primevue/image";
import NetworkPortStatus from "./NetworkPortStatus.vue";
import NetworkSketchSVG from "@/assets/img/NetworkManager/NetworkSketch.svg";
import { NetWorkInterfaceStatus } from "@icewhale/zimaos-openapi";

defineProps({
    activedPort: {
        type: Number,
        default: 0,
    },
    NicDataList: {
        type: Array as () => NetWorkInterfaceStatus[],
        default: () => [],
    },
});
</script>
<template>
    <div class="relative">
        <div class="absolute flex space-x-2 top-[25px] left-[65px]">
            <NetworkPortStatus v-for="NicData in NicDataList" :name="NicData.product" :state="NicData.ip !== ''"
                :theoretical-speed="NicData.theoretical_speed" :negotiated-speed="NicData.negotiated_speed" />
        </div>
        <Image :src="NetworkSketchSVG"></Image>
    </div>
</template>
