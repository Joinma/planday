// pages/dailyplanlist/dailyplanlist.js
import {
  DailyPlanModel
} from '../../models/dailyplan.js'
const dailyPlanModel = new DailyPlanModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dailyplans: [],
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
    this.setDailyPlansAndRandomColors()
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
  setDailyPlansAndRandomColors() {
    let params = "?userId=" + wx.getStorageSync('userId')
    dailyPlanModel.getDailyPlans(params).then(res => {
      let dailyplans = res.data.data.list
      this.setData({
        dailyplans: dailyplans
      })
    }).then(res => {
      this.setRandomColors()
    })
  },
  setRandomColors() {
    let dailyplanLength = this.data.dailyplans.length
    let colors = this.data.colors
    let colorLength = colors.length
    let randomColors = [];
    do {
      let random = colors[Math.floor(Math.random() * colorLength)];
      randomColors.push(random);
      dailyplanLength--;
    } while (dailyplanLength > 0)

    this.setData({
      randomColors: randomColors
    });
  },
  showDailyPlanDetail(e) {
    let dailyPlanId = e.target.dataset.id
    this.redirectToDailyPlan(dailyPlanId)
  },
  addDailyPlan() {
    this.redirectToDailyPlan()
  },
  redirectToDailyPlan(dailyplanId) {
    let url = dailyplanId ? '/pages/dailyplan/dailyplan?id=' + dailyplanId : '/pages/dailyplan/dailyplan'
    wx.navigateTo({
      url: url,
    })
  },
  showOperateModal(e) {
    let that = this;
    let dailyPlanId = e.target.dataset.id
    wx.showActionSheet({
      itemList: ['删除', '取消'],
      success(res) {
        let index = res.tapIndex
        switch (index) {
          case 0:
            that.deleteDailyPlan(dailyPlanId);
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
  deleteDailyPlan(dailyPlanId) {
    dailyPlanModel.deleteDailyPlan(dailyPlanId).then(res => {
      this.onLoad()
    })
  }
})