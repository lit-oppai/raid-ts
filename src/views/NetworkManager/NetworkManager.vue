<script setup lang="ts">
import ThunderboltSketch from "./ThunderboltSketch.vue";
import BackSketch from "./BackSketch.vue";
import BackProSketch from "./BackProSketch.vue";
import RemoteLoginCard from "./RemoteLoginCard.vue";
import NicCard from "./NicCard.vue";
</script>

<template>
    <!-- Sketch -->
    <div class="flex justify-center items-end space-x-3 active mt-[2.5rem]">
        <ThunderboltSketch actived />
        <BackSketch v-if="true" :actived-port="2" />
        <BackProSketch v-else :actived-port="2" />
        <div class="flex absolute space-x-[247px] text-neutral-400 text-xs font-normal">
            <div>Front</div>
            <div>Back</div>
        </div>
    </div>

    <!-- Remote Login -->
    <RemoteLoginCard class="mt-6"></RemoteLoginCard>

    <!-- NIC -->
    <NicCard class="mt-2"></NicCard>

    <div class="w-[624px] my-3">
        <span class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-none">ZimaOS is currently offering free
            remote access for a limited time, and by enabling
            this feature you agree that
        </span>
        <span class="text-sky-600 text-xs font-normal font-['Roboto'] leading-none">Privacy Service Agreement.</span>
    </div>

    <div class="w-[624px]">
        <span class="text-sky-600 text-xs font-normal font-['Roboto'] leading-none">Install ZimaClient</span><span
            class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-none">
            on the end device and bind the current Zima device via NetworkID for remote
            access.</span>
    </div>
</template>

<style></style>
