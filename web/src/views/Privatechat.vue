<template>
  <div>
    <van-nav-bar
      title="私聊"
      left-text="返回"
      right-text="成员"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />
    <van-popup v-model="show" position="right" :style="{ height: '100%' }">
      <ul class="body">
        <li>啊飒飒的</li>
        <li>啊飒飒的</li>
        <li>啊飒飒的</li>
        <li>啊飒飒的</li>
        <li>啊飒飒的</li>
        <li>啊飒飒的</li>
      </ul>
    </van-popup>
    <div class="fixed-bar">
      <van-field v-model="value" center clearable placeholder="请输入消息">
        <van-button slot="button" size="small" type="primary" @click="send">发送</van-button>
      </van-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      value: ""
    };
  },
  created() {
    this.$socket.on("chat", res => {
      console.log("res: ", res);
    });
  },
  methods: {
    onClickRight() {
      this.show = !this.show;
    },
    send() {
      this.$socket.emit("receiveComment", {
        message: this.value,
        from: this.$route.query.id,
        to: 123,
        type: "private"
      });
      this.value = "";
    }
  }
};
</script>

<style>
.body {
  padding: 20px;
}
.fixed-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #eee;
}
</style>