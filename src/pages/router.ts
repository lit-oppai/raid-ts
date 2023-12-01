import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

declare type RouteChildMeta = RouteRecordRaw & {
    meta: {
        title: string;
    };
    children?: RouteChildMeta[];
};

declare type RouteMeta = RouteRecordRaw & {
    icon: string;
    meta: {
        title: string;
    };
    children?: RouteChildMeta[];
};

// for vue-router
export const routes: RouteMeta[] = [
    {
        path: '/',
        component: () => import('./storage/DetailStorage.ts'),
        name: 'home',
        icon: 'casa-settings-outline',
        meta: {
            title: 'Home',
        },
    },
    {
        path: '/network',
        component: () => import('./storage/DiscoverStorage.ts'),
        name: 'network',
        icon: 'casa-network-outline',
        meta: { title: 'Network', }
    },
    {
        path: '/storage',
        component: () => import('./storage/index.ts'),
        name: 'storage',
        icon: 'casa-settings-outline',
        meta: {
            title: 'Storage Manager',
        },
        children: [
            {
                path: 'discoverStorage',
                component: () => import('./storage/DiscoverStorage.ts'),
                name: 'discoverStorage',
                meta: { title: 'Discover Storage', }
            },
            {
                path: 'ModifyRAID',
                component: () => import('./storage/ModifyRAID.ts'),
                name: 'ModifyRAID',
                meta: { title: 'Modify RAID', }
            },
            {
                path: 'DetailStorage',
                component: () => import('./storage/DetailStorage.ts'),
                name: 'DetailStorage',
                meta: { title: 'Detail Storage', }
            },
        ]
    },
    {
        path: '/developPage',
        component: () => import('./storage/ModifyRAID'),
        name: 'developPage',
        icon: 'casa-network-outline',
        meta: { title: 'Develop Page', }
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes
});
