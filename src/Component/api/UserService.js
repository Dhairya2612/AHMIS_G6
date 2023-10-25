import axios from "axios";
const USER_LIST_API = "http://localhost:8080/home/saveusers";

class userService {
  addUsers(user) {
    return axios.post(USER_LIST_API, user);
  }
}

export default new userService();
