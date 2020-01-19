<template>
  <div>
    <van-nav-bar title left-text="消息(6)" @click-right="$router.push('/add')">
      <van-icon name="add-o" slot="right" />
    </van-nav-bar>
    <div style="padding:20px;">
      <van-button type="primary" @click="$router.push('/room')">进入聊天室</van-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    onClickRight() {
      this.$socket.emit("login", {
        id: JSON.parse(localStorage.getItem("userInfo")).user._id
      });
    }
  }
};
</script>

<style>
</style>