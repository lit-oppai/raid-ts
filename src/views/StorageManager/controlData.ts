// TODO: Replace with fetch API.
import { ref, reactive } from 'vue'
import openAPI from '@/network'

// Setting Data Types && Naming conventions for Constants.
type DISK_TYPE = 'SSD' | 'HDD' | 'NVME' | 'SATA'
type DISK_INFO_TYPE = {
    index: number
    avail: boolean
    name: string
    size: number
    health: string | boolean
    free: boolean
    temperature: number
    type: DISK_TYPE
    path: string
    model: string
    // "need_format": boolean,
    // "serial": "NF6243T000696",
    // "supported": boolean,
    children: Array<
        | {
            mount_point: string
            name: string
            raid: boolean
            raid_level: number
            path: string
            size: number
            supported: boolean
        }
        | undefined
    >
    children_number: number
    support: boolean
    rota: boolean
}
type UI_DISK_INFO_TYPE = {
    exit: boolean
    health: boolean
    temperature: number
    name?: string
    size?: number
    type?: DISK_TYPE
    path?: string
    model?: string
    // RAID 备选盘 1、状态健康 2、未被占用
    // 2023年12月01日 不再使用备选盘，只有未使用的盘可以进入 raid
    // "candidate"?: boolean,
    RaidAssignment?: string
    // "occupied"?: string,
    unused?: boolean
    children?: Array<
        | {
            mount_point: string
            name: string
            raid: boolean
            raid_level: number
            path: string
            size: number
            supported: boolean
        }
        | undefined
    >
    children_number?: number
    support?: boolean
}
type STORAGE_TYPE = 'ext4' | 'xfs' | 'ntfs' | 'fat32' | 'exfat'
type STORAGE_INFO_TYPE = {
    uuid?: string
    name: string // KeyID
    path: string
    mount_point: string
    size: string | number
    avail?: string | number
    used: string | number
    type?: STORAGE_TYPE
    drive_name?: string

    label?: string
    children?: Array<
        | {
            mount_point: string
            name: string
            raid: boolean
            raid_level: number
        }
        | undefined
    >
    // "persisted_in": string,
    // sata、nvme
    disk_type?: DISK_TYPE
    health: boolean
    // "raid": boolean,
    raid_level?: number
    shortage?: boolean
    devices?: Array<{ health: boolean }>
}
type UI_STORAGE_INFO_TYPE = {
    uuid?: string
    name: string // KeyID
    // "mount_point": string,
    size: string | number
    avail: string | number
    used: string | number
    // "type": STORAGE_TYPE,
    path: string
    // "drive_name": string,
    raid: boolean
    raid_level?: number
    label: string
    // "children": Array<{ mount_point: string, name: string, raid: boolean, raid_level: number } | undefined>,
    // "persisted_in": string,
    disk_type: DISK_TYPE
    health: boolean
    shortage?: boolean
}
type STORAGE_USAGE_INFO_TYPE = {
    // 系统空间占用量
    SystemUsage: 2340421632
    // 数据空间占用量
    DataUsage: number
    // 数据空间剩余量
    DataFree: number
    // 文件空间占用量
    FilesUsage: number
    // 文件空间剩余量
    FilesFree: number
}
// type DISK_STATUS_TYPE = {
// }
// Data Acquisition.
async function getDiskInfo(): Promise<DISK_INFO_TYPE[] | any> {
    return openAPI.disk.getDisks().then((res: any) => res.data.data)
    // return axios.get("http://127.0.0.1:4523/m1/1026187-0-default/v1/disks").then((res) => res.data.data);
}
async function getStorageInfo(): Promise<STORAGE_INFO_TYPE[]> {
    const a = await openAPI.raid.getRaids().then((res: any) => res.data.data)
    const b = await openAPI.storage
        .getStorage('show')
        .then((res: any) => res.data.data)
    return [...a, ...b]
    // return StorageMethodsService.getStorage('show', '/').then((res: any) => res.data.data);
    // return axios.get("http://127.0.0.1:4523/m1/1026187-0-default/v1/cloud").then((res) => res.data.data);
}
// const HDDStatus = ref<UI_DISK_INFO_TYPE[]>([])
const HDDStatus = reactive(new Map<string, UI_DISK_INFO_TYPE>())
// const SSDStatus = ref<UI_DISK_INFO_TYPE[]>([])
const SSDStatus = reactive(new Map<string, UI_DISK_INFO_TYPE>())
//  除去系统盘之外的 storage
const storageInfoMap = reactive(new Map<string, UI_STORAGE_INFO_TYPE>())
// 系统 storage 信息
let sysStorageInfo = reactive<UI_STORAGE_INFO_TYPE | any>({})
// RAID 候选盘数量
const RAIDCandidateDiskCount = ref<number>(0)
// 纯数值，方便后面组合计算比例
const usageStatus = ref<STORAGE_USAGE_INFO_TYPE>({
    SystemUsage: 2340421632,
    DataUsage: 0,
    DataFree: 0,
    FilesUsage: 0,
    FilesFree: 0
})

