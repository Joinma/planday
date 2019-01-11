let api = {};

// api.baseUrl = 'http://192.168.0.157:5314';
api.hostUrl = 'http://planday.getcy.cn';

api.imageUrl = 'http://image.getcy.cn';

api.baseUrl = api.hostUrl+'/api';


api.users = api.baseUrl + '/api/users'

module.exports = {
  api: api
}