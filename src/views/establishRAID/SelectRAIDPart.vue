<script setup lang="ts">
import { ref } from 'vue';
import { RAIDStrategy } from './controlData.d';
import { SSDStatus, HDDStatus } from '@views/StorageManager/controlData.ts';
import SelectStrategy from './SelectStrategy.vue';
// const list = typeof RAIDStrategy
const strategies: RAIDStrategy[] = ['RAID0', 'RAID1', 'RAID5'];
// const allDiskTemp = new Map([...SSDStatus, ...HDDStatus]);
const sortedArray = Array.from(new Map([...SSDStatus, ...HDDStatus])).sort((a, b) => a[0] > b[0] ? 1 : -1);
const allDiskStatus = new Map(sortedArray);
// 不可选
const storageDisabled: (number | string)[] = [];
// const storageDisabledMap = new Map();
// 选中
const storageSelected = ref<(number | string)[]>([]);
// 可选
const storageSelectable: (number | string)[] = [];
// 无硬盘
const storageNone: (number | string)[] = [];

for (let [key, item] of allDiskStatus) {
    // 不可选
    if (!item.avail) {
        // storageDisabled.set(key, item);
        storageNone.push(key);
    }else if(false){
        storageSelected.value.push(key);
    } else if (!item.health) {
        storageDisabled.push(key);
    }else{
        storageSelectable.push(key);
    }
}
</script>

<template name="SelectRAIDPart">
    <!-- 外框布局 -->
    <div class="space-y-6">
        <!-- select strategy -->
        <!-- TODO：此处有判断逻辑 -->
        <div class="mt-6 flex space-x-4"  v-if="true">
            <SelectStrategy v-for="strategy in strategies" :key="strategy" :strategy="strategy"></SelectStrategy>
        </div>
        <!-- Please select the desired hard disk -->
        <div>
            <div class="mb-2">
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Please select the desired hard disk
                </span>
            </div>

            <div class="flex space-x-2">
                <template v-for="[key, item] in allDiskStatus" :key="key">
                    <input :disabled="storageDisabled.includes(key as number) || storageNone.includes(key as string)"
                        type="checkbox" class="hidden" :id="`check${key}`" :value="key" v-model="storageSelected">
                    <label :for="`check${key}`" :class="{
                        'bg-gray-50 opacity-50': storageNone.includes(key as string),
                        'bg-gray-50': storageDisabled.includes(key as number),
                        'bg-slate-50 text-sky-600 cursor-pointer': storageSelectable.includes(key) && !storageSelected.includes(key),
                        'bg-sky-600 text-white cursor-pointer': storageSelected.includes(key),
                    }" class="h-20 flex-grow rounded-md flex flex-col items-center justify-around">
                        <span class="text-center text-base font-semibold font-['Roboto']">
                            {{ key }}
                        </span>
                        <span class="text-center text-xs font-normal font-['Roboto']">
                            RAID5
                        </span>
                    </label>
                </template>
            </div>

            <div class="flex flex-col space-y-1 mt-4">
                <template v-for="key in storageSelected" :key="key">
                    <div class="flex items-center h-10 bg-gray-50 rounded-md pr-4">
                        <span class="ml-1 w-[34px] text-center">
                            {{ key }}
                        </span>
                        <span class="mx-2">
                            name
                        </span>
                        <span class="flex-grow text-neutral-400 text-xs font-normal font-['Roboto']">
                            Type
                        </span>
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                            Total 245GB/
                        </span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto']">
                            Surplus 110.5GB
                        </span>
                    </div>
                </template>

            </div>
        </div>
        <!-- Usage estimate -->
        <div>
            <div class="mb-2 flex justify-between">
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Usage estimate
                </span>
                <div>
                    <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']">
                        可用
                    </span>
                    <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                        213GB
                    </span>
                </div>
            </div>

            <div class="flex rounded-sm overflow-hidden">
                <span class="h-2 bg-emerald-400 w-[20%]"></span>
                <span class="h-2 bg-amber-500 w-[20%]"></span>
                <span class="h-2 bg-orange-500 w-[60%]"></span>
            </div>

            <div class="flex space-x-4">
                <div class="space-x-1">
                    <span class="bg-emerald-400 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">预计可用容量</span>
                </div>
                <div class="space-x-1 flex-grow">
                    <span class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">预计不可用容量</span>
                </div>
                <div>
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                        RAID5
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
./controlData
