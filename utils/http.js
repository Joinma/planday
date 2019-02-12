// const hostUrl = 'http://192.168.0.103:5314/api/'
// const hostUrl = 'http://planday.getcy.cn/api/'
const hostUrl = 'http://192.168.0.157:5314/api/'
const imageUrl = 'http://image.getcy.cn/api'

// 封装 http 请求
class HTTP {
  request({
    url,
    data = {},
    method = 'GET',
    imgUrl = false,
    isLoading = true
  }) {
    return new Promise((resolve, reject) => {
      this.selfRequest(url, resolve, reject, data, method, imgUrl, isLoading)
    })
  }
  
  //http 请求类, 当noRefech为true时，不做未授权重试机制
  selfRequest(url, resolve, reject, data = {}, method = 'GET', imgUrl, isLoading) {
    if (isLoading) {
      wx.showLoading({
        title: '加载中...',
      })
    }
    const baseUrl = imgUrl ? imageUrl : hostUrl
    wx.request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (isLoading) {
          wx.hideLoading();
        }
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res)
        } else {
          this.showRequestError(res.data);
          reject(res)
        }
      },
      fail: (err) => {
        if (isLoading) {
          wx.hideLoading();
        }
        // 处理后台返回 错误信息
        this.showRequestError(err.data)
        reject(err)
      }
    });
  }

  showRequestError(err) {
    console.log("err", err)
    let err_text = err.message
    wx.showToast({
      title: err_text,
      icon: 'none',
      duration: 2000
    })
  }
};

export {
  HTTP
};