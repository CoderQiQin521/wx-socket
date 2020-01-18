<template>
  <div>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell
        v-for="(item,index) in firendList.firends"
        :key="index"
        :title="item.nickname"
        @click="$router.push('/privatechat')"
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
    let { data } = await this.$api.firend();
    this.firendList = data;
  }
};
</script>

<style>
</style>