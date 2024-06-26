// 1. 系统盘：ZimaOS - HD（不可更改）
// 2. HDD：HDD - Storage
// 3. SSD：SSD - Storage
// 4. RAID1：Safe - Storage
// 5. RAID0：Quick - Storage
// 6. RAID5：Main - Storage
export enum STORAGE_NAME_ENUM {
    System = 'ZimaOS-HD',
    HDD = 'HDD-Storage',
    SSD = 'SSD-Storage',
    RAID0 = 'Quick-Storage',
    RAID1 = 'Safe-Storage',
    RAID5 = 'Main-Storage',
}

export const INDEX_TO_DISK_HUB_MAP = new Map<number, string>([
    [1, '1'],
    [2, '2'],
    [3, '3'],
    [4, '4'],
    [5, '5'],
    [6, '6'],

    [90, 'A'],
    [91, 'B'],
    [92, 'C'],
    [93, 'D']
])
