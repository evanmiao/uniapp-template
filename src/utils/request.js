import Request from 'uview-ui/libs/luch-request'
import store from '@/store'

const request = options => {
  return new Promise((resolve, reject) => {
    const instance = new Request({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 5 * 1000,
    })

    instance.config.method = 'POST'
    instance.config.header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    instance.setConfig(config => {
      config.custom = { loading: true, auth: true }
      return config
    })

    instance.interceptors.request.use(
      config => {
        if (config.custom.loading) uni.showLoading({ title: '加载中' })
        if (config.custom.auth) {
          const token = store.state.token
          if (token) config.header = { ...config.header, token }
          else return Promise.reject('Missing token')
        }
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )

    instance.interceptors.response.use(
      response => {
        if (response.config.custom.loading) uni.hideLoading()
        if (response.data.code !== 1) {
          setTimeout(() => {
            uni.showToast({ icon: 'none', title: response.data.msg })
          })
        }
        return response.data
      },
      error => {
        uni.hideLoading()
        setTimeout(() => {
          uni.showToast({
            icon: 'none',
            title: error.statusCode
              ? `fail with status ${error.statusCode}`
              : error,
          })
        })
        return Promise.reject(error)
      },
    )

    instance
      .middleware(options)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export default request
