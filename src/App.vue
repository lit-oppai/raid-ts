<script setup lang="ts">
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Image from 'primevue/image';
import 'primevue/resources/themes/saga-blue/theme.css';
import authorImage from '@/assets/img/author.svg';
import { routes } from '@/pages/router.ts';
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <Splitter class="h-screen">
    <!-- menu bar start -->
    <SplitterPanel :size="20" class="bg-white min-w-[204]">
      <div class="m-5 px-1">
        <span>Setting</span>
        <div class="flex mt-9 space-x-2.5 items-center">
          <Image :src="authorImage" class="w-10 h-10"></Image>
          <span class="">name</span>
        </div>
      </div>

      <!--使用 router-link 组件进行导航 -->
      <!--通过传递 `to` 来指定链接 -->
      <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
      <div v-for="item in routes" class="mx-4 h-12 w-full rounded">
        <router-link :to="item.path" class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-tight">{{ item.name }}</router-link>
      </div>
    </SplitterPanel>
    <!-- menu bar end -->

    <SplitterPanel :size="80">
      <div class="flex items-stretch">
        <span class="flex-1">Content</span>
        <i class="casa-close-xs-outline flex-shrink-0"></i>
      </div>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </SplitterPanel>
  </Splitter>
</template>

<style scoped></style>
