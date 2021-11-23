import { RouterMount, createRouter } from 'uni-simple-router'
import store from '@/store'
import { TOGGLE_AUTHORIZE_POPUP } from '@/store/mutation-types'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routerErrorEach: (error, router) => {
    if (error.type === 0) {
      router.$lockStatus = false
    } else if (error.type === 3) {
      router.$lockStatus = false
      router.pushTab({ name: 'index' })
    }
  },
  routes: [...ROUTES],
})

const blacklist = []

router.beforeEach((to, from, next) => {
  const token = store.state.token
  const isAuthorized = store.state.isAuthorized
  const checkAuthorizationStatus = () => {
    if (!isAuthorized && blacklist.includes(to.name)) {
      store.commit(TOGGLE_AUTHORIZE_POPUP)
      next(false)
    } else next()
  }
  if (token) checkAuthorizationStatus()
  else store.dispatch('initStore').then(checkAuthorizationStatus)
})

export { router, RouterMount }
