<script setup lang="ts">
import Image from 'primevue/image';
import diskSVG from '@assets/img/StorageManager/disk.svg';
import cryingFaceSVG from '@assets/img/EstablishRAID/cryingFace.svg';
</script>

<template name="AddToRAIDPart">
    <template v-if="false">
        <div class="mt-6 mb-4">
            <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
                请选择要添加的磁盘
            </span>
        </div>
        <div class="flex flex-col gap-2">

            <!-- Traversing Part -->
            <div class="flex items-center h-10 bg-white rounded-md border border-neutral-300 gap-2 px-3" v-for="key in 3"
                :key="key">
                <Image :src="diskSVG" class="h-6 w-6"></Image>
                <span class="align-baseline text-zinc-800 text-sm font-medium font-['Roboto']">
                    HDD-Storage3
                </span>
                <div class="flex-grow"></div>
                <span class="align-baseline text-neutral-400 text-sm font-normal font-['Roboto']">
                    Total 245GB · Surplus 210.5GB
                </span>
                <input type="radio" name="select" :id="`select${key}`">
            </div>

        </div>
    </template>
    <template v-else>
        <div class="flex h-full flex-col items-center justify-center bg-white rounded-xl">
            <Image :src="cryingFaceSVG">
            </Image>
            暂无硬盘可用
        </div>
    </template>
</template>
