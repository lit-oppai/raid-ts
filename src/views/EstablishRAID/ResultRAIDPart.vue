<script setup lang="ts">
import Image from "primevue/image";
import errorSVG from "@assets/img/EstablishRAID/error.svg";
import successSVG from "@assets/img/EstablishRAID/success.svg";
import {
    resultRAIDInfo,
    selectRAIDStrategy,
    selectStorageList,
    context,
} from "./controlData.ts";
import { convertSizeToReadable } from "@utils/tools.ts";

let svg: string, statusMessage: string;
import { useI18n } from "vue-i18n";
const { t } = useI18n();
if (resultRAIDInfo.success) {
    svg = successSVG;
    // if (context.value === "EnableStorage") {
    //     statusMessage = "Enablement successful";
    // } else {
    //     statusMessage = "Creation Successful";
    // }
    statusMessage = t("Success")
} else {
    svg = errorSVG;
    // if (context.value === "EnableStorage") {
    //     statusMessage = "Enablement failed";
    // } else {
    //     statusMessage = "Creation Failed";
    // }
    statusMessage = t("Fail")
}
</script>
<template name="ResultRAIDPart">
    <div class="flex flex-col items-center space-y-7 mt-20">
        <Image :src="svg"></Image>
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            {{ statusMessage }}
        </span>
    </div>
    <div class="mt-3 flex justify-center" v-if="context !== 'EnableStorage'">
        <div v-if="resultRAIDInfo.success && resultRAIDInfo.capacity"
            class="max-w-[20.25rem] flex-grow mx-2 bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    {{$t('Capacity')}} :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ convertSizeToReadable(resultRAIDInfo.capacity) }}
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    {{$t('Storage')}} :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ selectRAIDStrategy }}
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    {{$t('Hard drives')}} :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ selectStorageList }}
                </span>
            </div>
        </div>
        <span v-else-if="resultRAIDInfo.messages" class="text-neutral-400 text-sm font-normal font-['Roboto']">
            Describe the cause of the user's failure, what caused it and because of {{ resultRAIDInfo.messages }}.
        </span>
    </div>
</template>
