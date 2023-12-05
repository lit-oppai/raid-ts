<script setup lang="ts">
import { inject, computed } from "vue";
import Button from "primevue/button";
import { currentStep, currentStepName, stepByStep, resultRAIDInfo, context, nameStorage, checkedCreateRAID, selectRAIDStrategy, selectStorageList, formatePath } from "./controlData.ts";
import { HDDStatus, SSDStatus, reloadServiceData } from "@views/StorageManager/controlData.ts"
import openAPI from "@network/index.ts"
import { RaidBodyRaidLevelEnum } from "@icewhale/zimaos-localstorage-openapi";
import { closeEstablishRAID } from "./controlView";

const pathList = computed(() => {
    return selectStorageList.value.map((item) => {
        return HDDStatus.get(item + '')?.path ?? SSDStatus.get(item + '')?.path ?? '';
    }) ?? [];
})
const createStorage = () => {
    stepByStep('next');
    switch (context.value) {
        case 'CreateStorage':
            createSingleStorage();
            break;
        default:
            createRAID();
            break;
    }
}
const createSingleStorage = () => {
    // openAPI.storage.createStorage({ name: nameStorage.value, path: formatePath.value, format: true }).then((res) => {
    openAPI.storage.createStorage({ name: nameStorage.value, path: '/dev/sdd', format: true }).then((res) => {
        closeEstablishRAID(res);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        stepByStep('next');
    })
}
const createRAID = () => {
    const raidLevel = Number(selectRAIDStrategy.value?.split('RAID')[1]);

    openAPI.raid.createRaid({ devices: pathList.value, name: nameStorage.value, raid_level: raidLevel as unknown as RaidBodyRaidLevelEnum }).then((res) => {
        resultRAIDInfo.capacity = (res.data.array_size ?? 0 - 0) * 1024;
        resultRAIDInfo.btnText = 'Done';
        resultRAIDInfo.success = true;
        resultRAIDInfo.butFunc = () => {
            closeEstablishRAID();
        }
    }).catch((err) => {
        console.log(err);
        resultRAIDInfo.btnText = 'Restart';
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
    }).finally(() => {
        stepByStep('next');
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
        <Button label="Cancel" severity="neutral" size="medium" @click="closeEstablishRAID"
            v-show="currentStepName !== 'OverviewPart' && context === 'Modify' && currentStep < 2"></Button>

        <Button label="上一步" severity="neutral" size="medium" @click="stepByStep('prev')"
            v-show="currentStepName !== 'ResultRAIDPart' && currentStepName !== 'ResultRAIDPart'"></Button>
        <Button label="下一步" severity="primary" size="medium" @click="stepByStep('next')"
            v-show="currentStepName !== 'ConfirmRAIDPart' && currentStepName !== 'ResultRAIDPart'"
            :disabled="checkNextStep"></Button>

        <Button label="创建" severity="primary" size="medium" @click="createStorage"
            v-show="currentStepName === 'ConfirmRAIDPart'"
            :disabled="context !== 'CreateStorage' && selectStorageList.length < 2 || !checkedCreateRAID"></Button>

        <!-- Result Part -->
        <Button :label="resultRAIDInfo.btnText" severity="primary" size="medium" @click="resultRAIDInfo.butFunc"
            v-if="currentStepName === 'ResultRAIDPart'"></Button>
    </div>
</template>
