import { Raid as RAID_API_SCHEMA, Storage as STORAGE_API_SCHEMA } from "@icewhale/zimaos-localstorage-openapi"
export type DiskDriveType = 'SSD' | 'HDD'
export type RaidStrategy = 'RAID0' | 'RAID1' | 'RAID5'
export interface DISK_API_SCHEMA {
    index: number
    avail: boolean
    name: string
    size: number
    health: string
    free: boolean
    temperature: number
    type: DiskDriveType
    path: string
    model: string
    // "need_format": boolean,
    // "serial": "NF6243T000696",
    // "supported": boolean,
    storage_name: string
    children: Array<
        | {
            mount_point: string
            name: string
            raid: boolean
            raid_level: number
            path: string
            size: number
            supported: boolean
            storage_name: string
        }
        | undefined
    >
    children_number: number
    support: boolean
    rota: boolean
}
export type DISK_UI_TYPE = {
    exit: boolean
    health: boolean
    temperature: number
    name?: string
    size?: number
    type?: DiskDriveType
    expectType?: string
    path?: string
    model?: string
    // RAID 备选盘 1、状态健康 2、未被占用
    // 2023年12月01日 不再使用备选盘，只有未使用的盘可以进入 raid
    // "candidate"?: boolean,
    allocatedStorageSpace?: string
    RaidStrategy?: RaidStrategy | string
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
export type StorageType = DiskDriveType | RaidStrategy

export type STORAGE_API_SCHEMA = Record<RAID_API_SCHEMA | STORAGE_API_SCHEMA>
// TODO: API Schema 并不符合实际。规范之后，使用下面的方式。
// export interface STORAGE_API_SCHEMA extends STORAGE_API_SCHEMA extends RAID_API_SCHEMA{}

export type STORAGE_UI_TYPE = {
    uuid?: string
    name: string // KeyID
    size: number
    avail: number
    used: number
    path: string
    raid: boolean
    raid_level?: number
    label: string
    type: StorageType
    health: boolean
    shortage?: boolean
    driveName?: string
}
export type STORAGE_USAGE_INFO_TYPE = {
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
