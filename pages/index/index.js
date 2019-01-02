//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    let that = this;
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
    } else {
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.data,
          hasUserInfo: true
        })
      }
    }
  },
  onShow() {

  }
})
