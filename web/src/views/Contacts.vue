<template>
  <div>
    <van-nav-bar title left-text="通讯录" @click-right="$router.push('/add')">
      <van-icon name="add-o" slot="right" />
    </van-nav-bar>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell
        v-for="(item,index) in firendList"
        :key="index"
        :title="item.nickname"
        @click="$router.push('/privatechat?id'
        +item.socketid)"
      />
    </van-index-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firendList: []
    };
  },
  async created() {
    let { data } = await this.$api.alluser();
    this.firendList = data;
  }
};
</script>

<style>
</style>