<template>
  <view class="container">
    <text>{{ msg }}</text>
    <!-- #ifdef MP-WEIXIN -->
    <CollectionTips></CollectionTips>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello, world!',
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  @include flex-center(column);
  min-height: 100vh;
}
</style>
