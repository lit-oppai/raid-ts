// 1. 系统盘：ZimaOS - HD（不可更改）
// 2. HDD：HDD - Storage
// 3. SSD：SSD - Storage
// 4. RAID1：Safe - Storage
// 5. RAID0：Quick - Storage
// 6. RAID5：Main - Storage
enum EnumStorageNames {
    System = 'ZimaOS-HD',
    HDD = 'HDD-Storage',
    SSD = 'SSD-Storage',
    RAID0 = 'Quick-Storage',
    RAID1 = 'Safe-Storage',
    RAID5 = 'Main-Storage',
}

export {
    EnumStorageNames
}
