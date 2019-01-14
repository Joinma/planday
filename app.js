//app.js
const Api = require('./utils/api.js')
import {
  HTTP
} from './utils/http.js'
const http = new HTTP()

App({
  onLaunch: function() {
    console.log("app start launch...")
    wx.clearStorageSync();
    this.updataApp(); //更新版本
    this.login(); //登录
  },
  login: function() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.userLogin(res.code)
      }
    })
  },
  userLogin(code) {
    http.request({
      url: 'users/login?code=' + code,
      isLoading: false
    }).then(res => {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      this.globalData.userInfo = res.data.data
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
    })
  },

  //版本更新
  updataApp: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        console.log("updataAppres", JSON.stringify(res))
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
  }

})