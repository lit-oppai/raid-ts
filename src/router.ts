import { createRouter, createWebHistory } from 'vue-router';
// import rotueProxyComponent from './components/routeProxy.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/:componentName",
            component: () => import("./components/routeProxyComponent.vue")
        }
    ]
});

export default router;