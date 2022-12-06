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
 * @LastEditTime: 2022-12-07 01:45:34
 * @FilePath: \pineapplestoer_webui\src\views\Goods.vue
 * @Description: 全部商品页面组件(包括全部商品,商品分类,商品搜索)
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{ search }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>

        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.categoryName"
            :name="'' + item.categoryId"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->

    <div class="main">
      <div class="list animate__animated animate__zoomIn">
        <MyList :list="product" v-if="product.length > 0"></MyList>
        <div v-else class="none-product">
          抱歉没有找到相关的商品，请看看其他的商品
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: "", //分类列表
      categoryID: [], // 分类id
      product: "", // 商品列表
      productList: "",
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "-1", // 分类列表当前选中的id
      search: "", // 搜索条件
    };
  },
  created() {
    // 获取分类列表
    this.getCategory();
  },
  activated() {
    // this.activeName = "-1"; // 初始化分类列表当前选中的id为-1
    // this.total = 0; // 初始化商品总量为0
    // this.currentPage = 1; //初始化当前页码为1

    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "";
      return;
    }

    // 如果路由传递了categoryID，则显示对应的分类商品
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.categoryID;
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != "") {
      this.search = this.$route.query.search;
    }
  },

  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    async activeName(val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        //把val强转成数字类型
        this.categoryID = val;
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;

      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      //但是加上有后 vue-routher 会提示重复路由的警告报错
      await this.$router.push({
        path: "/goods",
        query: { categoryID: this.categoryID },
      });
    },
    // 监听搜索条件，响应相应的商品
    async search(val) {
      if (val != "" || val != null) {
        await this.getProductBySearch(val);
      }
    },
    // 监听分类id，响应相应的商品
    categoryID(val) {
      this.getData();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route(val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
        // this.getData();
      }
    },
  },
  methods: {
    // 返回顶部
    backtop() {
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
    // 页码变化调用饿了么ui的currentChange方法
    async currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        await this.getProductBySearch();
      } else {
        await this.getData();
      }
      this.backtop();
    },
    // 向后端请求分类列表数据
    async getCategory() {
      await this.$axios
        .get("/api/category/List")
        .then((res) => {
          this.categoryList = res.data.data;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },

    // 向后端请求全部商品或分类商品数据
    async getData() {
      let api =
        this.categoryID == ""
          ? "/api/product/getList"
          : "/api/product/getProduct/" + this.categoryID;
      await this.$axios
        .get(api, {
          params: { current: this.currentPage, size: this.pageSize },
        })
        .then((res) => {
          this.product = res.data.data.records;
          this.total = res.data.data.total;
          // this.categoryID==null;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },

    // 通过搜索条件向后端请求商品数据
    async getProductBySearch() {
      await this.$axios
        .get("/api/product/getProductName" + this.search, {
          params: {
            current: this.currentPage,
            size: this.pageSize,
          },
        })
        .then((res) => {
          this.product = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: white;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>
