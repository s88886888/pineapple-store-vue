<!--
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
 * @Date: 2022-11-06 20:28:01
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-12-14 02:02:04
 * @FilePath: \pineapplestoer_webui\src\components\Header.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <!-- 顶栏容器 -->
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#409eff"
      router
    >
      <div class="logo">
        <router-link to="/">
          <img
            @mouseenter ="logoShow"
            v-if="logo"
            class="logo-img"
            src="../assets/imgs/pineapple-logo.png"
          />
          <img
            v-else="logo"
            class="logo-img-go animate__animated animate__fadeInRight"
            src="../assets/imgs/gohome.png"
          />

          <img
            class="logo-title animate__animated animate__bounce"
            src="../assets/imgs/pineapple-logo-title.png"
            alt
          />
        </router-link>
      </div>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/goods">全部商品</el-menu-item>
      <div class="so">
        <el-input placeholder="请输入搜索内容" v-model="search">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchClick"
          ></el-button>
        </el-input>
      </div>
    </el-menu>
  </el-header>
  <!-- 顶栏容器END -->
</template>

<script>
export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      logo: true,
    };
  },
  methods: {
    // 点击搜索按钮
    searchClick() {
      // if (this.search != "") {
      // 跳转到全部商品页面,并传递搜索条件
      this.$router.push({ path: "/goods", query: { search: this.search } });
      this.search = "";
      // }
    },
    logoShow() {
      this.logo = !this.logo;
    },
  },
};
</script>

<style>
@import "@/assets/css/header.css";
</style>
