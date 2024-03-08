<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const visible = ref(false)

function open() {
    visible.value = true
}

defineExpose({
    open
})
</script>

<template>
    <Dialog v-model:visible="visible" :header="t('About ZimaOS')" modal :draggable="false" unstyled
        closeIcon="casa-close-outline" :pt="{
        root: {
            class: 'w-[26.5rem] h-[236px] rounded-2lg overflow-hidden header-split-line footer-split-line'
        }
    }">
        <div
            class="h-full mt-6 mx-6 mb-8 px-4 bg-gray-100 rounded-md flex flex-col justify-evenly text-sm text-sky-600 font-medium">
            <a href="/privacy policy.pdf" target="_blank">{{
        $t('Privacy Policy')
                }}</a>
            <!-- <a href="//baidu.com" target="_blank">{{
                $t("EULA (End User License Agreement)")
            }}</a>
            <a href="//baidu.com" target="_blank">{{ $t("Open Source Usage Statement") }}</a> -->
        </div>
    </Dialog>
</template>
