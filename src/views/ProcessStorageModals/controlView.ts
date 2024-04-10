// ref https://codesandbox.io/s/plfs2x?file=/src/App.vue:1006-1069
import { defineAsyncComponent, onMounted, ref, watch, effectScope } from 'vue'
import { useDialog }                                                from 'primevue/usedialog'
import { currentStepName, changeContext }                           from './controlData.ts'
import { EntranceContextType }                                      from './controlData.d'
import { reloadServiceData }                                        from '@views/StorageManager/controlData.ts'
import { useI18n }                                                  from 'vue-i18n'

let dialog: any = null
let dialogInstance: any = null

const useEstablishRAID = () => {
    const ProcessStorageModals = defineAsyncComponent(
        () => import('@views/ProcessStorageModals/ProcessStorageModals.vue')
    )
    // TODO: 为了减少重复声明，做了 init 处理。但是非原子操作，会容易丢失 init 操作。
    // TODO: Reomve.
    const initEstablishRAID = (): void => {
        dialog = useDialog()
    }
    const scope = effectScope()
    const closable = ref<boolean>(true)

    scope.run(() => {
        watch(
            ()=> currentStepName.value,
            newVal => {
                switch (newVal) {
                    case 'CreatingRAIDPart':
                        closable.value = false
                        break
                    case 'ResultRAIDPart':
                        closable.value = false
                        break
                    default:
                        closable.value = true
                        break
                }
            },
            { immediate: true }
        )
    })

    interface ShowType {
        [key: string]: {
            title: string
        }
    }
    let t:any;
    onMounted(() => {
        ({ t } = useI18n())
    })
    // const { t } = useI18n()
    const showEstablishRAID = (
        type: keyof ShowType = 'Create',
        option: { onClose: () => void, [key: string]: any } = { onClose: () => { } }
    ): void => {
        const showType: ShowType = {
            // 创建 raid
            Create: {
                title: t('Create RAID')
            },
            // 扩容 raid
            Modify: {
                title: t('Expand RAID capacity')
            },
            // 急救 raid
            FirstAid: {
                title: t('Recovery RAID')
            },
            // 创建单个磁盘、空间
            CreateStorage: {
                title: t('Enable new hard drive')
            },
            // 启用单个磁盘或者单个空间 EnableStorage
            EnableStorage: {
                title: t('Enable new hard drive')
            },
            // 格式化单个磁盘
            FormatStorage: {
                title: t('Format hard drive')
            }
        }
        changeContext(type as EntranceContextType)
        // 为了避免丢失 init 操作，这里默认声明。
        if (!dialog) {
            initEstablishRAID()
        }
        dialogInstance = dialog.open(ProcessStorageModals, {
            props: {
                draggable: false,
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
                reloadServiceData()
                option?.onClose()
            },
            templates: {
            }
        })
    }

    const closeEstablishRAID = (e?: object): void => {
        // dialogRef.value?.close(e);
        scope.stop()
        reloadServiceData()
        dialogInstance?.close(e)
    }

    return {
        initEstablishRAID,
        showEstablishRAID,
        closeEstablishRAID
    }
}

export default useEstablishRAID

