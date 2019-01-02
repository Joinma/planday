//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    iconList: [
      [
        "/images/TV.png",
        "/images/biji.png",
        "/images/bofang.png",
        "/images/chabei.png",
        "/images/dianshijiTV.png",
        "/images/huatong.png",
        "/images/luzhi.png",
        "/images/qiche.png",
        "/images/tupian.png",
        "/images/xing.png"
      ],
      [
        "/images/xing.png",
        "/images/xing.png"
      ]
    ]
  },
  onLoad: function () {
    let that = this;
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
    } else {
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.data,
          hasUserInfo: true
        })
      }
    }
  },
  onShow() {

  }
})