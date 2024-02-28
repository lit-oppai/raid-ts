import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

declare type RouteChildMeta = RouteRecordRaw & {
    meta: {
        title: string
    }
    children?: RouteChildMeta[]
}

declare type RouteMeta = RouteRecordRaw & {
    icon: string
    meta: {
        title: string
    }
    children?: RouteChildMeta[]
}

// for vue-router
export const routes: RouteMeta[] = [
    {
        path: '/update',
        component: () => import('./update/index.ts'),
        // redirect: 'storage',
        // name: 'update',
        icon: '',
        meta: {
            title: 'Update'
        }
    },
    {
        path: '/',
        // component: () => import('./home'),
        redirect: 'storage',
        // name: 'home',
        icon: 'casa-settings-outline',
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/network',
        component: () => import('./network/index.ts'),
        name: 'network',
        icon: 'casa-network-outline',
        meta: { title: 'Network' }
    },
    {
        path: '/storage',
        component: () => import('./storage/index.ts'),
        name: 'storage',
        icon: 'casa-storage-outline',
        meta: {
            title: 'Storage Manager'
        },
        children: [
            {
                path: 'discoverNewHardDrive',
                component: () => import('./storage/DiscoverNewHardDrive.ts'),
                name: 'discoverNewHardDrive',
                meta: { title: 'New hard drive' }
            },
            {
                path: 'DetailRaidStorage/:storageName',
                component: () => import('./storage/DetailRaidStorage.ts'),
                name: 'DetailRaidStorage',
                meta: { title: 'Modify RAID' }
            },
            {
                path: 'DetailStorage/:storageName',
                component: () => import('./storage/DetailStorage.ts'),
                name: 'DetailStorage',
                meta: { title: 'Detail Storage' }
            }
        ]
    },
    {
        path: '/general',
        component: () => import('./general/index.ts'),
        // component: () => import('@views/General/General.vue'), // For layer thinks.
        name: 'general',
        icon: 'casa-settings-outline',
        meta: { title: 'General' }
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    // 对于path: 'DetailRaidStorage/:storageName', 更改meta: { title: 'Modify RAID', }
    if (to.params.storageName) {
        to.meta.title = to.params.storageName
    }
    // to and from are both route objects. must call `next`.
    next()
})

export default router
