<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import messageBus from '@utils/messageBus';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

//获取路由中的 mate 信息
const route = useRoute();
//获取路由中的 title 信息
const title = computed(() => route.meta.title);
//计算当前路由的层级
console.log(route);


function onClose() {
    messageBus("mircoapp_communicate", {
        action: 'close',
        name: 'icewhale_connect'
    });
}
</script>
<template>
    <div class="top_bar">
        <div class="top_bar_left">
            <span>{{ title }}</span>
            <Breadcrumb />
        </div>
        <div class="top_bar_center">
            <!-- search or active -->
        </div>
        <div class="top_bar_right" @click="onClose">
            <i class="casa-close-xs-outline"></i>
        </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>
