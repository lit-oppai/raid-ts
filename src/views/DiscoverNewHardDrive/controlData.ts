import { ref } from "vue";
import { disk } from "@network/index.ts";
import { IndexForDiskHubMap } from "@views/StorageManager/controlData.ts";
const allNewDiskStatus = ref(new Map());
const loadAllNewDiskStatus = (): void => {
    disk.getDisks("show").then((res) => {
        if (res.status === 200 && res.data.data) {
            allNewDiskStatus.value = new Map(
                res.data.data
                    .filter((item) => item.model !== "System")
                    .map((item) => {
                        // TODO: 数据处理，理应与 storage 数据模型保持一致，后续理应创建统一处理后端数据的函数
                        item.type = item.rota ? 'HDD' : 'SSD';
                        return [IndexForDiskHubMap.get(item.index as number), item];
                    })
            );
        }
    });
};
export {
    allNewDiskStatus,
    loadAllNewDiskStatus
}
