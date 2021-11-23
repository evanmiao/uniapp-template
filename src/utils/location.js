import QQMapWX from '@/libs/qqmap-wx-jssdk.min.js'
import { checkAuth } from './util'

const qqmapsdk = new QQMapWX({ key: '' })

export const reverseGeocoder = location => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location,
      success: res => {
        resolve(res)
      },
      fail: err => {
        checkAuth('scope.userLocation', '定位')
        reject(err)
      },
    })
  })
}

export const chooseLocation = () => {
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      success: res => {
        resolve(res)
      },
      fail: err => {
        checkAuth('scope.userLocation', '定位')
        reject(err)
      },
    })
  })
}
