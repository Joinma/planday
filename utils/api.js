let api = {};

api.baseUrl = 'http://192.168.0.101:8080';

api.users = api.baseUrl + '/api/users'

module.exports = {
  api: api
}