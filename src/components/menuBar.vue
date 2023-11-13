<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import authorImage from '@/assets/img/author.svg';
import { routes } from '@/pages/router.ts';
</script>
<!-- css components: os_panel menu_bar -->
<template>
    <div class="os_menu_bar">
        <div class="menu_bar_header">
            <span class="">
                Setting
            </span>
            <div class="os_author">
                <Image :src="authorImage"></Image>
                <span class="">
                    name
                </span>
            </div>
        </div>

        <!--使用 router-link 组件进行导航 -->
        <!--通过传递 `to` 来指定链接 -->
        <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
        <div class="menu_bar_list">
            <router-link v-for="item in routes" :to="item.path" class="os_menu">
                <Button class="" :label="item.name" :icon="item.icon">
                </Button>
            </router-link>
        </div>
    </div>
</template>
