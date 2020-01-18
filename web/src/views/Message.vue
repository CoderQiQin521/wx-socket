<template>
  <div>
    <van-nav-bar title left-text="消息(6)" @click-right="$router.push('/add')">
      <van-icon name="add-o" slot="right" />
    </van-nav-bar>
    <van-button type="primary" @click="$router.push('/room')">聊天室</van-button>
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