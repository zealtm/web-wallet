import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";

class UserService {
  async createUser(userInfo) {
    try {
      let response = await axios.post(
        BASE_URL + "/user",
        {
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          password: userInfo.password
        },
        API_HEADER
      );

      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default UserService;
