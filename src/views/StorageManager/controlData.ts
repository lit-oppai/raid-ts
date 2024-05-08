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
        2. useStoragePageData: use storage info.
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
import { ref, reactive, onBeforeMount, onUnmounted, Ref }                    from 'vue'
import { diskAPI, raidAPI, storageAPI }                                      from '@network/index.ts'
import { useStorage }                                                        from '@vueuse/core'
import {
    DISK_API_SCHEMA,
    DISK_UI_TYPE,
    StorageType,
    STORAGE_API_SCHEMA,
    STORAGE_UI_TYPE,
    STORAGE_USAGE_INFO_TYPE
} from './controlData.d'

// Data Acquisition.
async function getDiskInfo(): Promise<DISK_API_SCHEMA[] | any> {
    return diskAPI
        .getDisks()
        .then((res: any) => res.data.data)
        .catch(() => [])
}
async function getStorageInfo(): Promise<STORAGE_API_SCHEMA[]> {
    const a = await raidAPI
        .getRaids()
        .then((res: any) => res.data.data)
        .catch(() => [])
    const b = await storageAPI
        .getStorage('show')
        .then((res: any) => res.data.data)
        .catch(() => [])
    return [...a, ...b]
}

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
import { STORAGE_NAME_ENUM, INDEX_TO_DISK_HUB_MAP }                          from './const.ts'
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
// Utility Functions
function createStorageStatus(defaultExpectType: string) {
    const status = reactive(new Map<string, DISK_UI_TYPE>())
    const setDefaultValues = (startIndex: number, endIndex: number) => {
        for (let i = startIndex; i <= endIndex; i++) {
            const key = INDEX_TO_DISK_HUB_MAP.get(i)
            key &&
                status.set(key, {
                    exit: false,
                    health: false,
                    temperature: 0,
                    expectType: defaultExpectType
                })
        }
    }
    return { status, setDefaultValues }
}
// Disk and Storage Info Initialization
// 'HDD',
const { status: HDDStatus, setDefaultValues: setDefaultHDDValues } =
    createStorageStatus('3.5inch HDD')
// 'SSD',
const { status: SSDStatus, setDefaultValues: setDefaultSSDValues } =
    createStorageStatus('m.2 SSD')

// load disk info
const disk_infos = useStorage('disk_infos_api', [], sessionStorage)
const initDiskInfo =  () => {
    // const disksInfo = await getDiskInfo()
    // rinseDiskInfo(disksInfo)
    // init disk data construct.
    setDefaultHDDValues(1, 6)
    setDefaultSSDValues(90, 93)
    // disksInfo.forEach(processDiskInfo)
    refreshDiskInfo();
}
// refesh disk_infos
const refreshDiskInfo = async (): Promise<void> => { 
    try {
        disk_infos.value = await getDiskInfo()
        RAIDCandidateDiskCount.value = 0
        disk_infos.value.forEach(processDiskInfo)
    } catch (error) { 
        console.log('error', error);
    }
}
// Disk Info Processing
function processDiskInfo(disk: DISK_API_SCHEMA): void {
    const indexStr = disk.index.toString()
    const baseInfo: DISK_UI_TYPE = {
        exit: true,
        health: disk.health === 'true',
        temperature: disk.temperature,
        name: disk.name,
        size: disk.size,
        type: disk.rota ? 'HDD' : disk.type === 'USB' ? 'USB' : 'SSD',
        path: disk.path,
        model: disk.model,
        allocatedStorageSpace:
            disk.children[0]?.storage_name || disk?.storage_name,
        RaidStrategy: disk.children[0]?.raid_level
            ? 'RAID' + disk.children[0]?.raid_level
            : '',
        unused: disk.free,
        children: disk.children,
        children_number: disk.children_number,
        support: disk.support
    }

    // disk.index !== -1 && disk.free && RAIDCandidateDiskCount.value++
    disk.free && RAIDCandidateDiskCount.value++
    if (disk.index > 0 && disk.index < 7) {
        HDDStatus.set(indexStr, baseInfo)
    } else if (
        ['SSD', 'NVME'].includes(disk.type) &&
        disk.index >= 90 &&
        disk.index <= 95
    ) {
        const key = INDEX_TO_DISK_HUB_MAP.get(disk.index)
        if (key) {
            SSDStatus.set(key, baseInfo)
        }
    }
}

