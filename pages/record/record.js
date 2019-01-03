// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [
      [
        {
          "imgUrl": "/images/TV.png",
          "name":"tvShow",
          "type": "record"          
        },
        {
          "imgUrl": "/images/xiaoxiong.png",
          "name": "xiaoxiong",
          "type": "record"          
        },
        {
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
          "type":"add"
        }
      ]
    ],
    interval:2000,
    iconItem: {
      "imgUrl": "/images/dianshijiTV.png",
      "name": "dianTV",
      "type": "record"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  recordOrAdd:function(e){
    let dataInfo = e.currentTarget.dataset.info    
    let iconType = dataInfo.split('-')[0]
    let index = dataInfo.split('-')[0]    
    if (iconType == 'record') {
      console.log("记录",iconType)
    } else {
      //添加
      console.log("添加", iconType)   
      this.addRecordItem();   
    }
  },
  addRecordItem:function(){
    let iconList = this.data.iconList
    let iconListLength = iconList.length
    let iconItem = this.data.iconItem    
    const iconNum = 10
    console.log("iconList", iconList)
    if (iconList[iconListLength-1].length >= iconNum) {
        // 添加一个
        let iconArray = []
        iconArray[0] = iconItem
        iconList.push(iconArray)
    } else {
      iconList[iconListLength - 1].push(iconItem)
    } 
    this.setData({
      iconList
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})