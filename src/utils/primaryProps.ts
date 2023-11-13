let WUJIE_PROPS: any = {};

declare global {
    interface Window {
        $wujie: {
            props: any;
        }
    }
}

if (window?.$wujie?.props) {
    WUJIE_PROPS = { ...window?.$wujie.props };
}

// Function:
// Currently only used in messageBus
// Used to distinguish and manage sub-applications in the primary application.
export default WUJIE_PROPS
