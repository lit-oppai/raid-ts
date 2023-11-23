<script setup lang="ts">
import { NPopover } from 'naive-ui';
import Image from 'primevue/image';
import questionSVG from '@assets/img/EstablishRAID/question.svg';
// import recommendSVG from '@assets/img/EstablishRAID/recommend.svg';
import { currentStep } from "./controlData.ts";
import { defineProps, computed } from 'vue';
const addStep = () => {
    if (props.disable) {
        return;
    }
    currentStep.value++;
};
// const disable = false;
const props = defineProps<{
    disable: boolean;
}>();
const cardClass = computed(() => {
    let classList = '';
    if (props.disable) {
        classList = 'opacity-50';
    } else {
        classList = 'cursor-pointer hover:bg-gray-100 active:bg-sky-600';
    }
    return classList;
});
</script>
<template>
    <div class="px-4 py-6 space-y-4 bg-gray-50 rounded-lg group" :class="cardClass" @click="addStep">
        <div class="flex items-center group-active:text-white">
            <span class="text-base">RAID0</span>
            <!-- <Image :src="recommendSVG" imageStyle="{color: red}" class="ml-1 fill-sky-600 active:fill-white"></Image> -->
            <svg width="20" height="20" viewBox="0 0 20 20" class="fill-sky-600 group-active:fill-white ml-1"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.0361 7.39273C14.0978 7.39273 15.1343 7.38679 16.1703 7.39745C16.4002 7.39715 16.6287 7.43386 16.847 7.50606C17.6129 7.84105 18.0437 8.66289 17.8835 9.48351C17.5016 11.4413 17.0929 13.3936 16.712 15.3522C16.6665 15.8853 16.4232 16.3818 16.0302 16.7446C15.8102 16.9471 15.5266 17.0668 15.228 17.0831C12.4734 17.0807 9.71871 17.0807 6.96375 17.0831C6.92491 17.0831 6.88591 17.0777 6.81843 17.0719C6.81325 16.9782 6.80396 16.89 6.80396 16.7996C6.8067 13.9248 6.80914 11.0509 6.81096 8.1777C6.81096 7.99018 6.85407 7.91935 7.0387 7.88659C8.57011 7.61727 9.84378 6.09027 9.96229 4.4076C9.96 3.9447 10.0331 3.48452 10.1788 3.04512C10.4537 2.28741 11.2908 1.89622 12.0482 2.17149C12.2601 2.24839 12.4513 2.37337 12.6068 2.53663C12.9184 2.86214 13.1182 3.27852 13.177 3.72529C13.3799 4.89637 13.3359 6.09693 13.0477 7.24999C13.04 7.29752 13.0352 7.34566 13.0332 7.39379L13.0361 7.39273ZM5.99522 8.74545C5.99522 8.25753 5.75422 7.97495 5.31733 7.96565C4.73999 7.95301 4.16188 7.95164 3.58362 7.96565C3.22152 7.95971 2.9228 8.24869 2.91686 8.61094C2.91625 8.64324 2.91823 8.67553 2.92234 8.70767C2.91838 11.2533 2.91838 13.7993 2.92234 16.3452C2.87786 16.7049 3.13317 17.0326 3.49283 17.0772C3.53107 17.0819 3.56976 17.0833 3.60845 17.0813C4.14634 17.0856 4.68621 17.0813 5.22258 17.0813C5.75895 17.0813 5.99476 16.8268 5.99522 16.2269V12.5113C5.99613 11.2573 5.99994 10.0011 5.99522 8.74545Z" />
            </svg>

            <span class="flex-grow"></span>
            <div @click="e => e.stopPropagation()">
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
        </div>
        <!-- 对比部分 -->
        <div class="py-2">
            <div>
                <span class="text-zinc-800 text-xs font-medium font-['Roboto'] group-active:text-white">
                    Security
                </span>
            </div>
            <div class="flex space-x-1">
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px] group-active:bg-white"></div>
                <div class="flex-grow h-[3px] opacity-20 bg-sky-600 rounded-[1px] group-active:bg-white"></div>
                <div class="flex-grow h-[3px] opacity-20 bg-sky-600 rounded-[1px] group-active:bg-white"></div>
                <div class="flex-grow h-[3px] opacity-20 bg-sky-600 rounded-[1px] group-active:bg-white"></div>
            </div>
            <div class="mt-4">
                <span class="text-zinc-800 text-xs font-medium font-['Roboto'] group-active:text-white">
                    Speed
                </span>
            </div>
            <div class="flex space-x-1">
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px] group-active:bg-white"></div>
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px] group-active:bg-white"></div>
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px] group-active:bg-white"></div>
                <div class="flex-grow h-[3px] bg-sky-600 rounded-[1px] group-active:bg-white"></div>
            </div>
        </div>
        <!-- 要求部分 -->
        <div class="w-full h-px bg-gray-200"></div>
        <div class="flex justify-between">
            <span class="text-zinc-800 text-xs font-medium font-['Roboto'] group-active:text-white">
                Max capacity
            </span>
            <span class="text-neutral-400 text-xs font-normal font-['Roboto'] group-active:text-white">
                100%
            </span>
        </div>
        <div class="w-full h-px bg-gray-200"></div>
        <div class="flex justify-between">
            <span class="text-zinc-800 text-xs font-medium font-['Roboto'] group-active:text-white">
                Min disks
            </span>
            <span class="text-neutral-400 text-xs font-normal font-['Roboto'] group-active:text-white">
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
