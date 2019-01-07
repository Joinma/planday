import { HTTP } from '../utils/http.js'

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
}

export { ClassicModel }
