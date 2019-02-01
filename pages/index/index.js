//index.js
//获取应用实例
const app = getApp()
import {
  DayPlanModel
} from '../../models/dayplan.js'
const dayPlanModel = new DayPlanModel()

Page({
  data: {
    dayPlans: [],
    remainingDaysNum: 0,
    consumeDaysPercent: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 这一年还剩下多少时间
    let remainingDaysNum = this.getRemainingDaysNum()
    let consumeDaysPercent = this.getConsumeDaysPercent()
    this.setData({
      remainingDaysNum: remainingDaysNum,
      consumeDaysPercent: consumeDaysPercent
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
    let userId = wx.getStorageSync('userId')
    dayPlanModel.getCurrentDayPlans(userId).then(res => {
      let dayPlans = res.data.data
      this.setData({
        dayPlans: dayPlans
      })
    })
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
  showOperateModal(e) {
    let that = this;
    let dayPlanId = e.target.dataset.id
    wx.showActionSheet({
      itemList: ['删除', '取消'],
      success(res) {
        let index = res.tapIndex
        switch (index) {
          case 0:
            that.deleteDayPlan(dayPlanId);
            break
          default:
            break
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  editDayPlan(e) {
    let dayPlanId = e.target.dataset.id
    this.redirectToDayPlanPage(dayPlanId)
  },
  deleteDayPlan(dayPlanId) {
    dayPlanModel.deleteDayPlan(dayPlanId)
  },
  addDayPlan() {
    this.redirectToDayPlanPage()
  },
  getRemainingDaysNum() {
    return this.getCurrentYearDaysNum() - this.getConsumeDaysNum()
  },
  getConsumeDaysPercent() {
    let yearDaysNum = this.getCurrentYearDaysNum()
    let consumeDaysNum = this.getConsumeDaysNum()
    let consumeDaysPercent = (consumeDaysNum / yearDaysNum) * 100
    return consumeDaysPercent.toFixed(2)
  },
  getCurrentYearDaysNum() {
    let year = new Date().getFullYear()
    let isLeap = (0 === year % 4) && (0 === year % 100) || (0 === year % 400)
    let days = isLeap ? 366 : 365
    return days
  },
  getConsumeDaysNum() {
    let oneDayMillis = 24 * 3600 * 1000
    let currentDate = new Date()
    let currentMonthStartDate = new Date(currentDate.getFullYear() + "/01/01")
    let consumeDaysNum = Math.floor((currentDate - currentMonthStartDate) / oneDayMillis)
    return consumeDaysNum
  },
  redirectToDayPlanPage(id) {
    let url = id ? '/pages/dayplan/dayplan?id=' + id : '/pages/dayplan/dayplan'
    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})