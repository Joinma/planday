const API = require('./api.js')
const tip = {
  1: '抱歉，出现一个错误了', //作为默认的错误提示
  502: '服务异常',
}
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
      url: API.api.baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success: (res) =>{
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          this.selfShowError(code);
          reject()
        }
      },
      fail: (err)=> {
        this.selfShowError(1)
        reject(err)
      }
    });
  }
  selfShowError(error_code) {
    if (!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tip[error_code],
      icon:'none',
      duration:2000
    })
  }
};

export { HTTP };
