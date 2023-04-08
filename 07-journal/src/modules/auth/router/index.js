

export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth-layout" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import(/* webpackChunkName: "signup" */ '@/modules/auth/views/Signup.vue'),
        }
    ]
}