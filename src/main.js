import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import "animate.css";




import Axios from "axios";
Vue.prototype.$axios = Axios;

// // 全局请求拦截器
Axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局响应拦截器
Axios.interceptors.response.use(
  (res) => {
    if (res.data.code == 401) {
      // 401表示没有登录
      // 提示没有登录
      // Vue.prototype.notifyError(res.data.msg);
      localStorage.setItem("token", "");
      router.push("/login");
    }
    if (res.data.code == 500) {
      // 500表示服务器异常
      // 跳转error页面
      router.push({ path: "/error" });
    }
    return res;
  },
  (error) => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.user;
  const token = localStorage.getItem("token");
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (!loginUser || !token) {
      // 没有登录，显示登录组件
      router.push("/login");
      if (from.name == null) {
        //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
        next("/");
        return;
      }
      // 终止导航
      next(false);
      return;
    }
  }
  next();
});

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2022-10-25 22:22:22
Vue.filter("dateFormat", (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = "0" + str;
    }
    return str;
  }
  
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return (
    y +
    "-" +
    timeAdd0(m) +
    "-" +
    timeAdd0(d) +
    " " +
    timeAdd0(h) +
    ":" +
    timeAdd0(mm) +
    ":" +
    timeAdd0(s)
  );
});

//全局组件
import MyMenu from "./components/MyMenu";
Vue.component(MyMenu.name, MyMenu);
import MyList from "./components/MyList";
Vue.component(MyList.name, MyList);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
