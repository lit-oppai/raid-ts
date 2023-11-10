<script setup lang="ts">
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import menuBar from '@/components/menuBar.vue';
import 'primevue/resources/themes/saga-blue/theme.css';
</script>

<template>
	<Splitter class="os_panel h-screen">
		<!-- menu bar start -->
		<SplitterPanel :size="20" class="menu_bar">
			<menuBar></menuBar>
		</SplitterPanel>
		<!-- menu bar end -->

		<SplitterPanel :size="80" class="bg-gray-50 flex-grow">
			<div class="top_bar">
				<div class="top_bar_left">
					<span>Content</span>
				</div>
				<div class="top_bar_right">
					<i class="casa-close-xs-outline"></i>
				</div>
			</div>
			<!-- 路由出口 -->
			<!-- 路由匹配到的组件将渲染在这里 -->
			<router-view></router-view>
		</SplitterPanel>
	</Splitter>
</template>

<style scoped></style>
