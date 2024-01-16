/* 
    entity: storage page Data.
    private methods:
        1. initStoragePageData: init storage page data.
        2. resetStoragePageData: destroy storage page data.
        3. reloadServiceData: reload storage page data.
        4. reloadStorageInfo: reload storage info.
        5. reloadDiskInfo: reload disk info.
    public method:
        1. useStoragePageDataBindingLifecycle: use storage page data binding lifecycle.
        2. useStorageInfo: use storage info.
        3. useReloadStoragePageData: use reload storage info.
    public property:
        1. HDDStatus: HDD status.
        2. SSDStatus: SSD status.
        3. storageInfoMap: storage info.
        4. unhealthyLabel: unhealthy disk of the storage lable.
        5. sysStorageInfo: system storage info.
        6. RAIDCandidateDiskCount: RAID candidate disk count.
        7. totalStorageUsageStatus: usage status.
        8. isStoragePageDataLoading: is loading storage info.
        9. collectionOfStorageNames: storage name collection.
 */
// TODO: Replace with fetch API.
import { ref, reactive, onBeforeMount, onUnmounted } from 'vue'
import openAPI from '@network/index.ts'

// Setting Data Types && Naming conventions for Constants.
import {
    DiskDriveType,
    DISK_API_SCHEMA,
    DISK_UI_TYPE,
    StorageType,
    STORAGE_API_SCHEMA,
    STORAGE_UI_TYPE,
    STORAGE_USAGE_INFO_TYPE
} from './controlData.d'

// Data Acquisition.
async function getDiskInfo(): Promise<DISK_API_SCHEMA[] | any> {
    return openAPI.disk
        .getDisks()
        .then((res: any) => res.data.data)
        .catch(() => [])
}
async function getStorageInfo(): Promise<STORAGE_API_SCHEMA[]> {
    const a = await openAPI.raid
        .getRaids()
        .then((res: any) => res.data.data)
        .catch(() => [])
    const b = await openAPI.storage
        .getStorage('show')
        .then((res: any) => res.data.data)
        .catch(() => [])
    return [...a, ...b]
}

export const HDDStatus = reactive(new Map<string, DISK_UI_TYPE>())
export const SSDStatus = reactive(new Map<string, DISK_UI_TYPE>())
//  除去系统盘之外的 storage
export const storageInfoMap = reactive(new Map<string, STORAGE_UI_TYPE>())
export const unhealthyLabel = ref<string>()

