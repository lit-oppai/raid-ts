<script setup lang="ts">
import { NPopover } from "naive-ui";
const activedColor = "#007AE5";
const unactivedColor = "#C0C6CC";
defineProps({
    state: {
        type: Boolean,
        default: false,
    },
    // negotiatedSpeed: {
    //     type: Number,
    //     default: 0,
    // },
    theoreticalSpeed: {
        type: Number,
        default: '--',
    },
});
</script>
<template>
    <NPopover trigger="hover">
        <template #trigger>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="focus:outline-none">
                <rect x="0.5" y="0.5" width="15" height="7" rx="3.5" :stroke="state ? activedColor : unactivedColor" />
                <rect x="3" y="2.5" width="10" height="3" rx="1.5" :fill="state ? activedColor : unactivedColor" />
            </svg>
        </template>
        <div class="space-y-1">
            <div class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <div class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-tight" v-t="`Thunderbolt`"></div>
            </div>
            <div class="text-neutral-300 text-xs font-normal font-['Roboto'] leading-4">
                {{ theoreticalSpeed }}
            </div>
        </div>
    </NPopover>
</template>
