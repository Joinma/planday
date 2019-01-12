//app.js
import {
  HTTP
} from './utils/http-p.js'
const http_p = new HTTP()
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
        this.getLoginParamer(res)
      }
    })
  },
  getLoginParamer(res) {
    http_p.request({
      url: 'users/login?code=' + res.code,
      isLoading:false
    }).then(res => {
      console.log("发送resCode", res.data)
      let user = res.data;

      this.checkPowerStatus(user)
    })
  },
  // 判断是否授权
  // 获取用户信息并判断是否相同 并更新
  checkPowerStatus(user) {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("getUserInfo的基本信息",JSON.stringify(res.userInfo))

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    // if (!user.avatarUrl) {
    //   // 没有头像，第一次
    //   this.updateUserInfo(user);
    // } else {
    //   this.globalData.userInfo = user.avatarUrl;
    // }
  },
  updateUserInfo: function(user) {
    console.log('start update user...');
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting", res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              let userInfo = res.userInfo;
              user.nickName = userInfo.nickName;
              user.avatarUrl = userInfo.avatarUrl;
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              let requestParams = {
                url: Api.api.users + '/update/' + user.id,
                data: user,
                method: 'PUT',
                success(res) {},
                fail(err) {}
              }
              return Http.request(requestParams);
            },
            fail: function(err) {
              console.log('get userInfo fail: ' + JSON.stringify(err));
            }
          })
        } else {
          // 授权
        }
      }
    })
  },
  updataApp: function () {//版本更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log("updataAppres", JSON.stringify(res))
        if (res.hasUpdate) { // 请求完新版本信息的回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({// 新的版本下载失败
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      console.log("alile ")
      wx.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
  }

})