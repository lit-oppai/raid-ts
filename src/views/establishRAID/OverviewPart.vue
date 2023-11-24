<script setup lang="ts">
import CardRAID from './CardRAID.vue';
</script>
<template name="OverviewPart">
    <div class="mt-10">
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            What is RAID?
        </span>
    </div>
    <div class="mt-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            RAID is a data storage technology that combines multiple hard drives to enhance data availability, capacity,
            and/or performance.
        </span>
    </div>
    <div class="mt-11">
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            Select RAID mode
        </span>
    </div>
    <div class="mt-2 grid grid-cols-3 space-x-4">
        <CardRAID disable></CardRAID>
        <CardRAID :disable="false"></CardRAID>
        <CardRAID :disable="false"></CardRAID>
    </div>
</template>
