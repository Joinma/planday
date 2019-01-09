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
    interval: 2000,
    iconItem: {
      "imgUrl": "/images/dianshijiTV.png",
      "name": "dianTV",
      "type": "record"
    },
    addItem: {
      "imgUrl": "/images/addIcon.png",
      "name": "添加",
      "type": "add"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // deal with res data

    this.resetResArray();
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
  resetResArray() {
    const resIconList = this.data.resIconList
    const pageNum = 10
    const newIconList = []
    let listIndex = 0
    let listInnerArray = []
    resIconList.forEach(function(value, index) {
      if (listIndex < pageNum) {
        listIndex += 1
        listInnerArray.push(value)
        if (index == resIconList.length - 1) {
          newIconList.push(listInnerArray)
        }
      } else {
        listIndex = 0;
        newIconList.push(listInnerArray)
        listInnerArray = []
      }
    })
    this.setData({
      newIconList: newIconList
    })
    console.log("resIconList", newIconList)
  },
  recordOrAdd: function(e) {
    let dataInfo = e.currentTarget.dataset.info
    let iconType = dataInfo.split('-')[0]
    let index = dataInfo.split('-')[0]
    if (iconType == 'record') {
      console.log("记录", iconType)
    } else {
      //添加
      console.log("添加", iconType)
      this.addRecordItem();
    }
  },
  addRecordItem: function() {
    let iconList = this.data.newIconList
    let iconListLength = iconList.length
    let iconItem = this.data.iconItem
    let addItem = this.data.addItem
    let innerIconLength = iconList[iconListLength - 1].length
    const iconNum = 10
    console.log("iconList", iconList)

    if (innerIconLength < iconNum) {
      // 往数组里加内容
      iconList[iconListLength - 1].splice(innerIconLength - 1, 0, iconItem)
    } else {
      // 添加一个 新数组
      iconList[iconListLength - 1].splice(-1, 1)
      iconList[iconListLength - 1].push(iconArray)
      let iconArray = []
      iconArray[0] = addItem
      iconList.push(iconArray)
    }
    this.setData({
      newIconList: iconList
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

  }
})