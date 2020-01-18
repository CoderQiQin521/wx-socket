<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <transition name="van-slide-down">
      <div class="logo-warp text-center">
        <img class="logo" src="@/assets/wx.png" alt />
      </div>
    </transition>
    <van-cell-group>
      <van-field label="账号" v-model="user.username" placeholder="请输入账号" />
      <van-field label="昵称" v-model="user.nickname" placeholder="请输入昵称" />
      <van-field label="密码" type="password" v-model="user.password" placeholder="请输入密码" />
    </van-cell-group>
    <div style="padding: 20px;">
      <van-button type="primary" round block @click="register">注册</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async register() {
      let { err_code, data, msg } = await this.$api.register(this.user);
      if (err_code === 0) {
        Toast(msg);
        setTimeout(() => {
          this.onClickLeft();
        }, 1500);
      }
    }
  }
};
</script>

<style>
</style>