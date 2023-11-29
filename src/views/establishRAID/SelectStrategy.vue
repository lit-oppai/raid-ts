<script setup lang="ts">
import { computed } from 'vue';
import { currentRAIDStrategy } from './controlData.ts';
import { RAIDCandidateDiskCount } from '@views/StorageManager/controlData.ts';
import { RAIDStrategy } from './controlData.d';
const props =
defineProps({
    strategy: {
        type: String as () => RAIDStrategy,
        required: true,
    },
});
const disabled = computed(() => {
    return props.strategy === 'RAID5' && RAIDCandidateDiskCount.value < 3;
});
</script>

<template>
    <div :class="{
        'bg-sky-600': strategy === currentRAIDStrategy,
        'bg-slate-50': strategy !== currentRAIDStrategy,
        'cursor-pointer': !disabled,
        'pointer-events-none opacity-20': disabled,
    }" class="flex-grow h-9 rounded-md flex items-center px-4 justify-between active:bg-sky-600 group"
        @click="currentRAIDStrategy = strategy">
        <span :class="{
            'text-white': strategy === currentRAIDStrategy,
            'text-sky-600': strategy !== currentRAIDStrategy && !disabled,
            'text-neutral-400': strategy !== currentRAIDStrategy && disabled,
        }" class="group-active:text-white text-sm font-medium font-['Roboto']">
            {{ strategy }}
        </span>
        <i :class="{
            'text-white': strategy === currentRAIDStrategy,
            'text-slate-50': strategy !== currentRAIDStrategy,
        }" class="casa-check-outline group-active:text-white text-base"></i>
    </div>
</template>
