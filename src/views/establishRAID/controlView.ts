// ref https://codesandbox.io/s/plfs2x?file=/src/App.vue:1006-1069

import { markRaw, defineAsyncComponent } from 'vue';
import { useDialog } from 'primevue/usedialog';
// import EstablishRAID from '@views/EstablishRAID/EstablishRAID.vue'
const EstablishRAID = defineAsyncComponent(() => import('@views/EstablishRAID/EstablishRAID.vue'))
// import EstablishFooter from '@views/EstablishRAID/EstablishFooter.vue'
const EstablishFooter = defineAsyncComponent(() => import('@views/EstablishRAID/EstablishFooter.vue'))

let dialog: any = null;
const initEstablishRAID = () => {
    dialog = useDialog();
}

const showEstablishRAID = () => {
    dialog.open(EstablishRAID, {
        props: {
            header: 'Establish RAID',
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
        templates: {
            footer: markRaw(EstablishFooter)
        },
    });
};

export {
    initEstablishRAID,
    showEstablishRAID
}
