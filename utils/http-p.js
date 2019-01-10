import {API} from './api.js'
// 封装 http请求
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this.selfRequest(url, resolve, reject, data, method)
    })
  }
  //http 请求类, 当noRefech为true时，不做未授权重试机制
  selfRequest(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: API.baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
        }
      },
      fail: function (err) {
        reject()
      }
    });
  }
};

export { HTTP };
