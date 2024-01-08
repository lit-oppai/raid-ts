import { Raid as RAID_API_SCHEMA, Storage as STORAGE_API_SCHEMA } from "@icewhale/zimaos-localstorage-openapi"
export type DISK_TYPE = 'SSD' | 'HDD'
export type RAID_STRATEGY_TYPE = 'RAID0' | 'RAID1' | 'RAID5'
export type DISK_INFO_TYPE = {
    index: number
    avail: boolean
    name: string
    size: number
    health: string
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
export type UI_DISK_INFO_TYPE = {
    exit: boolean
    health: boolean
    temperature: number
    name?: string
    size?: number
    type?: DISK_TYPE
    expect_type?: string
    path?: string
    model?: string
    // RAID 备选盘 1、状态健康 2、未被占用
    // 2023年12月01日 不再使用备选盘，只有未使用的盘可以进入 raid
    // "candidate"?: boolean,
    allocatedStorageSpace?: string
    RaidStrategy?: RAID_STRATEGY_TYPE | string
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
export type STORAGE_TYPE = DISK_TYPE | RAID_STRATEGY_TYPE

/* type RAID_API_SCHEMA = {
    devices: Array<{
        health: boolean
        model: string
        path: string
        size: number
        type: string
    }>
    finish_time: number
    mount_point: string
    name: string
    path: string
    percentage: number
    raid_level: number
    shortage: boolean
    size: number
    status: string
    used: number
} */


export type STORAGE_INFO_TYPE = Record<RAID_API_SCHEMA | STORAGE_API_SCHEMA>

export type UI_STORAGE_INFO_TYPE = {
    uuid?: string
    name: string // KeyID
    size: string | number
    avail: string | number
    used: string | number
    path: string
    raid: boolean
    raid_level?: number
    label: string
    type: STORAGE_TYPE
    health: boolean
    shortage?: boolean
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
