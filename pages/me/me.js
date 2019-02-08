//index.js
//获取应用实例
const app = getApp()
import {
  DayPlanModel
} from '../../models/dayplan.js'
const dayPlanModel = new DayPlanModel()

Page({
  data: {
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
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

  },
  uploadBackgroundImg() {
    console.log('这是一个隐藏事件，更换背景图')
  },
  showDaliyPlans() {
    wx.navigateTo({
      url: '/pages/dailyplanlist/dailyplanlist',
    })
  },
  showCalendar() {
    wx.showToast({
      title: '这是我的日历，在建设中...',
      icon: 'none'
    })
  },
  showPlanHistories() {
    wx.navigateTo({
      url: '/pages/dayplanhistory/dayplanhistory',
    })
  }
})