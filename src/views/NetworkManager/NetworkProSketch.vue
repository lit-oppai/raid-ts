<script setup lang="ts">
import { computed }               from "vue";
import Image                      from "primevue/image";
import NetworkPortStatus          from "./NetworkPortStatus.vue";
import ThunderboltPortStatus      from "./ThunderboltPortStatus.vue";
import NetworkProSketchSVG        from "@/assets/img/NetworkManager/NetworkProSketch.svg";
import { NetWorkInterfaceStatus } from "@icewhale/zimaos-openapi";

const props = defineProps({
    activedPort: {
        type: Number,
        default: 0,
    },
    NicDataList: {
        type: Array as () => NetWorkInterfaceStatus[],
        default: () => [],
    },
});

const backThunderbolt = computed((): NetWorkInterfaceStatus[] => {
    return (
        props.NicDataList?.filter((item) => [11, 12].includes(item.index)) ?? []
    );
});
</script>
<template>
    <div class="relative">
        <div class="absolute flex space-x-2 top-[14px] left-[109px]">
            <NetworkPortStatus
                v-for="NicData in NicDataList"
                :name="NicData.product"
                :state="NicData.ip !== ''"
                :theoretical-speed="NicData.theoretical_speed"
                :negotiated-speed="NicData.negotiated_speed"
            />
        </div>
        <div class="absolute flex space-x-2 top-[37px] left-[51px]">
            <ThunderboltPortStatus
                v-for="data in backThunderbolt"
                :name="data.product"
                :state="data.ip !== ''"
                :theoretical-speed="data.theoretical_speed"
                :negotiated-speed="data.negotiated_speed"
            />
        </div>
        <Image :src="NetworkProSketchSVG"></Image>
    </div>
</template>
