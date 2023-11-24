<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import protectSVG from '@assets/img/StorageManager/protect.svg';
import diskSVG from '@assets/img/StorageManager/disk.svg';
import warningSVG from '@assets/img/StorageManager/warning.svg';
import warningRedSVG from '@assets/img/StorageManager/warningRed.svg'
import warningIntense from '@assets/img/StorageManager/warningIntense.svg';
// import Warning from '@assets/img/StorageManager/warning.vue';
import { showEstablishRAID, initEstablishRAID } from '@views/EstablishRAID/controlView.ts'
initEstablishRAID();
</script>
<template>
    <!-- Warnning Info -->
    <div class="w-full px-3 py-2.5 bg-rose-100 rounded-md justify-start items-center gap-2 inline-flex mt-4">
        <Image :src="warningIntense"></Image>
        <!-- <Warning class="fill-sky-500 h-6 w-6"></Warning> -->
        <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow align-baseline">
            请先备份数据，再进行操作。
        </span>
    </div>
    <!-- Hard Disk Part -->
    <div class="mt-6 mb-2 mr-0.5">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            Hard Disk
        </span>
    </div>
    <div class="bg-white rounded-lg space-y-1 p-3">
        <!-- Traversing -->
        <div class="flex justify-between items-center bg-gray-50 rounded-md h-10 px-3">
            <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                HDD-2-Manpao
            </span>
            <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto'] mr-1">
                Healthy
            </span>
        </div>

        <div class="flex items-center bg-gray-50 rounded-md h-10 px-3 gap-4">
            <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                HDD-2-Manpao
            </span>
            <span class="px-1 py-px bg-rose-100 rounded justify-center items-center gap-0.5 inline-flex">
                <Image :src="warningRedSVG" class="h-4 w-4 fill-red-500"></Image>
                <span class="text-rose-500 text-xs font-normal font-['Roboto']">
                    Break
                </span>
            </span>
            <span class="flex-grow"></span>
            <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto'] mr-1">
                Healthy
            </span>
            <Button label="推出" severity="primary" size="small" @click="showEstablishRAID('Modify')"></Button>
        </div>
        <div class="flex items-center bg-gray-50 rounded-md h-10 px-3 gap-4">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                硬盘已推出，请关机更换硬盘后重启 / Empty
            </span>
            <span class="flex-grow"></span>
            <!-- TODO：添加 socket 到框架，以触发关机 -->
            <Button label="关机" severity="primary" size="small"></Button>
            <Button label="添加" severity="primary" size="small" @click="showEstablishRAID('FirstAid')"></Button>
        </div>
        <div class="pt-2">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                插入新硬盘后，可扩充容量。
            </span>
        </div>
    </div>
    <!-- Data Protect -->
    <div class="mt-6 space-y-2">
        <div class="mr-0.5">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                数据保护
            </span>
        </div>
        <div class="bg-white rounded-lg flex flex-col py-1">
            <div class="h-9 flex items-center px-4">
                <Image :src="protectSVG" class="h-6 w-6"></Image>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                    校验与恢复
                </span>

                <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']">
                    RAID5保护生效 · 数据仅只读
                </span>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="h-8 flex items-center px-4 pb-1">
                <i class="casa-alert-outline text-2xl text-rose-500"></i>
                <span class="text-neutral-400 text-xs font-normal font-['Roboto'] flex-grow ml-3">
                    需要在异常盘位替换大于440GB的硬盘以重新开始使用
                </span>
            </div>
        </div>
    </div>
    <!-- Others -->
    <div class="mt-6 space-y-2">
        <div class="mr-0.5">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                Others
            </span>
        </div>

        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="diskSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                添加其他硬盘
            </span>

            <Button label="添加" severity="secondary" size="small" @click="showEstablishRAID('Modify')"></Button>
        </div>
        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="warningSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                抹掉并解散
            </span>

            <Button label="开始" severity="accent" size="small"></Button>
        </div>
    </div>
</template>
