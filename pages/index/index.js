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
    consumeDaysPercent: 0,
    // 随机颜色
    colors: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"
    ],
    // 存储随机颜色
    randomColors: []
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
      itemList: ['完成', '删除', '取消'],
      success(res) {
        let index = res.tapIndex
        switch (index) {
          case 0:
            that.completeDayPlan(dayPlanId);
            break
          case 1:
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
  completeDayPlan(dayPlanId) {
    let data = {}
    data.id = dayPlanId
    data.status = 1
    dayPlanModel.updateDayPlan(data).then(res => {
      this.onShow()
    })
  },
  deleteDayPlan(dayPlanId) {
    dayPlanModel.deleteDayPlan(dayPlanId).then(res => {
      this.onShow()
    })
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
  },
  setRandomColors() {
    let dayplanLength = this.data.dayPlans.length
    let colors = this.data.colors
    let colorLength = colors.length
    let randomColors = [];
    do {
      let random = colors[Math.floor(Math.random() * colorLength)];
      randomColors.push(random);
      dayplanLength--;
    } while (dayplanLength > 0)

    this.setData({
      randomColors: randomColors
    });
  },
})