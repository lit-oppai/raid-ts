<script setup lang="ts">
import { ref, onMounted }       from "vue";
import Image                    from "primevue/image";
import Button                   from "primevue/button";
import authorImage              from "@assets/img/author.svg";
import { routes }               from "@pages/router.ts";
import { getUserInfo }          from "@icewhale/ui-utils";
import { install, appStoreAPI } from "@network/index.ts";
import { vOnClickOutside }      from "@vueuse/components";
import { useI18n }              from "vue-i18n";
import { useConfirm }           from "primevue/useconfirm";

const userName: string = getUserInfo()?.username ?? "";
// TODO ： 1、 local storage 相关没有 ts 提示 -- 提出常量部分作为映射。 2、本地存储的更新问题 -- 同步的门槛需要确定。
const avatar: string = `/v1/users/avatar?token=${localStorage.getItem(
    "access_token"
)}`;
const isUpdateSys = ref<boolean>(false);
const isUpdateApps = ref<boolean>(false);

// shutdown or restart
import { messageBus } from "@icewhale/ui-utils";
const restartConfirm = ref<boolean>(false);
const shutdownConfirm = ref<boolean>(false);
const upgradableAppList = ref<any[]>([]);

onMounted(() => {
    getRealeaseStatus();
    getUpgradableAppList();
});

function onPower(type: "restart" | "shutdown") {
    if (type === "restart" && !restartConfirm.value) {
        restartConfirm.value = true;
        shutdownConfirm.value = false;
    } else if (type === "shutdown" && !shutdownConfirm.value) {
        shutdownConfirm.value = true;
        restartConfirm.value = false;
    } else {
        confirmPower(type);
    }
}

function confirmPower(type: "restart" | "shutdown") {
    const payload = {
        action: "",
        peerType: "settings",
        name: "icewhale_settings",
        routerPath: "/general",
    };
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
            break;
    }
}

function getRealeaseStatus() {
    install.getStatus().then(({ data }) => {
        isUpdateSys.value =
            data.data?.status === "idle" && data.message === "ready-to-update";
    });
}

function resetStatus() {
    restartConfirm.value = false;
    shutdownConfirm.value = false;
}

function getUpgradableAppList() {
    appStoreAPI.upgradableAppList().then((res) => {
        upgradableAppList.value = res.data.data || [];
        if (upgradableAppList.value.length > 0) {
            isUpdateApps.value = true;
        }
    });
}

const { t } = useI18n();
const confirm = useConfirm();
function handleButtonClick(type: "restart" | "shutdown") {
    if (window.innerWidth <= 640) {
        callConfirmView(type);
    } else {
        onPower(type);
    }
}
function callConfirmView(type: "restart" | "shutdown") {
    confirm.require({
        group: "secondary_confirmation_dialog",
        message: t(`Are you sure?`),
        header: `${type}`,
        rejectLabel: 'Cancel',
        acceptLabel: 'confirm',
        accept: () => {
            confirmPower(type);
        },
        reject: () => {
            resetStatus();
        },
    });
}
</script>
<!-- css components: os_panel menu_bar -->
<template>
    <div class="os_menu_bar">
        <span class="menu_bar_title">
            {{ $t("Settings") }}
        </span>
        <div class="menu_bar_author">
            <Image class="author_image" :src="avatar || authorImage"></Image>
            <div class="author_name" :title="userName">
                {{ userName }}
            </div>
        </div>

        <div class="menu_bar_update" v-show="isUpdateSys || isUpdateApps">
            <router-link
                :to="{
                    path: '/update',
                    query: {
                        isUpdateSys: isUpdateSys.toString(),
                        isUpdateApps: isUpdateApps.toString(),
                    },
                }"
                class="flex items-center"
            >
                <div
                    class="w-4 h-4 m-[10px] rounded-full bg-brand-400 flex-shrink-0 text-white flex items-center justify-center text-xs"
                >
                    {{ upgradableAppList.length || 1 }}
                </div>
                <Button :label="$t('update')"> </Button>
            </router-link>
        </div>

        <div class="menu_bar_selector">
            <router-link
                v-for="item in routes.filter((t) => t?.name !== undefined)"
                :to="item.path"
                class="os_menu"
            >
                <Button :label="$t(item.name as string)" :icon="item.icon">
                </Button>
            </router-link>
        </div>

        <div class="menu_bar_footer" v-on-click-outside="resetStatus">
            <Button
                :label="restartConfirm ? $t(`Are you sure?`) : $t(`Restart`)"
                icon="casa-restart-outline"
                @click="handleButtonClick('restart')"
            >
            </Button>
            <Button
                :label="shutdownConfirm ? $t(`Are you sure?`) : $t(`Shutdown`)"
                icon="casa-shutdown-outline"
                @click="handleButtonClick('shutdown')"
            >
            </Button>
        </div>
    </div>
</template>
