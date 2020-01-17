<template>
  <div>
    <van-nav-bar title="登录" />

    <transition name="van-slide-down">
      <div class="text-center" v-show="visible">
        <img class="logo" src="@/assets/wx.png" alt />
      </div>
    </transition>
    <van-cell-group>
      <van-field label="帐号" v-model="user.username" placeholder="请输入帐号" />
      <van-field label="密码" type="password" v-model="user.password" placeholder="请输入密码" />
    </van-cell-group>
    <div style="padding: 20px;">
      <van-button type="primary" round block @click="login">登录</van-button>
    </div>
    <div style="padding: 20px;text-align: right">
      <van-button type="default" size="mini" @click="toRegister">去注册</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      visible: "",
      user: {}
    };
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    async login() {
      let { err_code, data, msg } = await this.$api.login(this.user);
      if (err_code === 0) {
        Dialog({ message: `欢迎${data.user.nickname}登录` });
        // Toast(msg);
        // setTimeout(() => {
        // }, 1500);
      }
    }
  }
};
</script>

<style>
.logo {
  width: 100px;
  height: 100px;
}
</style>