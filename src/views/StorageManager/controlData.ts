// TODO: Replace with fetch API.
import { ref, reactive } from "vue";
import openAPI from "@/network";

// Setting Data Types && Naming conventions for Constants.
type DISK_TYPE = "SSD" | "HDD" | "NVME";
type DISK_INFO_TYPE = {
    "index": number,
    "avail": boolean,
    "name": string,
    "size": number,
    "health": string | boolean,
    "temperature": number,
    "type": DISK_TYPE,
    "path": string,
    "model": string,
    // "need_format": boolean,
    // "serial": "NF6243T000696",
    // "children_number": number,
    // "supported": boolean,

};
type UI_DISK_INFO_TYPE = {
    "exit": boolean,
    "health": boolean,
    "temperature": number,
    "type"?: DISK_TYPE,
    "path"?: string,
    // RAID 备选盘 1、状态健康 2、未被占用
    "candidate"?: boolean,
    "occupied"?: string,
    "unused"?: boolean,
}
type STORAGE_TYPE = "ext4" | "xfs" | "ntfs" | "fat32" | "exfat";
type STORAGE_INFO_TYPE = {
    "uuid": string,
    "mount_point": string,
    "size": string | number,
    "avail": string | number,
    "used": string | number,
    "type": STORAGE_TYPE,
    "path": string,
    "drive_name": string,
    "raid": boolean,
    "raid_level": number,
    "label": string,
    "utilizations": Array<{ mount_point: string, name: string, raid: boolean, raid_level: number } | undefined>,
    // "persisted_in": string,
    // "disk_type": DISK_TYPE,
}
type STORAGE_USAGE_INFO_TYPE = {
    // 系统空间占用量
    SystemUsage: 2340421632,
    // 数据空间占用量
    DataUsage: number,
    // 数据空间剩余量
    DataFree: number,
    // 文件空间占用量
    FilesUsage: number,
    // 文件空间剩余量
    FileFree: number,
}
// type DISK_STATUS_TYPE = {
// }
// Data Acquisition.
async function getDiskInfo(): Promise<DISK_INFO_TYPE[] | any> {
    return openAPI.disk.getDisks().then((res: any) => res.data.data);
    // return axios.get("http://127.0.0.1:4523/m1/1026187-0-default/v1/disks").then((res) => res.data.data);
}
async function getStorageInfo(): Promise<STORAGE_INFO_TYPE[]> {
    return openAPI.storage.getStorage('show',).then((res: any) => res.data.data);
    // return StorageMethodsService.getStorage('show', '/').then((res: any) => res.data.data);
    // return axios.get("http://127.0.0.1:4523/m1/1026187-0-default/v1/cloud").then((res) => res.data.data);
};
// const HDDStatus = ref<UI_DISK_INFO_TYPE[]>([])
const HDDStatus = reactive(new Map<string, UI_DISK_INFO_TYPE>())
// const SSDStatus = ref<UI_DISK_INFO_TYPE[]>([])
const SSDStatus = reactive(new Map<string, UI_DISK_INFO_TYPE>())
// RAID 候选盘数量
const RAIDCandidateDiskCount = ref<number>(0);
// 纯数值，方便后面组合计算比例
const usageStatus = ref<STORAGE_USAGE_INFO_TYPE>({
    SystemUsage: 2340421632,
    DataUsage: 0,
    DataFree: 0,
    FilesUsage: 0,
    FileFree: 0,
});

const mapIndexForADCD = new Map<number, string>([
    [91, 'A'],
    [92, 'B'],
    [93, 'C'],
    [94, 'D'],
]);
// Data Cleaning.
const rinseDiskInfo = (disksInfo: DISK_INFO_TYPE[], storageInfo: STORAGE_INFO_TYPE[]) => {
    disksInfo.map((disk: any) => {
        // if (disk.type === "HDD" && disk.index > 0) {
        if (disk.index < 7 && disk.index > 0) {
            HDDStatus.set(disk.index + '', {
                "exit": true,
                "health": disk.health,
                "temperature": disk.temperature,
                "type": disk.type,
                "path": disk.path,
                "candidate": disk.health && (disk.utilizations[0]?.raid ?? false) === false,
                "occupied": disk.utilizations[0]?.name ?? "",
                "unused": disk.utilizations.length === 0,
            });
            RAIDCandidateDiskCount.value++;
        } else if (["SSD", 'NVME'].includes(disk.type) && disk.index) {
            const key = mapIndexForADCD.get(disk.index);
            key && SSDStatus.set(key, {
                "exit": true,
                "health": disk.health,
                "temperature": disk.temperature,
                "type": disk.type,
                "path": disk.path,
                "candidate": disk.health && (disk.utilizations[0]?.raid ?? false) === false,
                "occupied": disk.utilizations[0]?.name ?? "",
                "unused": disk.utilizations.length === 0,
            });
            RAIDCandidateDiskCount.value++;
        }
    });
    for (let i = 1; i < 7; i++) {
        if (typeof HDDStatus.get(i + '') !== 'object') {
            HDDStatus.set(i + '', {
                "exit": false,
                "health": false,
                "temperature": 0,
            });
        }
    }
    for (let i = 91; i < 95; i++) {
        const key = mapIndexForADCD.get(i);
        if (key && typeof SSDStatus.get(key) !== 'object') {
            SSDStatus.set(key, {
                "exit": false,
                "health": false,
                "temperature": 0,
            });
        }
    }
    // 存储用量
    let dataUsage = 0, dataFree = 0, fileFree = 0, filesUsage = 0;
    storageInfo.map((storage: STORAGE_INFO_TYPE): void => {
        if (storage.label === "System") {
            dataUsage = Number(storage.used)
            dataFree = Number(storage.avail)
        } else {
            fileFree += Number(storage.avail);
            filesUsage += Number(storage.used);
        }
    });
    usageStatus.value = {
        SystemUsage: 2340421632,
        DataUsage: dataUsage,
        DataFree: dataFree,
        FilesUsage: fileFree,
        FileFree: filesUsage,
    }
}

// TODO: Tools unit.
// 单位转换:bit 转 GB、TB、PB、EB、ZB、YB
const convertSizeToReadable = (size: number) => {
    const unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = 0;
    while (size >= 1024) {
        size = size / 1024;
        index++;
    }
    return size.toFixed(2) + unit[index];
}

// TODO: Tools unit.
// 单位转目标单位:bit 转 GB、TB、PB、EB、ZB、YB
const convertSizeToTargetUnit = (size: number, targetUnit: string): number => {
    const unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = 0, convertedSize: number = 0;
    const targetIndex = unit.indexOf(targetUnit.toUpperCase());

    if (targetIndex !== -1) {
        while (index <= targetIndex) {
            size = size / 1024;
            index++;
        }
        convertedSize = parseFloat(size.toFixed(2));
    }

    return convertedSize;
}
// Data Lifecycle Management.
const initStorageInfo = async (): Promise<void> => {
    const disksInfo = await getDiskInfo();
    const storageInfo = await getStorageInfo();
    rinseDiskInfo(disksInfo, storageInfo);
}
export default initStorageInfo;
export { HDDStatus, SSDStatus, RAIDCandidateDiskCount, usageStatus, convertSizeToReadable, convertSizeToTargetUnit };
