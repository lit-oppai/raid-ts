<script setup lang="ts">
// import ZimaCubeHubSketch from './ZimaCubeHubSketch.vue'
import ZimaCubeSketch from "./ZimaCubeSketch.vue";
import DiskCard from "./DiskCard.vue";
// import { ref, onMounted } from 'vue'
// let ZimaCubeSketchRef = ref(null)
// // 根据 svg id 获取 svg 元素，并更改其opacity属性
// const setOpacity = (id: string, opacity: number) => {
//     debugger
//     const svg = ZimaCubeSketchRef.value.getElementById(id)
//     if (svg) {
//         svg.setAttribute('opacity', opacity.toString())
//     }
// }
// // setOpacity('test', 0.5)
// onMounted(() => {
//     setOpacity('test', 0.5)
// })
import { HDDStatus, SSDStatus } from "./controlData.ts";

const HDD: string[] = ["1", "2", "3", "4", "5", "6"];
const SSD: string[] = ["A", "B", "C", "D"];
</script>

<template>
    <div class="flex justify-center mt-10 mb-6 relative">
        <ZimaCubeSketch ref="ZimaCubeSketchRef"></ZimaCubeSketch>
        <div class="absolute w-[117px] h-14 left-[calc(50%_-_50px)] top-3 flex space-x-1">
            <DiskCard v-for="key in HDD" :source="HDDStatus.get(key)" :x="0" :part="key"></DiskCard>
        </div>

        <div class="absolute w-[76px] h-14 left-[calc(50%_+_79px)] top-3 flex space-x-1">
            <DiskCard v-for="key in SSD" :source="SSDStatus.get(key)" :x="0" :part="key"></DiskCard>
        </div>
    </div>
</template>
