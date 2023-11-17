<!-- 
    TODO: transform to little.
    目前不能用，因为 filter 缺失光晕。
-->
<script setup lang="ts">
// 全部是一排，只需要一个 x
import { defineAsyncComponent, ref, computed, onBeforeMount } from 'vue';
// import OverlayPanel from 'primevue/overlaypanel';
import { NPopover } from 'naive-ui'

const healthyColor = '#28C322'
const unhealthyColor = '#F26224'
// const op = ref<OverlayPanel | null>(null)
// const toggle = (event) => {
//     op.value.toggle(event);
// }
const props = defineProps({
    x: {
        type: Number,
        required: true
    },
    part: {
        type: String,
        required: true
    },
})
// 根据 props 阐述 动态引入组件
const dynamicComponent = ref<ReturnType<typeof defineAsyncComponent> | null>(null)
onBeforeMount(() => {
    dynamicComponent.value = defineAsyncComponent(() => import(`./font/${props.part}.vue`))
})

const filter = computed(() => {
    return `filter${props.part}`
})
</script>

<template>
    <NPopover trigger="hover" placement="bottom">
        <template #trigger>
            <svg ref="ZimaCubeSketchRef" width="16" height="56" viewBox="0 0 16 56" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g name="diskB" class="cursor-pointer" @mouseover="toggle">
                    <rect x="0" y="0" width="16" height="56" rx="3" fill="white" />
                    <circle name="colorB" cx="8" cy="8" r="2" fill="#28C322" />
                    <g opacity="0.5" filter="url(#111)">
                        <circle name="colorB" cx="8" cy="8" r="2" fill="#28C322" />
                    </g>
                    <g opacity="0">
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
            <span class="text-green-600 text-sm font-medium font-['Roboto'] leading-5">Healthy</span>
        </div>
        <div>
            <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Temperature:</span>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">36.6 °C</span>
        </div>
    </NPopover>

    <!-- <OverlayPanel ref="op">
        <div>
            <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Health:</span>
            <span class="text-green-600 text-sm font-medium font-['Roboto'] leading-5">Healthy</span>
        </div>
        <div>
            <span class="text-neutral-400 text-sm font-normal font-['Roboto'] leading-5">Temperature:</span>
            <span class="text-zinc-800 text-sm font-medium font-['Roboto'] leading-5">36.6 °C</span>
        </div>
    </OverlayPanel> -->
</template>
