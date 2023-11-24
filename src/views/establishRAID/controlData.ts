import { computed, ComputedRef, ref } from "vue";
import OverviewPart from "./OverviewPart.vue";
import SelectRAIDPart from "./SelectRAIDPart.vue";
import ConfirmRAIDPart from "./ConfirmRAIDPart.vue";
import CreatingRAIDPart from "./CreatingRAIDPart.vue";
import ResultRAIDPart from './ResultRAIDPart.vue';
import AddToRAIDPart from './AddToRAIDPart.vue';
type ContextType = "Create" | "Modify" | "FirstAid";
const context = ref<ContextType>('Create');
const changeContext = (type: ContextType) => {
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
export type {
    ContextType,
}
export {
    currentStep,
    currentStepName,
    stepByStep,
    // TODO: 暂时放在 controlView.ts 中。
    stepschain,
    stepschainMap,
    context,
    changeContext,
}
