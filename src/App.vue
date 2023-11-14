<script setup lang="ts">
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import menuPart from '@pages/App/menuPart.vue';
import contentPart from '@pages/App/contentPart.vue';
</script>

<template>
	<Splitter class="os_panel h-screen">
		<!-- menu bar start -->
		<SplitterPanel :size="20" class="panel_right">
			<menuPart></menuPart>
		</SplitterPanel>
		<!-- menu bar end -->

		<SplitterPanel :size="80" class="panel_content">
            <contentPart></contentPart>
		</SplitterPanel>
	</Splitter>
</template>

<style scoped></style>
