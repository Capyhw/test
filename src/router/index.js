import VueRouter from "vue-router";
import Vue from "vue";
import store from "@/store";

Vue.use(VueRouter)


//二级路由


// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch((err) => err)
}


const router = new VueRouter({
    routes: [
        //重定向
        {
            path: '*',
            redirect: '/home',
        },
        {
            name: 'home',
            path: '/home',
            component: () => import("@/pages/Home"),
        },
        {
            name: 'login',
            path: '/login',
            component: () => import("@/pages/Login"),
            meta: {
                deshowFooter: true
            },
        },
        {
            name: 'register',
            path: '/register',
            component: () => import("@/pages/Register"),
            meta: {
                deshowFooter: true
            },
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import("@/pages/Search"),
            props: route => ({
                keyword: route.params.keyword
            })
        },
        {
            name: 'detail',
            path: '/detail/:skuId',
            component: () => import("@/pages/Detail"),
        },
        {
            name: 'addCartSuccess',
            path: '/addCartSuccess',
            component: () => import("@/pages/AddCartSuccess"),
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => import("@/pages/ShopCart"),
        },
        {
            name: 'trade',
            path: '/trade',
            component: () => import("@/pages/Trade"),
        },
        {
            name: 'pay',
            path: '/pay',
            component: () => import("@/pages/Pay"),
        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: () => import("@/pages/PaySuccess"),
        },
        {
            path: '/center',
            component: () => import("@/pages/Center"),
            children: [
                {
                    name: 'myorder',
                    path: 'myorder',
                    component: () => import("@/pages/Center/MyOrder"),
                },
                {
                    name: 'grouporder',
                    path: 'grouporder',
                    component: () => import("@/pages/Center/GroupOrder"),
                },
                {
                    path: '',
                    component: () => import("@/pages/Center/MyOrder"),
                }
            ]
        }
    ],
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        return {top: 0, behavior: 'smooth'}

    }
})

router.beforeEach((to, from, next) => {
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
    if (token) {
        //用户已经登录
        if (to.name !== 'login' && to.name !== 'register') {
            //去的不是登录和注册页面
            if (userName) {
                //已经get到了userInfo
                next()
            }
            else {
                //没有userInfo就dispatch下
                try {
                    store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效从新登录
                    store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
        //想去登录注册页面直接跳回首页
        else {
            next('/');
        }
    }
    else {
        //用户未登录
        next()
    }
})

export default router
