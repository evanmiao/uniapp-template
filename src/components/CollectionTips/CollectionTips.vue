<template>
  <view
    v-if="isCollectionTipsShow"
    class="collection-tips"
    :style="{ right }"
    @click="HIDE_COLLECTION_TIPS"
  >
    <view class="top-arrow" :style="{ right: arrowRight }"></view>
    <view style="display: flex; align-items: center">
      <text>点击 “</text>
      <image :src="icon" style="width: 22px; height: 7px"></image>
      <text>”，[添加到我的小程序]</text>
    </view>
    <view style="margin-top: 6px">
      <text>微信首页下拉即可快速访问</text>
    </view>
  </view>
</template>

<script>
import assets from '@/utils/assets'
import { mapState, mapMutations } from 'vuex'
import { HIDE_COLLECTION_TIPS } from '@/store/mutation-types'

export default {
  name: 'collectionTips',
  data() {
    return {
      icon: assets.common.menuButton,
      right: '7px',
      arrowRight: '65.25px',
    }
  },
  computed: {
    ...mapState(['isCollectionTipsShow']),
  },
  created() {
    const { width, right } = wx.getMenuButtonBoundingClientRect()
    const { screenWidth } = uni.$u.sys()
    this.right = screenWidth - right + 'px'
    this.arrowRight = width * 0.75 + 'px'
    setTimeout(this.HIDE_COLLECTION_TIPS, 5000)
  },
  methods: {
    ...mapMutations([HIDE_COLLECTION_TIPS]),
  },
}
</script>

<style lang="scss" scoped>
.collection-tips {
  position: fixed;
  z-index: 10000;
  top: 10px;
  padding: 10px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;

  .top-arrow {
    position: absolute;
    z-index: 10000;
    top: -20px;
    width: 0;
    height: 0;
    border-top: 10px transparent dashed;
    border-left: 10px transparent dashed;
    border-right: 10px transparent dashed;
    border-bottom: 10px rgba(0, 0, 0, 0.8) solid;
    transform: translateX(50%);
  }
}
</style>
