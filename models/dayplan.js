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
}

export {
  DayPlanModel
}