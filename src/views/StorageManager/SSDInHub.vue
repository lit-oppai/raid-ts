<!-- TODO: transform to little. -->
<script setup lang="ts">
import { ref } from "vue";
const filter = ref<string>("");
</script>

<template>
    <g name="disk1">
        <rect :x="133" y="12" width="16" height="56" rx="3" fill="white" />
        <path d="M142.312 53.4395V62H140.9V55.1152L138.809 55.8242V54.6582L142.143 53.4395H142.312Z" fill="#909599" />
        <g opacity="0.5" :filter="`url(${filter}}})`">
            <circle name="color1" cx="141" cy="20" r="2" fill="#28C322" />
        </g>
        <circle name="color1" cx="141" cy="20" r="2" fill="#28C322" />
        <rect x="137" y="28" width="8" height="1" fill="#DADFE5" />
        <rect x="137" y="31" width="8" height="1" fill="#DADFE5" />
        <rect x="137" y="34" width="8" height="1" fill="#DADFE5" />
    </g>
    <defs>
        <filter :id="filter" x="135" y="14" width="12" height="12" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_988_10640" />
        </filter>
    </defs>
</template>
