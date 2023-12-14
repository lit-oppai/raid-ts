<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import {
    currentStep,
    currentStepName,
    stepByStep,
    resultRAIDInfo,
    context,
    nameStorage,
    checkedCreateRAID,
    selectRAIDStrategy,
    selectStorageList,
    formatePath,
} from "./controlData.ts";
import {
    HDDStatus,
    SSDStatus,
    reloadServiceData,
} from "@views/StorageManager/controlData.ts";
import openAPI from "@network/index.ts";
import { RaidBodyRaidLevelEnum } from "@icewhale/zimaos-localstorage-openapi";
import { closeEstablishRAID } from "./controlView";

const pathList = computed(() => {
    return (
        selectStorageList.value.map((item) => {
            return HDDStatus.get(item + "")?.path ?? SSDStatus.get(item + "")?.path ?? "";
        }) ?? []
    );
});
const createStorage = () => {
    stepByStep("next");
    switch (context.value) {
        case "CreateStorage":
            createSingleStorage();
            break;
        default:
            createRAID();
            break;
    }
};
const createSingleStorage = () => {
    // openAPI.storage.createStorage({ name: nameStorage.value, path: formatePath.value, format: true }).then((res) => {
    openAPI.storage
        .createStorage({ name: nameStorage.value, path: formatePath.value, format: true })
        .then((res) => {
            if (res.status === 200) {
                resultRAIDInfo.success = true;
                resultRAIDInfo.btnText = "Done";
            } else {
                resultRAIDInfo.success = false;
                resultRAIDInfo.btnText = "Restart";
            }
        })
        .catch((err) => {
            console.log(err);
            resultRAIDInfo.success = false;
            resultRAIDInfo.btnText = "Restart";
            resultRAIDInfo.messages = err.data?.message ?? "";
        })
        .finally(() => {
            stepByStep("next");
            resultRAIDInfo.butFunc = () => {
                reloadServiceData();
                closeEstablishRAID;
            } 
        });
};
const createRAID = () => {
    const raidLevel = Number(selectRAIDStrategy.value?.split("RAID")[1]);

    openAPI.raid
        .createRaid({
            devices: pathList.value,
            name: nameStorage.value,
            raid_level: (raidLevel as unknown) as RaidBodyRaidLevelEnum,
        })
        .then((res) => {
            resultRAIDInfo.capacity = (res.data.size ?? 0 - 0) * 1024;
            resultRAIDInfo.btnText = "Done";
            resultRAIDInfo.success = true;
            resultRAIDInfo.butFunc = () => {
                closeEstablishRAID();
            };
        })
        .catch((err) => {
            console.log(err);
            resultRAIDInfo.btnText = "Restart";
            resultRAIDInfo.success = false;
            resultRAIDInfo.messages = err.data?.message ?? "";
            resultRAIDInfo.butFunc = () => {
                // TODO: 直接更改数据不是最佳实践。。。
                stepByStep("prev");
                stepByStep("prev");
                stepByStep("prev");
                //  TODO：选择是否重置
                // TODO： 刷新数据
                reloadServiceData();
            };
        })
        .finally(() => {
            stepByStep("next");
        });
};

// extened capacity
import { diskListByStorageSpace } from "@views/EstablishRAID/controlData.ts";

const checkNextStep = computed<boolean>(() => {
    // 选择RAID 页面
    if (currentStepName.value === "SelectRAIDPart") {
        switch (selectRAIDStrategy.value) {
            case "RAID0":
            case "RAID1":
                return selectStorageList.value.length < 2;
            case "RAID5":
                return diskListByStorageSpace.value.length
                    ? selectStorageList.value.length < 1
                    : selectStorageList.value.length < 3;
        }
    }
    return false;
});

