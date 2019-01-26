const app = getApp()
import {
  UserModel
} from '../../models/user.js'
const userModel = new UserModel()

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
  onLoad: function (options) {
    wx.hideShareMenu();
    if (app.globalData.userInfo) {
      this.checkUserStatus()
    } else if (this.data.canIUse) {
      // 定义app 中的函数
      app.userInfoReadyCallback = res => {
        this.checkUserStatus()
      }
    } else {
      // 定义app 中的函数
      app.userInfoReadyCallback = res => {
        this.checkUserStatus()
      }
    }
  },
  // 判断是否授权
  // 获取用户信息并判断是否相同 并更新
  checkUserStatus() {
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
              this.getLastUserInfo(res)
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
  // 获取最新用户信息
  getLastUserInfo(res) {
    let appUserInfo = app.globalData.userInfo
    let resUserInfo = res.userInfo
    let isNeedToUpdate = appUserInfo.nickName !== resUserInfo.nickName || appUserInfo.avatarUrl !== resUserInfo.avatarUrl
    if (isNeedToUpdate) {
      let user = {};
      user.id = appUserInfo.id;
      user.nickName = resUserInfo.nickName;
      user.avatarUrl = resUserInfo.avatarUrl;
      // 更新用户信息
      userModel.putUserInfo(user).then(res => {
        app.globalData.userInfo = res.data.data;
        this.redirectToIndex();
      })
    } else {
      this.redirectToIndex();
    }
  },
  // 跳转首页
  redirectToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  authorize: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.redirectToIndex()
    } else {
      wx.showToast({
        title: '取消了授权亲~',
        icon: 'none'
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})