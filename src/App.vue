<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import menuPart from "@pages/App/menuPart.vue";
import contentPart from "@pages/App/contentPart.vue";
import DynamicDialog from "primevue/dynamicdialog";
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
</template>

<style scoped></style>
