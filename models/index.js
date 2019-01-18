import { HTTP } from '../utils/http.js'

class ClassicModel extends HTTP {
  //promise写法  
  getLatest() {
    return this.request({
      url: 'classic/latest',
    })
  }

}
export { ClassicModel }
