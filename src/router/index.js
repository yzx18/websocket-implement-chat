import VueRouter from "vue-router"
//创建一个路由器
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: "/login"
        },
        {
            path: '/form1',
            component: () => import('../pages/Form1.vue')
        }, {
            path: '/login',
            component: () => import('../pages/login/index.vue')
        }, {
            path: '/message',
            component: () => import('../pages/Message/index.vue')
        }

    ]
})
router.beforeEach((to, from, next) => {
    //to 我要去往哪里 ,from 我来自哪里
    console.log("前置收尾", to, from)
    console.log("@@",to.path )
    if (to.path=="/message") {
        if (localStorage.getItem('token')) {
            next()
        } else {
            alert("你没有权限!!")
            router.push({
                path:'/'
            })
        }
    } else {
        next()
    }
})
//暴露路由器
export default router
