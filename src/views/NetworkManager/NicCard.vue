<script setup lang="ts">
import Image from "primevue/image";
import NICSVG from "@/assets/img/NetworkManager/NIC.svg";

</script>
<template>
    <div class="h-[4.25rem] bg-white rounded-lg flex items-center space-x-3 px-4">
        <Image :src="NICSVG"></Image>
        <!-- <i class="casa-language-outline text-2xl"></i> -->

        <div class="flex-grow">
            <div class="flex items-center space-x-1.5">
                <div class="bg-green-default rounded-[50%] w-1.5 h-1.5 relative"></div>
                <div class="text-zinc-800 text-base font-medium" v-t="`Reatleck GHJAHF-100v`"></div>
            </div>

            <div>
                <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"> 1G </span>
                <span class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-4"> /2.5G</span>
            </div>
        </div>
    </div>
</template>
