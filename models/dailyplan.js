import {
  HTTP
} from '../utils/http.js'

let baseUrl = 'dailyplans'

class DailyPlanModel extends HTTP {
  getDailyPlans(params) {
    let url = params ? baseUrl + '/query' + params : baseUrl + '/query'
    return this.request({
      url: url,
      method: 'GET',
    })
  }

  saveDailyPlan(data) {
    let url = baseUrl + '/save'
    return this.request({
      url: url,
      method: 'POST',
      data: data
    })
  }

  getSingleDailyPlan(id) {
    let url = baseUrl + '/query/' + id
    return this.request({
      url: url,
      method: 'GET'
    })
  }

  updateDailyPlan(data) {
    let url = baseUrl + '/update'
    return this.request({
      url: url,
      method: 'PUT',
      data: data
    })
  }

  deleteDailyPlan(id) {
    let url = baseUrl + '/delete/' + id
    return this.request({
      url: url,
      method: 'DELETE'
    })
  }
}

export {
  DailyPlanModel
}