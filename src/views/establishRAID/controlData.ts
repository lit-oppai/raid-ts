import { computed, ComputedRef, ref, Ref } from "vue";
import OverviewPart from "./OverviewPart.vue";
import SelectRAIDPart from "./SelectRAIDPart.vue";
import ConfirmRAIDPart from "./ConfirmRAIDPart.vue";
import CreatingRAIDPart from "./CreatingRAIDPart.vue";
import ResultRAIDPart from './ResultRAIDPart.vue';
import AddToRAIDPart from './AddToRAIDPart.vue';
// type EntranceContextType = "Create" | "Modify" | "FirstAid";
import { EntranceContextType, RAIDStrategy } from "./controlData.d";
// import { RAIDCandidateDiskCount } from "@views/StorageManager/controlData.ts";
const RAIDStrategys: RAIDStrategy[] = ["RAID0", "RAID1", "RAID5"];

const context = ref<EntranceContextType>('Create');
const changeContext = (type: EntranceContextType) => {
    context.value = type;
}
const stepschain: ComputedRef<(typeof OverviewPart | typeof SelectRAIDPart | typeof ConfirmRAIDPart | typeof CreatingRAIDPart | typeof ResultRAIDPart | typeof AddToRAIDPart)[]> = computed(() => {
    return stepschainMap[context.value];
})
const stepschainMap: { [key: string]: (typeof OverviewPart | typeof SelectRAIDPart | typeof ConfirmRAIDPart | typeof CreatingRAIDPart | typeof ResultRAIDPart | typeof AddToRAIDPart)[] } = {
    Create: [OverviewPart, SelectRAIDPart, ConfirmRAIDPart, CreatingRAIDPart, ResultRAIDPart],
    Modify: [SelectRAIDPart, ConfirmRAIDPart, CreatingRAIDPart, ResultRAIDPart],
    FirstAid: [AddToRAIDPart, ConfirmRAIDPart, CreatingRAIDPart, ResultRAIDPart],
}
// TODO: 设定值从 0-7
const currentStep = ref(0);
const currentStepName = computed(() => {
    return stepschain.value[currentStep.value].__name;
})
const selectRAIDStrategy: Ref<RAIDStrategy | ''> = ref('');
const selectStorageList = ref<(number | string)[]>([]); // selected disk record.
const nameRAID = ref('Main-Storage')
const checkedCreateRAID = ref<boolean>(false);
// Getting RAID Status
type Orientation = "next" | "prev";
const stepByStep = (orientation: Orientation) => {
    switch (orientation) {
        case "next":
            currentStep.value++;
            break;
        case "prev":
            currentStep.value--;
            break;
        default:
            break;
    }
};

export {
    currentStep,
    currentStepName,
    selectRAIDStrategy,
    selectStorageList,
    nameRAID,
    checkedCreateRAID,

    stepByStep,
    // TODO: 暂时放在 controlView.ts 中。
    stepschain,
    stepschainMap,
    context,
    changeContext,

    // from another file.
    // RAIDCandidateDiskCount,
}
