import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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
        component: () => import('./storage'),
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
            }
        ]
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
});