// load storage info
const storage_infos:Ref<STORAGE_API_SCHEMA[]> = useStorage('storage_infos_api', [])
const initStorageInfo = () => {
    // clear
    storageInfoMap.clear()
    collectionOfStorageNames.clear()

    refreshStorageInfo();
}
const refreshStorageInfo = async (): Promise<void> => { 
    try {
        storage_infos.value = await getStorageInfo()
        unhealthyLabel.value = undefined
        storageInfoMap.clear();
        totalStorageUsageStatus.value.DataUsage = 0
        totalStorageUsageStatus.value.DataFree = 0
        totalStorageUsageStatus.value.FilesUsage = 0
        totalStorageUsageStatus.value.FilesFree = 0
        storage_infos.value.forEach(processStorageInfo)
    } catch (error) { 
        console.log('error', error);
    }

}
// Storage Info Processing
function processStorageInfo(storage: STORAGE_API_SCHEMA): void {
    const name =
        storage.name === 'System' ? STORAGE_NAME_ENUM.System : storage.name
    const isRaid = storage.raid_level !== undefined
    const storageSize = isRaid
        ? Number(storage.size) * 1024
        : Number(storage.size)
    const storageUsedSize = Number(storage.used)

    const storageHealth = isRaid
        ? storage.shortage !== true &&
        storage.devices?.every((device: { health: any }) => device.health)
        : storage.health

    const storageData: STORAGE_UI_TYPE = {
        uuid: storage?.uuid,
        name,
        size: storageSize,
        avail: storageSize - storageUsedSize,
        used: storageUsedSize,
        type: (isRaid
            ? 'RAID' + storage.raid_level
            : storage?.disk_type?.toUpperCase() === 'SATA'
                ? 'HDD'
                : storage?.disk_type?.toUpperCase() === 'USB'
                    ? 'USB'
                    : 'SSD') as StorageType,
        path: storage.path,
        raid: isRaid,
        raid_level: storage.raid_level,
        label: name,
        health: storageHealth,
        shortage: storage.shortage,
        driveName: storage?.drive_name
    }

    collectionOfStorageNames.addName(storage.name)

    if (storage.name === 'System') {
        sysStorageInfo = storageData
        totalStorageUsageStatus.value.DataUsage = storageData.used
        totalStorageUsageStatus.value.DataFree = storageData.avail
    } else {
        storageInfoMap.set(name, storageData)
        totalStorageUsageStatus.value.FilesUsage += storageData.used
        totalStorageUsageStatus.value.FilesFree += storageData.avail
    }

    if (isRaid && !storageHealth) {
        unhealthyLabel.value = storage.name
    }
}

// Data Lifecycle Management -- init.
export const isStoragePageDataLoading = ref<boolean>(false)
const reloadServiceData = (): void => {
    isStoragePageDataLoading.value = true;
    refreshDiskInfo();
    refreshStorageInfo();
    isStoragePageDataLoading.value = false;
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

// socket
import { socket }                                                            from '@network/socket.ts'

export const useStoragePageDataBindingLifecycle = () => {

    const initStoragePageData = (): void => {
        isStoragePageDataLoading.value = true;
        initDiskInfo();
        initStorageInfo();
        isStoragePageDataLoading.value = false;
    }

    // Vue has complete management of it.
    const destroyStoragePageData = (): void => {
        resetStoragePageData()
    }
    
    // Socket Event Handlers
    function handleDiskAdded(): void {
        // initDiskInfo()
        refreshDiskInfo();
    }
    
    function handleDiskRemoved(): void {
        initStoragePageData()
    }
    
    // First time init.
    onBeforeMount(() => {
        initStoragePageData()
        socket.on('local-storage:disk:added', handleDiskAdded)
        socket.on('local-storage:disk:removed', handleDiskRemoved)
    })
    onUnmounted(() => {
        destroyStoragePageData()
        socket.off('local-storage:disk:added', handleDiskAdded)
        socket.off('local-storage:disk:removed', handleDiskRemoved)
    })
    return useStoragePageData();
}
// THINK: 直接返回数据与调用方法返回数据无差别。
// 直接返回：调用简单，只读数据，无需考虑数据的生命周期。
// 调用方法返回：可以添加逻辑、符合统一调用方式。
export const useStoragePageData = () => {
    return {
        HDDStatus,
        SSDStatus,
        storageInfoMap,
        unhealthyLabel,
        sysStorageInfo,
        RAIDCandidateDiskCount,
        isStoragePageDataLoading,
        collectionOfStorageNames,
        
        totalStorageUsageStatus,
        reloadServiceData
    }
}

export { HDDStatus, SSDStatus, reloadServiceData }
