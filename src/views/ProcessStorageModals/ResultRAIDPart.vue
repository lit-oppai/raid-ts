<script setup lang="ts">
import Image from "primevue/image";
import Button from "primevue/button";
import errorSVG from "@assets/img/ProcessStorageModals/error.svg";
import successSVG from "@assets/img/ProcessStorageModals/success.svg";
import {
    resultRAIDInfo,
    selectRAIDStrategy,
    selectStorageList,
    context,
} from "./controlData.ts";
import { convertSizeToReadable } from "@utils/tools.ts";

let svg: string, statusMessage: string;
if (resultRAIDInfo.success) {
    svg = successSVG;
    statusMessage = "Success";
} else {
    svg = errorSVG;
    statusMessage = "Fail";
}

</script>
<template name="ResultRAIDPart">
    <div class="flex flex-col items-center space-y-7 mt-20 px-6">
        <Image :src="svg"></Image>
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            {{ $t(statusMessage) }}
        </span>
    </div>
    <div class="mt-3 flex justify-center px-6" v-if="context !== 'EnableStorage'">
        <div v-if="resultRAIDInfo.success && resultRAIDInfo.capacity"
            class="max-w-[20.25rem] flex-grow mx-2 bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    {{ $t("Capacity") }} :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ convertSizeToReadable(resultRAIDInfo.capacity) }}
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    {{ $t("Storage") }} :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ selectRAIDStrategy }}
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    {{ $t("Hard drives") }} :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    {{ selectStorageList }}
                </span>
            </div>
        </div>
        <span v-else-if="resultRAIDInfo.messages" class="text-neutral-400 text-sm font-normal font-['Roboto']">
            {{ resultRAIDInfo.messages }}.
        </span>
    </div>
    <div class="flex-grow"></div>
    <div class="space-x-4 flex justify-end h-16 px-6 pb-6 pt-3 shrink-0 border-t-2">
        <Button :label="$t(resultRAIDInfo.btnText)" severity="primary" size="medium" @click="resultRAIDInfo.butFunc"></Button>
    </div>
</template>
