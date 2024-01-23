<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import menuPart from "@pages/App/menuPart.vue";
import contentPart from "@pages/App/contentPart.vue";
import DynamicDialog from "primevue/dynamicdialog";
import Toast from "primevue/toast";
import i18n from './i18n'
import { socket } from '@network/socket.ts';
socket.on('casaos-ui:topbar:dashboardsetting_language', (res: any) => {
    i18n.global.locale = res.Properties.casaos_lang;
})
</script>

<template>
    <Splitter class="os_panel">
        <!-- menu bar start -->
        <SplitterPanel :size="20" class="panel_left">
            <menuPart></menuPart>
        </SplitterPanel>
        <!-- menu bar end -->

        <SplitterPanel :size="80" class="panel_right">
            <contentPart></contentPart>
        </SplitterPanel>
    </Splitter>
    <DynamicDialog class="opacity-40 bg-black" />
    <Toast position="top-center" />
</template>

<style scoped></style>
