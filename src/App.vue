<script setup lang="ts">
import Splitter             from "primevue/splitter";
import SplitterPanel        from "primevue/splitterpanel";
import ConfirmDialog        from "primevue/confirmdialog";
import menuPart             from "@pages/design/menuPart.vue";
import contentPart          from "@pages/design/contentPart.vue";
import DynamicDialog        from "primevue/dynamicdialog";
import Toast                from "primevue/toast";
import i18n                 from "./i18n";
import { socket }           from "@network/socket.ts";
import confirmDialogPTStyle from '@style/confirmDialog.ts'
socket.on("casaos-ui:topbar:dashboardsetting_language", (res: any) => {
    i18n.global.locale = res.Properties.casaos_lang;
});
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
    <ConfirmDialog
        :draggable="false"
        group="secondary_confirmation_dialog"
        :pt="confirmDialogPTStyle"
    ></ConfirmDialog>
</template>

<style scoped></style>
