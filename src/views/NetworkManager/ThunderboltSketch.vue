<script setup lang="ts">
import Image                 from "primevue/image";
import ThunderboltPortStatus from "./ThunderboltPortStatus.vue";
import ThunderboltSVG        from "@/assets/img/NetworkManager/Thunderbolt.svg";
defineProps({
    actived: {
        type: Boolean,
        default: false,
    },
    ThunderboltData: {
        type: Object,
        default: () => [],
    },
});
</script>
<template>
    <div class="relative">
        <div class="absolute left-[134px] top-[17px] focus:outline-none">
            <ThunderboltPortStatus
                v-for="data in ThunderboltData"
                :name="data.product || data.name"
                :state="data.ip !== ''"
                :theoretical-speed="data.theoretical_speed"
                :negotiated-speed="data.negotiated_speed"
            />
        </div>
        <Image :src="ThunderboltSVG" />
    </div>
</template>
