<script setup lang="ts">
import CardRAID from "./CardRAID.vue";
import { selectRAIDStrategy } from "./controlData.ts";
import { RAIDCandidateDiskCount } from "@views/StorageManager/controlData.ts";
// import { ref } from 'vue';
// const selectRAIDStrategy = ref('');
</script>
<template name="OverviewPart">
    <div class="mt-10">
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            {{ $t("What is RAID") }}
        </span>
    </div>
    <div class="mt-2">
        <span class="text-neutral-400 text-sm font-normal font-['Roboto']">
            {{
                $t(`RAID is a data storage technology that combines multiple hard drives to enhance data availability, capacity,
            and/or performance.`)
            }}
        </span>
    </div>
    <div class="mt-11">
        <span class="text-zinc-800 text-base font-semibold font-['Roboto']">
            {{ $t("Select RAID mode") }}
        </span>
    </div>
    <div class="mt-2 grid grid-cols-3 space-x-4">
        <CardRAID RAIDName="RAID0" @click="selectRAIDStrategy = 'RAID0'" :disable="false"></CardRAID>
        <CardRAID RAIDName="RAID1" @click="selectRAIDStrategy = 'RAID1'" :disable="false"></CardRAID>
        <CardRAID RAIDName="RAID5" @click="selectRAIDStrategy = 'RAID5'" :disable="RAIDCandidateDiskCount < 3"></CardRAID>
    </div>
</template>
