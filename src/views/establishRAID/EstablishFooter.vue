<script setup lang="ts">
import { inject, computed } from "vue";
import Button from "primevue/button";
import { currentStep, currentStepName, stepByStep, resultRAIDInfo, context, nameRAID, checkedCreateRAID, selectRAIDStrategy, selectStorageList } from "./controlData.ts";
import { HDDStatus, SSDStatus, reloadServiceData } from "@views/StorageManager/controlData.ts"
import openAPI from "@network/index.ts"
import { RaidBodyRaidLevelEnum } from "@icewhale/zimaos-localstorage-openapi";
const dialogRef: any = inject("dialogRef");

const closeDialog = (e?: object) => {
    dialogRef.value.close(e);
};

const pathList = computed(() => {
    return selectStorageList.value.map((item) => {
        return HDDStatus.get(item + '')?.path ?? SSDStatus.get(item + '')?.path ?? '';
    }) ?? [];
})

const createRAID = () => {
    const raidLevel = Number(selectRAIDStrategy.value?.split('RAID')[1]);
    stepByStep('next')
    openAPI.raid.createRaid({ devices: pathList.value, name: nameRAID.value, raid_level: raidLevel as unknown as RaidBodyRaidLevelEnum }).then((res) => {
        // closeDialog(res);
        stepByStep('next')
        resultRAIDInfo.capacity = (res.data.array_size ?? 0 - 0) * 1024;
        resultRAIDInfo.btnText = '开始使用';
        resultRAIDInfo.success = true;
        resultRAIDInfo.butFunc = () => {
            closeDialog();
        }
    }).catch((err) => {
        stepByStep('next')
        console.log(err);
        resultRAIDInfo.btnText = '重新开始';
        resultRAIDInfo.success = false;
        resultRAIDInfo.butFunc = () => {
            // TODO: 直接更改数据不是最佳实践。。。
            stepByStep('prev');
            stepByStep('prev');
            stepByStep('prev');
            //  TODO：选择是否重置
            // TODO： 刷新数据
            reloadServiceData();
        }
    })
}

const checkNextStep = computed<boolean>(() => {
    // 选择RAID 页面
    if (currentStepName.value === 'SelectRAIDPart') {
        switch (selectRAIDStrategy.value) {
            case 'RAID0':
            case 'RAID1':
                return selectStorageList.value.length < 2;
            case 'RAID5':
                return selectStorageList.value.length < 3;
        }
    }
    return false;
})
</script>

<template>
    <div class="space-x-4">
        <!-- step 1 -->
        <Button label="Cancel" severity="neutral" Size="medium" @click="closeDialog"
            v-show="currentStepName !== 'OverviewPart' && context === 'Modify' && currentStep < 2"></Button>

        <Button label="上一步" severity="neutral" Size="medium" @click="stepByStep('prev')"
            v-show="currentStepName !== 'ResultRAIDPart' && currentStepName !== 'ResultRAIDPart'"></Button>
        <Button label="下一步" severity="primary" Size="medium" @click="stepByStep('next')"
            v-show="currentStepName !== 'ConfirmRAIDPart' && currentStepName !== 'ResultRAIDPart'"
            :disabled="checkNextStep"></Button>

        <Button label="创建" severity="primary" Size="medium" @click="createRAID"
            v-show="currentStepName === 'ConfirmRAIDPart'"
            :disabled="(selectStorageList.length < 2 || !checkedCreateRAID)"></Button>

        <!-- Result Part -->
        <Button :label="resultRAIDInfo.btnText" severity="primary" Size="medium" @click="resultRAIDInfo.butFunc"
            v-if="currentStepName === 'ResultRAIDPart'"></Button>
    </div>
</template>
