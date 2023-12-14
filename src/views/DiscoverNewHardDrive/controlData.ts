import { ref } from "vue";
import { disk } from "@network/index.ts";
import { mapIndexForDiskHub } from "@views/StorageManager/controlData.ts";
const allNewDiskStatus = ref(new Map());
const loadAllNewDiskStatus = (): void => {
    disk.getDisks("show").then((res) => {
        if (res.status === 200 && res.data.data) {
            allNewDiskStatus.value = new Map(
                res.data.data
                    .filter((item) => item.model !== "System")
                    .map((item) => {
                        return [mapIndexForDiskHub.get(item.index as number), item];
                    })
            );
        }
    });
};
export {
    allNewDiskStatus,
    loadAllNewDiskStatus
}