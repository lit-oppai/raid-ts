<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import protectSVG from '@assets/img/StorageManager/protect.svg';
import diskSVG from '@assets/img/StorageManager/disk.svg';
import warningSVG from '@assets/img/StorageManager/warning.svg';
import { showEstablishRAID } from '@views/EstablishRAID/controlView.ts'
</script>
<template>
    <!-- Hard Disk Part -->
    <div class="mt-6 mb-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            Hard Disk
        </span>
    </div>
    <div class="bg-white rounded-lg space-y-1 p-3">
        <div class="flex justify-between items-center bg-gray-50 rounded-md h-10 px-3">
            <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                HDD-2-Manpao
            </span>
            <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto'] mr-1">
                Healthy
            </span>
        </div>

        <div class="pt-2 px-1">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                插入新硬盘后，可扩充容量。
            </span>
        </div>
    </div>
    <!-- Data Protect -->
    <div class="mt-6 space-y-2">
        <div class="">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                数据保护
            </span>
        </div>
        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="protectSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                校验与恢复
            </span>

            <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']">
                Healthy
            </span>
        </div>

        <div class="bg-white rounded-lg h-11 flex items-center px-4">
            <Image :src="diskSVG" class="h-6 w-6"></Image>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] flex-grow ml-3">
                添加其他硬盘
            </span>

            <Button label="添加" severity="secondary" size="small" @click="showEstablishRAID"></Button>
        </div>
    </div>
    <!-- Others -->
    <div class="mt-6 space-y-2">
        <div class="">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                Others
            </span>
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
