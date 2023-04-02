import {createRouter, createWebHashHistory} from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: 'home', 
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage') 
            },
            { 
                path: 'about', 
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage') 
            },
            { 
                path: 'pokemonid/:id', 
                name: 'pokemon-id', 
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'),
                props: (route) => {
                    const id = Number(route.params.id)
                    return isNaN(id) ? {id: 1} : {id}
                }
            },
            {
                path: '',
                redirect: {name: 'pokemon-home'}
            },
        ]
    },
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import(/* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout'),
        children: [
            { 
                path: 'characters', 
                name: 'dbz-characters',
                //beforeEnter: [isAuthenticatedGuard],
                component: () => import(/* webpackChunkName: "Characters" */ '@/modules/dbz/pages/Characters') 
            },
            { 
                path: 'about', 
                name: 'dbz-about',
                //beforeEnter: [isAuthenticatedGuard],
                component: () => import(/* webpackChunkName: "About" */ '@/modules/dbz/pages/About') 
            },
            {
                path: '',
                redirect: {name: 'dbz-characters'}
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound'),
        //redirect: '/'
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})

//Guard Global Sincrono
// router.beforeEach((to, from, next) => {
//     //console.log({to, from, next});
//     const random = Math.random() * 100;
//     if(random > 50) {
//         console.log(random, 'autenticado');
//         next()
//     }else{
//         console.log(random, 'bloqueado por el beforeEach Guard');
//         next({name: 'pokemon-home'})
//     }
// })

//Guard Global Asincrono
// const canAccess = () => {
//     return new Promise((resolve) => {

//         const random = Math.random() * 100;
//         if(random > 50) {
//             console.log(random, 'autenticado');
//             resolve(true)
//         }else{
//             console.log(random, 'bloqueado por el beforeEach Guard');
//             resolve(false)
//         }

//     })
// }
// router.beforeEach(async (to, from, next) => {
//     const authorized = await canAccess()
//     authorized ? next() : next({name: 'pokemon-home'})
// })

export default router