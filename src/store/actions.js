import {
  SET_TOKEN,
  SET_AUTHORIZATION_STATUS,
  SHOW_COLLECTION_TIPS,
} from '@/store/mutation-types'
import { api_login_token } from '@/api/login'

const actions = {
  initStore({ commit, dispatch }) {
    return new Promise(resolve => {
      wx.checkSession()
        .then(async () => {
          const token = uni.getStorageSync('token')
          const expiration = uni.getStorageSync('expiration')
          const isAuthorized = uni.getStorageSync('isAuthorized')
          if (token && expiration > Date.now()) {
            commit(SET_TOKEN, { token, expiration })
            commit(SET_AUTHORIZATION_STATUS, isAuthorized)
          } else {
            commit(SHOW_COLLECTION_TIPS)
            await dispatch('fetchToken')
          }
          resolve()
        })
        .catch(async () => {
          await dispatch('fetchToken')
          resolve()
        })
    })
  },
  fetchToken({ commit }) {
    return new Promise(resolve => {
      ;(async () => {
        try {
          const loginRes = await wx.login()
          const { code } = loginRes
          if (code) {
            const res = await api_login_token(code)
            if (res.code === 1) {
              const { token, expires_in, is_new } = res.data
              const expiration = Date.now() + (expires_in - 300) * 1000
              commit(SET_TOKEN, { token, expiration })
              commit(SET_AUTHORIZATION_STATUS, !is_new)
              resolve()
            }
          } else {
            this.$u.toast(loginRes.errMsg)
            console.log(loginRes)
          }
        } catch (err) {
          console.log(err)
        }
      })()
    })
  },
}

export default actions
