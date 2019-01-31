// pages/dayplan/dayplan.js
import {
  DayPlanModel
} from '../../models/dayplan.js'
const dayPlanModel = new DayPlanModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    planTime: '',
    planDate: '',
    level: '',
    percent: '',
    score: '',
    reward: '',
    punish: ''
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
  bindDateChange(e) {
    let planDate = e.detail.value
    this.setData({
      planDate: planDate,
      planTime: new Date(planDate).getTime()
    })
  },
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  inputContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  inputLevel(e) {
    this.setData({
      level: e.detail.value
    })
  },
  inputReward(e) {
    this.setData({
      reward: e.detail.value
    })
  },
  inputPunish(e) {
    this.setData({
      punish: e.detail.value
    })
  },
  saveDayPlan() {
    if (!this.validateFormData()) {
      return false
    }

    let data = {};
    data.userId = wx.getStorageSync('userId')
    data.title = this.data.title
    data.content = this.data.content
    data.planDate = this.data.planDate
    data.level = this.data.level
    data.reward = this.data.reward
    data.punish = this.data.punish
    data.planTime = this.data.planTime
    dayPlanModel.saveDayPlan(data).then(res => {
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  },
  validateFormData() {
    let title = this.data.title
    let content = this.data.content
    let planDate = this.data.planDate
    let level = this.data.level
    let reward = this.data.reward
    let punish = this.data.punish
    let planTime = new Date(planDate).getTime()
    console.log('title: ', title)
    if (!title) {
      this.showToastWithoutIcon('请输入计划标题')
      return false
    }
    if (!content) {
      this.showToastWithoutIcon('请输入计划内容')
      return false
    }
    if (!planTime) {
      this.showToastWithoutIcon('请输入计划时间')
      return false
    }
    if (!level) {
      this.showToastWithoutIcon('请输入重要程度')
      return false
    }
    if (!reward) {
      this.showToastWithoutIcon('请输入完成奖励')
      return false
    }
    if (!punish) {
      this.showToastWithoutIcon('请输入未完成惩罚')
      return false
    }

    return true
  },
  showToastWithoutIcon(title) {
    wx.showToast({
      title: title,
      icon: 'none'
    })
  }
})