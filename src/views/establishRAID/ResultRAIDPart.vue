<script setup lang="ts">
import Image from 'primevue/image';
import errorSVG from "@assets/img/EstablishRAID/error.svg";
import successSVG from "@assets/img/EstablishRAID/success.svg";
import { resultRAIDInfo, selectRAIDStrategy, selectStorageList, context } from './controlData.ts';
import { convertSizeToReadable } from '@views/StorageManager/controlData.ts';

let svg: string, statusMessage: string;

if (resultRAIDInfo.success) {
    svg = successSVG;
    if (context.value === 'EnableStorage') {
        statusMessage = "Enablement successful";
    } else {
        statusMessage = "Creation Successful";
    }
} else {
    svg = errorSVG;
    if (context.value === 'EnableStorage') {
        statusMessage = "Enablement failed";
    } else {
        statusMessage = "Creation Failed";
    }
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
        <div v-if="resultRAIDInfo.success"
            class="max-w-[20.25rem] flex-grow mx-2 bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Capacity :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ convertSizeToReadable(resultRAIDInfo.capacity) }}
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Storage Mode :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ selectRAIDStrategy }}
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Use hard disk :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ selectStorageList }}
                </span>
            </div>
        </div>
        <span v-else class="text-neutral-400 text-sm font-normal font-['Roboto']">
            Describe the cause of the user's failure, what caused it and because of what. Describe the cause of the user's
            failure, what caused it and because of what.
        </span>
    </div>
</template>
