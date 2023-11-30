<script setup lang="ts">
import { inject, computed } from "vue";
import Button from "primevue/button";
import { currentStep, currentStepName, stepByStep, context, nameRAID, checkedCreateRAID, selectRAIDStrategy, selectStorageList } from "./controlData.ts";
import { HDDStatus, SSDStatus } from "@views/StorageManager/controlData.ts"
import openAPI from "@network/index.ts"
import { RaidBodyRaidLevelEnum } from "@icewhale/zimaos-localstorage-openapi";
const dialogRef: any = inject("dialogRef");

const closeDialog = (e: object) => {
    dialogRef.value.close(e);
};

const pathList = computed(() => {
    return selectStorageList.value.map((item) => {
        return HDDStatus.get(item + '')?.path ?? SSDStatus.get(item + '')?.path ?? '';
    }) ?? [];
})

const createRAID = () => {
    const raidLevel = Number(selectRAIDStrategy.value?.split('RAID')[1]);

    openAPI.raid.createRaid({ devices: pathList.value, name: nameRAID.value, raid_level: raidLevel as unknown as RaidBodyRaidLevelEnum });
    stepByStep('next')
}
</script>

<template>
    <div class="space-x-4">
        <!-- step 1 -->
        <Button label="Cancel" severity="neutral" Size="medium" @click="closeDialog"
            v-show="currentStepName !== 'OverviewPart' && context === 'Modify' && currentStep < 2"></Button>

        <Button label="上一步" severity="neutral" Size="medium" @click="stepByStep('prev')"
            v-show="context === 'Create' && currentStep > 1 || context === 'Create'"></Button>
        <Button label="下一步" severity="primary" Size="medium" @click="stepByStep('next')"></Button>

        <Button label="创建" severity="primary" Size="medium" @click="createRAID"
            v-show="currentStepName === 'ConfirmRAIDPart'"
            :disabled="(selectStorageList.length < 2 || !checkedCreateRAID)"></Button>
    </div>
</template>
