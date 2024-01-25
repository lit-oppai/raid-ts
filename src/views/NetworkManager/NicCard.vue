<script setup lang="ts">
import Image from "primevue/image";
import { convertSpeedToReadable } from "@icewhale/ui-utils";
import NICSVG from "@/assets/img/NetworkManager/NIC.svg";

defineProps({
    name: {
        type: String,
        default: 'Reatleck GHJAHF-100v',
    },
    state: {
        type: Boolean,
        default: false,  
    },
    negotiatedSpeed: {
        type: Number,
        default: 0,
    },
    theoreticalSpeed: {
        type: Number,
        default: 0,
    },
});
</script>
<template>
    <div class="h-[4.25rem] bg-white rounded-lg flex items-center space-x-3 px-4">
        <Image :src="NICSVG"></Image>

        <div class="flex-grow">
            <div class="flex items-center space-x-1.5">
                <div class="bg-green-default rounded-[50%] w-1.5 h-1.5 relative" :class="state? `bg-green-default` : `bg-neutral-300`"></div>
                <div class="text-zinc-800 text-base font-medium" >{{ name }}</div>
            </div>

            <div>
                <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"> {{ convertSpeedToReadable(negotiatedSpeed) }} </span>
                <span class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-4"> /{{ convertSpeedToReadable(theoreticalSpeed) }}</span>
            </div>
        </div>
    </div>
</template>