const mapIndexForDiskHub = new Map<number, string>([
    [1, '1'],
    [2, '2'],
    [3, '3'],
    [4, '4'],
    [5, '5'],
    [6, '6'],

    [91, 'A'],
    [92, 'B'],
    [93, 'C'],
    [94, 'D']
])
import { EnumStorageNames } from './const'
// Data Cleaning.
const rinseDiskInfo = (
    disksInfo: DISK_INFO_TYPE[],
    storageInfo: STORAGE_INFO_TYPE[]
) => {
    disksInfo.map((disk: any) => {
        // if (disk.type === "HDD" && disk.index > 0) {
        if (disk.index < 7 && disk.index > 0) {
            HDDStatus.set(disk.index + '', {
                exit: true,
                health: disk.health,
                temperature: disk.temperature,
                name: disk.name,
                size: disk.size,
                type: disk.rota ? 'HDD' : 'SSD',
                path: disk.path,
                model: disk.model,
                // "candidate": disk.health && disk.children.length <= 1 && (disk.children[0]?.raid ?? false) === false,
                RaidAssignment:
                    (disk.children[0]?.raid === true &&
                        disk.children[0]?.storage_name) ||
                    '',
                unused: disk.free,
                children: disk.children,
                children_number: disk.children_number,
                support: disk.support
            })
            disk.free && RAIDCandidateDiskCount.value++
        } else if (['SSD', 'NVME'].includes(disk.type) && disk.index) {
            const key = mapIndexForDiskHub.get(disk.index)
            key &&
                SSDStatus.set(key, {
                    exit: true,
                    health: disk.health,
                    temperature: disk.temperature,
                    name: disk.name,
                    size: disk.size,
                    type: disk.rota ? 'HDD' : 'SSD',
                    path: disk.path,
                    model: disk.model,
                    // "candidate": disk.health && disk.children.length <= 1 && (disk.children[0]?.raid ?? false) === false,
                    RaidAssignment:
                        (disk.children[0]?.raid === true &&
                            disk.children[0]?.storage_name) ||
                        '',
                    unused: disk.free,
                    children: disk.children,
                    children_number: disk.children_number,
                    support: disk.support
                })
            disk.free && RAIDCandidateDiskCount.value++
        }
    })
    for (let i = 1; i < 7; i++) {
        if (typeof HDDStatus.get(i + '') !== 'object') {
            HDDStatus.set(i + '', {
                exit: false,
                health: false,
                temperature: 0
            })
        }
    }
    for (let i = 91; i < 95; i++) {
        const key = mapIndexForDiskHub.get(i)
        if (key && typeof SSDStatus.get(key) !== 'object') {
            SSDStatus.set(key, {
                exit: false,
                health: false,
                temperature: 0
            })
        }
    }
    // 存储用量
    let dataUsage = 0,
        dataFree = 0,
        fileFree = 0,
        filesUsage = 0
    storageInfo.map((storage: STORAGE_INFO_TYPE): void => {
        // TODO: 优化, 在后端统一“ZimaOS-HD” 名称。
        let name = storage.name
        if (name === 'System') {
            dataUsage = Number(storage.used)
            dataFree = Number(storage.avail)
            name = EnumStorageNames.System;
            sysStorageInfo = {
                name,
                uuid: storage?.uuid,
                size: storage.size,
                avail: storage.avail ?? 0,
                used: storage.used,
                disk_type: storage.disk_type as DISK_TYPE,
                path: storage.path,
                label: name,
                health: storage.health,
                raid: false,
            }
        } else {
            // TODO：优化，后端统一返回数值，统一返回数据单位。此处，当时 raid 时，size 为字节。
            let storageSize = Number(storage.size)
            if (storage?.raid_level !== undefined) {
                storageSize *= 1024
            }
            fileFree += storageSize - Number(storage.used)
            filesUsage += Number(storage.used)
            storageInfoMap.set(name, {
                uuid: storage?.uuid,
                // "mount_point": string,
                name: name,
                size: storage.size,
                avail: storageSize - Number(storage.used),
                used: storage.used,
                disk_type: storage?.disk_type?.toUpperCase() as DISK_TYPE,
                path: storage.path,
                // "drive_name": string,
                raid: storage.raid_level !== undefined,
                raid_level: storage.raid_level,
                label: name,
                health:
                    storage?.devices?.every(device => device.health) ||
                    storage.health,
                shortage: storage.shortage
            })
        }
    })
    usageStatus.value = {
        SystemUsage: 2340421632,
        DataUsage: dataUsage,
        DataFree: dataFree,
        FilesUsage: filesUsage,
        FilesFree: fileFree
    }
}

// Data Lifecycle Management.
const initStorageInfo = async (): Promise<void> => {
    const disksInfo = await getDiskInfo()
    const storageInfo = await getStorageInfo()
    // reload lifecycle.
    storageInfoMap.clear()
    RAIDCandidateDiskCount.value = 0
    rinseDiskInfo(disksInfo, storageInfo)
}
export default initStorageInfo
export {
    HDDStatus,
    SSDStatus,
    storageInfoMap,
    sysStorageInfo,
    initStorageInfo as reloadServiceData,
    RAIDCandidateDiskCount,
    usageStatus,
    mapIndexForDiskHub
}
