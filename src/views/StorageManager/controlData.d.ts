type DISK_TYPE = 'SSD' | 'HDD'
type RAID_STRATEGY_TYPE = 'RAID0' | 'RAID1' | 'RAID5'
type DISK_INFO_TYPE = {
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
type UI_DISK_INFO_TYPE = {
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
    RaidAssignment?: string
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
type STORAGE_TYPE = DISK_TYPE | RAID_STRATEGY_TYPE
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
    // disk_type: DISK_TYPE
    type: STORAGE_TYPE
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
export type {
    DISK_TYPE,
    DISK_INFO_TYPE,
    UI_DISK_INFO_TYPE,
    STORAGE_TYPE,
    STORAGE_INFO_TYPE,
    UI_STORAGE_INFO_TYPE,
    STORAGE_USAGE_INFO_TYPE,
    
}
