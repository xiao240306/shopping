import {createRouter,createWebHistory} from "vue-router";
import Login from "../components/login/Login.vue"
import AppHome from "../components/app/AppHome.vue"
import AppIndex from "../components/app/AppIndex.vue"
import GoodsList from "../components/app/GoodsList.vue"
import ManagerList from "../components/app/ManagerList.vue"
//创建路由管理器
const router=createRouter({
    history:createWebHistory(),//路由模式
    routes:[
        {
            path:'/',
            redirect:'login'

        },
        {
            path:'/login',
            name:'login',
            component:Login,
        },
        {
            path:'/app/index',
            name:'appindex',
            component:AppIndex,
            children:[
                {
                    path:'/app/login',
                    redirect:to=>'/login'
                },
                {
                    path:'/app/home',
                    name:'apphome',
                    component:AppHome
                },
                {
                    path:'/app/goodslist',
                    name:'goodslist',
                    component:GoodsList
                },
                {
                    path:'/app/managerlist',
                    name:'managerlist',
                    component:ManagerList
                }
            ]
        }
        
    ]

})
//全局路由守护，必须登录后，才能访问vue中的页面组件
router.beforeEach(async (to, from) => {
    let managerInfo = sessionStorage.getItem('managerInfo');
    // 检查用户是否已登录 ，并且要访问的url不等于/login 避免无限重定向
    if (!managerInfo && to.path !== '/login') {
    // 重定向到登录页面
    return { path: '/login' }
     }
    })

export default router;