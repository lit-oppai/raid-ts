<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import diskSVG from '@assets/img/StorageManager/disk.svg';
import warningSVG from '@assets/img/StorageManager/warning.svg';
</script>
<template>
    <!-- Disk Info List -->
    <div class="mt-6 mb-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            Others
        </span>
    </div>
    <div class="os_bg_white_card mt-2">
        <div class="flex px-3 space-x-3 items-center rounded-md os_list">
            <div class="w-6 h-6 flex justify-center items-center">
                <Image :src="diskSVG" />
            </div>
            <div class="flex-grow flex flex-col py-2 space-y-1">
                <div>
                    <span class="text-zinc-800 text-base font-medium font-['Roboto'] leading-6">
                        SSD-2-Qing Sheng
                    </span>
                </div>
                <div class="flex">
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">Total 245GB ·</span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto']">Surplus 210.5GB</span>
                </div>
            </div>
            
            <span class="text-right text-neutral-400 text-sm font-normal font-['Roboto']">
                Healthy
            </span>
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
                格式化硬盘
            </span>

            <Button label="开始" severity="accent" Size="medium"></Button>
        </div>
    </div>
</template>
