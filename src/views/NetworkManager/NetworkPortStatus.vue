<script setup lang="ts">
import Image                      from "primevue/image";
import { NPopover }               from "naive-ui";
import questiongSVG               from "@assets/img/ProcessStorageModals/question.svg";
import { convertSpeedToReadable } from "@icewhale/ui-utils";

const activedColor = "#007AE5";
const unactivedColor = "#C0C6CC";
defineProps({
    name: {
        type: String,
        default: "Reatleck GHJAHF-100v",
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
function openWindow() {
    window.open("https://docs.zimaboard.com/docs/Speedlimit.html", "_blank");
}
</script>
<template>
    <NPopover trigger="hover">
        <template #trigger>
            <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                :fill="state ? activedColor : unactivedColor"
                xmlns="http://www.w3.org/2000/svg"
                class="focus:outline-none"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 3.25C7.08579 3.25 6.75 3.58579 6.75 4V5.75H4C3.58579 5.75 3.25 6.08579 3.25 6.5V14C3.25 14.4142 3.58579 14.75 4 14.75H18C18.4142 14.75 18.75 14.4142 18.75 14V6.5C18.75 6.08579 18.4142 5.75 18 5.75H15.25V4C15.25 3.58579 14.9142 3.25 14.5 3.25H7.5ZM16.25 13.25V10C16.25 9.58579 15.9142 9.25 15.5 9.25C15.0858 9.25 14.75 9.58579 14.75 10V13.25H13.25V10C13.25 9.58579 12.9142 9.25 12.5 9.25C12.0858 9.25 11.75 9.58579 11.75 10V13.25H10.25V10C10.25 9.58579 9.91421 9.25 9.5 9.25C9.08579 9.25 8.75 9.58579 8.75 10V13.25H7.25V10C7.25 9.58579 6.91421 9.25 6.5 9.25C6.08579 9.25 5.75 9.58579 5.75 10V13.25H4.75V7.25H7.5C7.91421 7.25 8.25 6.91421 8.25 6.5V4.75H13.75V6.5C13.75 6.91421 14.0858 7.25 14.5 7.25H17.25V13.25H16.25Z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 2C0 0.89543 0.895431 0 2 0H20C21.1046 0 22 0.895431 22 2V16C22 17.1046 21.1046 18 20 18H2C0.89543 18 0 17.1046 0 16V2ZM2 1.5H20C20.2761 1.5 20.5 1.72386 20.5 2V16C20.5 16.2761 20.2761 16.5 20 16.5H2C1.72386 16.5 1.5 16.2761 1.5 16V2C1.5 1.72386 1.72386 1.5 2 1.5Z"
                />
            </svg>
        </template>
        <div class="space-y-1">
            <div class="flex items-center space-x-2">
                <div
                    class="w-1.5 h-1.5 rounded-full"
                    :class="state ? `bg-green-600` : `bg-neutral-300`"
                ></div>
                <div
                    class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-tight"
                >
                    {{ name }}
                </div>
            </div>
            <div class="flex items-center">
                <span
                    class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4"
                >
                    {{ convertSpeedToReadable(negotiatedSpeed) }}
                </span>
                <span
                    class="text-neutral-300 text-xs font-normal font-['Roboto'] leading-4"
                >
                    /{{ convertSpeedToReadable(theoreticalSpeed) }}
                </span>
                <Image
                    :src="questiongSVG"
                    class="h-3 w-3 ml-1 cursor-pointer"
                    @click="openWindow"
                />
            </div>
        </div>
    </NPopover>
</template>
