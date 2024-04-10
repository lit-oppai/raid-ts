<script setup lang="ts">
import { onBeforeUnmount }                from "vue";
import { currentStep, stepschain, clear } from "./controlData.ts";
onBeforeUnmount(() => {
    clear();
});
</script>
<template>
    <component :is="stepschain[currentStep]"></component>
</template>