// 系统 storage 信息
// TODO: it should be a constant.
export let sysStorageInfo = reactive<STORAGE_UI_TYPE | any>({})
// RAID 候选盘数量
export const RAIDCandidateDiskCount = ref<number>(0)
// 纯数值，方便后面组合计算比例
export const totalStorageUsageStatus = ref<STORAGE_USAGE_INFO_TYPE>({
    SystemUsage: 2340421632,
    DataUsage: 0,
    DataFree: 0,
    FilesUsage: 0,
    FilesFree: 0
})
import { STORAGE_NAME_ENUM, INDEX_TO_DISK_HUB_MAP } from './const.ts'
// process storage name
class StorageNameCollection {
    private storageNames = new Set<string>()
    addName(name: string): void {
        this.storageNames.add(name)
    }
    hasName(name: string): boolean {
        return this.storageNames.has(name)
    }
    beNamed(storageType: keyof typeof STORAGE_NAME_ENUM): string {
        const prefixName = STORAGE_NAME_ENUM[storageType]
        if (!this.hasName(prefixName)) {
            return prefixName
        }

        let index = 1
        while (this.hasName(prefixName + index)) {
            index++
        }

        return prefixName + index
    }
    clear(): void {
        this.storageNames.clear()
    }
    log(label: string = 'storageNames'): void {
        console.log(label, this.storageNames)
    }
}
export const collectionOfStorageNames = new StorageNameCollection()
// --- DATA CLEANING ---
// load disk info
const initDiskInfo = async (): Promise<void> => {
    const disksInfo = await getDiskInfo()
    rinseDiskInfo(disksInfo)
}
const rinseDiskInfo = (disksInfo: DISK_API_SCHEMA[]) => {
    RAIDCandidateDiskCount.value = 0
    // clear
    HDDStatus.clear();
    SSDStatus.clear();
    // rinse
    disksInfo.map((disk: any) => {
        // if (disk.type === "HDD" && disk.index > 0) {
        disk.free && RAIDCandidateDiskCount.value++
        if (disk.index < 7 && disk.index > 0) {
            HDDStatus.set(disk.index + '', {
                exit: true,
                health: disk.health === 'true',
                temperature: disk.temperature,
                name: disk.name,
                size: disk.size,
                type: disk.rota ? 'HDD' : 'SSD',
                path: disk.path,
                model: disk.model,
                // "candidate": disk.health && disk.children.length <= 1 && (disk.children[0]?.raid ?? false) === false,
                allocatedStorageSpace:
                    disk.children[0]?.storage_name ||
                    disk?.storage_name,
                RaidStrategy: disk.children[0]?.raid_level
                    ? 'RAID' + disk.children[0]?.raid_level
                    : '',
                unused: disk.free,
                children: disk.children,
                children_number: disk.children_number,
                support: disk.support
            })
        } else if (['SSD', 'NVME'].includes(disk.type) && disk.index) {
            const key = INDEX_TO_DISK_HUB_MAP.get(disk.index)
            key &&
                SSDStatus.set(key, {
                    exit: true,
                    health: disk.health === 'true',
                    temperature: disk.temperature,
                    name: disk.name,
                    size: disk.size,
                    type: disk.rota ? 'HDD' : 'SSD',
                    path: disk.path,
                    model: disk.model,
                    // "candidate": disk.health && disk.children.length <= 1 && (disk.children[0]?.raid ?? false) === false,
                    allocatedStorageSpace:
                        disk.children[0]?.storage_name ||
                        disk?.storage_name,
                    RaidStrategy: disk.children[0]?.raid_level
                        ? 'RAID' + disk.children[0]?.raid_level
                        : '',
                    unused: disk.free,
                    children: disk.children,
                    children_number: disk.children_number,
                    support: disk.support
                })
        }
    })
    for (let i = 1; i < 7; i++) {
        if (typeof HDDStatus.get(i + '') !== 'object') {
            HDDStatus.set(i + '', {
                exit: false,
                health: false,
                temperature: 0,
                expect_type: '3.5inch HDD'
            })
        }
    }
    for (let i = 91; i < 95; i++) {
        const key = INDEX_TO_DISK_HUB_MAP.get(i)
        if (key && typeof SSDStatus.get(key) !== 'object') {
            SSDStatus.set(key, {
                exit: false,
                health: false,
                temperature: 0,
                expect_type: 'm.2 SSD'
            })
        }
    }
}
// load storage info 
const initStorageInfo = async (): Promise<void> => {
    const storageInfo = await getStorageInfo()
    rinseStorageInfo(storageInfo)
}
const rinseStorageInfo = (storageInfo: STORAGE_API_SCHEMA[]) => {
    // 存储用量
    let dataUsage = 0,
        dataFree = 0,
        fileFree = 0,
        filesUsage = 0
    // clear
    storageInfoMap.clear()
    collectionOfStorageNames.clear()
    unhealthyLabel.value = undefined
    // rinse
    storageInfo.map((storage: STORAGE_API_SCHEMA): void => {
        collectionOfStorageNames.addName(storage.name)
        // TODO: 优化, 在后端统一“ZimaOS-HD” 名称。
        let name = storage.name
        if (name === 'System') {
            dataUsage = Number(storage.used)
            dataFree = Number(storage.avail)
            name = STORAGE_NAME_ENUM.System
            sysStorageInfo = {
                name,
                uuid: storage?.uuid,
                size: storage.size,
                avail: storage.avail ?? 0,
                used: storage.used,
                disk_type: storage.disk_type as DiskDriveType,
                path: storage.path,
                label: name,
                health: storage.health,
                raid: false
            }
        } else {
            // TODO：优化，后端统一返回数值，统一返回数据单位。此处，当时 raid 时，size 为字节。
            let storageSize: number = Number(storage.size)
            let storageUsedSize: number = Number(storage.used)
            const isRaid: boolean = storage.raid_level !== undefined
            // raid 健康的定义：所有盘健康，且无盘缺失。
            let storageHealth: boolean = isRaid
                ? storage.shortage !== true &&
                storage.devices &&
                storage.devices?.every(
                    (device: { health: any }) => device.health
                )
                : storage.health

            if (isRaid) {
                storageSize *= 1024
            }
            fileFree += storageSize - storageUsedSize
            filesUsage += storageUsedSize
            storageInfoMap.set(name, {
                uuid: storage?.uuid,
                name: name,
                size: storageSize,
                avail: storageSize - storageUsedSize,
                used: storageUsedSize,
                type: (isRaid
                    ? 'RAID' + storage.raid_level
                    : storage?.disk_type?.toUpperCase() === 'SATA'
                        ? 'HDD'
                        : 'SSD') as StorageType,
                path: storage.path,
                raid: isRaid,
                raid_level: storage.raid_level,
                label: name,
                health: storageHealth,
                shortage: storage.shortage
            })

            if (isRaid && storageHealth !== undefined && !storageHealth) {
                unhealthyLabel.value = storage.name
            }
        }
    })
    totalStorageUsageStatus.value = {
        SystemUsage: 2340421632,
        DataUsage: dataUsage,
        DataFree: dataFree,
        FilesUsage: filesUsage,
        FilesFree: fileFree
    }
}

