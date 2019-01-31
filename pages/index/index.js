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

    dayPlanModel.getDayPlans().then(res => {
      let dayPlans = res.data.data.list
      this.setData({
        remainingDaysNum: remainingDaysNum,
        consumeDaysPercent: consumeDaysPercent,
        dayPlans: dayPlans
      })
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
  redirctToDayPlanDetail() {
    wx.showToast({
      title: '将要跳转到每日计划详情',
      icon: 'none',
      duration: 2000
    })
  },
  uploadBackgroundImg() {
    console.log('这是一个隐藏事件，更换背景图')
  },
  showOperateModal() {
    let that = this;
    wx.showActionSheet({
      itemList: ['编辑', '删除', '取消'],
      success(res) {
        let index = res.tapIndex
        switch (index) {
          case 0:
            that.editDayPlan();
            break
          case 1:
            that.deleteDayPlan();
            break
          case 2:
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
  editDayPlan() {
    wx.showToast({
      title: 'edit...',
      icon: 'none',
      duration: 2000
    })
  },
  deleteDayPlan() {
    wx.showToast({
      title: 'delete....',
      icon: 'none',
      duration: 2000
    })
  },
  addDayPlan() {
    wx.redirectTo({
      url: '/pages/dayplan/dayplan',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getRemainingDaysNum: function() {
    return this.getCurrentYearDaysNum() - this.getConsumeDaysNum()
  },
  getConsumeDaysPercent: function() {
    let yearDaysNum = this.getCurrentYearDaysNum()
    let consumeDaysNum = this.getConsumeDaysNum()
    let consumeDaysPercent = (consumeDaysNum / yearDaysNum) * 100
    return consumeDaysPercent.toFixed(2)
  },
  getCurrentYearDaysNum: function() {
    let year = new Date().getFullYear()
    let isLeap = (0 === year % 4) && (0 === year % 100) || (0 === year % 400)
    let days = isLeap ? 366 : 365
    return days
  },
  getConsumeDaysNum: function() {
    let oneDayMillis = 24 * 3600 * 1000
    let currentDate = new Date()
    let currentMonthStartDate = new Date(currentDate.getFullYear() + "/01/01")
    let consumeDaysNum = Math.floor((currentDate - currentMonthStartDate) / oneDayMillis)
    return consumeDaysNum
  },
})