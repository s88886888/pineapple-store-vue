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
 * @LastEditTime: 2023-05-18 20:23:15
 * @FilePath: \pineapple-store-vue\src\views\Details.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <div id="details">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
        <p>{{ productDetails.productName }}</p>
        <div class="list">
          <ul>
            <li>
              <p style="color: #ff6700">
                累计销售：{{ productDetails.soldNum }}
              </p>
            </li>
            <!-- <li>
              <router-link to>参数</router-link>
            </li>
            <li>
              <router-link to>用户评价</router-link>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="main">
      <!-- 左侧商品轮播图 -->

      <div class="blockdetalis animate__animated animate__zoomIn">
        <el-carousel height="560px" v-if="productDetails.imgList.length > 1">
          <el-carousel-item
            v-for="item in productDetails.imgList"
            :key="item.id"
          >
            <img style="height: 560px" :src="item.url" />
          </el-carousel-item>
        </el-carousel>

        <div v-if="productDetails.imgList.length == 1">
          <img style="height: 560px; width: 560px" :src="productDetails.url" />
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <div>
          <h1 class="name">{{ productDetails.productName }}</h1>
          <p class="intro">{{ productDetails.content }}</p>
          <p class="store">菠萝自营</p>
        </div>
        <div class="price">
          <span
            >{{
              (productDetails.originalPrice * productDetails.discounts).toFixed(
                2
              )
            }}元</span
          >
          <span
            v-show="
              productDetails.originalPrice !=
              productDetails.originalPrice * productDetails.discounts
            "
            class="del"
            >{{ (productDetails.originalPrice * 1).toFixed(2) }}元</span
          >
        </div>

        <div class="pro-sku animate__animated animate__zoomIn">
          <h2>选择套餐</h2>
          <div
            v-if="productDetails.skuList.length >= 1"
            class="skubox"
            v-for="(item, index) in productDetails.skuList"
            :key="item.skuId"
          >
            <div
              v-if="item.stock > 0"
              @click="
                skuBorderShow(
                  index,
                  item.skuId,
                  item.discounts,
                  item.originalPrice,
                  item.skuName
                )
              "
              :class="index == skuIndex ? 'skuindex' : 'sku'"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="'剩余库存' + item.stock"
                placement="top"
              >
                <p>{{ item.skuName }}</p>
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="pro-list">
          <span class="pro-name">{{ productDetails.productName }}</span>
          <span class="pro-price">
            <span
              >{{
                (
                  productDetails.originalPrice * productDetails.discounts
                ).toFixed(2)
              }}元</span
            >
            <span
              v-show="
                productDetails.originalPrice !=
                productDetails.originalPrice * productDetails.discounts
              "
              class="pro-del"
              >{{ (productDetails.originalPrice * 1).toFixed(2) }}元</span
            >
          </span>
          <p class="price-sum">
            总计 :
            {{
              (productDetails.originalPrice * productDetails.discounts).toFixed(
                2
              )
            }}元
          </p>
        </div>

        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart"
            >加入购物车</el-button
          >
          <el-button class="like" @click="addCollect">喜欢</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li><i class="el-icon-circle-check"></i> 菠萝自营</li>
            <li><i class="el-icon-circle-check"></i> 菠萝发货</li>
            <li><i class="el-icon-circle-check"></i> 7天无理由退货</li>
            <li><i class="el-icon-circle-check"></i> 7天价格保护</li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->

    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      // 商品详细信息
      productDetails: {
        productId: "",
        productName: "",
        categoryId: 11,
        rootCategoryId: 2,
        soldNum: 1211,
        productStatus: 1,
        content: "",
        createTime: "",
        updateTime: "",
        id: null,
        itemId: null,
        url: null,
        sort: null,
        isMain: null,
        createdTime: null,
        updatedTime: null,
        originalPrice: null,
        discounts: null,
        skuId: null,
        skuName: null,
        imgList: [],
        skuList: [],
      },
      skuIndex: 0,
    };
  },

  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function (val) {
      this.getDetails(val);
    },
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),

    // 获取商品详细信息
    async getDetails(val) {
      let loadingInstance = Loading.service({ lock: false });
      await this.$axios
        .get("/api/product/List/" + val)
        .then((res) => {
          this.productDetails = res.data.data[0];

          this.productDetails.originalPrice =
            res.data.data[0].skuList[0].originalPrice;
          this.productDetails.discounts = res.data.data[0].skuList[0].discounts;

          this.productDetails.productName +=
            "\xa0" +
            "\xa0" +
            "\xa0" +
            "\xa0" +
            res.data.data[0].skuList[0].skuName;

          this.productDetails.skuId = res.data.data[0].skuList[0].skuId;
          this.productDetails.skuName = res.data.data[0].skuList[0].skuName;
          this.productDetails.url = res.data.data[0].imgList[0].url;
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });

      const timer = setInterval(function () {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },

    // 加入购物车
    async addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser || !localStorage.getItem("token")) {
        this.$router.push("/login");
        return;
      }
      await this.$axios
        .post("/api/shopping-cart/", {
          userId: this.$store.getters.getUser.userId,
          productId: this.productID,
          productPrice:
            this.productDetails.originalPrice * this.productDetails.discounts,
          skuId: this.productDetails.skuId,
          cartNum: "1",
        })
        .then((res) => {
          switch (res.data.code) {
            case 200:
              // 新加入购物车成功
              this.unshiftShoppingCart(res.data.data);
              this.$message.success(res.data.msg);
              break;

            case 201:
              // 该商品已经在购物车，数量+1
              this.addShoppingCartNum({
                productID: this.productID,
                skuId: this.productDetails.skuId,
              });
              this.$message.success(res.data.msg);
              break;

            // case 203:
            //   // 商品数量达到限购数量
            //   this.dis = true;
            //   this.$message.error(res.data.msg);
            //   break;

            default:
              this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser || !localStorage.getItem("token")) {
        this.$router.push("/login");
        return;
      }
      this.$axios
        .post("/api/user-collect/", {
          userId: this.$store.getters.getUser.userId,
          productId: this.productID,
          categoryId: this.productDetails.categoryId,
          skuId: this.productDetails.skuId,
          skuName: this.productDetails.skuName,
        })
        .then((res) => {
          if (res.data.code == 200) {
            // 添加收藏成功
            this.$message.success(res.data.msg);
          } else {
            // 添加收藏失败
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },

    skuBorderShow(index, skuId, discounts, originalPrice, skuName) {
      this.skuIndex = index;
      this.productDetails.skuId = skuId;
      this.productDetails.originalPrice = originalPrice;
      this.productDetails.discounts = discounts;
      this.productDetails.skuName = skuName;
      this.productDetails.productName =
        this.productDetails.productName.split("\xa0")[0] +
        "\xa0" +
        "\xa0" +
        "\xa0" +
        "\xa0" +
        skuName;
    },
  },
};
</script>
<style>
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}

#details .page-header .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}

#details .page-header .title p {
  float: left;
}

#details .page-header .title .list {
  height: 64px;
  float: right;
}

