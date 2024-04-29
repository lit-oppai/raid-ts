// Function:
// Currently only used in messageBus
// Used to distinguish and manage sub-applications in the primary application.
export let WUJIE_PROPS: any = {}

/**
 * Extends the global Window interface to include additional properties related to the Wujie library.
 */
declare global {
    interface Window {
        icewhale: string
        $wujie: {
            props: any
        }
        __POWERED_BY_WUJIE__: boolean
        __WUJIE_MOUNT: () => void
        __WUJIE_UNMOUNT: () => void
    }
}

if (window?.$wujie?.props) {
    WUJIE_PROPS = { ...window?.$wujie.props }
}
