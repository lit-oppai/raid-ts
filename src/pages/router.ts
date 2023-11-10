// import home from './home.vue';
// import storage from './storage.vue';
import { createRouter, createWebHistory } from 'vue-router';

// for vue-router
export const routes = [
	{
		path: '/',
		component: () => import('./home.vue'),
		name: 'home',
		icon: 'casa-settings-outline'
	},
	{
		path: '/network',
		component: () => import('./home.vue'),
		name: 'network',
		icon: 'casa-network-outline'
	},
	{
		path: '/storage',
		component: () => import('./storage.vue'),
		name: 'storage',
		icon: 'casa-settings-outline'
	},
];

export default createRouter({
	history: createWebHistory(),
	routes
});
