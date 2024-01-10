<script setup lang="ts">
import messageBus from "@utils/messageBus";
import { useRoute, useRouter } from "vue-router";
// import router from '@pages/router.ts';
import { ref, watch } from "vue";
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
//获取路由中的 mate 信息
const route = useRoute();
const router = useRouter();
//获取路由中的 title 信息
const title = ref<string>();
watch(
    () => route.meta.title,
    () => {
        title.value = route.meta.title as string;
    }
);
function onClose() {
    messageBus("mircoapp_communicate", {
        action: "close",
        name: "icewhale_settings",
    });
}
</script>
<template>
    <div class="panel_top">
        <transition mode="out-in" class="animate-fade animate-once animate-duration-200 animate-ease-in">
            <!-- <transition mode="out-in" name="slide-fade"> -->
            <div :key="title" class="flex items-center">
                <div class="top_left" @click="router.go(-1)" v-if="route.matched.length > 1">
                    <i class="casa-left-outline"></i>
                </div>
                <div class="top_title">
                    <span>{{ $t(title as string) }}</span>
                </div>
            </div>
        </transition>

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
        <router-view v-slot="{ Component }">
            <transition mode="out-in" class="animate-fade animate-once animate-duration-200 animate-ease-in">
                <div :key="route.fullPath">
                    <component :is="Component" />
                </div>
            </transition>
        </router-view>
        <!-- <router-view></router-view> -->
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-from {
    opacity: 1;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(0.5rem);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-0.5rem);
}
</style>
