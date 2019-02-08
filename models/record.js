import {
  HTTP
} from '../utils/http.js'
const http = new HTTP()

class ClassicModel extends HTTP {
  //promise写法  
  getLatest() {
    return this.request({
      url: 'classic/latest',
      data: {
        name: '1',
        age: 18
      },
      method: 'POST'
    })
  }
  getLogin() {
    return this.request({
      url: ''
    })
  }

}

export {
  ClassicModel
}