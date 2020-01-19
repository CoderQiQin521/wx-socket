<template>
  <div>
    <van-nav-bar title="登录" />

    <transition name="van-slide-down">
      <div class="logo-warp text-center">
        <img class="logo" src="@/assets/wx.png" alt />
      </div>
    </transition>
    <van-cell-group>
      <van-field label="账号" v-model="user.username" required placeholder="请输入账号" />
      <van-field label="密码" type="password" v-model="user.password" required placeholder="请输入密码" />
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
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      visible: true,
      user: {}
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    toRegister() {
      this.$router.push("/register");
    },
    async login() {
      if (this.user.username && this.user.password) {
        this.loginAction(this.user).then(res => {
          this.$socket.emit("login", {
            id: res.user._id
          });
        });
      } else {
        Dialog({ message: "请填写完整信息" });
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