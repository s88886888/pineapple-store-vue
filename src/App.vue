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
 * @Date: 2022-10-20 01:41:22
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2022-12-11 11:07:30
 * @FilePath: \pineapplestoer_webui\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

 <template>
  <div>
    <el-container>
      <!-- 顶部导航栏 -->
      <top v-if="!(path ==='/login')" ></top>
      <!-- 顶栏容器 -->
      <Header v-show="!(path =='/login')"></Header>
      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive exclude="pay,Goods">
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->
      <!-- 底栏容器 -->
      <el-footer>
        <Footer v-if="!(path ==='/login')"></Footer>
      </el-footer>
      <!-- 底栏容器END -->
    </el-container>
  </div>
</template>
<script>
import top from "../src/components/top.vue";
import Header from "../src/components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    top,
    Header,
    Footer
  },
  data(){
    return {
      path: ''
    }
  },
  mounted() {
          this.path = this.$route.path;
        },
        watch:{
            $route(to,from){
                this.path = to.path
            }
        }

  
};
</script>
<style scoped>
@import "@/assets/css/all.css";
</style>


