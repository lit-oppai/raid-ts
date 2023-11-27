<script setup lang="ts">
import Image from 'primevue/image';
import errorSVG from "@assets/img/EstablishRAID/error.svg";
import successSVG from "@assets/img/EstablishRAID/success.svg";

const props = defineProps<{
    status: 'success' | 'error';
}>();

let svg: string, statusMessage: string;

if (props.status === 'success') {
    svg = successSVG;
    statusMessage = "Creation Successful";
} else {
    svg = errorSVG;
    statusMessage = "Creation Failed";
}
</script>
<template name="ResultRAIDPart">
    <div class="flex flex-col items-center space-y-7 mt-20">
        <Image :src="svg"></Image>
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            {{ statusMessage }}
        </span>
    </div>
    <div class="mt-3">
        <div v-if="props.status !== 'success'" class="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Capacity :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    4.8TB
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Storage Mode :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    RAID5
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between">
                <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                    Use hard disk :
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    Disk2/Disk3/SSD-ADisk2/Disk3/SSD-A
                </span>
            </div>
        </div>
        <span v-else class="text-neutral-400 text-sm font-normal font-['Roboto']">
            Describe the cause of the user's failure, what caused it and because of what. Describe the cause of the user's
            failure, what caused it and because of what.
        </span>
    </div>
</template>
