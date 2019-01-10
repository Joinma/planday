//app.js
const Api = require('/utils/api.js')
// const Http = require('/utils/http.js')
import {
  HTTP
} from './utils/http-p.js'
const http_p = new HTTP()
App({
  onLaunch: function() {
    let that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    that.login();
  },
  login: function() {
    console.log('start login...');
    let that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.getLoginParamer(res)
      }
    })
  },
  getLoginParamer(res) {
    http_p.request({
      url: '/api/users/login?code=' + res.code,
    }).then(res => {
      let user = res.data;
      console.log("res", res.data)
      if (!user.avatarUrl) {
        // 没有头像，第一次
        this.updateUserInfo(user);
      } else {
        this.globalData.userInfo = user.avatarUrl;
      }

      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
      console.log("拿到数据了", JSON.stringify(res))
    })
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
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }

})