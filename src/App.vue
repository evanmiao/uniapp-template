<script>
export default {
  onLaunch() {
    ;(() => {
      if (!uni.canIUse('getUpdateManager')) return
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate(res => {
        console.log('has new version', res.hasUpdate)
      })
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，即将重启应用',
          showCancel: false,
          success: res => {
            if (res.confirm) updateManager.applyUpdate()
          },
        })
      })
      updateManager.onUpdateFailed(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本下载失败',
          showCancel: false,
        })
      })
    })()
  },
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/styles/main.scss';
</style>
