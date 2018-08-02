import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { badRequest, internalServerError } from "../containers/errors/statusCodeMessage";
class UserService {
  async createUser(userInfo) {
    try {
      let response = await axios.post(BASE_URL + "/user",
        {
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          password: userInfo.password
        },
        API_HEADER
      );

      return response;
    }
    catch (error) {
      if (error.response.data.code === 500) {
        return badRequest("You are already registered");
      }

      return internalServerError();
    }
  }
}

export default UserService;
