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
 * @LastEditTime: 2022-11-24 17:52:45
 * @FilePath: \pineapplestoer_webui\src\views\ConfirmOrder.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <div class="confirmOrder">
    <!-- 头部 -->
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order"></i>
        </p>
        <p>确认订单</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <!-- 选择地址 -->
      <div class="section-address">
        <p class="title">收货地址</p>
        <div class="address-body">
          <ul>
            <li
              :class="index == confirmAddress ? 'in-section' : ''"
              v-for="(item, index) in addressList"
              :key="item.addrId"
              @click="confirmAddressCss(index)"
            >
              <h2>{{ item.receiverName }}</h2>
              <p class="phone">{{ item.receiverMobile }}</p>
              <p class="address">
                {{ item.province + item.city + item.area + item.addr }}
              </p>
            </li>
            <li class="add-address">
              <i
                @click="dialogVisible = true"
                class="el-icon-circle-plus-outline"
              ></i>
              <p @click="dialogVisible = true">添加新地址</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择地址END -->

      <div
        class="address-meen"
        v-show="addressMeenShow"
        @click="addressListShow"
      >
        <p v-if="addressShow">显示全部地址</p>
        <p v-else="addressShow">隐藏全部地址</p>
      </div>

      <!-- 添加新地址 -->
      <el-dialog
        title="添加地址"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form ref="newaddress" :model="newaddress" label-width="90px">
          <el-form-item label="收货人名字" style="width: 300px">
            <el-input v-model="newaddress.receiverName"></el-input>
          </el-form-item>

          <el-form-item label="联系号码" style="width: 300px">
            <el-input v-model="newaddress.receiverMobile"></el-input>
          </el-form-item>

          <el-form-item label="收货人区域">
            <el-cascader
              style="width: 300px"
              handleChange
              size="large"
              :options="options"
              v-model="selectedOptions"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="详细地址" style="width: 500px">
            <el-input type="textarea" v-model="newaddress.addr"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserAddress">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加新地址END -->

      <!-- 商品及优惠券 -->
      <div class="section-goods">
        <p class="title">商品及优惠券</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.id">
              <img :src="item.url" />
              <span class="pro-name">{{ item.productName }}</span>
              <span class="pro-price"
                >{{ item.productPrice }}元 x {{ item.cartNum }}</span
              >
              <span class="pro-status"></span>
              <span class="pro-total"
                >{{ item.productPrice * item.cartNum }}元</span
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品及优惠券END -->

      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">配送方式</p>
        <p class="shipment">包邮</p>
      </div>
      <!-- 配送方式END -->

      <!-- 发票 -->
      <div class="section-invoice">
        <p class="title">发票</p>
        <p class="invoice">电子发票</p>
        <p class="invoice">个人</p>
        <p class="invoice">商品明细</p>
      </div>
      <!-- 发票END -->

      <!-- 结算列表 -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{ getCheckNum }}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{ getTotalPrice }}元</span>
            </li>
            <li>
              <span class="title">活动优惠：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">优惠券抵扣：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{ getTotalPrice }}</span
                >元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结算列表END -->

      <!-- 结算导航 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/shoppingCart" class="btn-base btn-return"
            >返回购物车</router-link
          >
          <a
            href="javascript:void(0);"
            @click="addOrder"
            class="btn-base btn-primary"
            >结算</a
          >
        </div>
      </div>
      <!-- 结算导航END -->
    </div>

    <el-dialog
      title="支付小助手"
      :visible.sync="checkPay"
      width="30%"
      :before-close="handleClose"
    >
      <span>请问您是否已经完成支付</span>
      <!-- <img></img> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="alipay">继续前往支付</el-button>
        <el-button type="primary" @click="checkOrderPay"
          >我已经完成支付</el-button
        >
      </span>
    </el-dialog>

    <!-- 主要内容容器END -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import qs from "qs";
