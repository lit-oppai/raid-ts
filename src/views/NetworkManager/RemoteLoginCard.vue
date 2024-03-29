<script setup lang="ts">
import copy from "clipboard-copy";
import { ref, onMounted } from "vue";
import Image from "primevue/image";
import InputSwitch from "primevue/inputswitch";
import { NPopover } from "naive-ui";
import remoteSVG from "@/assets/img/NetworkManager/remote.svg";
import { useToast } from "primevue/usetoast";
import { zerotier } from "@network/index.ts";
import { ZTInfo } from "@icewhale/zimaos-openapi";

const toast = useToast();
const accessID = ref<string>("");
const isAccessed = ref<boolean>(false);
const isChecking = ref<boolean>(false);
let clickedCount = 0;
let lastClickTime = 0;

onMounted(() => {
    zerotier.getZerotierInfo().then((res) => {
        if (res.status === 200) {
            const data: ZTInfo = res.data;
            // id must be exist.
            accessID.value = data?.id || "";
            isAccessed.value = data?.status === "online";

        }
    });
});

function handleClick() {
    const currentTime = Date.now();
    const clickInterval = currentTime - lastClickTime;

    lastClickTime = currentTime;
    clickedCount++;

    if (clickInterval > 300) {
        clickedCount = 1;
        copy(accessID.value);
        toast?.add({ severity: "success", summary: "Copied to clipboard", life: 3000 });
    } else if (clickInterval <= 300 && clickedCount === 5) {
        clickedCount = 0;
        changeAccessId();
        toast?.add({ severity: "success", summary: "Successed to change", life: 3000 });
    }
}

function changeAccessId() {
    // zerotier
    //     .setZerotierNetworkStatus({ status: "offline" })
    //     .then((res) => {
    //         if (res.status === 200) {
    //             isAccessed.value = false;
    //             accessID.value = "";
    //         }
    //     })
    //     .finally(() => {
    //         isChecking.value = false;
    //     });
}

function switchAccess() {
    isChecking.value = true;
    const status = isAccessed.value ? "online" : "offline";

    zerotier
        .setZerotierNetworkStatus({ status: status })
        .then((res) => {
            if (res.status === 200) {
                isAccessed.value = res.data.status === 'online';
                accessID.value = res.data?.id || "";
            }
        })
        .finally(() => {
            isChecking.value = false;
        });
}
</script>
<template>
    <div class="h-[4.25rem] bg-white rounded-lg flex items-center space-x-3 px-4">
        <Image :src="remoteSVG"></Image>
        <div class="flex-grow">
            <div class="flex items-center space-x-1.5">
                <div class="rounded-[50%] w-1.5 h-1.5 relative" :class="accessID ? `bg-green-default` : `bg-neutral-300`"></div>
                <div class="text-zinc-800 text-base font-medium" v-t="`Remote Login`"></div>
            </div>

            <div class="flex items-center mt-1 h-[18px]" v-show="accessID">
                <div class="text-neutral-400 text-xs font-normal">ID : &nbsp;</div>
                <NPopover trigger="hover" placement="right">
                    <template #trigger>
                        <div class="flex border border-solid rounded border-gray-300">
                            <div class="text-zinc-800 text-xs font-normal flex self-center pl-2 pr-1.5">
                                {{ accessID }}
                            </div>
                            <i class="text-base text-center leading-4 casa-copy-outline bg-gray-300 cursor-pointer"
                                @click.native="handleClick">
                            </i>
                        </div>
                    </template>
                    <div class="text-zinc-800 text-sm font-normal font-['Roboto'] leading-5" v-t="`Copy`"></div>
                </NPopover>
            </div>
        </div>

        <!-- input switch OR Checking -->
        <InputSwitch v-if="!isChecking" v-model="isAccessed" @change="switchAccess" class="flex-grow-0 cursor-pointer" />
        <span v-else class="text-neutral-400 text-xs font-normal">{{ $t("Checking") }}...</span>
    </div>
</template>
