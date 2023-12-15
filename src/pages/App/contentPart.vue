<script setup lang="ts">
import messageBus from '@utils/messageBus';
import { useRoute } from 'vue-router';
import router from '@pages/router.ts';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
//获取路由中的 mate 信息
const route = useRoute();
//获取路由中的 title 信息
const title = ref<string>();
watch(() => route.meta.title, () => {
    title.value = route.meta.title as string;
});
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
            <span>{{ t(title ?? '') }}</span>
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
