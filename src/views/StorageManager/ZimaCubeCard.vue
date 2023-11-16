<script setup lang="ts">
// import ZimaCubeHubSketch from './ZimaCubeHubSketch.vue'
import ZimaCubeSketch from './ZimaCubeSketch.vue'
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

</script>

<template>
    <div class="flex justify-center mt-10 mb-6">
        <ZimaCubeSketch ref="ZimaCubeSketchRef"></ZimaCubeSketch>
    </div>
</template>
