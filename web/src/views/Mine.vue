<template>
  <div>
    <van-nav-bar title left-text />
    <div style="padding: 20px">
      <van-image
        round
        width="4rem"
        height="4rem"
        src="https://lh3.googleusercontent.com/-fJ2yg8yXfWw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcxkLcVzOf4iqkls849JZ75FUqLvw/photo.jpg?sz=46"
      />
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