<!-- 
    TODO: transform to little.
    目前不能用，因为 filter 缺失光晕。
-->
<script setup lang="ts">
// 全部是一排，只需要一个 x
import { computed } from "vue";
const props = defineProps({
    x: {
        type: Number,
        required: true,
    },
    part: {
        type: String,
        required: true,
    },
});
const filter = computed(() => {
    return `filter${props.part}`;
});
</script>

<template>
    <g name="diskB" class="cursor-pointer">
        <rect :x="x" y="12" width="16" height="56" rx="3" fill="white" />
        <circle name="colorB" :cx="x + 8" cy="20" r="2" fill="#28C322" />
        <g opacity="0.5" :filter="`url(#${filter}}})`">
            <circle name="colorB" :cx="x + 8" cy="20" r="2" fill="#28C322" />
        </g>
        <g opacity="0">
            <rect :x="x + 4" y="28" width="8" height="1" fill="#DADFE5" />
            <rect :x="x + 4" y="31" width="8" height="1" fill="#DADFE5" />
            <rect :x="x + 4" y="34" width="8" height="1" fill="#DADFE5" />
        </g>
    </g>
    <defs>
        <filter
            :id="filter"
            :x="x + 2"
            y="14"
            width="12"
            height="12"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
            />
            <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_988_10640"
            />
        </filter>
    </defs>
</template>
