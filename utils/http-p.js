const hostUrl = 'http://planday.getcy.cn/api/'
const imageUrl = 'http://image.getcy.cn/api'
const tip = {
  1: '抱歉，出现一个错误了', //作为默认的错误提示
  404:'请求丢失了~',
  502: '服务异常',
}
// 封装 http请求
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
          resolve(res.data)
        } else {
          this.selfShowError(code);
          reject(res)
        }
      },
      fail: (err) => {
        if (isLoading) {
          wx.hideLoading();
        }
        // 处理后台返回 错误信息
        this.selfRequestError(err)
        reject(err)
      }
    });
  }
  selfShowError(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tip[error_code],
      icon: 'none',
      duration: 2000
    })
  }
  selfRequestError(err) {
    console.log("err",err)
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