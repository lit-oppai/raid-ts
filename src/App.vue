<script setup lang="ts">
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import menuBar from '@/components/menuBar.vue';
import messageBus from '@/utils/messageBus';

function onClose() {
    messageBus("mircoapp_communicate", {
        action: 'close',
        name: 'icewhale_connect'
    });
}
</script>

<template>
	<Splitter class="os_panel h-screen">
		<!-- menu bar start -->
		<SplitterPanel :size="20" class="panel_right">
			<menuBar></menuBar>
		</SplitterPanel>
		<!-- menu bar end -->

		<SplitterPanel :size="80" class="panel_content">
			<div class="top_bar">
				<div class="top_bar_left">
					<span>Storage Manager</span>
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
		</SplitterPanel>
	</Splitter>
</template>

<style scoped></style>
