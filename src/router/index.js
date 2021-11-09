import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'MainPage',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/Main')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from , next)=>{
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if(requiresAuth === true && auth.currentUser === null) {
        next('/login')
    } else {
        next()
    }
})

export default router