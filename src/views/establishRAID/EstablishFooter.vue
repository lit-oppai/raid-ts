<script setup lang="ts">
import { inject } from "vue";
import Button from "primevue/button";
import { currentStep, stepByStep } from "./controlData.ts";
import { status } from "./controlView.ts"
const dialogRef: any = inject("dialogRef");

const closeDialog = (e: object) => {
    dialogRef.value.close(e);
};
</script>

<template>
    <div class="space-x-4">
        <!-- step 1 -->
        <Button label="Cancel" severity="neutral" size="small" @click="closeDialog" v-show="status === 'Modify' && currentStep < 2"></Button>

        <Button label="上一步" severity="neutral" size="small" @click="stepByStep('prev')" v-show="currentStep > 1 || status === 'Create'"></Button>
        <Button label="下一步" severity="primary" size="small" @click="stepByStep('next')"></Button>
    </div>
</template>
