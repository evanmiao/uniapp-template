import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import store from './store'
import { router, RouterMount } from './router'

Vue.use(uView)
Vue.use(router)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount()
// #endif
