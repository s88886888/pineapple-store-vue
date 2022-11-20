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
 * @Date: 2022-10-20 01:47:02
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-11-12 01:54:41
 * @FilePath: \pineapplestoer_webui\src\views\Home.vue
 * @Description: 主页
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  
  <div class="home" id="home" name="home">

    <div class="block" @mouseleave="clover">
      <!-- 左边导航栏 -->
      <div id="leftcategoryList">
        <ul
          v-for="(item, index) in leftcategoryDataList"
          :key="item.categoryId"
        >
          <li class="blocklist" @mouseenter="getProductStar(index)">
            {{ item.categoryName }}
          </li>
        </ul>
      </div>
      <!-- 左边导航栏end -->

      <!-- 轮播图 -->
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousel" :key="item.imgId">
          <img
            style="height: 460px; width: 1220px"
            :src="item.imgUrl"
            :alt="item.describes"
          />
        </el-carousel-item>
      </el-carousel>
      <!-- 右边菜单栏 -->
      <div id="rightcategoryList" @mouseleave="clover" v-show="righcategoryListShow">
        <div
          v-for="(item, index) in rightcategoryDataListShow"
          :key="item.productId"
        >
          <router-link
            :to="{
              path: '/goods/details',
              query: { productID: item.productId },
            }"
          >
            <p>
              {{ item.productName }}
            </p>
          </router-link>

          <img src="../assets/image/index/shouji/0.jpg" />
        </div>
      </div>
      <!-- 右边菜单栏END -->
    </div>
    <!-- 轮播图END -->

    <div class="main-box">
      <div class="main">
        <!-- 手机商品展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">特价推荐</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img src="../assets/image/login/background-image.jpg">
              </router-link>
            </div>
            <div class="list">
              <MyList :list="productDisplayList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 手机商品展示区域END -->

        <!-- 家电商品展示区域 -->

        <!-- <div class="appliance" id="promo-menu">
        <div class="box-hd">
            <div class="title">好物推荐</div>
            <div class="more" id="more">
              <MyMenu :val="2" @fromChild="getChildMsg">
                <span slot="1">热门</span>
                <span slot="2">电视影音</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/appliance/appliance-promo1.png'
                    "
                  />
                </li>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/appliance/appliance-promo2.png'
                    "
                  />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="hotProductDisplayList" :isMore="true"></MyList>
            </div>
          </div>
        </div> -->

        <!-- 家电商品展示区域END -->

        <!-- 配件商品展示区域 -->
        <!-- <div class="accessory" id="promo-menu"> -->
        <!-- <div class="box-hd">
            <div class="title">配件</div>
            <div class="more" id="more">
              <MyMenu :val="3" @fromChild="getChildMsg2">
                <span slot="1">热门</span>
                <span slot="2">保护套</span>
                <span slot="3">充电器</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/accessory/accessory-promo1.png'
                    "
                    alt
                  />
                </li>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/accessory/accessory-promo2.png'
                    "
                    alt
                  />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="accessoryList" :isMore="true"></MyList>
            </div>
          </div> -->
        <!-- </div> -->

        <!-- 配件商品展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carousel: "", // 轮播图数据
      righcategoryListShow: false, //隐藏轮播右边菜单
      leftcategoryDataList: "", //轮播左菜单列表，
      rightcategoryDataList: [], //轮播右菜单全部列表
      rightcategoryDataListShow: "", //轮播右菜单个列表

      productDisplayList: "", // 特价展示列表

      miTvList: "", // 小米电视商品列表
      hotProductDisplayList: "", // 家电商品列表
      applianceHotList: "", //热门家电商品列表
      accessoryList: "", //配件商品列表
      accessoryHotList: "", //热门配件商品列表
      protectingShellList: "", // 保护套商品列表
      chargerList: "", //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      accessoryActive: 1, // 配件当前选中的商品分类
    };
  },
  watch: {
    // 家电当前选中的商品分类，响应不同的商品数据
    applianceActive: function (val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.applianceHotList == "") {
        this.applianceHotList = this.hotProductDisplayList;
      }
      if (val == 1) {
        // 1为热门商品
        this.hotProductDisplayList = this.applianceHotList;
        return;
      }
      if (val == 2) {
        // 2为电视商品
        this.hotProductDisplayList = this.miTvList;
        return;
      }
    },
    accessoryActive: function (val) {
      // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
      // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
      if (this.accessoryHotList == "") {
        this.accessoryHotList = this.accessoryList;
      }
      if (val == 1) {
        // 1为热门商品
        this.accessoryList = this.accessoryHotList;
        return;
      }
      if (val == 2) {
        // 2为保护套商品
        this.accessoryList = this.protectingShellList;
        return;
      }
      if (val == 3) {
        //3 为充电器商品
        this.accessoryList = this.chargerList;
        return;
      }
    },
  },
  created() {
    // 获取轮播图数据
    this.getCarousel();

    // 获取轮播图左边菜单数据
    this.getCategoryStar();

    //获取商品展示区的数据
    this.getProductDisplay();

    // 获取各类商品数据
    // this.getPromo("手机", "productDisplayList");
    // this.getPromo("电视机", "miTvList");
    // this.getPromo("保护套", "protectingShellList");
    // this.getPromo("充电器", "chargerList");
    // this.getPromo(
    //   ["电视机", "空调", "洗衣机"],
    //   "applianceList",
    //   "/api/product/getHotProduct"
    // );
    // this.getPromo(
    //   ["保护套", "保护膜", "充电器", "充电宝"],
    //   "accessoryList",
    //   "/api/product/getHotProduct"
    // );
  },
  methods: {
    //获取轮播图数据
    async getCarousel() {
      const { data: res } = await this.$axios.get("/api/index-img/List");
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      } else {
        this.carousel = res.data;
      }
    },
    //获取轮播图左菜单栏数据
    async getCategoryStar() {
      const { data: res } = await this.$axios.get(
        "/api/category/SelectByCategoryStar/1"
      );
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      } else {
        this.leftcategoryDataList = res.data;

        // console.log(this.leftcategoryDataList);

        //获取轮播图右菜单栏数据
        //////////////////////////////////////////////////////
        if (this.leftcategoryDataList != null) {
          for (let i = 0; i < this.leftcategoryDataList.length; i++) {
            const { data: model } = await this.$axios.get(
              "/api/product/selectAllByCategoryId/" +
                this.leftcategoryDataList[i].categoryId
            );
            this.rightcategoryDataList.push(model);
          }
        }

        // this.leftcategoryDataList.forEach(async (element) => {

        //   const { data: model } =await this.$axios.get(
        //     "/api/product/selectAllByCategoryId/" + element.categoryId
        //   );
        //  this.rightcategoryDataList.push(model);
        // }
        // );
        // console.log(111111,this.rightcategoryDataList);
      }
    },
    //鼠标离开轮播右则隐藏
    clover() {
      this.righcategoryListShow = false;
    },
    //获取本地缓存轮播图右菜单栏数据
    getProductStar(id) {
      // console.log("index=",id+""+"categoryId=",categoryId);
      if (this.leftcategoryDataList != null) {
        this.righcategoryListShow = true;
        this.rightcategoryDataListShow = this.rightcategoryDataList[id].data;
      }
    },

    //获取商品展示区的数据
    async getProductDisplay() {
      const { data: res } = await this.$axios.get(
        "/api/product/SelectByCategoryStar/2"
      );
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      } else {
        this.productDisplayList = res.data;
      }
    },

    // // 获取家电模块子组件传过来的数据
    // getChildMsg(val) {
    //   this.applianceActive = val;
    // },

    // // 获取配件模块子组件传过来的数据
    // getChildMsg2(val) {
    //   this.accessoryActive = val;
    // },

    // // 获取各类商品数据方法封装
    // getPromo(categoryName, val, api) {
    //   api = api != undefined ? api : "/api/product/getPromoProduct";
    //   this.$axios
    //     .post(api, {
    //       categoryName,
    //     })
    //     .then((res) => {
    //       this[val] = res.data.Product;
    //     })
    //     .catch((err) => {
    //       // return Promise.reject(err);
    //     });
    // },
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>
