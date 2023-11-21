<script setup lang="ts">
import { NPopover } from 'naive-ui';
import Image from 'primevue/image';
import questionSVG from '@assets/img/EstablishRAID/question.svg';
import recommendSVG from '@assets/img/EstablishRAID/recommend.svg';
</script>
<template>
    <div class="px-4 py-6 space-y-4 bg-gray-50 rounded-lg">
        <div class="flex items-center">
            <span>RAID0</span>
            <Image :src="recommendSVG" class="ml-1"></Image>
            <span class="flex-grow"></span>
            <NPopover trigger="click" placement="bottom">
                <template #trigger>
                    <Image :src="questionSVG" class="flex-shrink"></Image>
                </template>
                <div class="max-w-[156px]">
                    <!-- 头部 -->
                    <div class="flex justify-between items-center">
                        <span class="text-slate-800 text-base font-semibold font-['Roboto']">
                            Clarification
                        </span>
                        <i class="casa-close-outline"></i>
                    </div>
                    <!-- 内容 -->
                    <div class="max-h-[162px] scrollbar-container">
                        RAID 5 utilizes striping and parity-checking technology, distributing data across multiple hard
                        drives and using parity for redundancy. In case of drive failure, data can be recovered from the
                        remaining drives and parity information.
                    </div>
                </div>
            </NPopover>
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
<style lang="css">
/* 未起作用 */
/* 滚动条容器的样式 */
.scrollbar-container {
    overflow-y: scroll;
    /* 添加纵向滚动条 */
    scrollbar-width: thin;
    /* 定义滚动条宽度 */
    scrollbar-color: rgba(207, 207, 207, 0.5) transparent;
    /* 定义滚动条颜色 */
}

/* 定义滚动条轨道的样式 */
.scrollbar-container::-webkit-scrollbar-track {
    background-color: transparent;
    /* 设置轨道背景为透明 */
}

/* 定义滚动条滑块的样式 */
.scrollbar-container::-webkit-scrollbar-thumb {
    background-color: rgba(207, 207, 207, 0.5);
    /* 设置滑块颜色 */
    border-radius: 10px;
    /* 设置滑块圆角 */
}

/* 鼠标悬浮在滚动条上的样式 */
.scrollbar-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(207, 207, 207, 0.8);
    /* 设置滑块悬浮时的颜色 */
}
</style>
