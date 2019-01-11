//app.js
import {
  HTTP
} from './utils/http-p.js'
const http_p = new HTTP()
App({
  onLaunch: function() {
    // 登录
    this.login();
  },
  login: function() {
    console.log('start login...');
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
    }).then(res => {
      console.log("loginRes信息", res.data)
      let user = res.data;
      this.checkPowerStatus(user)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
      console.log("拿到数据了", JSON.stringify(res))
    })
  },
  // 判断是否授权
  // 获取用户信息并判断是否相同 并更新
  checkPowerStatus(user) {
    if (!user.avatarUrl) {
      // 没有头像，第一次
      this.updateUserInfo(user);
    } else {
      this.globalData.userInfo = user.avatarUrl;
    }
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
  globalData: {
    userInfo: null
  }

})