import { createRouter, createWebHistory } from 'vue-router'
import OrdersList from './components/Orders-List-App.vue'
import Login from './components/Login-App.vue'

const routes = [
    {
        path: '/',
        redirect: '/orders-list'
    },
    {
        path: '/orders-list',
        name: 'OrdersList',
        component: OrdersList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('login');

    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router