<script setup lang="ts">
import Image from 'primevue/image';
import questionSVG from '@assets/img/EstablishRAID/question.svg';
</script>
<template>
    <div class="px-4 py-6 space-y-4 bg-gray-50 rounded-lg">
        <div class="flex items-center">
            <span class="flex-grow">RAID0</span>
            <Image :src="questionSVG" class="flex-shrink"></Image>
        </div>
        <!-- 对比部分 -->
        <div class="py-2">
            <div>
                <span class="text-zinc-800 text-xs font-medium font-['Roboto']">
                    Security
                </span>
            </div>
            <div class="flex space-x-1">
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px]"></div>
                <div class="flex-grow h-[3px] opacity-20 bg-sky-600 rounded-[1px]"></div>
                <div class="flex-grow h-[3px] opacity-20 bg-sky-600 rounded-[1px]"></div>
                <div class="flex-grow h-[3px] opacity-20 bg-sky-600 rounded-[1px]"></div>
            </div>
            <div class="mt-4">
                <span class="text-zinc-800 text-xs font-medium font-['Roboto']">
                    Speed
                </span>
            </div>
            <div class="flex space-x-1">
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px]"></div>
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px]"></div>
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px]"></div>
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px]"></div>
            </div>
        </div>
        <!-- 要求部分 -->
        <div class="w-full h-px bg-gray-200"></div>
        <div class="flex justify-between">
            <span class="text-zinc-800 text-xs font-medium font-['Roboto']">
                Max capacity
            </span>
            <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                100%
            </span>
        </div>
        <div class="w-full h-px bg-gray-200"></div>
        <div class="flex justify-between">
            <span class="text-zinc-800 text-xs font-medium font-['Roboto']">
                Min disks
            </span>
            <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                1
            </span>
        </div>
    </div>
</template>
