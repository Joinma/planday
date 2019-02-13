// pages/dailyplan/dailyplan.js
const date = require('../../utils/date.js')
import {
  DailyPlanModel
} from '../../models/dailyplan.js'
const dailyPlanModel = new DailyPlanModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    content: '',
    level: '',
    reward: '',
    punish: '',
    type: '',
    isEdit: true,
    levels: ['重要且必要', '重要', '选做'],
    types: ['每天', '周一至周五', '周末']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let dailyPlanId = options.id
    if (dailyPlanId) {
      dailyPlanModel.getSingleDailyPlan(dailyPlanId).then(res => {
        let dailyPlan = res.data.data
        this.setData({
          id: dailyPlanId,
          title: dailyPlan.title,
          content: dailyPlan.content,
          level: dailyPlan.level,
          reward: dailyPlan.reward,
          punish: dailyPlan.punish,
          type: dailyPlan.type,
          isEdit: false
        })
      })
    }
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
  bindLevelChange(e) {
    this.setData({
      level: e.detail.value
    })
  },
  bindTypeChange(e) {
    this.setData({
      type: e.detail.value
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
  saveDailyPlan(e) {
    let dailyPlanId = e.target.dataset.id
    if (!this.validateFormData()) {
      return false
    }

    let data = {};
    data.userId = wx.getStorageSync('userId')
    data.title = this.data.title
    data.content = this.data.content
    data.level = this.data.level
    data.reward = this.data.reward
    data.punish = this.data.punish
    data.type = this.data.type
    if (!dailyPlanId) {
      this.saveDailyPlanHander(data)
    } else {
      data.id = this.data.id
      this.updateDailyPlanHander(data)
    }
  },
  validateFormData() {
    let title = this.data.title
    let content = this.data.content
    let level = this.data.level
    let reward = this.data.reward
    let punish = this.data.punish
    if (!title) {
      this.showToastWithoutIcon('请输入计划标题')
      return false
    }
    if (!content) {
      this.showToastWithoutIcon('请输入计划内容')
      return false
    }
    if (!level) {
      this.showToastWithoutIcon('请输入重要程度')
      return false
    }
    // 还没做通知，暂时隐藏
    // if (!reward) {
    //   this.showToastWithoutIcon('请输入完成奖励')
    //   return false
    // }
    // if (!punish) {
    //   this.showToastWithoutIcon('请输入未完成惩罚')
    //   return false
    // }

    return true
  },
  saveDailyPlanHander(data) {
    dailyPlanModel.saveDailyPlan(data).then(res => {
      wx.redirectTo({
        url: '/pages/dailyplanlist/dailyplanlist'
      })
    })
  },
  updateDailyPlanHander(data) {
    dailyPlanModel.updateDailyPlan(data).then(res => {
      wx.redirectTo({
        url: '/pages/dailyplanlist/dailyplanlist'
      })
    })
  },
  showToastWithoutIcon(title) {
    wx.showToast({
      title: title,
      icon: 'none'
    })
  },
  changeToEdit() {
    this.setData({
      isEdit: true
    })
  }
})