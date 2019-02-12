import {
  HTTP
} from '../utils/http.js'

let baseUrl = 'dayplans'

class DayPlanModel extends HTTP {
  getDayPlans(params) {
    let url = params ? baseUrl + '/query' + params : baseUrl + '/query'
    return this.request({
      url: url,
      method: 'GET',
    })
  }

  saveDayPlan(data) {
    let url = baseUrl + '/save'
    return this.request({
      url: url,
      method: 'POST',
      data: data
    })
  }

  getSingleDayPlan(id) {
    let url = baseUrl + '/query/' + id
    return this.request({
      url: url,
      method: 'GET',
    })
  }

  deleteDayPlan(id) {
    let url = baseUrl + '/delete/' + id
    return this.request({
      url: url,
      method: 'DELETE',
    })
  }

  updateDayPlan(data) {
    let url = baseUrl + '/update'
    return this.request({
      url: url,
      method: 'PUT',
      data: data
    })
  }

  getCurrentDayPlans(userId) {
    let url = baseUrl + '/query/current/userid/' + userId
    return this.request({
      url: url,
      method: 'GET',
    })
  }

  getSpecialMonthDayPlans(userId, timeStamp) {
    let url = baseUrl + '/query/month?userId=' + userId + '&timeStamp=' + timeStamp
    return this.request({
      url: url,
      method: 'GET',
    })
  }
}

export {
  DayPlanModel
}