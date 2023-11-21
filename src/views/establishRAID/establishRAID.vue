<script setup lang="ts">
import OverviewPart from "./OverviewPart.vue";
import SelectRAIDPart from "./SelectRAIDPart.vue";
import ConfirmRAIDPart from "./ConfirmRAIDPart.vue";
import CreatingRAIDPart from "./CreatingRAIDPart.vue";
import ResultRAID from './ResultRAID.vue';
import { currentStep } from "./controlData.ts";
// let currentStep: number = 0;
const steps = [OverviewPart, SelectRAIDPart, ConfirmRAIDPart, CreatingRAIDPart, ResultRAID];
</script>
<template>
    <div class="bg-white">
        <component :is="steps[currentStep]"></component>
        <!-- <OverviewPart v-is="steps[currentStep]"></OverviewPart>
        <SelectRAIDPart v-is="steps[currentStep]"></SelectRAIDPart>
        <ConfirmRAIDPart v-is="steps[currentStep]"></ConfirmRAIDPart>
        <CreatingRAIDPart v-is="steps[currentStep]"></CreatingRAIDPart>
        <ResultRAID status="error" v-is="steps[currentStep]"></ResultRAID> -->
    </div>
</template>