// First Aid
import { selectedFidDisk, needFirstAidRaid } from "@views/EstablishRAID/controlData.ts";
const confirmFirstAid = () => {
    stepByStep("next");
    openAPI.raid
        .updateRaid({
            devices: [selectedFidDisk.value as string],
            path: needFirstAidRaid.value,
            action: "add",
        })
        .then((res) => {
            resultRAIDInfo.capacity = (res.data.size ?? 0 - 0) * 1024;
            resultRAIDInfo.btnText = "Done";
            resultRAIDInfo.success = true;
            resultRAIDInfo.butFunc = () => {
                reloadServiceData();
                closeEstablishRAID();
            };
        })
        .catch((err) => {
            console.log(err);
            resultRAIDInfo.btnText = "Restart";
            resultRAIDInfo.success = false;
            resultRAIDInfo.butFunc = () => {
                reloadServiceData();
                closeEstablishRAID();
            };
        })
        .finally(() => {
            stepByStep("next");
        });
};

// extened capacity
import { extendRaidPath } from "@views/EstablishRAID/controlData.ts";
const extendCapacity = () => {
    stepByStep("next");
    openAPI.raid
        .updateRaid({
            devices: pathList.value,
            path: extendRaidPath.value ?? "",
            action: "add",
        })
        .then((res) => {
            resultRAIDInfo.capacity = (res.data.size ?? 0 - 0) * 1024;
            resultRAIDInfo.btnText = "Done";
            resultRAIDInfo.success = true;
            resultRAIDInfo.butFunc = () => {
                reloadServiceData();
                closeEstablishRAID();
            };
        })
        .catch((err) => {
            console.log(err);
            resultRAIDInfo.btnText = "Restart";
            resultRAIDInfo.success = false;
            resultRAIDInfo.butFunc = () => {
                reloadServiceData();
                closeEstablishRAID();
            };
        })
        .finally(() => {
            stepByStep("next");
        });
};
</script>

<template>
    <div class="space-x-4">
        <!-- step 1 -->
        <Button label="Cancel" severity="neutral" size="medium" @click="closeEstablishRAID" v-show="context !== 'FirstAid' &&
            currentStepName !== 'OverviewPart' &&
            context === 'Modify' &&
            currentStep < 2
            "></Button>

        <Button label="Previous" severity="neutral" size="medium" @click="stepByStep('prev')" v-show="context !== 'FirstAid' &&
            currentStepName !== 'ResultRAIDPart' &&
            currentStepName !== 'ResultRAIDPart' &&
            context === 'Modify' &&
            currentStepName !== 'SelectRAIDPart'
            "></Button>
        <Button label="Next" severity="primary" size="medium" @click="stepByStep('next')" v-show="context !== 'FirstAid' &&
            currentStepName !== 'ConfirmRAIDPart' &&
            currentStepName !== 'ResultRAIDPart'
            " :disabled="checkNextStep"></Button>

        <Button label="创建" severity="primary" size="medium" @click="createStorage" v-show="context !== 'FirstAid' &&
            context !== 'Modify' &&
            currentStepName === 'ConfirmRAIDPart'
            " :disabled="(context !== 'CreateStorage' && selectStorageList.length < 2) ||
        !checkedCreateRAID
        "></Button>

        <!-- Result Part -->
        <Button :label="resultRAIDInfo.btnText" severity="primary" size="medium" @click="resultRAIDInfo.butFunc"
            v-show="currentStepName !== 'AddToRAIDPart' && currentStepName === 'ResultRAIDPart'"></Button>

        <!-- First Aid Part -->
        <Button label="Add" severity="primary" size="medium" @click="stepByStep('next')"
            v-show="currentStepName === 'AddToRAIDPart'" :disabled="!selectedFidDisk"></Button>
        <Button label="Confirm" severity="primary" size="medium" @click="confirmFirstAid"
            v-show="context === 'FirstAid' && currentStepName === 'ConfirmRAIDPart'"
            :disabled="!checkedCreateRAID"></Button>

        <!-- extened capacity -->
        <Button label="Confirm" severity="primary" size="medium" @click="extendCapacity"
            v-show="context === 'Modify' && currentStepName === 'ConfirmRAIDPart'" :disabled="!checkedCreateRAID"></Button>
    </div>
</template>
