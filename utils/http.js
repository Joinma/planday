const Promise = require("promise.js");
let requestParams = {
  url: '',
  data: {},
  header: {},
  method: '',
  success: function (res) {
  },
  fail: function (err) {
  },
  complete: function () {
  }
}

function request(requestParams, isLoading = true) {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log("networkType:" + networkType)
        if (networkType == 'none') {
          wx.redirectTo({
            url: '/pages/network/network',
          })
        }
      }
    })
    wx.onNetworkStatusChange(function (res) {
      console.log("isConnected:" + res.isConnected)
    });
    var data = requestParams.data;
    var url = requestParams.url;
    var method = requestParams.method;
    var header = requestParams.header;

    if (!header) {
      header = { 'content-type': 'application/json;charset=UTF-8' };
    } else {
    }
    if (isLoading) {
      wx.showLoading({
        title: '加载中...',
      })
    }
    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 200 || res.statusCode == 201) {
          resolve(res);
          requestParams.success(res)
        } else {
          if (res.statusCode == 502) {
            console.log("服务异常");
            wx.redirectTo({
              url: '/pages/service/service',
            })
          } else {
            reject(res);
            requestParams.fail(res);
          }
        }
      },
      fail: function (err) {
        wx.hideLoading();
        reject(err);
        requestParams.fail(err);
      },
      complete: function () {}
    });
  });
}

module.exports = {
  request: request
}