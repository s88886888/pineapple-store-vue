/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 * 
 * @Author: Linson 854700937@qq.com
 * @Date: 2022-11-06 20:26:08
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-11-21 23:36:47
 * @FilePath: \pineapplestoer_webui\src\router\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'



const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      title:"菠萝商城-首页"
    },
    component: () => import('../views/Home.vue')

  },
  {
    path: '/error',
    name: 'Error',
    meta:{
      title:"菠萝商城-错误页"
    },
    component: () => import('../components/Error.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    meta:{
      title:"菠萝商城-商品"
    },
    component: () => import('../views/Goods.vue')
  },

  {
    path: '/goods/details',
    name: 'Details',
    meta:{
      title:"菠萝商城-商品详细"
    },
    component: () => import('../views/Details.vue')
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    meta:{
      title:"菠萝商城-购物车"
    },
    component: () => import('../views/ShoppingCart.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    meta:{
      title:"菠萝商城-收藏夹"
    },
    component: () => import('../views/Collect.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/order',
    name: 'Order',
    meta:{
      title:"菠萝商城-我的订单"
    },
    component: () => import('../views/Order.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    meta:{
      title:"菠萝商城-确认订单"
    },
    component: () => import('../views/ConfirmOrder.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta:{
      title:"菠萝商城-登录"
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/orderAlipay',
    name: 'OrderAlipay',
    meta:{
      title:"菠萝商城-支付"
    },
    component: () => import('../views/orderAlipay.vue')
  }
]



const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{//beforeEach是router的钩子函数，在进入路由前执行
  if(to.meta.title){//判断是否有标题
      document.title = to.meta.title
  }
  next()  //执行进入路由，如果不写就不会进入目标页
})


export default router
