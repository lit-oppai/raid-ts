<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import {
    nameStorage,
    nameStorageAttrs,
    selectRAIDStrategy,
    checkedCreateRAID,
    context,
} from "./controlData.ts";
import { storageNameCollection } from "@views/StorageManager/controlData.ts";
if (context.value === "Create" && selectRAIDStrategy.value !== "") {
    nameStorage.value = storageNameCollection.beNamed(selectRAIDStrategy.value);
}
const nameRef: Ref<HTMLInputElement | null> = ref(null);
// 在组件挂载时调用selectText()方法选中文本
onMounted(() => {
    selectText();
});

function selectText(): void {
    const inputElement = nameRef.value;
    inputElement?.select();
}

</script>
<template>
    <div class="w-full flex flex-col justify-center mt-6 space-y-4">
        <!-- AddToRAIDPart not show. -->
        <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 pt-[2px] grid grid-cols-2"
            v-show="context !== 'FirstAid' && context !== 'Modify'">
            <div class="mt-4 mb-10">
                <span v-t="`ConfirmRAIDPART.labelNameInput.${context}`"
                    class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    <!-- {{ $t(labelNameInput) }} -->
                </span>
            </div>
            <div class="mr-2 mt-3 flex flex-col space-y-[6px]">
                <input ref="nameRef" id="name" v-model="nameStorage" v-bind="nameStorageAttrs"  autocomplete="Main-Storage" type="text" force
                    class="selection:bg-sky-100 h-[20px] px-3 py-1.5 rounded box-content border border-zinc-200 hover:border-sky-600 active:border-sky-600 focus-visible:border-sky-600 outline-none text-sky-600 text-sm font-normal font-['Roboto']" />

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
                <span v-t="`ConfirmRAIDPART.contentUserAgreement2.${context}`" class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    <!-- and all files on the hard drive will be deleted and cannot be recovered. -->
                </span>
                <span v-t="`ConfirmRAIDPART.contentUserAgreement3`">
                    <!-- Please back up important files on the hard drive in advance. During this
                    process, do not disconnect the hard drive or turn off the computer to avoid
                    damaging the system. -->
                </span>
            </div>
            <div class="flex justify-end items-center mt-16">
                <input name="confirm" type="checkbox" v-model="checkedCreateRAID" class="mr-2 w-5 h-5 cursor-pointer" />
                <span v-t="`ConfirmRAIDPART.signUserAgreement`" class="text-zinc-800 text-sm font-normal font-['Roboto']">
                    <!-- {{ $t("I am aware of this and confirm the operation.") }} -->
                </span>
            </div>
        </div>
    </div>
</template>
<style></style>
