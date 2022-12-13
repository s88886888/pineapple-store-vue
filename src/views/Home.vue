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
 * @Date: 2022-11-06 20:29:37
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-12-14 02:48:10
 * @FilePath: \pineapplestoer_webui\src\views\Home.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->
 <template>
  <div class="home" id="home" name="home">
    <div class="block" @mouseleave="clover">
      
        <!-- 左边导航栏 -->
        <div id="leftcategoryList" class="animate__animated animate__backInLeft">
          <ul
            v-for="(item, index) in leftcategoryDataList"
            :key="item.categoryId"
          >
            <li class="blocklist" @mouseenter="getProductStar(index)">
              <!-- <img width="10px" src="../assets/image/mi-icon.png"/> -->
              {{ item.categoryName }}
            </li>
          </ul>
        </div>
        <!-- 左边导航栏end -->


      <!-- 轮播图 -->
      <el-carousel height="460px" class="imgbox">
        <el-carousel-item v-for="item in carousel" :key="item.imgId">
          <img
            style="height: 460px; width: 1220px"
            :src="item.imgUrl"
            :alt="item.describes"
          />
        </el-carousel-item>
      </el-carousel>
      <!-- 轮播图END -->

      <transition
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__zoomOutRight"
      >
      <!-- 右边菜单栏 -->
      <div
        id="rightcategoryList"
        @mouseleave="clover"
        v-show="righcategoryListShow"
      >
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

          <img :src="item.imgList[0].url" />
          <!-- <img :src="item.url" /> -->
        </div>
      </div>
    </transition>
      <!-- 右边菜单栏END -->
    </div>

    <div class="main-box">
      <div class="main">
        <!-- 商品展示区域 -->
        <div>
          <div class="box-hd">
            <div class="title">菠萝推荐</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img src="https://img1.imgtp.com/2022/12/03/3IRRU9zi.jpg" />
              </router-link>
            </div>
            <div class="list animate__animated animate__fadeInDown">
              <MyList :list="productDisplayList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 商品展示区域END -->

        <!-- 配件商品展示区域 -->
        <div class="accessory" id="promo-menu">
          <div class="box-hd">
            <div class="title">菠萝优选</div>
            <div class="more" id="more">
              <MyMenu :val="3" @fromChild="getChildMsg">
                <span slot="1">{{ categoryName[0] }}</span>
                <span slot="2">{{ categoryName[1] }}</span>
                <span slot="3">{{ categoryName[2] }}</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img
                    src="https://img1.imgtp.com/2022/12/03/204XQpy5.jpg"
                    alt
                  />
                </li>
                <li>
                  <img
                    src="https://img1.imgtp.com/2022/12/03/urGCvWJn.jpg"
                    alt
                  />
                </li>
              </ul>
            </div>

            <div class="list">
              <div id="myList" class="myList animate__animated animate__fadeInUpBig">
                <ul>
                  <li v-for="(item, index) in accessoryList" :key="index">
                    <router-link
                      :to="{
                        path: '/goods/details',
                        query: { productID: item.productId },
                      }"
                    >
                      <img :src="item.imgList[0].url" alt />
                      <h2>{{ item.productName }}</h2>
                      <h3>{{ item.content }}</h3>

                      <div>
                        <p>
                          <span
                            >{{
                              (
                                item.skuList[0].originalPrice *
                                item.skuList[0].discounts
                              ).toFixed(2) == undefined
                                ? 0
                                : (
                                    item.skuList[0].originalPrice *
                                    item.skuList[0].discounts
                                  ).toFixed(2)
                            }}元</span
                          >
                          <span
                            v-show="
                              item.skuList[0].originalPrice !=
                              item.skuList[0].originalPrice *
                                item.skuList[0].discounts
                            "
                            class="del"
                          >
                            {{
                              item.skuList.length <= 0
                                ? 0
                                : item.skuList[0].originalPrice.toFixed(2)
                            }}元</span
                          >
                        </p>
                      </div>
                    </router-link>
                  </li>

                  <li v-show="true" id="more">
                    <router-link
                      :to="{
                        path: '/goods',
                        query: { categoryID: categoryId },
                      }"
                    
                    >
                      <!-- target='_blank' -->
                      浏览更多
                      <i class="el-icon-d-arrow-right"></i>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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

      accessoryList: [],

      accessoryHotList: [],
      protectingShellList: [],
      chargerList: [],
      categoryName: ["数据1","数据2","数据3"],

      accessoryActive: 1, // 当前选中的商品分类
      categoryId: "",
    };
  },
  watch: {
    accessoryActive(val) {
      if (val == 1) {
        this.accessoryList = this.accessoryHotList;
        this.categoryId = this.accessoryList[0].categoryId;
        return;
      }
      if (val == 2) {
        this.accessoryList = this.protectingShellList;
        this.categoryId = this.accessoryList[0].categoryId;
        return;
      }
      if (val == 3) {
        this.accessoryList = this.chargerList;
        this.categoryId = this.accessoryList[0].categoryId;
        return;
      }
    },
  },
  async created() {
    // 获取轮播图数据
    this.getCarousel();

    // 获取轮播图左边菜单数据
    this.getCategoryStar();

    //获取商品展示区的数据
    this.getProductDisplay();

    //获取分类推荐
    await this.getCategoryParent();
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

        //获取轮播图右菜单栏数据
        //////////////////////////////////////////////////////
        // console.log(this.leftcategoryDataList, "111111111");

        if (this.rightcategoryDataList == "") {
          for (let i = 0; i < this.leftcategoryDataList.length; i++) {
            this.rightcategoryDataList.push(
              this.leftcategoryDataList[i].productList
            );
          }
        }
      }
    },
    //鼠标离开轮播右则隐藏
    clover() {
      this.righcategoryListShow = false;
    },
    //获取本地缓存轮播图右菜单栏数据
    getProductStar(id) {
      if (this.rightcategoryDataList != null) {
        this.righcategoryListShow = true;
        this.rightcategoryDataListShow = this.rightcategoryDataList[id];
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
    //获取分类推荐
    async getCategoryParent() {
      const { data: res } = await this.$axios.get(
        "/api/category/SelectByParent"
      );
      if (res.code == 200) {
        this.accessoryList = res.data;

        if(this.categoryName.length==3)
        {
          this.categoryName=[];
        }

        for (let i = 0; i < this.accessoryList.length; i++) {
          this.categoryName.push(this.accessoryList[i].categoryName);
        }
        
        this.accessoryHotList = this.accessoryList[0].productList;
        this.protectingShellList = this.accessoryList[1].productList;
        this.chargerList = this.accessoryList[2].productList;
        this.accessoryList = this.accessoryList[0].productList;
        this.categoryId = this.accessoryList[0].categoryId;
      } else {
        return this.$message.error(res.msg);
      }
    },

    // 获取配件模块子组件传过来的数据
    getChildMsg(val) {
      this.accessoryActive = val;
    },
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>

<style scoped>
.myList ul li {
  z-index: 1;
  float: left;
  width: 234px;
  height: 280px;
  padding: 10px 0;
  margin: 0 0 14.5px 13.7px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.myList ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.myList ul li img {
  display: block;
  width: 160px;
  height: 160px;
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
  margin: 0 auto;
}
.myList ul li h2 {
  margin: 25px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #ff6700;
}
.myList ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
.myList #more {
  text-align: center;
  line-height: 280px;
}
.myList #more a {
  font-size: 18px;
  color: #333;
}
.myList #more a:hover {
  color: #ff6700;
}
.myList ul li .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}
.myList ul li:hover .delete {
  display: block;
}
.myList ul li .delete:hover {
  color: #ff6700;
}
</style>
