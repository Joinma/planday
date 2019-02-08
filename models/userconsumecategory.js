import {
  HTTP
} from '../utils/http.js'

const http = new HTTP()

let baseUrl = 'userconsumecategories'

class UserConsumeCategoryModel extends HTTP {
  getUserConsumeCategories(params) {
    let url = params ? baseUrl + '/query' + params : baseUrl + '/query'
    return this.request({
      url: url,
      method: 'GET',
    })
  }

  saveUserConsumeCategory(data) {
    let url = baseUrl + '/save'
    return this.request({
      url: url,
      method: 'POST',
      data: data
    })
  }

  getSingleUserConsumeCategory(id) {
    let url = baseUrl + '/query/' + id
    return this.request({
      url: url,
      method: 'GET',
    })
  }

  deleteUserConsumeCategory(id) {
    let url = baseUrl + '/delete/' + id
    return this.request({
      url: url,
      method: 'DELETE',
    })
  }

  updateUserConsumeCategor(data) {
    let url = baseUrl + '/update'
    return this.request({
      url: url,
      method: 'PUT',
      data: data
    })
  }
}

export {
  UserConsumeCategoryModel
}