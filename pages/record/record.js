// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resIconList: [{
      "imgUrl": "/images/addIcon.png",
      "name": "添加",
      "type": "add"
    }],
    pageTabNum: 10,
    isShowModal: false,
    year: '',
    month: '',
    date: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseDate() {
    this.setData({
      isShowModal: true
    })
  },
  // 获取今天日期
  getTodayDate(params) {
    let year = params.detail.initYear
    let month = params.detail.initMonth
    this.setData({
      year,
      month,
      date: '今天'
    })
  },
  chooseCalenderDate(params) {
    console.log("params", params.detail.date)
    let date = params.detail.date
    let month = this.data.month
    date = `${month}月${date}日`
    let self = this
    this.setData({
      date,
    })
    setTimeout(function() {
      self.setData({
        isShowModal: false
      })
    }, 300)
  },
  onchangeDate(params) {
    let year = params.detail.newYear
    let month = params.detail.newMonth
    this.setData({
      year,
      month,
    })
  },
  addOrderNote() {
    let year = this.data.year
    let date = this.data.date
    let chooseDate = `${year}年 ${date}`
    wx.navigateTo({
      url: `./orderNote/orderNote?chooseDate=${chooseDate}`,
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

  }
})