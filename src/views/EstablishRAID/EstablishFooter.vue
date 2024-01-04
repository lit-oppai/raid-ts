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
import { useRouter } from "vue-router";
const router = useRouter();

const pathList = computed(() => {
    return (
        selectStorageList.value.map((item) => {
            return HDDStatus.get(item + "")?.path ?? SSDStatus.get(item + "")?.path ?? "";
        }) ?? []
    );
});

const createStorage = nameStorageHandleSubmit(
    () => {
        // onSuccess.
        stepByStep("next");
        switch (context.value) {
            case "CreateStorage":
                createSingleStorage();
                break;
            default:
                createRAID();
                break;
        }
    },
    ({ errors }) => {
        alert(errors.NameStorageSchema);
    }
);
import { loadAllNewDiskStatus } from "@views/DiscoverNewHardDrive/controlData.ts";
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
            resultRAIDInfo.messages = err.response?.data?.message ?? "";
        })
        .finally(() => {
            stepByStep("next");
            resultRAIDInfo.butFunc = () => {
                reloadServiceData();
                loadAllNewDiskStatus();
                closeEstablishRAID();
            };
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
            resultRAIDInfo.messages = err.response?.data?.message ?? "";
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
                // reloadServiceData();
                closeEstablishRAID();
                router.push("/storage");
            };
        })
        .catch((err) => {
            console.log(err);
            resultRAIDInfo.btnText = "Restart";
            resultRAIDInfo.success = false;
            resultRAIDInfo.messages = err.response?.data?.message ?? "";
            resultRAIDInfo.butFunc = () => {
                // reloadServiceData();
                // TODO: 直接更改数据不是最佳实践。。。
                stepByStep("prev");
                stepByStep("prev");
                stepByStep("prev");
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
                // reloadServiceData();
                closeEstablishRAID();
                router.push("/storage");
            };
        })
        .catch((err) => {
            console.log(err);
            resultRAIDInfo.btnText = "Restart";
            resultRAIDInfo.success = false;
            resultRAIDInfo.messages = err.response?.data?.message ?? "";
            resultRAIDInfo.butFunc = () => {
                // reloadServiceData();
                // TODO: 直接更改数据不是最佳实践。。。
                stepByStep("prev");
                stepByStep("prev");
                stepByStep("prev");
            };
        })
        .finally(() => {
            stepByStep("next");
        });
};

// First Aid
import { isExitNewDisk } from "@views/EstablishRAID/controlData.ts";

// nameStorage validate.
import { nameStorageHandleSubmit } from "@views/EstablishRAID/controlData.ts";

function showPreviousButton() {
    // 选择RAID 页面
    if(context.value === 'Modify' && currentStepName.value === 'SelectRAIDPart') {
        return false;
    }
    if (context.value === 'CreateStorage' && currentStepName.value === 'ConfirmRAIDPart') {
        return false;
    }
    if (context.value !== "FirstAid" && currentStepName.value !== "ResultRAIDPart") {
        return true;
    }
}
</script>

<template>
    <div class="space-x-4">
        <!-- step 1 -->
        <Button :label="$t('Cancel')" severity="neutral" size="medium" @click="closeEstablishRAID" v-show="context !== 'FirstAid' &&
            currentStepName !== 'OverviewPart' &&
            context === 'Modify' &&
            currentStep < 2
            "></Button>

        <Button :label="$t('Previous')" severity="neutral" size="medium" @click="stepByStep('prev')" v-show="showPreviousButton()"></Button>
        <Button :label="$t('Next')" severity="primary" size="medium" @click="stepByStep('next')" v-show="context !== 'FirstAid' &&
            currentStepName !== 'ConfirmRAIDPart' &&
            currentStepName !== 'ResultRAIDPart'
            " :disabled="checkNextStep"></Button>

        <Button :label="$t('Create')" severity="primary" size="medium" @click="createStorage" v-show="context !== 'FirstAid' &&
            context !== 'Modify' &&
            currentStepName === 'ConfirmRAIDPart'
            " :disabled="(context !== 'CreateStorage' && selectStorageList.length < 2) ||
        !checkedCreateRAID
        "></Button>

        <!-- Result Part -->
        <Button :label="$t(resultRAIDInfo.btnText)" severity="primary" size="medium" @click="resultRAIDInfo.butFunc"
            v-show="currentStepName !== 'AddToRAIDPart' && currentStepName === 'ResultRAIDPart'"></Button>

        <!-- First Aid Part -->
        <Button :label="$t('Add')" severity="primary" size="medium" @click="stepByStep('next')"
            v-show="currentStepName === 'AddToRAIDPart' && isExitNewDisk" :disabled="!selectedFidDisk"></Button>
        <Button :label="$t('Confirm')" severity="primary" size="medium" @click="confirmFirstAid" v-show="context === 'FirstAid' && currentStepName === 'ConfirmRAIDPart' && isExitNewDisk
            " :disabled="!checkedCreateRAID"></Button>
        <Button :label="$t('Close')" severity="primary" size="medium" @click="closeEstablishRAID" v-show="context === 'FirstAid' && currentStepName === 'AddToRAIDPart' && !isExitNewDisk
            "></Button>

        <!-- extened capacity -->
        <Button :label="$t('Confirm')" severity="primary" size="medium" @click="extendCapacity"
            v-show="context === 'Modify' && currentStepName === 'ConfirmRAIDPart'" :disabled="!checkedCreateRAID"></Button>
    </div>
</template>
