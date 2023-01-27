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
 * @Date: 2022-12-11 09:32:48
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-27 21:36:30
 * @FilePath: \pineapple-store-vue\src\views\pay.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <div class="order-pay">
    <div class="container">
      <div class="order-wrap">
        <div class="item-order">
          <div class="box">
            <div class="icon-succ"></div>

            <div class="order-infos">
              <h2>订单提交成功！请先去付款QAQ</h2>

              <div class="order-infos-box">
                <p>请在<span>24时</span>内完成支付, 超时后将取消订单</p>
                <p>收货信息：{{ address }}</p>
              </div>
            </div>
            <div class="order-total">
              <p>
                应付总额：<span>{{ totalAmount.toFixed(2) }}</span
                >元
              </p>
              <div class="order-infos-box">
                <i v-if="payShow" @click="payShowtime" class="el-icon-arrow-up"
                  >隐藏详情</i
                >
                <i
                  v-else="payShow"
                  @click="payShowtime"
                  class="el-icon-arrow-down"
                  >订单详情</i
                >
              </div>
            </div>
          </div>
        </div>

        <transition
          enter-active-class="animate__animated animate__fadeInDown animate__fast"
          leave-active-class="animate__animated animate__fadeOutUp animate__fast"
        >
          <div v-if="payShow" class="item-detail">
            <div class="item">
              <div class="detail-title">订单号码：</div>
              <div class="detail-info theme-color">{{ payOrderId }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{ address }}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul v-for="(item, index) in productList" :key="index">
                  <li>
                    <div class="goodstitle">
                      <img :src="item.productImg" alt="" />
                      {{ item.productName + "\xa0" }}
                      <span>{{ "\xa0" + item.skuName }}</span>
                    </div>

                    <div class="goodsInfo">
                      <span>{{ item.productPrice }}</span>
                      *
                      <span> {{ item.buyCounts }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">
                <span class="fp">电子发票 </span> <span class="gr">个人</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="item-pay">
        <div class="item-pay-box">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" @click="alipay"></div>
            <div class="pay pay-wechat" @click="nopay"></div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="支付小助手"
      :visible.sync="checkPay"
      width="30%"
      :before-close="handleClose"
    >
      <span>请问您是否已经完成支付</span>
      <ul>
        <li>账号：kqudyw6908@sandbox.com</li>
        <li>登录和支付密码：111111</li>
      </ul>
      <!-- <img></img> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="alipay">继续前往支付</el-button>
        <el-button type="primary" @click="checkOrderPay"
          >我已经完成支付</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "pay",
  data() {
    return {
      //支付订单
      payOrderId: "",

      //订单地址
      address: "",

      //订单总价
      totalAmount: 0,

      //订单下的详细
      productList: [],

      //检测用户是否真的支付的窗口
      checkPay: false,

      //  websocket 长连接服务
      socket: "",

      payShow: true,
    };
  },
  created() {
    if (this.$route.query.OrderId != undefined) {
      this.payOrderId = this.$route.query.OrderId;
    } else {
      this.$message.error("请先结算！");
    }

    this.getUserAddress();
    this.getOrderItem();
  },
  //   //开启了缓存我又不想关
  //   activated() {
  //     if (this.$route.query.OrderId != undefined) {
  //       this.payOrderId = this.$route.query.OrderId;
  //     } else {
  //       this.$message.error("请先结算！");
  //     }

  //     this.getUserAddress();
  //     this.getOrderItem();
  //   },
  methods: {
    //获取用户地址
    getUserAddress() {
      if (this.payOrderId == "") {
        return this.$message.error("未结算订单");
      }
      this.$axios.get("/api/orders/getId/" + this.payOrderId).then((res) => {
        if (res.data.code == 200) {
          this.address =
            res.data.data.receiverName +
            " " +
            res.data.data.receiverMobile +
            " " +
            res.data.data.receiverAddress;
          this.totalAmount = res.data.data.totalAmount;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //调用支付宝
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

            //websocket 长连接通信
            this.initWebSocket();

            window.open(routerData.href, "_ blank");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },

    nopay() {
      this.$message.error("正在和马总商谈");
    },

    getOrderItem() {
      if (this.payOrderId == "") {
        return this.$message.error("未结算订单");
      }

      this.$axios
        .get("api/orders/getOrderitem/" + this.payOrderId)
        .then((res) => {
          if (res.data.code == 200) {
            this.productList = res.data.data[0].productList;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$axios
            .get("/api/orders/getId/" + this.payOrderId)
            .then((res) => {
              if (res.data.code == 200) {
                if (res.data.data.status === "1") {
                  this.checkPay = false;
                  this.$message.error("系统检测到您，未完成支付");
                  return this.$router.push({ path: "/order" });
                } else if (res.data.data.status === "2") {
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

    checkOrderPay() {
      if (this.payOrderId == "") {
        return this.$message.error("请您先结算订单");
      }

      this.$axios.get("/api/orders/getId/" + this.payOrderId).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.status === "1") {
            return this.$message.error("系统检测到您，未完成支付");
          } else if (res.data.data.status === "2") {
            this.checkPay = false;
            this.$message.success("恭喜您成功支付");
            this.$router.push({ path: "/order" });
          }
        }
      });
    },

    payShowtime() {
      this.payShow = !this.payShow;
    },

    ///websocket 初始化
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        return this.$message.error("您的浏览器不支持WebSocket,无法获取数据");
      } else {
        let Url = "ws://121.4.154.210:8081/pay/" + this.payOrderId;
        // 实例化socket
        this.socket = new WebSocket(Url);

        //建立连接
        this.socket.onopen = this.webSocketOnOpen;
        //服务器推送信息
        this.socket.onmessage = this.webSocketOnMessage;
        //错误信息
        this.socket.onerror = this.webSocketOnError;
        //关闭事件
        this.socket.onclose = this.webSocketClose;
      }
    },
    webSocketOnOpen() {
      console.log("---连接建立成功---");
      //websocket连接后发送数据(send发送)
      // let actions = { 你要发送给后台的参数 }; //请根据实际项目需要进行修改
      // this.websocketsend(JSON.stringify(actions));
    },
    webSocketOnError() {
      //连接建立失败重连
      this.initWebSocket();
    },
    webSocketOnMessage(e) {
      //数据接收
      console.log(e);
      console.log(e.data);
      if (e.data === "支付成功") {
        this.checkPay = false;
        this.$message.success("恭喜您成功支付");
        this.$router.push({ path: "/order" });
      }
    },
    websocketsend(Data) {
      //数据发送
      this.socket.send(Data);
    },
    webSocketClose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
}

.order-pay {
  padding: 62px 50px;
  background-color: #f5f5f5;
  font-size: 14px;
  margin-bottom: 30px;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.order-wrap {
  padding: 62px 50px;
  background-color: #fff;
  font-size: 14px;
  margin-bottom: 30px;
}

.box {
  display: flex;
  height: 120px;
}

.icon-succ {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-size: 60px;
  margin-right: 30px;
  background: url("../assets/imgs/icon-gou.png") #80c58a no-repeat center;
}

.order-infos {
  width: 400px;
  height: 150px;
  margin-left: 20px;
}

.order-infos p span {
  color: #ff6700;
}

.order-infos-box {
  padding-top: 25px;
}

.order-total {
  padding-left: 250px;
  background-color: #fff;
  font-size: 15px;
  margin-bottom: 30px;
}

.order-total span {
  font-size: 28px;
  color: #ff6700;
}

.item-detail {
  border-top: 1px solid #d7d7d7;
  padding-top: 50px;
  padding-left: 130px;
  font-size: 14px;
}

.item-detail .item {
  margin-bottom: 19px;
}

.detail-title {
  display: inline-block;
  margin-bottom: 5px;
}

.detail-info {
  display: inline-block;
  margin-left: 20px;
}

.item .detail-info img {
  width: 30px;
  vertical-align: middle;
}

.good li {
  list-style: none;
}

.good .detail-title {
  position: absolute;
}

.good .detail-info {
  padding-top: 35px;
}

.good .detail-info li {
  padding-top: 20px;
}

.goodstitle {
  width: 400px;
  display: inline-block;
}
.goodstitle span {
  color: #ff6700;
}
.goodsInfo {
  width: 100px;
  margin-left: 50px;
  display: inline-block;
  color: #ff6700;
}

.item-pay {
  padding: 26px 50px 72px;
  background-color: #ffffff;
  color: #333333;
}

.item-pay-box {
  margin: 0 auto;
}

.item-pay h3 {
  font-size: 20px;
  font-weight: 200;
  color: #333333;
  padding-bottom: 24px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 26px;
}

.pay-way {
  font-size: 18px;
}

.pay-ali {
  width: 205px;
  height: 75px;
  background: url("../assets/imgs/icon-ali.png") #ffffff no-repeat center;
  background-size: 103px 38px;
  margin-top: 19px;
  display: inline-block;
  border: 1px solid blue;
}

.pay-wechat {
  width: 205px;
  height: 75px;
  background: url("../assets/imgs/icon-wechat.png") #ffffff no-repeat center;
  background-size: 103px 38px;
  margin-top: 19px;
  display: inline-block;
  border: 1px solid green;
  margin-left: 20px;
}

.detail-info .fp {
  color: #ff6700;
}
.detail-info .gr {
  margin-left: 10px;
  color: #ff6700;
}
</style>
