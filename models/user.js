import {
  HTTP
} from '../utils/http.js'

class UserModel extends HTTP {
  getUserLogin(code) {
    return this.request({
      url: 'users/login?code=' + code,
      isLoading: false
    })
  }
  putUserInfo(user) {
    return this.request({
      url: 'users/update',
      data: user,
      method: 'PUT',
    })
  }
}

export {
  UserModel
}