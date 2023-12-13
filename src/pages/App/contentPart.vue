<script setup lang="ts">
import messageBus from '@utils/messageBus';
import { useRoute } from 'vue-router';
import router from '@pages/router.ts';
import { computed } from 'vue';

//获取路由中的 mate 信息
const route = useRoute();
//获取路由中的 title 信息
const title = computed(() => route.meta.title);

function onClose() {
    messageBus("mircoapp_communicate", {
        action: 'close',
        name: 'icewhale_settings'
    });
}
</script>
<template>
    <div class="panel_top">
        <div class="top_left" @click="router.go(-1)" v-if="route.matched.length > 1">
            <i class="casa-left-outline"></i>
        </div>
        <div class="top_title">
            <span>{{ title }}</span>
        </div>
        <div class="top_center">
            <!-- search or active -->
        </div>
        <div class="top_right" @click="onClose">
            <i class="casa-close-outline"></i>
        </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="panel_content">
        <router-view></router-view>
    </div>
</template>
