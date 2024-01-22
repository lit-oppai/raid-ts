<script setup lang="ts">
import { ref } from "vue";
import Image from "primevue/image";
import InputSwitch from "primevue/inputswitch";
import remoteSVG from "@/assets/img/NetworkManager/remote.svg";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const accessID = "1234567890";
 const checked =  ref<false>();

function onCopy() {
    console.log("onCopy");
}
</script>
<template>
    <div class="h-[4.25rem] bg-white rounded-lg flex items-center space-x-3 px-4">
        <Image :src="remoteSVG"></Image>
        <!-- <i class="casa-language-outline text-2xl"></i> -->

        <div class=" flex-grow">
            <div class="flex items-center space-x-1.5">
                <div class="bg-green-default rounded-[50%] w-1.5 h-1.5 relative"></div>
                <div
                    class="text-zinc-800 text-base font-medium">
                    远程访问
                </div>
            </div>

            <div class="flex items-center m-0 h-5">
                <div
                    class="text-neutral-400 text-xs font-normal">
                    ID : &nbsp;
                </div>
                <div
                    class="border border-solid border-r-0 rounded-l border-gray-300 text-zinc-800 text-xs font-normal flex self-center pl-2 pr-1.5">
                    {{ accessID }}
                </div>
                <i class="w-5 text-base text-center leading-5 casa-copy-outline bg-gray-300 cursor-pointer rounded-r"
                    v-tippy="{ content: t('Copy ID'), arrow: true, placement: 'right' }" @click.native="onCopy">
                </i>
            </div>
        </div>

        <!-- input switch OR Checking -->
        <InputSwitch v-if="false" v-model="checked" class=" flex-grow-0 cursor-pointer"/>
        <span v-else class="text-neutral-400 text-xs font-normal">Checking...</span>
    </div>
</template>
