<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import diskSVG from '@assets/img/StorageManager/disk.svg';
</script>

<template>
    <div class="mt-6">
        <!-- Traversing Part -->
        <div class="w-full bg-white rounded-lg px-4 py-3">
            <!-- Header -->
            <div class="w-full flex items-center gap-3">
                <Image :src="diskSVG" class="h-6 w-6"></Image>
                <div class="flex flex-col gap-1">
                    <span class="text-zinc-800 text-base font-medium font-['Roboto']">
                        Storage
                    </span>
                    <span class="text-neutral-400 text-xs font-normal font-['Roboto']">
                        硬盘可以保留数据直接启用，也可以格式化后启用。
                    </span>
                </div>
                <div class="flex-grow"></div>
                <Button label="格式化并启用" severity="primary" Size="medium"></Button>
            </div>
            <!-- Content -->
            <div class="ml-9 mt-4 bg-gray-50 rounded-lg p-3 gap-2 flex flex-col">
                <!-- Traversing Part -->
                <div class="rounded-md border border-gray-200 px-1.5 flex items-center h-9" v-for="key in 3" :key="key">
                    <span class="text-zinc-800 text-xs font-medium font-['Roboto'] px-2">
                        Partition 1
                    </span>
                    <span class="text-right text-neutral-400 text-xs font-normal font-['Roboto']">
                        保留数据 · 128.8GB
                    </span>
                    <span class="flex-grow"></span>
                    <Button label="格式化并启用" severity="secondary" Size="small"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
