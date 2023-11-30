<script setup lang="ts">
import { inject } from "vue";
import Button from "primevue/button";
import { currentStep, currentStepName, stepByStep, context, nameRAID, checkedCreateRAID } from "./controlData.ts";
// import { status } from "./controlView.ts"
import openAPI from "@network/index.ts" 
const dialogRef: any = inject("dialogRef");
console.log(nameRAID, checkedCreateRAID);


const closeDialog = (e: object) => {
    dialogRef.value.close(e);
};

openAPI.raid.createRaid
</script>

<template>
    <div class="space-x-4">
        <!-- step 1 -->
        <Button label="Cancel" severity="neutral" Size="medium" @click="closeDialog" v-show="currentStepName !== 'OverviewPart' && context === 'Modify' && currentStep < 2"></Button>

        <Button label="上一步" severity="neutral" Size="medium" @click="stepByStep('prev')" v-show="context === 'Create' && currentStep > 1 || context === 'Create'"></Button>
        <Button label="下一步" severity="primary" Size="medium" @click="stepByStep('next')"></Button>

        <Button label="创建" severity="primary" Size="medium" @click="stepByStep('next')" v-show="currentStepName === 'ConfirmRAIDPart'" :disabled="!checkedCreateRAID"></Button>
    </div>
</template>
