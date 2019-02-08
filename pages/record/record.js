// pages/record/record.js
import {
  UserConsumeCategoryModel
} from '../../models/userconsumecategory.js'
const userConsumeCategoryModel = new UserConsumeCategoryModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    consumeCategories: [],
    resIconList: [{
        "icon": "/images/TV.png",
        "name": "tvShow",
        "type": "record"
      },
      {
        "icon": "/images/bofang.png",
        "name": "bofang",
        "type": "record"
      },
      {
        "icon": "/images/chabei.png",
        "name": "chabei",
        "type": "record"
      },
      {
        "icon": "/images/dianshijiTV.png",
        "name": "dianshijiTV",
        "type": "record"
      },
      {
        "icon": "/images/TV.png",
        "name": "huatong",
        "type": "record"
      },
      {
        "icon": "/images/xing.png",
        "name": "xing",
        "type": "record"
      },
      {
        "icon": "/images/yinle.png",
        "name": "yingle",
        "type": "record"
      },
      {
        "icon": "/images/addIcon.png",
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
    this.getUserConsumeCategoriesByType(0)
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
  tapDate() {
    this.setData({
      isShowModal: true
    })
  },
  getUserConsumeCategoriesByType(type = 0) {
    let userId = wx.getStorageSync('userId')
    let params = '?pageSize=1000&type=' + type + '&userId=' + userId
    userConsumeCategoryModel.getUserConsumeCategories(params).then(res => {
      this.setData({
        consumeCategories: res.data.data.list
      })
    })
  }


})