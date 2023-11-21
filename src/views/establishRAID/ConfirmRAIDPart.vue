<script setup lang="ts">
import { ref } from 'vue';
const checked = ref(false);
</script>
<template>
    <div class="h-full w-full flex items-center mt-16">
        <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 py-8">
            <div>
                <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
                    Starting RAID creation
                </span>
            </div>
            <div class="text-neutral-400 text-sm font-normal font-['Roboto'] mt-3">
                <span>
                    Creating a RAID array will initialize the selected hard drive,
                </span>
                <span class="text-zinc-800 text-sm font-medium font-['Roboto']">
                    and all files on the hard drive will be deleted and cannot be recovered.
                </span>
                <span>
                    Please back up important files on the hard drive in advance. During this
                    process, do not disconnect the hard drive or turn off the computer to avoid damaging the system.
                </span>
            </div>
            <div class="flex justify-end items-center mt-16">
                <input type="checkbox" v-model="checked" class="mr-2 w-5 h-5 cursor-pointer"/>
                <span class="text-zinc-800 text-sm font-normal font-['Roboto']">
                    I am aware of this and confirm the operation.
                </span>
            </div>
        </div>
    </div>
</template>
