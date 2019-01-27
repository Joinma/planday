// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resIconList: [{
        "imgUrl": "/images/TV.png",
        "name": "tvShow",
        "type": "record"
      },
      {
        "imgUrl": "/images/bofang.png",
        "name": "bofang",
        "type": "record"
      },
      {
        "imgUrl": "/images/chabei.png",
        "name": "chabei",
        "type": "record"
      },
      {
        "imgUrl": "/images/dianshijiTV.png",
        "name": "dianshijiTV",
        "type": "record"
      },
      {
        "imgUrl": "/images/TV.png",
        "name": "huatong",
        "type": "record"
      },
      {
        "imgUrl": "/images/xing.png",
        "name": "xing",
        "type": "record"
      },
      {
        "imgUrl": "/images/yinle.png",
        "name": "yingle",
        "type": "record"
      },
      {
        "imgUrl": "/images/addIcon.png",
        "name": "添加",
        "type": "add"
      }
    ],
    pageTabNum: 10,
    isShowModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  tapDate() {
    this.setData({
      isShowModal: true
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