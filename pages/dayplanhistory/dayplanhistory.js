// pages/dayplanhistory/dayplanhistory.js
import {
  DayPlanModel
} from '../../models/dayplan.js'
const dayPlanModel = new DayPlanModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayPlanHistories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getDayPlanHistories()
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
  getDayPlanHistories() {
    let timeStamp = new Date().getTime()
    // let userId = wx.getStorageSync('userId')
    let userId = 'bcb4b3328a70451cbdb6e7adfaeb9ad1'
    dayPlanModel.getSpecialMonthDayPlans(userId, timeStamp).then(res => {
      this.setData({
        dayPlanHistories: res.data.data
      })
    })
  },
  showDayPlans(e) {
    console.log('showDayPlans: ', e)
  }
})