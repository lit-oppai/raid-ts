// TODO: Replace with fetch API.
import axios from "axios";
import {ref} from "vue";
// Setting Data Types && Naming conventions for Constants.
type DISK_TYPE = "SSD" | "HDD";
type DISK_INFO_TYPE = {
    "index": number,
    "avail": boolean,
    "name": string,
    "size": number,
    "health": string | boolean,
    "temperature": number,
    "disk_type": DISK_TYPE,
    "path": string,
    "model": string,
    // "need_format": boolean,
    // "serial": "NF6243T000696",
    // "children_number": number,
    // "supported": boolean,

};
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
    // "label": string,
    // "persisted_in": string,
    // "disk_type": DISK_TYPE,
}
type STORAGE_USAGE_INFO_TYPE = {
    SystemUsage: number,
    DataUsage: number,
    FilesUsage: number,
}
// type DISK_STATUS_TYPE = {
// }
// Data Acquisition.
async function getDiskInfo(): Promise<DISK_INFO_TYPE[] | any> {
    return axios.get("http://127.0.0.1:4523/m1/1026187-0-default/v1/disks").then((res) => res.data.data);
}
async function getStorageInfo(): Promise<STORAGE_INFO_TYPE[]> {
    return axios.get("http://127.0.0.1:4523/m1/1026187-0-default/v1/cloud").then((res) => res.data.data);
};
const HDDStatus: any = ref([])
const SSDStatus: any = ref([])
const usage: any = {}

// Data Cleaning.
const cleanDiskInfo = (diskInfo: DISK_INFO_TYPE[], storageInfo: STORAGE_INFO_TYPE[]) => {
    diskInfo.map((disk: any) => {
        // if (disk.model === "System") {
        //     usage.SystemUsage = disk.used / disk.size;
        // }
        if (disk.disk_type === "HDD" && disk.index > 0) {
            HDDStatus.value[disk.index - 1] = {
                "avail": disk.avail,
                "health": disk.health,
                "temperature": disk.temperature,
            };
        } else if (disk.disk_type === "SSD") {
            SSDStatus.value.push( {
                "avail": disk.avail,
                "health": disk.health,
                "temperature": disk.temperature,
            });
        }
    });
    for (let i = 0; i < 6; i++) {
        if (typeof HDDStatus.value[i] !== 'object') {
            HDDStatus.value[i] = {
                "avail": false,
                "health": false,
                "temperature": 0,
            };
        }
    }
    for (let i = 0; i < 4; i++) {
        if (typeof SSDStatus.value[i] !== 'object') {
            SSDStatus.value[i] = {
                "avail": false,
                "health": false,
                "temperature": 0,
            };
        }
    }
    // 存储用量
    storageInfo.map((storage: any) => {
        storage.model
    });
}

// Data Lifecycle Management.
const initStorageInfo = async (): Promise<void> => {
    const diskInfo = await getDiskInfo();
    const storageInfo = await getStorageInfo();
    cleanDiskInfo(diskInfo, storageInfo);
}
export default initStorageInfo;
export { HDDStatus, SSDStatus, usage };
