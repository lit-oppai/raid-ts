// import home from './home.vue';
// import storage from './storage.vue';
import { createRouter, createWebHistory } from 'vue-router';

// for vue-router
export const routes = [
    {
        path: '/',
        component: () => import('./home.vue'),
        name: 'home',
    },
    {
        path: '/storage',
        component: () => import('./storage.vue'),
        name: 'storage',
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
});