// Data Lifecycle Management -- init.
export const isStoragePageDataLoading = ref<boolean>(false)
const initStoragePageData = (): void => {
    isStoragePageDataLoading.value = true
    Promise.all([initDiskInfo(), initStorageInfo()]).then(() => {
        isStoragePageDataLoading.value = false
    })
}

const resetStoragePageData = (): void => {
    HDDStatus.clear()
    SSDStatus.clear()
    storageInfoMap.clear()
    sysStorageInfo = {}
    RAIDCandidateDiskCount.value = 0
    totalStorageUsageStatus.value.DataUsage = 0
    totalStorageUsageStatus.value.DataFree = 0
    totalStorageUsageStatus.value.FilesUsage = 0
    totalStorageUsageStatus.value.FilesFree = 0
}
// TODO: clear data when unmount.
// Vue has complete management of it.
const destroyStoragePageData = (): void => {
    resetStoragePageData()
}
// socket
import { socket } from "@network/socket.ts";
export const useStoragePageDataBindingLifecycle = () => {
    // First time init.
    onBeforeMount(() => {
        initStoragePageData()

        socket.on("local-storage:disk:added", () => {
            initStoragePageData();
        });
        socket.on("local-storage:disk:removed", () => {
            initStoragePageData();
        });
    })
    onUnmounted(() => {
        destroyStoragePageData()
        socket.off("local-storage:disk:added");
        socket.off("local-storage:disk:removed");
    })
    return {
        HDDStatus,
        SSDStatus,
        storageInfoMap,
        unhealthyLabel,
        sysStorageInfo,
        RAIDCandidateDiskCount,
        totalStorageUsageStatus,
        isStoragePageDataLoading,
        collectionOfStorageNames
    }
}
// THINK: 直接返回数据与调用方法返回数据无差别。
// 直接返回：调用简单，只读数据，无需考虑数据的生命周期。
// 调用方法返回：可以添加逻辑、符合统一调用方式。
export const useStorageInfo = () => {
    return {
        reloadServiceData: initStoragePageData,
    }
}

export {
    initStoragePageData as reloadServiceData,
}
