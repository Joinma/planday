//index.js
//获取应用实例
const app = getApp()
import {
  DayPlanModel
} from '../../models/dayplan.js'
const dayPlanModel = new DayPlanModel()

Page({
  data: {
    userInfo: {},
    dayPlans: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })

    dayPlanModel.getDayPlans().then(res => {
      let dayPlans = res.data.data.list;
      this.setData({
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
    wx.showToast({
      title: 'add...',
      icon: 'none',
      duration: 2000
    })
  }
})