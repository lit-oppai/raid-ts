<script setup lang="ts">
import { ref, Ref, onMounted, computed } from "vue";
import Button from "primevue/button";
import {
    nameStorage,
    nameStorageAttrs,
    displayNameStorage,
    selectRAIDStrategy,
    checkedCreateRAID,
    context,
    stepByStep,
    currentStep,
    resultRAIDInfo,
    selectStorageList,
    formatePath,
} from "./controlData.ts";
import {
    HDDStatus,
    SSDStatus,
    storageNameCollection,
    reloadServiceData,
} from "@views/StorageManager/controlData.ts";
import { closeEstablishRAID } from "./controlView";
import { loadAllNewDiskStatus } from "@views/DiscoverNewHardDrive/controlData.ts";
import { useRouter } from "vue-router";
const router = useRouter();

if (context.value === "Create" && selectRAIDStrategy.value !== "") {
    nameStorage.value = storageNameCollection.beNamed(selectRAIDStrategy.value);
}
const nameRef: Ref<HTMLInputElement | null> = ref(null);
// 在组件挂载时调用selectText()方法选中文本
onMounted(() => {
    selectText();
});

const pathList = computed(() => {
    return (
        selectStorageList.value.map((item) => {
            return HDDStatus.get(item + "")?.path ?? SSDStatus.get(item + "")?.path ?? "";
        }) ?? []
    );
});

function selectText(): void {
    const inputElement = nameRef.value;
    inputElement?.select();
}

import openAPI from "@network/index.ts";
import { RaidBodyRaidLevelEnum } from "@icewhale/zimaos-localstorage-openapi";
// nameStorage validate.
import { nameStorageHandleSubmit } from "@views/EstablishRAID/controlData.ts";
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
                router.go(-1);
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

// First Aid
// import { isExitNewDisk } from "@views/EstablishRAID/controlData.ts";
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

//
let nextStepLabelButton: string, nextStepLabelButtonHandle: () => void;

switch (context.value) {
    case "Create":
    case "CreateStorage":
        nextStepLabelButton = "Create";
        nextStepLabelButtonHandle = createStorage;
        break;
    case "FirstAid":
        nextStepLabelButton = "Confirm";
        nextStepLabelButtonHandle = confirmFirstAid;
        break;
    case "Modify":
        nextStepLabelButton = "Confirm";
        nextStepLabelButtonHandle = extendCapacity;
        break;
    default:
        nextStepLabelButton = "Create";
        break;
}
</script>
<template>
    <div class="flex-grow flex flex-col justify-start mt-6 space-y-4 mx-6">
        <!-- AddToRAIDPart not show. -->
        <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 pt-[2px] grid grid-cols-2"
            v-show="context !== 'FirstAid' && context !== 'Modify' && displayNameStorage">
            <div class="mt-4 mb-10">
                <span v-t="`ConfirmRAIDPART.labelNameInput.${context}`"
                    class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    <!-- {{ $t(labelNameInput) }} -->
                </span>
            </div>
            <div class="mr-2 mt-3 flex flex-col space-y-[6px]">
                <input ref="nameRef" id="name" v-model="nameStorage" v-bind="nameStorageAttrs" autocomplete="Main-Storage"
                    type="text" force
                    class="selection:bg-sky-100 bg-white h-[20px] px-3 py-1.5 rounded box-content border border-zinc-200 hover:border-sky-600 active:border-sky-600 focus-visible:border-sky-600 outline-none text-sky-600 text-sm font-normal font-['Roboto']" />

                <span v-t="`ConfirmRAIDPART.noteNameInput`" class="text-neutral-400 text-xs font-normal font-['Roboto']">
                    <!-- {{ $t("The name can not be changed after this step.") }} -->
                </span>
            </div>
        </div>
        <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 py-8">
            <div>
                <span v-t="`ConfirmRAIDPART.titleUserAgreement.${context}`"
                    class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    <!-- Starting RAID creation -->
                </span>
            </div>
            <div class="text-neutral-400 text-sm font-normal font-['Roboto'] mt-3">
                <span v-t="`ConfirmRAIDPART.contentUserAgreement1.${context}`">
                    <!-- Creating a RAID array will initialize the selected hard drive, -->
                </span>
                <span v-t="`ConfirmRAIDPART.contentUserAgreement2.${context}`"
                    class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    <!-- and all files on the hard drive will be deleted and cannot be recovered. -->
                </span>
                <span v-t="`ConfirmRAIDPART.contentUserAgreement3`">
                    <!-- Please back up important files on the hard drive in advance. During this
                    process, do not disconnect the hard drive or turn off the computer to avoid
                    damaging the system. -->
                </span>
            </div>
            <div class="flex justify-end items-center mt-16">
                <input name="confirm" type="checkbox" v-model="checkedCreateRAID" style="color-scheme: none"
                    class="mr-2 w-5 h-5 bg-white cursor-pointer" />
                <span v-t="`ConfirmRAIDPART.signUserAgreement`" class="text-zinc-800 text-sm font-normal font-['Roboto']">
                    <!-- {{ $t("I am aware of this and confirm the operation.") }} -->
                </span>
            </div>
        </div>
    </div>
    <div class="space-x-4 flex justify-end h-16 px-6 pb-6 pt-3 shrink-0 border-t-2">
        <Button :label="$t('Previous')" severity="neutral" size="medium" @click="stepByStep('prev')" v-show="currentStep > 0"></Button>
        <Button :label="$t(nextStepLabelButton)" severity="primary" size="medium" @click="nextStepLabelButtonHandle"
            :disabled="!checkedCreateRAID"></Button>
    </div>
</template>
<style></style>
