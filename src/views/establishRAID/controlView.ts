// ref https://codesandbox.io/s/plfs2x?file=/src/App.vue:1006-1069
import { markRaw, defineAsyncComponent, ref, Ref, watch, inject } from 'vue'
import { useDialog } from 'primevue/usedialog'
import {
    currentStep,
    currentStepName,
    clear,
    changeContext
} from './controlData.ts'
import { EntranceContextType } from './controlData.d'
import { reloadServiceData } from '@views/StorageManager/controlData.ts'

const EstablishRAID = defineAsyncComponent(
    () => import('@views/EstablishRAID/EstablishRAID.vue')
)
const EstablishFooter = defineAsyncComponent(
    () => import('@views/EstablishRAID/EstablishFooter.vue')
)

let dialog: any = null
let dialogInstance: any = null

// TODO: 为了减少重复声明，做了 init 处理。但是非原子操作，会容易丢失 init 操作。
// TODO: Reomve.
const initEstablishRAID = (): void => {
    dialog = useDialog()
}

const footer: Ref<typeof EstablishFooter | null> = ref(null)
const closable = ref<boolean>(true)
watch(
    currentStepName,
    newVal => {
        switch (newVal) {
            case 'OverviewPart':
                closable.value = true
                footer.value = null
                break
            case 'CreatingRAIDPart':
                closable.value = false
                footer.value = null
                break
            default:
                closable.value = true
                footer.value = markRaw(EstablishFooter)
                break
        }
    },
    { immediate: true }
)

interface ShowType {
    [key: string]: {
        title: string
    }
}

const showEstablishRAID = (type: keyof ShowType = 'Create'): void => {
    const showType: ShowType = {
        Create: {
            title: 'Create RAID'
        },
        Modify: {
            title: '扩容RAID5'
        },
        FirstAid: {
            title: 'First Aid RAID'
        },
        // FormateDisk
        CreateStorage: {
            title: 'Create Storage | Rasterize and enable'
        },
        // EnableStorage
        EnableStorage: {
            title: 'Enable Storage'
        }
    }
    changeContext(type as EntranceContextType)
    // 为了避免丢失 init 操作，这里默认声明。
    if (!dialog) {
        initEstablishRAID()
    }
    dialogInstance = dialog.open(EstablishRAID, {
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
            closable
        },
        onClose: () => {
            // currentStep.value = 0;
            // // 垃圾回收
            // // dialog = null;
            // (window as any)?.gc && (window as any)?.gc();
            // (window as any)?.collectGarbage && (window as any)?.collectGarbage();
            clear()
        },
        templates: {
            footer: footer
        }
    })
}

const closeEstablishRAID = (e?: object): void => {
    // dialogRef.value?.close(e);
    reloadServiceData()
    dialogInstance?.close(e)
}

export { initEstablishRAID, showEstablishRAID, closeEstablishRAID }
