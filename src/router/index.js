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
 * @LastEditTime: 2022-12-08 02:36:06
 * @FilePath: \pineapplestoer_webui\src\router\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 */

import Vue from 'vue'
import VueRouter from 'vue-router'




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
      requireAuth: true, // 需要验证登录状态
      title:"购物车-菠萝商城"
    },
    component: () => import('../views/ShoppingCart.vue'),
  },
  {
    path: '/collect',
    name: 'Collect',
    meta:{
      requireAuth: true, // 需要验证登录状态
      title:"收藏夹-菠萝商城",
    },
    component: () => import('../views/Collect.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    meta:{
      requireAuth: true, // 需要验证登录状态
      title:"我的订单-菠萝商城",
    },
    component: () => import('../views/Order.vue'),
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    meta:{
      requireAuth: true, // 需要验证登录状态
      title:"菠萝商城-确认订单"
    },
    component: () => import('../views/ConfirmOrder.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta:{
      title:"登录-菠萝商城"
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/orderAlipay',
    name: 'OrderAlipay',
    meta:{
      requireAuth: true, // 需要验证登录状态
      title:"支付-菠萝商城"
    },
    component: () => import('../views/orderAlipay.vue')
  }
]



const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{
  //beforeEach是router的钩子函数，在进入路由前执行
  if(to.meta.title){//判断是否有标题
    document.title = to.meta.title
  }
  next()  //执行进入路由，如果不写就不会进入目标页
})


export default router