#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}

#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}

#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}

/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
}

#details .main .blockdetalis {
  float: left;
  width: 560px;
  height: 560px;
}

#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}

#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
}

#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}

#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}

#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}

#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}

#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}

#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
}

#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}

#details .main .content .pro-list .pro-price {
  float: right;
}

#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}

#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}

#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}

#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}

#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}

#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}

#details .main .content .button .like:hover {
  background-color: #757575;
}

#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}

.pro-sku {
  margin-top: 20px;
  width: 640px;
  height: 230px;
}

.pro-sku h2 {
  color: #333;
}

.skubox {
  margin-top: 25px;
}

.pro-sku .sku {
  width: 189px;
  height: 60px;
  float: left;
  text-align: center;
  margin: 0 10px 10px 0;
  border: 1px solid #757575;
}

.pro-sku .skuindex {
  width: 189px;
  height: 60px;
  /* display: inline; */
  float: left;
  text-align: center;
  margin: 0 10px 10px 0;
  border: 1px solid #ff6700;
}

.pro-sku .sku p {
  padding-top: 20px;
}

.pro-sku .skuindex p {
  padding-top: 20px;
}

.pro-list {
  margin-top: 50px;
  border-top: 1px solid #e0e0e0;
}

/* 主要内容CSS END */
</style>
