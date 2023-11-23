// ref https://codesandbox.io/s/plfs2x?file=/src/App.vue:1006-1069
import { markRaw, defineAsyncComponent, computed, ref, Ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import { currentStep } from "./controlData.ts";

const EstablishRAID = defineAsyncComponent(() => import('@views/EstablishRAID/EstablishRAID.vue'))
const EstablishFooter = defineAsyncComponent(() => import('@views/EstablishRAID/EstablishFooter.vue'))

let dialog: any = null;

const initEstablishRAID = (): void => {
    dialog = useDialog();
}

const footer = computed(() => {
    if (currentStep.value === 0) {
        return null;
    } else {
        return markRaw(EstablishFooter);
    }
})

interface ShowType {
    [key: string]: {
        title: string;
        step: number;
    }
}
const status: Ref<string> = ref('');
const showEstablishRAID = (type: keyof ShowType = 'Create'): void => {
    const showType: ShowType = {
        Create: {
            title: 'Establish RAID',
            step: 0
        },
        Modify: {
            title: 'Modify RAID',
            step: 1
        },
    }
    status.value = type as string;
    currentStep.value = showType[type].step;
    dialog.open(EstablishRAID, {
        props: {
            header: showType[type].title,
            style: {
                width: '50vw',
                overflow: 'auto'
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true,
        },
        onClose: () => {
            currentStep.value = 0;
        },
        templates: {
            footer: footer
        }
    });
};

export {
    initEstablishRAID,
    showEstablishRAID,
    // TODO: 放入 controlData.ts
    status
}
