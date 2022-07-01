import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/user';

class UserService {
  getAllUser() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getUserId(id) {
    return axios.get(API_URL+`/${id}`, { headers: authHeader() });
  }
  createUser(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }
  updateUser(data) {
    return axios.put(API_URL, data, { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_URL+`/${id}`, { headers: authHeader() });
  }
}

export default new UserService();
