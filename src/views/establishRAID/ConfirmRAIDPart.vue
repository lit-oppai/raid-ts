<script setup lang="ts">
import { ref, Ref, onMounted, computed } from "vue";
import { nameStorage, checkedCreateRAID, context } from "./controlData.ts";
// const checked = ref(false)

// const name = ref('Main-Storage')
const nameRef: Ref<HTMLInputElement | null> = ref(null);
// 在组件挂载时调用selectText()方法选中文本
onMounted(() => {
    selectText();
});

function selectText(): void {
    const inputElement = nameRef.value;
    inputElement?.select();
}

const textName = computed(() => {
    return context.value === "CreateStorage" ? "Name Storage" : "Name RAID storage";
});
</script>
<template>
    <div class="w-full flex flex-col justify-center mt-6 space-y-4">
        <!-- AddToRAIDPart not show. -->
        <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 pt-[2px] grid grid-cols-2"
            v-show="context !== 'FirstAid'">
            <div class="mt-4 mb-10">
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    {{ textName }}
                </span>
            </div>
            <div class="mr-2 mt-3 flex flex-col space-y-[6px]">
                <input ref="nameRef" id="name" v-model="nameStorage" autocomplete="Main-Storage" type="text" force
                    class="selection:bg-sky-100 h-[20px] px-3 py-1.5 rounded box-content border border-zinc-200 hover:border-sky-600 active:border-sky-600 focus-visible:border-sky-600 outline-none text-sky-600 text-sm font-normal font-['Roboto']" />

                <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                    The name cannot be changed after this step.
                </span>
            </div>
        </div>
        <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 py-8">
            <div>
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Starting RAID creation
                </span>
            </div>
            <div class="text-neutral-400 text-sm font-normal font-['Roboto'] mt-3">
                <span> Creating a RAID array will initialize the selected hard drive, </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    and all files on the hard drive will be deleted and cannot be recovered.
                </span>
                <span>
                    Please back up important files on the hard drive in advance. During this
                    process, do not disconnect the hard drive or turn off the computer to avoid
                    damaging the system.
                </span>
            </div>
            <div class="flex justify-end items-center mt-16">
                <input name="confirm" type="checkbox" v-model="checkedCreateRAID" class="mr-2 w-5 h-5 cursor-pointer" />
                <span class="text-zinc-800 text-sm font-normal font-['Roboto']">
                    I am aware of this and confirm the operation.
                </span>
            </div>
        </div>
    </div>
</template>
<style></style>
