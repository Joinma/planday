// pages/dayplanhistory/dayplanhistory.js
const date = require('../../utils/date.js')
import {
  DayPlanModel
} from '../../models/dayplan.js'
const dayPlanModel = new DayPlanModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayPlanHistories: [],
    clickDate: '',
    showDayPlans: false,
    selectedDate: '',
    timeStamp: '',
    // 单月总计划数
    totalNum: 0,
    // 单月完成计划数
    completeNum: 0,
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
    if (!this.data.selectedDate) {
      console.log('coming...')
      let selectedDate = date.formatMillisToDate(new Date().getTime(), 'Y-M')
      this.setData({
        selectedDate: selectedDate
      })
    }
    console.log('selectedDate: ', this.data.selectedDate)
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
    if (!this.data.selectedDate) {
      timeStamp = new Date().getTime()
    } else {
      timeStamp = new Date(this.data.selectedDate.replace(/-/g, '/')).getTime()
    }

    console.log('timeStamp: ', timeStamp)
    // let userId = wx.getStorageSync('userId')
    let userId = 'bcb4b3328a70451cbdb6e7adfaeb9ad1'
    dayPlanModel.getSpecialMonthDayPlans(userId, timeStamp).then(res => {
      let dayPlanHistories = res.data.data
      let totalNum = 0
      let completeNum = 0
      let colors = this.data.colors
      let colorLength = colors.length
      let randomColors = [];
      for (let i = 0; i < dayPlanHistories.length; i++) {
        totalNum += dayPlanHistories[i].totalNum
        completeNum += dayPlanHistories[i].completeNum

        let random = colors[Math.floor(Math.random() * colorLength)];
        randomColors.push(random);
      }

      this.setData({
        dayPlanHistories: res.data.data,
        totalNum: totalNum,
        completeNum: completeNum,
        randomColors: randomColors
      })
    })
  },
  showDayPlans(e) {
    let clickDate = e.target.dataset.date
    let showDayPlans = false
    if (clickDate == this.data.clickDate) {
      showDayPlans = !this.data.showDayPlans
    } else {
      showDayPlans = true
    }
    this.setData({
      clickDate: clickDate,
      showDayPlans: showDayPlans
    })
  },
  bindDateChange(e) {
    let selectedDate = e.detail.value

    this.setData({
      selectedDate: selectedDate,
    })

    this.getDayPlanHistories()
  }
})