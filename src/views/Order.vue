<!--
 * @Author: Linson 854700937@qq.com
 * @Date: 2022-10-20 01:47:02
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-04-11 20:12:39
 * @FilePath: \pineapple-store-vue\src\views\Order.vue
 * @Description: 我的订单页面组件
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
-->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p
          @click="getOrder"
          :style="
            isColor == 0
              ? 'font-size: 30px;  color: #ff6700;  margin-left: 30px'
              : 'font-size: 30px; margin-left: 30px'
          "
        >
          <i class="el-icon-s-order"></i>
          我的订单
        </p>

        <div>
          <p
            class="order-status"
            :style="
              isColor == 1
                ? 'font-size: 20px;  color: #ff6700;  margin-left: 30px'
                : 'font-size: 20px; margin-left: 30px'
            "
            @click="getOrderNoPay"
          >
            待支付
          </p>

          <p
            class="order-status"
            :style="
              isColor == 4
                ? 'font-size: 20px;  color: #ff6700;  margin-left: 30px'
                : 'font-size: 20px; margin-left: 30px'
            "
            @click="getSeedOrder"
          >
            待发货
          </p>

          <p
            class="order-nostatus"
            :style="
              isColor == 2
                ? 'font-size: 20px;  color: #ff6700;  margin-left: 30px'
                : 'font-size: 20px; margin-left: 30px'
            "
            @click="getseedOrder"
          >
            待收货
          </p>

          <p
            class="order-nostatus"
            :style="
              isColor == 5
                ? 'font-size: 20px;  color: #ff6700;  margin-left: 30px'
                : 'font-size: 20px; margin-left: 30px'
            "
            @click="getOrderOn"
          >
            已完成
          </p>

          <p
            class="order-status"
            :style="
              isColor == 3
                ? 'font-size: 20px;  color: #ff6700;  margin-left: 30px'
                : 'font-size: 20px; margin-left: 30px'
            "
            @click="getOffOrder"
          >
            订单回收站
          </p>
        </div>
      </div>
    </div>
    <!-- 我的订单头部END -->

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length > 0">
      <div class="content" v-for="(item, index) in orders" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li
            :class="
              item.status === '1'
                ? 'order-info nopay'
                : item.status === '6'
                ? 'order-info closepay'
                : 'order-info'
            "
          >
            <div class="order-id">订单编号: {{ item.orderId }}</div>
            <div class="order-time">
              订单时间: {{ item.createTime | dateFormat }}
            </div>
            <div class="order-time" v-if="item.status === '1'">
              <p>未支付</p>
            </div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li
            class="product-list"
            v-for="(product, i) in item.productList"
            :key="i"
          >
            <div class="pro-img">
              <router-link
                :to="{
                  path: '/goods/details',
                  query: { productID: product.productId },
                }"
              >
                <img :src="product.productImg" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{
                  path: '/goods/details',
                  query: { productID: product.productId },
                }"
                >{{ product.productName }}</router-link
              >
            </div>
            <div class="pro-price">{{ product.productPrice }}元</div>
            <div class="pro-num">{{ product.buyCounts }}</div>
            <div class="pro-total pro-total-in">
              {{ (product.productPrice * product.buyCounts).toFixed(2) }}元
            </div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{ total[index].totalNum }}</span>
              件商品
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <el-button
                v-show="item.status === '1'"
                @click="payOrder(item.orderId)"
                >支付</el-button
              >
              <el-button
                v-show="item.status === '3'"
                @click="confirmReceipt(item.orderId)"
                >确认收货</el-button
              >
              <el-button
                v-show="item.status === '3' || item.status === '2'"
                @click="showOrderReturn(item.orderId)"
                >申请退货</el-button
              >
              <!-- payOrder(item.orderId) -->
              <el-button
                v-show="item.status === '1'"
                style="padding-right: 20px"
                @click="delOrderStatus(item.orderId)"
                >取消</el-button
              >

              <span class="total-price-title">合计：</span>
              <span class="total-price"
                >{{ total[index].totalPrice.toFixed(2) }}元</span
              >
            </span>
          </div>
          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top: -40px"></div>
    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>您的订单还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->

    <!-- 申请退货 -->

    <el-dialog title="申请退货" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="退货类型" prop="orderReturnDict">
          <el-select
            v-model="form.orderReturnDict"
            placeholder="请选择退货类型"
          >
            <el-option
              v-for="(item, index) in orderReturnSelect"
              :key="index"
              :label="item.desc"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="退货理由" prop="orderReturn">
          <el-input
            type="textarea"
            v-model="form.orderReturn"
            placeholder="请输入退货理由"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "Order",
  data() {
    return {
      rules: {
        orderReturn: [
          { required: true, message: "请输入退货理由", trigger: "blur" },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur",
          },
        ],
        orderReturnDict: [
          { required: true, message: "请选择退货类型", trigger: "change" },
        ],
      },
      dialogVisible: false,
      orders: [], // 订单列表
      total: [], // 每个订单的商品数量及总价列表
      isColor: 0,
      form: {},
      returnOrderId: null,
      orderReturnSelect: [
        { id: 1, desc: "不喜欢了" },
        { id: 2, desc: "材质与商品描述不符" },
        { id: 3, desc: "质量问题" },
        { id: 4, desc: "做工有瑕疵" },
        { id: 5, desc: "假冒品牌" },
        { id: 6, desc: "其他原因" },
      ],
    };
  },
  activated() {
    // 获取订单数据
    this.getOrder();
  },
  watch: {
    // 通过订单信息，计算出每个订单的商品数量及总价
    orders: function (val) {
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i].productList;

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.buyCounts;
          totalPrice += temp.productPrice * temp.buyCounts;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    },
  },

  methods: {
    showOrderReturn(orderId) {
      if (orderId == null) {
        return this.$message.error("订单数据为空!");
      } else {
        this.returnOrderId = orderId;
        this.dialogVisible = true;
      }
    },
    async submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$set(this.form, "orderId", this.returnOrderId);

          this.dialogVisible = false;

          await this.$axios
            .post("/api/orderReturn/", this.form)
            .then(async (resp) => {
              await this.$axios
                .get("/api/orders/returnOrderUsert/" + this.returnOrderId)
                .then((res) => {
                  this.getOrder();
                  return this.$message.success(res.msg);
                });
            });
        } else {
          return false;
        }
      });
    },
    getOrder() {
      this.isColor = 0;
      this.$axios
        .get("/api/orders/getOrder/" + this.$store.getters.getUser.userId)
        .then((res) => {
          if (res.data.code == 200) {
            this.orders = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    alipay(val) {
      if (val == "") {
        return this.$message.error("未知订单");
      }

      this.$axios
        .post("/api/orders/pay", qs.stringify({ orderId: val }))
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

    payOrder(val) {
      if (val == "") {
        return this.$message.error("未知订单");
      }

      this.$router.push({
        path: "/pay",
        query: { OrderId: val },
      });
    },

    //代发货
    getSeedOrder() {
      this.isColor = 4;
      this.$axios
        .get("/api/orders/getUserIdbyStatus", {
          params: {
            Id: this.$store.getters.getUser.userId,
            status: "2",
          },
        })
        .then((res) => {
          this.orders = res.data.data;
        });
    },
    //已完成
    getOrderOn() {
      this.isColor = 5;
      this.$axios
        .get("/api/orders/getUserIdbyStatus", {
          params: {
            Id: this.$store.getters.getUser.userId,
            status: "5",
          },
        })
        .then((res) => {
          this.orders = res.data.data;
        });
    },

    getOrderNoPay() {
      this.isColor = 1;
      this.$axios
        .get("/api/orders/getUserIdbyStatus", {
          params: {
            Id: this.$store.getters.getUser.userId,
            status: "1",
          },
        })
        .then((res) => {
          this.orders = res.data.data;
        });
    },
    getseedOrder() {
      this.isColor = 2;
      this.$axios
        .get("/api/orders/getUserIdbyStatus", {
          params: {
            Id: this.$store.getters.getUser.userId,
            status: "3",
          },
        })
        .then((res) => {
          this.orders = res.data.data;
        });
    },
    getOffOrder() {
      this.isColor = 3;
      this.$axios
        .get("/api/orders/getUserIdbyStatus", {
          params: {
            Id: this.$store.getters.getUser.userId,
            status: "6",
          },
        })
        .then((res) => {
          this.orders = res.data.data;
        });
    },
    //  用户手动关闭订单
    delOrderStatus(val) {
      if (val == null) {
        return this.$message.error("请选中订单");
      }
      this.$axios
        .put(
          "/api/orders/UpdateUserOff",
          { OrderID: val, UserId: this.$store.getters.getUser.userId },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.orders.map((item) => {
              if (item.orderId == val) {
                item.status = "6";
              }
            });

            // let index= this.orders.findIndex(item => item.orderId == val);
            // // console.log(aaa);

            // this.orders[index].status="6";

            return this.$message.success(res.data.msg);
          } else {
            return this.$message.error(res.data.msg);
          }
        });
    },
    confirmReceipt(orderId) {
      if (orderId == null) {
        return this.$message.error("订单错误");
      }
      this.$axios
        .post(
          "/api/orders/confirmReceipt",
          {
            orderId: orderId,
            userId: this.$store.getters.getUser.userId,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.getseedOrder();
            this.getOrderOn();
            this.isColor = 3;
            return this.$message.success(res.data.msg);
          } else {
            return this.$message.error(res.data.msg);
          }
        });
    },
  },
};
</script>
<style scoped>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

