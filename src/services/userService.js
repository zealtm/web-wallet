import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { badRequest, internalServerError } from "../containers/errors/statusCodeMessage";
import { encryptMd5 } from "../utils/cryptography";

class UserService {
  async createUser(userInfo) {
    try {
      let response = await axios.post(BASE_URL + "/user",
        {
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          password: encryptMd5(userInfo.password)
        },
        API_HEADER
      );
      console.warn(response);
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
