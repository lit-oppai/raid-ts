<script setup lang="ts">
import Image from 'primevue/image';
import RaidSVG from '@assets/img/StorageManager/Raid.svg';
import HDDSVG from '@assets/img/StorageManager/HDD.svg';
import SSDSVG from '@assets/img/StorageManager/SSD.svg';

import ZimaCubeCard from '@views/StorageManager/ZimaCubeCard.vue';
</script>

<template>
    <!-- Storage Sketch Part -->
    <div class="storage_image">
        <ZimaCubeCard></ZimaCubeCard>
    </div>
    <!-- Storage Usage Part -->
    <div class="storage_useage os_bg_white_card flex flex-col px-4 py-3">
        <div class="w-full flex justify-between">
            <div>
                <span class="text-zinc-800 text-base font-semibold font-['Roboto'] leading-normal">ZimaCube</span>
            </div>
            <div class="space-x-1">
                <span class="text-neutral-400 text-xs font-normal font-['Roboto'] ">剩余</span>
                <span class="text-zinc-800 text-base font-semibold font-['Roboto'] leading-normal">213GB</span>
            </div>
        </div>
        <!-- TODO: Respondency -->
        <div class="flex space-x-3 mt-1">
            <div class="w-[120px] flex-shrink-0 grid grid-cols-2">
                <div class="col-span-2 flex flex-nowrap rounded-sm overflow-hidden">
                    <div class="bg-amber-500 w-[50%] h-2"></div>
                    <div class="bg-violet-500 w-[30%] h-2"></div>
                    <div class="bg-gray-100 w-[20%] h-2"></div>
                </div>
                <div class=" space-x-1">
                    <span class="bg-amber-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">System</span>
                </div>
                <div class=" space-x-1">
                    <span class="bg-violet-500 w-1.5 h-1.5 rounded-sm inline-block"></span>
                    <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">Data</span>
                </div>
            </div>
            <div class="flex-grow">
                <div class="col-span-2 flex flex-nowrap rounded-sm overflow-hidden">
                    <div class="bg-green-400 w-[20%] h-2"></div>
                    <div class="bg-gray-100 w-[80%] h-2"></div>
                </div>
                <div class="flex justify-between">
                    <div class=" space-x-1">
                        <span class="bg-green-400 w-1.5 h-1.5 rounded-sm inline-block"></span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto'] leading-4">Files</span>
                    </div>
                    <div>
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto'] ">Total 1023GB/ </span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto'] ">810GB</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Data Space Part -->
    <div class="flex mt-6 mb-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-tight">Data Space</span>
    </div>
    <div>
        <!-- notice or create RAID -->
        <div class="os_bg_white_card">
            <div class="flex px-3 space-x-3 items-center h-10 rounded-md bg-blue-100">
                <div class="w-6 h-6 flex justify-center items-center">
                    <div class="self-center flex justify-evenly bg-sky-500 w-4 h-4 rounded-full">
                        <i class=" text-white text-xs font-normal font-['Roboto']">{{ 2 }}</i>
                    </div>
                </div>
                <div class="flex-grow text-sky-500 text-sm font-normal font-['Roboto'] leading-6">
                    Discover the new hard drive
                </div>
                <div class="w-6 h-6 rounded">
                    <i class="casa-right-outline"></i>
                </div>
            </div>

            <div class="flex px-3 space-x-3 items-center h-10 rounded-md os_list">
                <div class="w-6 h-6 flex justify-center items-center">
                    <Image :src="RaidSVG" />
                </div>
                <div class="flex-grow text-zinc-800 text-sm font-normal font-['Roboto'] leading-5">
                    To enhance data availability, capacity, and/or performance by
                    <span class="font-medium">RAID</span>.
                </div>
                <div class=" flex-shrink-0">
                    <button class="h-7 bg-sky-600 rounded-[14px] px-[14px]">
                        <span class="text-white text-sm font-normal font-['Roboto'] leading-5">创建</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Disk Info List -->
        <div class="os_bg_white_card mt-2">
            <div class="flex px-3 space-x-3 items-center rounded-md os_list">
                <div class="w-6 h-6 flex justify-center items-center">
                    <Image :src="HDDSVG" />
                </div>
                <div class="flex-grow flex flex-col py-2 space-y-1">
                    <div>
                        <span class="text-zinc-800 text-base font-medium font-['Roboto'] leading-6">
                            HDD-2-Man Pao
                        </span>
                    </div>
                    <div class="flex">
                        <span class="text-neutral-400 text-xs font-normal font-['Roboto']">Total 245GB ·</span>
                        <span class="text-zinc-800 text-xs font-normal font-['Roboto']">Surplus 210.5GB</span>
                    </div>
                </div>

                <div class="w-6 h-6 rounded os_list_action_icon">
                    <i class="casa-right-outline"></i>
                </div>
            </div>
            <div class="flex px-3 space-x-3 items-center rounded-md os_list">
                <div class="w-6 h-6 flex justify-center items-center">
                    <Image :src="SSDSVG" />
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
                <div class="w-6 h-6 rounded os_list_action_icon">
                    <i class="casa-right-outline"></i>
                </div>
            </div>
        </div>
    </div>
</template>
