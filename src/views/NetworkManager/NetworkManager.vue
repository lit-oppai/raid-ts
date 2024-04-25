<script setup lang="ts">
import { ref, Ref, computed, onMounted }            from "vue";
import NetworkSketch                                from "./NetworkSketch.vue";
import NetworkProSketch                             from "./NetworkProSketch.vue";
import RemoteLoginCard                              from "./RemoteLoginCard.vue";
import NicCard                                      from "./NicCard.vue";
import { networkAPI, deviceAPI }                    from "@network/index.ts";
import { NetWorkInterfaceStatus }                   from "@icewhale/zimaos-openapi";
import { useStorage }                               from "@vueuse/core";

const network_interfaces_cache:Ref<NetWorkInterfaceStatus[]> = useStorage("network_interfaces_api", [], sessionStorage);
/* const NicDataList = ref<NetWorkInterfaceStatus[]>([
    // mock data
    {
        index: 0,
        ip: "",
        mac: "34:1a:4c:00:e5:0d",
        name: "eth0",
        negotiated_speed: 0,
        product: "Ethernet Controller I226-V",
        theoretical_speed: 2500000000,
        vendor: "Intel Corporation",
    },
    {
        index: 1,
        ip: "192.168.3.229",
        mac: "34:1a:4c:00:e5:1a",
        name: "eth1",
        negotiated_speed: 1000000000,
        product: "Ethernet Controller I226-V",
        theoretical_speed: 2500000000,
        vendor: "Intel Corporation",
    },
    {
        index: 10,
        ip: "",
        name: "thunderbolt10",
        negotiated_speed: 0,
        product: "Thunderbolt",
        theoretical_speed: 20000000000,
        vendor: "Inter",
    },
    {
        index: 11,
        ip: "",
        name: "thunderbolt11",
        negotiated_speed: 0,
        product: "Thunderbolt",
        theoretical_speed: 20000000000,
        vendor: "Inter",
    },
]); */
const isNormalLevel = ref<boolean>(true);
const isAccess = ref<boolean>(false);

// REMAKER: protogenesis NIC number is 1-9
const protogenesis_network_interfaces = computed(() => {
    // REMAKER: sort by index and filter index is 0-9 following left to right.
    return (
        network_interfaces_cache.value
            .filter((item) => item.index >= 0 && item.index < 10) ?? []
    );
});
// REMAKER: extend NIC number is -1
const extend_network_interfaces = computed(() => {
    return network_interfaces_cache.value?.filter((item) => item.index === -1) ?? [];
});
onMounted(() => {
    networkAPI.getNetworkInterfaces().then((res) => {
        if (res.status === 200) {
            // NicDataList.value = res.data?.sort((a, b) => a.index - b.index);
            network_interfaces_cache.value = res.data?.sort((a, b) => a.index - b.index);
        }
    });
    deviceAPI.getDeviceInfo().then((res) => {
        if (res.status === 200 && res.data.device_model !== "ZimaCube") {
            isNormalLevel.value = false;
        }
    });
});
function openPrivatePDF() {
    window.open("/privacy policy.pdf", "_blank");
}
function openLinkInstalledZimaOS() {
    window.open("https://findzima.com", "_blank");
}
</script>

<template>
    <!-- Sketch -->
    <div
        class="relative flex justify-center items-end space-x-3 active mt-[2.5rem]"
    >
        <NetworkSketch
            v-if="isNormalLevel"
            :NicDataList="protogenesis_network_interfaces"
        />
        <NetworkProSketch v-else :NicDataList="protogenesis_network_interfaces" />
        <div
            class="flex absolute space-x-[247px] text-neutral-400 text-xs font-normal"
        >
            <div v-t="`Back`"></div>
        </div>
    </div>

    <!-- Remote Login -->
    <RemoteLoginCard class="mt-6" @update:remoteAccessStatus="val => isAccess = val"></RemoteLoginCard>

    <!-- NIC -->
    <NicCard
        class="mt-2"
        v-for="item in extend_network_interfaces"
        :name="item.product"
        :state="item.ip !== ''"
        :theoretical-speed="item.theoretical_speed"
        :negotiated-speed="item.negotiated_speed"
    ></NicCard>

    <div class="mt-3 ml-0.5" v-show="!isAccess">
        <span
            class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-none pr-1"
        >
            {{ $t("Privacy Service Agreement.content") }}
        </span>
        <span
            class="text-sky-600 text-xs font-normal font-['Roboto'] leading-none cursor-pointer"
            @click="openPrivatePDF"
        >
            {{ $t("Privacy Service Agreement.title") }}
        </span>
    </div>

    <div class="mt-3 ml-0.5" v-show="isAccess">
        <span
            class="text-sky-600 text-xs font-normal font-['Roboto'] leading-none pr-1 cursor-pointer"
            @click="openLinkInstalledZimaOS"
        >
            {{ $t("Install ZimaClient") }}
        </span>
        <span
            class="text-neutral-400 text-xs font-normal font-['Roboto'] leading-none"
        >
            {{ $t("Install ZimaClient content") }}
        </span>
    </div>
</template>

<style></style>
