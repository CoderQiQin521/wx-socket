<template>
  <div>
    <van-nav-bar
      :title="$route.query.name"
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
import storage from "@/utils/storage";
export default {
  data() {
    return {
      show: false,
      value: "",
      title: "",
      userinfo: {}
    };
  },
  sockets: {
    // socketid(res) {
    //   console.log("res: ", res);
    // }
    chat(res) {
      console.log("收到消息");
      console.log("res: ", res);
    }
  },
  async created() {
    let userinfo = storage.getStorage("userInfo");
    // this.userinfo = userinfo;

    // //res.user._id
    // 发送发起聊天者的uid
    this.$socket.emit("login", {
      id: userinfo.user._id
    });

    console.log("onShow: ");
    let { data } = await this.$api.userinfo();
    this.userinfo = data;
    console.log("data: ", data);
  },
  sockets: {
    chat(res) {
      console.log("res: ", res);
    }
  },
  methods: {
    onClickRight() {
      this.show = !this.show;
    },
    send() {
      this.$socket.emit("receiveComment", {
        message: this.value,
        from: this.userinfo._id, // 来自谁的消息
        to: this.$route.query.id, // 发给谁
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