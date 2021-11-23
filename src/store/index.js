import Vue from 'vue'
import Vuex from 'vuex'
import { createLogger } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  token: '',
  expiration: 0,
  isAuthorized: false,
  isAuthorizePopupShow: false,
  isCollectionTipsShow: false,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export default store
