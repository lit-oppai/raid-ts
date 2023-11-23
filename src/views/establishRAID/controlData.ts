import { ref } from "vue";

// TODO: 设定值从 0-7
const currentStep = ref(0);
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
    stepByStep,
}
