<script setup lang="ts">
import { ref } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import creatingJSON from "@assets/img/ProcessStorageModals/creating.json";
import EasterEgg from "@assets/img/ProcessStorageModals/easterEgg.json";
import { context, onlyFormatSingleStorageSpace } from "./controlData.ts";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let content: string = ''

switch (context.value) {
    case "FirstAid":
        content = t('Recovery in progress')
        break;
    case "CreateStorage":
        content = onlyFormatSingleStorageSpace.value ? `${t('Formatting')}...` : `${t('Creating')}...`
        break;
    default:
        content = `${t('Creating')}...`
        break;
}

const showEasterEgg = ref(window.parent?.icewhale === 'welcome');
</script>
<template name="CreatingRAIDPart">
    <div class="flex flex-col items-center space-y-2 pt-[5%]">
        <LottieAnimation :animation-data="creatingJSON" loop class="w-[6.25rem] h-[6.25rem]" />
        <LottieAnimation :animation-data="EasterEgg" loop v-if="showEasterEgg" />
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            {{ content }}
        </span>
    </div>
    <div class="mt-3 mx-6">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            {{ $t('During this process, please do not unplug the hard drive or shut down ZimaCube to avoid system errors.') }}
        </span>
    </div>
</template>
