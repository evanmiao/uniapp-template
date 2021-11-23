<template>
  <u-popup
    mode="center"
    width="550"
    height="550"
    border-radius="20"
    :mask-close-able="false"
    :value="isAuthorizePopupShow"
  >
    <view class="authorize-popup">
      <view class="title">
        <text v-if="isGetPhoneNumberBtnShow">您还没有绑定手机号</text>
        <text v-else>欢迎来到 uniapp-template 小程序</text>
      </view>
      <view class="desc">
        <text v-if="isGetPhoneNumberBtnShow">还差一步即可完成登录</text>
        <text v-else>更多功能请登录后使用</text>
      </view>
      <button
        v-if="isGetPhoneNumberBtnShow"
        class="btn confirm-btn"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >
        点击获取手机号码
      </button>
      <button v-else class="btn confirm-btn" @click="getUserProfile">
        微信一键登录
      </button>
      <button
        v-if="!isGetPhoneNumberBtnShow"
        class="btn cancel-btn"
        @click="cancel"
      >
        暂不登录
      </button>
      <view class="agreement">
        <text>登录代表您已同意</text>
        <text>《用户隐私协议》</text>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  SET_AUTHORIZATION_STATUS,
  TOGGLE_AUTHORIZE_POPUP,
} from '@/store/mutation-types'
import { api_login_profile, api_login_phone } from '@/api/login'

export default {
  name: 'AuthorizePopup',
  props: {},
  data() {
    return {
      isGetPhoneNumberBtnShow: false,
    }
  },
  computed: {
    ...mapState(['isAuthorizePopupShow']),
  },
  methods: {
    ...mapMutations([SET_AUTHORIZATION_STATUS, TOGGLE_AUTHORIZE_POPUP]),
    cancel() {
      this.TOGGLE_AUTHORIZE_POPUP()
      this.$emit('cancel')
    },
    async getUserProfile() {
      try {
        const e = await wx.getUserProfile({ desc: '用于完善用户信息' })
        const { rawData, signature, encryptedData, iv } = e
        if (rawData && signature && encryptedData && iv) {
          const res = await api_login_profile(
            rawData,
            signature,
            encryptedData,
            iv,
          )
          if (res.code === 1) this.isGetPhoneNumberBtnShow = true
        } else {
          this.$u.toast(e.errMsg)
          console.log(e)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getPhoneNumber(e) {
      try {
        const { encryptedData, iv } = e.detail
        if (encryptedData && iv) {
          const res = await api_login_phone(encryptedData, iv)
          this.TOGGLE_AUTHORIZE_POPUP()
          if (res.code === 1) {
            this.SET_AUTHORIZATION_STATUS(true)
            this.$emit('confirm')
          } else this.isGetPhoneNumberBtnShow = false
        } else {
          this.$u.toast(e.detail.errMsg)
          console.log(e)
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.authorize-popup {
  @include flex-center(column);
  height: 100%;
  padding-top: 20rpx;

  .title {
    margin-bottom: 26rpx;
    font-size: $font-size-xl;
    color: $text-color-primary;
  }

  .desc {
    margin-bottom: 46rpx;
    font-size: $font-size-sm;
    color: $text-color-regular;
  }

  .confirm-btn {
    width: 300rpx;
    height: 72rpx;
    margin-bottom: 20rpx;
    font-size: $font-size-sm;
    color: $text-color-reverse;
    background: $color-primary;
    border-radius: 10rpx;
  }

  .cancel-btn {
    @extend .confirm-btn;
    margin: 0;
    background: #c5c5c5;
  }

  .agreement {
    margin-top: 40rpx;

    text {
      font-size: $font-size-xxs;
      color: $text-color-secondary;

      &:last-child {
        color: $color-primary;
      }
    }
  }
}
</style>
