<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { NPopover } from 'naive-ui'

const healthyColor = '#28C322'
const unhealthyColor = '#F26224'
const unknownColor = '#C0C6CC'
const props = defineProps({
    x: {
        type: Number,
        required: true
    },
    source: {
        type: Object,
        default: () => {
            return {
                health: 'false',
                temperature: '0'
            }
        }
    },
    part: {
        type: String,
        required: true
    },
})
// 根据 props 阐述 动态引入组件
const dynamicComponent: ReturnType<typeof defineAsyncComponent> = defineAsyncComponent(() => import(`./font/${props.part}.vue`))

const pilotLampOpacity = computed(() => {
    return ['A', 'B', 'C', 'D'].includes(props.part) ? 0 : 1;
})
const exitLampOpacity = computed(() => {
    return props.source.avail ? 1 : 0.5;
})
const statuTitle = computed(() => {
    if (props.source.avail) {
        return props.source.health === 'true' ? 'healthy' : 'unhealthy'
    }
    return 'unknown'
})
const statuColor = computed(() => {
    if (props.source.avail) {
        return props.source.health === 'true' ? healthyColor : unhealthyColor
    }
    return unknownColor
})
const statuClass = computed(() => {
    if (props.source.avail) {
        return props.source.health === 'true' ? 'text-green-600' : 'text-red-600'
    }
    return 'text-gray-600'
})
</script>

<template>
    <NPopover trigger="hover" placement="bottom">
        <template #trigger>
            <svg ref="ZimaCubeSketchRef" width="16" height="56" viewBox="0 0 16 56" fill="none" :opacity="exitLampOpacity"
                xmlns="http://www.w3.org/2000/svg">
                <g>
                    <rect x="0" y="0" width="16" height="56" rx="3" fill="white" />
                    <circle name="colorB" cx="8" cy="8" r="2" :fill="statuColor" />
                    <g opacity="0.5" filter="url(#111)">
                        <circle name="colorB" cx="8" cy="8" r="2" :fill="statuColor" />
                    </g>
                    <g :opacity="pilotLampOpacity">
                        <rect x="4" y="16" width="8" height="1" fill="#DADFE5" />
                        <rect x="4" y="19" width="8" height="1" fill="#DADFE5" />
                        <rect x="4" y="22" width="8" height="1" fill="#DADFE5" />
                    </g>
                    <component :is="dynamicComponent"></component>
                </g>
                <filter id="111" x="0" y="0" width="12" height="12" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_988_10640" />
                </filter>
            </svg>
        </template>
        <div>
            <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Health:</span>
            <span class="text-sm font-medium font-['Roboto'] leading-5" :class="statuClass">{{ statuTitle }}</span>
        </div>
        <div>
            <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Temperature:</span>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">{{ source.temperature }} °C</span>
        </div>
    </NPopover>
</template>