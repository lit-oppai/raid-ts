import { ref } from "vue";
import { diskAPI } from "@network/index.ts";
import { INDEX_TO_DISK_HUB_MAP } from "@views/StorageManager/const.ts";
const allNewDiskStatus = ref(new Map());
const loadAllNewDiskStatus = async (): Promise<void> => {
    return diskAPI.getDisks("show").then((res) => {
        if (res.status === 200 && res.data.data) {
            allNewDiskStatus.value = new Map(
                res.data.data
                    .filter((item) => item.model !== "System")
                    .sort((a, b) => Number(a.index) - Number(b.index))
                    .map((item) => {
                        // TODO: 数据处理，理应与 storage 数据模型保持一致，后续理应创建统一处理后端数据的函数
                        item.type = item.rota ? 'HDD' : 'SSD';
                        return [INDEX_TO_DISK_HUB_MAP.get(item.index as number), item];
                    })
            );
        }
    });
};
export {
    allNewDiskStatus,
    loadAllNewDiskStatus
}