import { mapActions } from "vuex";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "",
  data() {
    return {
      // 虚拟数据
      confirmAddress: 1, // 选择的地址id
      dialogVisible: false, //新增地址弹出层
      selectedOptions: [], //用户选择后的三级城市数据
      newaddress: {}, //新增地址list
      addressShow: false, //显示全部地址
      addressMeenShow: false,
      options: regionData, //选择前三级联动区域不含全部选项
      // 原始地址列表
      address: [],
      //显示的地址
      addressList: [],
      //隐藏数据后的地址列表
      addressHide: [],
      //跳转支付宝支付的订单
      payOrderId: "",
      //检测用户是否真的支付
      checkPay: false,
    };
  },
  created() {
    // 如果没有勾选购物车商品直接进入确认订单页面,提示信息并返回购物车
    this.getUserAddress();
    if (this.getCheckNum < 1) {
      this.$message.error("请勾选商品后再结算");
      return this.$router.push({ path: "/shoppingCart" });
    }
  },
  computed: {
    // 结算的商品数量; 结算商品总计; 结算商品信息
    ...mapGetters(["getCheckNum", "getTotalPrice", "getCheckGoods"]),
  },

  watch: {
    addressList(newVal, oldVal) {
      if (newVal.length > 3) {
        this.addressMeenShow = true;
        this.addressShow = true;
        this.address = this.addressList;

        for (let i = 0; i < 3; i++) {
          this.addressHide[i] = this.addressList[i];
        }
        // this.addressList = this.addressHide;
      }
      // console.log(newVal);
      // console.log(oldVal);
    },
  },

  methods: {
    ...mapActions(["deleteShoppingCart"]),

    addressListShow() {
      if (this.addressShow) {
        this.addressList = this.addressHide;
        this.addressShow = !this.addressShow;
      } else {
        this.addressList = this.address;
        this.addressShow = !this.addressShow;
      }
    },

    confirmAddressCss(val) {
      this.confirmAddress = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$axios
            .get("/api/orders/getId/" + this.payOrderId)
            .then((res) => {
              if (res.data.code == 200) {
                if (res.data.data.status === "1") {
                  let products = this.getCheckGoods;
                  for (let i = 0; i < products.length; i++) {
                    const temp = products[i];
                    // 删除已经结算的购物车商品
                    this.deleteShoppingCart(temp.cartId);
                  }
                  this.checkPay = false;
                  this.$message.error("系统检测到您，未完成支付");
                  return this.$router.push({ path: "/order" });
                } else if (res.data.data.status === "2") {
                  let products = this.getCheckGoods;
                  for (let i = 0; i < products.length; i++) {
                    const temp = products[i];
                    // 删除已经结算的购物车商品
                    this.deleteShoppingCart(temp.cartId);
                  }
                  this.checkPay = false;
                  this.$message.success("恭喜您成功支付");
                  this.$router.push({ path: "/order" });
                }
              }
            });
          done();
        })
        .catch((_) => {});
    },

    //确认订单
    addOrder() {
      if (this.addressList[this.confirmAddress] == null) {
        this.$message.error("请先选择地址");
        return false;
      }
      if (this.getCheckGoods.length < 0) {
        return this.$message.error("购物车没有商品");
      }

      this.$axios
        .post("/api/orders/", {
          userId: this.$store.getters.getUser.userId,
          receiverName: this.addressList[this.confirmAddress].receiverName,
          receiverMobile: this.addressList[this.confirmAddress].receiverMobile,
          receiverAddress:
            this.addressList[this.confirmAddress].province +
            this.addressList[this.confirmAddress].city +
            this.addressList[this.confirmAddress].area +
            this.addressList[this.confirmAddress].addr,
          totalAmount: this.getTotalPrice,
          productList: this.getCheckGoods,
        })
        .then((res) => {
          // let products = this.getCheckGoods;

          switch (res.data.code) {
            case 200:
              // for (let i = 0; i < products.length; i++) {
              //   const temp = products[i];
              //   // 删除已经结算的购物车商品
              //   this.deleteShoppingCart(temp.cartId);
              // }

              // 提示结算结果
              this.$message.success("成功确定订单，请先支付");

              // 跳转我的订单页面
              // this.$router.push({ path: "/order" });

              // console.log(res.data.data.orderId);
              this.payOrderId = res.data.data.orderId;

              this.alipay();

              break;
            default:
              // 提示失败信息
              this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },

    //获取用户地址
    getUserAddress() {
      this.$axios
        .get("/api/user-addr/getUserId/" + this.$store.getters.getUser.userId)
        .then((res) => {
          if (res.data.code == 201) {
            this.$message.error(res.data.msg);
          } else {
            this.address = res.data.data;

            if (this.address.length > 3) {
              this.addressMeenShow = true;
              for (let i = 0; i < 3; i++) {
                this.addressHide[i] = this.address[i];
                this.addressList[i] = this.address[i];
              }
            } else {
              this.addressList = this.address;
            }
          }
        });
    },

    //增加用户地址
    addUserAddress() {
      this.newaddress.userId = this.$store.getters.getUser.userId;

      if (this.selectedOptions != "" || this.selectedOptions.length > 3) {
        this.newaddress.province = CodeToText[this.selectedOptions[0]];
        this.newaddress.city = CodeToText[this.selectedOptions[1]];
        this.newaddress.area = CodeToText[this.selectedOptions[2]];

        this.$axios.post("/api/user-addr/", this.newaddress).then((res) => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            // this.address.push(res.data.data);
            this.addressList.unshift(res.data.data);
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.error("区域数据错误！请重新选择区域");
        return false;
      }
    },

    alipay() {
      if (this.payOrderId == "") {
        return this.$message.error("未结算订单");
      }

      this.$axios
        .post("/api/orders/pay", qs.stringify({ orderId: this.payOrderId }))
        .then((res) => {
          if (res.data.code == 200) {
            let routerData = this.$router.resolve({
              path: "/orderAlipay",
              query: { htmlData: res.data.data },
            });
            // 打开新页面
            this.checkPay = true;
            window.open(routerData.href, "_ blank");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },

    checkOrderPay() {
      if (this.payOrderId == "") {
        return this.$message.error("请您先结算订单");
      }

      this.$axios.get("/api/orders/getId/" + this.payOrderId).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.status === "1") {
            return this.$message.error("系统检测到您，未完成支付");
          } else if (res.data.data.status === "2") {
            let products = this.getCheckGoods;
            for (let i = 0; i < products.length; i++) {
              const temp = products[i];
              // 删除已经结算的购物车商品
              this.deleteShoppingCart(temp.cartId);
            }
            this.checkPay = false;
            this.$message.success("恭喜您成功支付");
            this.$router.push({ path: "/order" });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 头部CSS */
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1225px;
  margin: 0 auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ff6700;
  line-height: 80px;
}
/* 头部CSS END */

/* 主要内容容器CSS */
.confirmOrder .content {
  width: 1225px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}

/* 选择地址CSS */
.confirmOrder .content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.confirmOrder .content .address-body li {
  float: left;
  color: #333;
  width: 210px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid #ff6700;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

.address-meen {
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: #e6e6e6;
}

/* 商品及优惠券CSS */
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 150px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 30px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
}
/* 配送方式CSS END */

/* 发票CSS */
.confirmOrder .content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ff6700;
}
/* 发票CSS END */

/* 结算列表CSS */
.confirmOrder .content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
/* 结算导航CSS */

/* 主要内容容器CSS END */
</style>
