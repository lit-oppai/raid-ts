import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';

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
        component: () => import('./home'),
        name: 'home',
        icon: 'casa-settings-outline',
        meta: {
            title: 'Home',
        },
    },
    {
        path: '/network',
        component: () => import('./home'),
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
        // redirect: '/storage/ModifyRAID', // 开发使用
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
];

export default createRouter({
    history: createWebHistory(),
    routes
});
