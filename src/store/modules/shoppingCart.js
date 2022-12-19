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
 * @Date: 2022-11-06 20:28:48
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-11-22 10:49:13
 * @FilePath: \pineapplestoer_webui\src\store\modules\shoppingCart.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 */


export default {
  state: {
    shoppingCart: []
  },
  getters: {
    getShoppingCart(state) {
      // 获取购物车状态
      return state.shoppingCart;
    },
    getNum(state) {
      // 购物车商品总数量
      let totalNum = 0;

      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        totalNum += Number(temp.cartNum);
      }
      return totalNum
    },
    getIsAllCheck(state) {
      // 判断是否全选
      let isAllCheck = true;
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        // 只要有一个商品没有勾选立即return false;
        if (!temp.checkbox) {
          isAllCheck = false;
          return isAllCheck;
        }
      }
      return isAllCheck;
    },
    getCheckGoods(state) {
      // 获取勾选的商品信息
      // 用于确认订单页面
      let checkGoods = [];
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        if (temp.checkbox) {
          checkGoods.push(temp);

        }
      }
      return checkGoods;
    },
    getCheckNum(state) {
      // 获取购物车勾选的商品数量
      let totalNum = 0;
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        if (temp.checkbox) {
          totalNum += Number(temp.cartNum);
        }
      }
      return totalNum;
    },
    getTotalPrice(state) {
      // 购物车勾选的商品总价格
      let totalPrice = 0;

      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        if (temp.checkbox) {
          totalPrice += temp.productPrice * temp.cartNum;
        }
      }
      return totalPrice;
    }
  },
  mutations: {
    setShoppingCart(state, data) {
      // 设置购物车状态
      state.shoppingCart = data;
    },
    unshiftShoppingCart(state, data) {
      // 添加购物车
      // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
      state.shoppingCart.unshift(data);
    },
    updateShoppingCart(state, payload) {
      // 更新购物车
      // 可更新商品数量和是否勾选
      // 用于购物车点击勾选及加减商品数量
      if (payload.prop == "cartNum") {
        // 判断效果的商品数量是否大于限购数量或小于1
        // if (state.shoppingCart[payload.key].maxNum < payload.val) {
        //   return;
        // }
        if (payload.val < 1) {
          return;
        }
      }
      // 根据商品在购物车的数组的索引和属性更改


      state.shoppingCart[payload.key][payload.prop] = payload.val;

    },
    addShoppingCartNum(state, data) {
      // 增加购物车商品数量
      // 用于在商品详情页点击添加购物车,后台返回201，“该商品已在购物车，数量 +1”，更新vuex的商品数量
      for (let i = 0; i < state.shoppingCart.length; i++) {


        const temp = state.shoppingCart[i];
        if (temp.productId == data.productID && temp.skuId == data.skuId) {

          //如果小于限购maxNum数量则增加
          if (Number(temp.cartNum) < 10) {
            temp.cartNum++;
          }
          // temp.cartNum++;
        }
      }
    },
    deleteShoppingCart(state, id) {
      // 根据购物车id删除购物车商品
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        if (temp.cartId == id) {
          state.shoppingCart.splice(i, 1);
        }
      }
    },
    checkAll(state, data) {
      // 点击全选按钮，更改每个商品的勾选状态
      for (let i = 0; i < state.shoppingCart.length; i++) {
        state.shoppingCart[i].checkbox = data;
      }
    }
  },
  actions: {
    setShoppingCart({ commit }, data) {
      commit('setShoppingCart', data);
    },
    unshiftShoppingCart({ commit }, data) {
      commit('unshiftShoppingCart', data);
    },
    updateShoppingCart({ commit }, payload) {
      commit('updateShoppingCart', payload);
    },
    addShoppingCartNum({ commit }, data) {
      commit('addShoppingCartNum', data);
    },
    deleteShoppingCart({ commit }, id) {
      commit('deleteShoppingCart', id);
    },
    checkAll({ commit }, data) {
      commit('checkAll', data);
    }
  }
}