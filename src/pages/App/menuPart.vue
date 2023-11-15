<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import authorImage from '@assets/img/author.svg';
import { routes } from '@pages/router.ts';
</script>
<!-- css components: os_panel menu_bar -->
<template>
    <div class="os_menu_bar">
        <span class="menu_bar_title">
            Setting
        </span>
        <div class="menu_bar_author">
            <Image :src="authorImage"></Image>
            <span class="author_name">
                name
            </span>
        </div>

        <div class="menu_bar_selector">
            <router-link v-for="item in routes" :to="item.path" class="os_menu">
                <Button class="" :label="(item.name as string)" :icon="item.icon">
                </Button>
            </router-link>
        </div>
    </div>
</template>
