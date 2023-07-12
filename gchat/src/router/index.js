import {createRouter,createWebHistory} from 'vue-router';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/login', component:()=> import('../../page/Auth/Login.vue')},
        {path:'/chat', component:()=> import('../../page/Chat.vue')},
        {path:'/register', component:()=> import('../../page/Auth/Register.vue')},
    ]
})
export default router;