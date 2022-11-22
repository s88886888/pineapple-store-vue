<!--
 * @Author: Linson 854700937@qq.com
 * @Date: 2022-10-20 03:56:36
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-11-22 11:59:07
 * @FilePath: \pineapplestoer_webui\src\views\Login.vue
 * @Description: 登录注册
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
-->

<template>
  <div class="login_main">
    <div id="left">
      <img
        id="background-image"
        src="../assets/image/login/background-image.jpg"
      />
    </div>

    <div id="right">
      <div id="nav">
        <div class="nav-left">
          <img src="../assets/pl_icon.png" />
          <p>账号登录</p>
        </div>

        <div class="nav-right">
          <select id="language" class="nav-right font ch">
            <option selected>中文(简体)</option>
            <option>中文(繁体)</option>
            <option>English</option>
          </select>

          <ul class="nav-right font">
            <li class="ch">用户协议</li>
            <li class="ch">隐私政策</li>
            <li class="ch">帮助中心</li>
            <li>|</li>
          </ul>
        </div>
      </div>

      <div id="main" class="userbox">
        <!-- tab卡片 -->
        <el-tabs v-model="activeName">
          <el-tab-pane
            class="selected pointer"
            label="登录"
            name="first"
            :lazy="true"
          >
            <el-form
              :model="loginList"
              status-icon
              :rules="rules"
              ref="loginList"
              class="demo-loginList"
            >
              <el-form-item label="" prop="userName">
                <el-input
                  class="dialog-input-text"
                  type="text"
                  v-model="loginList.userName"
                  autocomplete="off"
                  placeholder="手机号码/账号ID"
                ></el-input>
              </el-form-item>

              <el-form-item label="" prop="passWord">
                <el-input
                  class="dialog-input-text"
                  type="password"
                  v-model="loginList.passWord"
                  autocomplete="off"
                  placeholder="密码"
                ></el-input>
              </el-form-item>

              <el-form-item prop="type">
                <el-checkbox-group v-model="loginList.type">
                  <el-checkbox id="ch-box" class="ch-box" label="" name="type">
                    <div id="text">
                      已阅读并同意<a class="pointer">用户协议</a> 和<a
                        class="pointer"
                        >隐私政策</a
                      >
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>

            <div class="dingxiangui" ref="login"></div>

            <el-button
              id="log-in"
              class="pointer"
              @click="loginsubmitForm('loginList')"
              >登录</el-button
            >
            <div class="action">
              <a id="a1" class="pointer">忘记密码？</a>
              <a id="a2" class="pointer">手机号登录</a>
            </div>
            <div id="other">
              <!-- <p>请先验证</p> -->
              <!-- <div>
                <img src="../assets/image/login/支付宝.png" />
                <img src="../assets/image/login/微信.png" />
                <img src="../assets/image/login/QQ.png" />
                <img src="../assets/image/login/微博.png" />
              </div> -->
            </div>
          </el-tab-pane>

          <el-tab-pane label="注册" name="second" :lazy="true">
            <el-form
              :model="resgitList"
              status-icon
              :rules="rerules"
              ref="resgitList"
              class="demo-loginList"
            >
              <el-form-item label="" prop="phone">
                <el-input
                  class="dialog-input-text"
                  type="text"
                  v-model="resgitList.phone"
                  autocomplete="off"
                  placeholder="手机号码"
                  @change="checkPhone"
                ></el-input>
                <p v-show="checkPhoneShow" class="dialog-input-text-phone">
                  *该手机已经被注册
                </p>
              </el-form-item>

              <el-form-item label="" prop="phonecode">
                <el-input
                  class="dialog-input-text-phonecode"
                  type="text"
                  v-model="resgitList.phonecode"
                  autocomplete="off"
                  placeholder="验证码"
                >
                </el-input>

                <div class="phonecode-button">
                  <el-button v-if="checkTokenShow" @click="tokenshow"
                    >验证码</el-button
                  >
                  <!-- <el-button v-if="phoneCodeShow" @click="getPhoneCode"
                    >发送</el-button
                  > -->
                  <div ref="resgit"></div>
                </div>
              </el-form-item>

              <el-form-item label="" prop="userName">
                <el-input
                  class="dialog-input-text"
                  type="text"
                  v-model="resgitList.userName"
                  autocomplete="off"
                  placeholder="用户名"
                  @change="checkName"
                ></el-input>
                <p v-show="checkNameShow" class="dialog-input-text-phone">
                  *该用户名已经被注册
                </p>
              </el-form-item>

              <el-form-item label="" prop="passWord">
                <el-input
                  class="dialog-input-text"
                  type="password"
                  v-model="resgitList.passWord"
                  autocomplete="off"
                  placeholder="设置密码"
                ></el-input>
              </el-form-item>

              <el-form-item prop="type">
                <el-checkbox-group v-model="resgitList.type">
                  <el-checkbox id="ch-box" class="ch-box" label="" name="type">
                    <div id="text">
                      已阅读并同意菠萝帐号<a class="pointer">用户协议</a> 和<a
                        class="pointer"
                        >隐私政策</a
                      >
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>

            <div class="action">
              <el-button
                id="log-in"
                class="pointer"
                @click="resgitsubmitForm('resgitList')"
                >注册</el-button
              >
              <a id="a1" class="pointer">收不到验证码？</a>
            </div>

            <div id="other">
              <!-- <p>其他方式登录</p>
              <div>
                <img src="../assets/image/login/支付宝.png" />
                <img src="../assets/image/login/微信.png" />
                <img src="../assets/image/login/QQ.png" />
                <img src="../assets/image/login/微博.png" />
              </div> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div id="tail">菠萝公司版权所有-XXXXXX-京公网安备XXX号-京ICP证XXXX号</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      //登录表单验证
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 5 到 8 个字符",
            trigger: "blur",
          },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请先同意服务协议",
            trigger: "change",
          },
        ],
      },
      //注册表单验证
      rerules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        phonecode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请检查验证码格式", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: "用户名只能是中文",
          },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请先同意服务协议",
            trigger: "change",
          },
        ],
      },

      activeName: "first", //tabs 默认打开的页
      loginToekn: "", //登录时验证码token
      resgitToken: "", //注册时时验证码token

      checkPhoneShow: false, //检查手机号码是否重复
      checkNameShow: false, //检查用户名是否重复
      // phoneCodeShow: false, //验证码发送事件
      checkTokenShow: true, //人机校验事件

      //登录
      loginList: {
        userName: "",
        passWord: "",
        type: [],
        loginToken: "",
      },
      //注册
      resgitList: {
        userName: "",
        phone: "",
        passWord: "",
        phonecode: "",
        type: [],
      },
    };
  },

  created() {},

  mounted() {
    //登录
    //页面进入时就挂载验证码
    _dx.Captcha(this.$refs.login, {
      appId: "670f56a070bea7d2a1e1939169f4967d",
      apiServer: "https://proxy-api.dingxiang-inc.com",
      style: "inline",
      width: "400",
      success: (loginToekn) => {
        this.loginList.loginToken = loginToekn;
      },
    });
  },
  watch: {
    // resgitToken(val) {
    //   if (val) {
    //     this.phoneCodeShow = !this.phoneCodeShow;
    //     this.checkTokenShow = !this.checkTokenShow;
    //   } else {
    //     this.phoneCodeShow = !this.phoneCodeShow;
    //     this.checkTokenShow = !this.checkTokenShow;
    //   }
    // },
  },
  methods: {
    ...mapActions(["setUser"]),
    //点击验证码实现 弹出挂载人机验证
    tokenshow() {
      let checkPhone =
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (!checkPhone.test(this.resgitList.phone)) {
        return this.$message.error("手机号码格式错误！");
      }

      if(this.checkNameShow)
      {
        return this.$message.error("手机已经被注册！");
      }

      var showtime = _dx.Captcha(this.$refs.resgit, {
        appId: "670f56a070bea7d2a1e1939169f4967d",
        apiServer: "https://proxy-api.dingxiang-inc.com",
        style: "popup",
        // width: "400",
        success: (resgitToken) => {
          this.resgitToken = resgitToken;
          this.getPhoneCode();
        },
      });
      showtime.show();
    },

    // 登录校验提交
    loginsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginList.loginToken == "") {
            this.$message.error("请先完成验证码");
          } else {
            this.login();
          }
        } else {
          console.log("球球你别玩校验了");
          return false;
        }
      });
    },

    //注册校验
    resgitsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.resgitList.resgitToken == "") {
            this.$message.error("请先完成验证码");
          } else {
            this.resgit();
          }
        } else {
          console.log("球球你别玩校验了");
          return false;
        }
      });
    },
    //登录事件
    async login() {
      const { data: res } = await this.$axios
        .post("/api/users/login", qs.stringify(this.loginList))
        .catch((err) => {
          return Promise.reject(err);
        });

      if (res.code !== 200) {
        _dx.Captcha(this.$refs.login, {
          appId: "670f56a070bea7d2a1e1939169f4967d",
          apiServer: "https://proxy-api.dingxiang-inc.com",
          style: "inline",
          width: "400",
          success: (loginToekn) => {
            this.loginList.loginToken = loginToekn;
          },
        });

        return this.$message.error(res.msg);
      } else {
        this.$message({
          message: res.msg + "",
          type: "success",
        });
        // 登录信息存到vuex
        this.setUser(res.data.username);
        let user = JSON.stringify(res.data);
        localStorage.setItem("user", user);
        localStorage.setItem("token", res.token);
        this.$router.push("/");
      }
    },
    //注册事件
    async resgit() {
      const { data: res } = await this.$axios.post(
        "/api/users/resgit",
        qs.stringify(this.resgitList)
      );

      if (res.code == 4004) {
        return this.$message.error(res.msg);
      }
      if (res.code == 4005) {
        this.tokenshow();
        return this.$message.error(res.msg);
      }
      if (res.code == 200) {
        this.$message({
          message: res.msg + "",
          type: "success",
        });

        this.setUser(res.data.username);
        let user = JSON.stringify(res.data);
        localStorage.setItem("user", user);
        localStorage.setItem("token", res.token);
        this.$router.push("/");
      } else {
        return this.$message.error(res.msg);
      }
    },
    //向后端请求验证码
    async getPhoneCode() {
      if (this.resgitList.phone == "") {
        this.$message.error("手机号码不允许为空");
        return false;
      }
      const { data: res } = await this.$axios.post(
        "/api/users/getPhoneCode",
        qs.stringify({
          phone: this.resgitList.phone,
          resgitToken: this.resgitToken,
        })
      );
      if (res.code !== 200) {
        this.resgitToken = "";
        return this.$message.error(res.msg);
      } else {
        this.$message({
          message: res.msg + "",
          type: "success",
        });
      }
    },

    //动态验证手机号码是否存在
    async checkPhone() {
      let phone =
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

      if (phone.test(this.resgitList.phone)) {
        const { data: res } = await this.$axios.get(
          "/api/users/CheckUserByPhone/" + this.resgitList.phone
        );
        if (res.code !== 200) {
          this.checkPhoneShow = true;
        } else {
          this.checkPhoneShow = false;
        }
      }
    },

    async checkName() {
      let name = /^[\u4E00-\u9FA5]+$/;

      if (name.test(this.resgitList.userName)) {
        const { data: res } = await this.$axios.get(
          "/api/users/CheckUserByName/" + this.resgitList.userName
        );
        if (res.code !== 200) {
          this.checkNameShow = true;
        } else {
          this.checkNameShow = false;
        }
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/login.css";
</style>
