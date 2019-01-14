const app = getApp()
import {
  HTTP
} from '../../utils/http.js'
const http = new HTTP()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu();
    if (app.globalData.userInfo) {
      this.checkPowerStatus()
    } else {
      app.userInfoReadyCallback = res => {
        this.checkPowerStatus()
      }
    }

  },
  // 判断是否授权
  // 获取用户信息并判断是否相同 并更新
  checkPowerStatus() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            hasUserInfo: true
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              let appUserInfo = app.globalData.userInfo
              let resUserInfo = res.userInfo
              let isNeedToUpdate = appUserInfo.nickName !== resUserInfo.nickName || appUserInfo.avatarUrl !== resUserInfo.avatarUrl
              if (isNeedToUpdate) {
                let user = {};
                user.id = appUserInfo.id;
                user.nickName = resUserInfo.nickName;
                user.avatarUrl = resUserInfo.avatarUrl;
                // 更新用户信息
                this.updateUserInfo(user).then(res => {
                  app.globalData.userInfo = res.data.data;
                  this.redirectToIndex();
                })
              } else {
                this.redirectToIndex();
              }
            }
          })
        } else {
          // 没有授权过，开始授权
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  updateUserInfo: function(user) {
    console.log('start update user...');
    return http.request({
      url: 'users/update/' + user.id,
      data: user,
      method: 'PUT',
    })
  },
  authorize: function(e) {
    console.log("getUserInfo", e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  redirectToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})