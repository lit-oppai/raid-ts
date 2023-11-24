<script setup lang="ts">
import { currentStep, stepschain } from "./controlData.ts";
</script>
<template>
    <component :is="stepschain[currentStep]"></component>
</template>
