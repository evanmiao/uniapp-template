import queryParams from 'uview-ui/libs/function/queryParams'

export const getShareParmas = params => {
  return queryParams({
    ...params,
    referrerId: uni.getStorageSync('userId'),
  })
}

export const saveImage = src => {
  return new Promise(resolve => {
    uni.authorize({
      scope: 'scope.writePhotosAlbum',
      success: () => {
        uni.getImageInfo({
          src,
          success: res => {
            uni.saveImageToPhotosAlbum({
              filePath: res.path,
              success: () => {
                resolve('保存成功')
              },
            })
          },
        })
      },
      fail: () => {
        checkAuth('scope.writePhotosAlbum', '写入相册')
      },
    })
  })
}

export const checkAuth = (scope, name) => {
  uni.getSetting({
    success: res => {
      if (!res.authSetting[scope]) {
        uni.showModal({
          content: `检测到您没打开小程序的${name}权限，是否去设置打开？`,
          success: res => {
            if (res.confirm) {
              uni.openSetting()
            } else if (res.cancel) {
              uni.showToast({
                title: `${name}权限获取失败`,
                icon: 'none',
              })
            }
          },
        })
      }
    },
  })
}
