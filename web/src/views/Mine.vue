<template>
  <div>
    <van-nav-bar title left-text />
    <div style="padding: 20px">
      <van-image round width="4rem" height="4rem" src="@/assets/avatar.jpg" />
      <div>你好, {{getUserInfo.user.nickname}}</div>
      <van-button type="danger" round @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style>
</style>