/* 我的订单头部CSS */
.order .order-header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}

.order .order-header .order-header-content {
  width: 1225px;
  margin: 0 auto;
}

.order .order-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}

/* 我的订单头部CSS END */
.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}

/* 我的订单表头CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #ff6700;
}

.order .content ul .order-info .order-id {
  float: left;
  color: #ff6700;
}

.order .content ul .order-info .order-time {
  float: right;
}

.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}

.nopay {
  background-color: #ea1558;
}

.closepay {
  background-color: black;
}

.order-status {
  color: #ff6700;
}

/* 我的订单表头CSS END */

/* 订单列表CSS */

.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}

.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}

.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}

.order .content ul .pro-name {
  float: left;
  width: 380px;
}

.order .content ul .pro-name a {
  color: #424242;
}

.order .content ul .pro-name a:hover {
  color: #ff6700;
}

.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}

.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}

.order .content ul .pro-total {
  float: left;
  width: 160px;
  padding-right: 81px;
  text-align: right;
}

.order .content ul .pro-total-in {
  color: #ff6700;
}

.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}

.order .order-bar .order-bar-left {
  float: left;
}

.order .order-bar .order-bar-left .order-total {
  color: #757575;
}

.order .order-bar .order-bar-left .order-total-num {
  color: #ff6700;
}

.order .order-bar .order-bar-right {
  float: right;
}

.order .order-bar .order-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}

.order .order-bar .order-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}

/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}

.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}

.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}

.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}

/* 订单为空的时候显示的内容CSS END */
</style>
