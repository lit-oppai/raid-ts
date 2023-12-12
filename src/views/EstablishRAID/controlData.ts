import { computed, ComputedRef, ref, Ref, customRef, reactive } from 'vue'
import OverviewPart from './OverviewPart.vue'
import SelectRAIDPart from './SelectRAIDPart.vue'
import ConfirmRAIDPart from './ConfirmRAIDPart.vue'
import CreatingRAIDPart from './CreatingRAIDPart.vue'
import ResultRAIDPart from './ResultRAIDPart.vue'
import AddToRAIDPart from './AddToRAIDPart.vue'
import { EntranceContextType, RAIDStrategy } from './controlData.d'
// ----------------------------------------
// TODO: 只被外部传参使用
const formatePath = ref<string>('')
// ----------------------------------------
const context = ref<EntranceContextType>('Create')
const changeContext = (type: EntranceContextType) => {
    context.value = type
}
const stepschain: ComputedRef<
    (
        | typeof OverviewPart
        | typeof SelectRAIDPart
        | typeof ConfirmRAIDPart
        | typeof CreatingRAIDPart
        | typeof ResultRAIDPart
        | typeof AddToRAIDPart
    )[]
> = computed(() => {
    return stepschainMap[context.value]
})
const stepschainMap: {
    [key: string]: (
        | typeof OverviewPart
        | typeof SelectRAIDPart
        | typeof ConfirmRAIDPart
        | typeof CreatingRAIDPart
        | typeof ResultRAIDPart
        | typeof AddToRAIDPart
    )[]
} = {
    Create: [
        OverviewPart,
        SelectRAIDPart,
        ConfirmRAIDPart,
        CreatingRAIDPart,
        ResultRAIDPart
    ],
    Modify: [SelectRAIDPart, ConfirmRAIDPart, CreatingRAIDPart, ResultRAIDPart],
    FirstAid: [
        AddToRAIDPart,
        ConfirmRAIDPart,
        CreatingRAIDPart,
        ResultRAIDPart
    ],
    CreateStorage: [ConfirmRAIDPart, CreatingRAIDPart, ResultRAIDPart],
    EnableStorage: [CreatingRAIDPart, ResultRAIDPart]
}
// TODO: 设定值从 0-7
const currentStep = ref(0)
const currentStepName = computed(() => {
    return stepschain.value[currentStep.value].__name
})
const selectRAIDStrategy: Ref<RAIDStrategy | ''> = ref('')
const selectStorageList = customRef((track, trigger) => {
    let value: string[] = []
    return {
        get() {
            track()
            return value
        },
        set(newValue) {
            newValue.sort((a: string, b: string) => (a > b ? 1 : -1))
            value = newValue
            trigger()
        }
    }
})
// 当前操作的存储池名称
const nameStorage = ref('Main-Storage')
const checkedCreateRAID = ref<boolean>(false)
// Getting RAID Status
type Orientation = 'next' | 'prev'
const stepByStep = (orientation: Orientation) => {
    switch (orientation) {
        case 'next':
            currentStep.value++
            break
        case 'prev':
            currentStep.value--
            break
        default:
            break
    }
}
const resultRAIDInfo = reactive<{
    btnText: string
    butFunc: () => void
    success: boolean
    messages?: string
    capacity: number
}>({
    btnText: '',
    butFunc: () => { },
    success: true,
    capacity: 0
})
// 选择磁盘
const selectedFidDisk = ref<string>()
// 最小的盘尺寸
const needMinNewDiskSize = ref<number>(0)
const needFirstAidRaid = ref<string>()
// 扩容
const diskListByStorageSpace = ref<string[]>([])
const extendRaidPath = ref<string>()

const clear = (): void => {
    currentStep.value = 0
    selectRAIDStrategy.value = ''
    selectStorageList.value = []
    nameStorage.value = 'Main-Storage'
    checkedCreateRAID.value = false
    resultRAIDInfo.btnText = ''
    resultRAIDInfo.butFunc = () => { }
    resultRAIDInfo.success = true
    resultRAIDInfo.capacity = 0
    selectedFidDisk.value = ''
    needMinNewDiskSize.value = 0
    needFirstAidRaid.value = ''
    diskListByStorageSpace.value = []
    extendRaidPath.value = ''
}
export {
    currentStep,
    currentStepName,
    selectRAIDStrategy,
    selectStorageList,
    nameStorage,
    checkedCreateRAID,
    stepByStep,
    resultRAIDInfo,
    selectedFidDisk,
    needMinNewDiskSize,
    needFirstAidRaid,
    diskListByStorageSpace,
    extendRaidPath,
    // resultRAID,
    // resultCapacity,
    // TODO: 暂时放在 controlView.ts 中。
    stepschain,
    stepschainMap,
    context,
    changeContext,
    clear,

    // TODO: 只被外部传参使用
    formatePath
}
