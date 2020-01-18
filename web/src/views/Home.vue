<template>
  <div class="home">
    <router-view />

    <van-tabbar route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="chat-o" to="/">消息</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/contacts">通讯录</van-tabbar-item>
      <van-tabbar-item icon="search" to="/find">发现</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {};
  }
};
</script>
