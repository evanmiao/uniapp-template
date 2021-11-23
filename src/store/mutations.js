import * as types from './mutation-types'

const mutations = {
  [types.SET_TOKEN](state, { token, expiration }) {
    state.token = token
    state.expiration = expiration
    uni.setStorageSync('token', token)
    uni.setStorageSync('expiration', expiration)
  },
  [types.SET_AUTHORIZATION_STATUS](state, isAuthorized) {
    state.isAuthorized = isAuthorized
    uni.setStorageSync('isAuthorized', isAuthorized)
  },
  [types.TOGGLE_AUTHORIZE_POPUP](state) {
    if (state.isAuthorizePopupShow) state.isAuthorizePopupShow = false
    else state.isAuthorizePopupShow = true
  },
  [types.SHOW_COLLECTION_TIPS](state) {
    state.isCollectionTipsShow = true
  },
  [types.HIDE_COLLECTION_TIPS](state) {
    state.isCollectionTipsShow = false
  },
}

export default mutations
