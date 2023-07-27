import {createRouter,createWebHistory} from 'vue-router';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/login', component:()=> import('../../page/Auth/Login.vue'), name:'login'},
        {path: '/chat/:channel_id', component: () => import('../../page/Chat.vue'), props:true, name:'chat'},
        {path:'/register', component:()=> import('../../page/Auth/Register.vue')},
    ]
})
export default router;