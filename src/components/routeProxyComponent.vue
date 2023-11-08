<template>
    <component :is="componentName" msg="test">
        
    </component>
</template>
<script setup lang="ts">
// import HelloWorld from './HelloWorld.vue';
// // 获取 props
// import { defineProps } from 'vue'
// defineProps<{
//     componentName: string
// }>()
// 获取 router 中的参数
import { useRoute } from 'vue-router'
const route = useRoute()
const componentName = route.params.componentName
import componentO from `./${componentName}.vue`
console.log(componentO);

const componentPath = `./${componentName}.vue`
console.log(componentPath);

const a = await import(componentPath)
console.log(a);

</script>