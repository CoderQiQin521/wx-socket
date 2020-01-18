<template>
  <div>
    <van-nav-bar title="添加好友" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <ul class="searchList">
      <li class="searchList-item" v-for="item in searchList" :key="item._id">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="http://img.duoziwang.com/2018/18/06051452300689.jpg"
        />
        <div class="searchList-item-content">
          <div>{{item.nickname}}</div>
          <div class="username">账号: {{item.username}}</div>
          <van-button type="primary" @click="add(item._id)">添加好友</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      searchList: []
    };
  },
  methods: {
    async onSearch() {
      let { data } = await this.$api.userOne({
        params: {
          username: this.value
        }
      });
      this.searchList = data;
    },
    async add(_id) {
      let { data } = await this.$api.add({
        uid: _id
      });
    }
  }
};
</script>

<style lang="scss">
.searchList {
  padding: 20px;
  &-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    &-content {
      margin-left: 20px;
      .username {
        margin-top: 15px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>