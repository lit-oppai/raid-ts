// 场景，进入此页面的上下文
type EntranceContextType =
    | 'Create'
    | 'Modify'
    | 'FirstAid'
    | 'CreateStorage'
    | 'EnableStorage'
type RAIDStrategy = 'RAID0' | 'RAID1' | 'RAID5'
type StepsSign = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type { EntranceContextType, RAIDStrategy, StepsSign }
