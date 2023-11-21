<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import creatingJSON from '@assets/img/EstablishRAID/creating.json';
import EasterEgg from '@assets/img/EstablishRAID/EasterEgg.json';
</script>
<template>
    <div class="flex flex-col items-center space-y-2 pt-[5%]">
        <LottieAnimation :animation-data="creatingJSON" loop class="w-[6.25rem] h-[6.25rem]" />
        <LottieAnimation :animation-data="EasterEgg" loop v-if="false" />
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            Creating...
        </span>
    </div>
    <div class="mt-3">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            During this process, do not disconnect the hard drive or turn off the computer to avoid damaging the
            system.
        </span>
    </div>
    <div class="mt-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            To avoid waiting for an extended period, you can click ‘Run in the background’.
        </span>
    </div>
</template>
