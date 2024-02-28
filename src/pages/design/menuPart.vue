<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
import authorImage from '@assets/img/author.svg';
import { routes } from '@pages/router.ts';
import { getUserInfo } from '@icewhale/ui-utils';
import { install } from "@network/index.ts";

const userName: string = getUserInfo().username;
// TODO ： 1、 local storage 相关没有 ts 提示 -- 提出常量部分作为映射。 2、本地存储的更新问题 -- 同步的门槛需要确定。
const avatar: string = `/v1/users/avatar?token=${localStorage.getItem("access_token")}`;
const isUpdate = ref<boolean>(false);

// shutdown or restart
import { messageBus } from '@icewhale/ui-utils';
const restartConfirm = ref<boolean>(false);
const shutdownConfirm = ref<boolean>(false);

onMounted(() => {
    getRealeaseStatus();
});

function onPower(type: "restart" | "shutdown") {
    if (type === "restart" && !restartConfirm.value) {
        restartConfirm.value = true;
    } else if (type === "shutdown" && !shutdownConfirm.value) {
        shutdownConfirm.value = true;
    } else {
        const payload = {
            action: "",
            peerType: "settings",
            name: "icewhale_settings",
            routerPath: "/general",
        }
        switch (type) {
            case "restart":
                // Extract constants into a separate package.
                payload.action = "reboot";
                messageBus("dashboardsetting_reboot");
                messageBus("mircoapp_communicate", payload);
                restartConfirm.value = false;
                // powerType.value = "restart";
                break;
            case "shutdown":
                // Extract constants into a separate package.
                payload.action = "power_off";
                messageBus("dashboardsetting_shutdown");
                messageBus("mircoapp_communicate", payload);
                shutdownConfirm.value = false;
                // powerType.value = "shut1111111down";
                break;
        }
        // emit("power", powerType.value)
    }
}

function getRealeaseStatus() {
    install.getStatus().then(({ data }) => {
        isUpdate.value = data.data?.status === "idle";
    });
}
</script>
<!-- css components: os_panel menu_bar -->
<template>
    <div class="os_menu_bar">
        <span class="menu_bar_title">
            {{ $t('Setting') }}
        </span>
        <div class="menu_bar_author">
            <Image :src="avatar || authorImage"></Image>
            <span class="author_name">
                {{ userName }}
            </span>
        </div>

        <div class="menu_bar_update" v-show="isUpdate">
            <router-link to="/update" class="flex items-center">
                <div class="w-4 h-4 m-[10px] rounded-full bg-brand-400 flex-shrink-0 text-white flex items-center justify-center text-xs">
                    ★
                </div>
                <Button :label="$t('update')">

                </Button>
            </router-link>
        </div>

        <div class="menu_bar_selector">
            <router-link v-for="item in routes.filter(t => t?.name !== undefined)" :to="item.path" class="os_menu">
                <Button :label="$t(item.name as string)" :icon="item.icon">
                </Button>
            </router-link>
        </div>

        <div class="menu_bar_footer">
            <Button :label="restartConfirm ? $t(`Are you sure?`) : $t(`Restart`)" icon="casa-restart-outline"
                @click="onPower('restart')">
            </Button>
            <Button :label="shutdownConfirm ? $t(`Are you sure?`) : $t(`Shutdown`)" icon="casa-shutdown-outline"
                @click="onPower('shutdown')">
            </Button>
        </div>
    </div>
</template>
