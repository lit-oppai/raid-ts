<script setup lang="ts">
import { inject } from "vue";
import { currentStep } from "./controlData.ts";
const dialogRef: any = inject("dialogRef");

const closeDialog = (e: object) => {
    dialogRef.value.close(e);
};
type Orientation = "next" | "prev";
// 一步一步的
const stepByStep = (orientation: Orientation) => {
    switch (orientation) {
        case "next":
            currentStep.value++;
            break;
        case "prev":
            currentStep.value--;
            break;
        default:
            break;
    }
};
</script>

<template>
    <div class="space-x-4">
        <button class="h-7 bg-sky-600 rounded-[14px] px-[14px]" @click="stepByStep('prev')">
            <span class="text-white text-sm font-normal font-['Roboto'] leading-5">上一步</span>
        </button>
        <button class="h-7 bg-sky-600 rounded-[14px] px-[14px]" @click="stepByStep('next')">
            <span class="text-white text-sm font-normal font-['Roboto'] leading-5">下一步</span>
        </button>
    </div>
</template>
