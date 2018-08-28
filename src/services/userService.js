import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { HEADER_REQUEST } from "../constants/headers";

import {
  badRequest,
  internalServerError
} from "../containers/errors/statusCodeMessage";
import { encryptMd5 } from "../utils/cryptography";

class UserService {
  async createUser(userInfo) {
    try {
      let response = await axios.post(
        BASE_URL + "/user",
        {
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          password: encryptMd5(userInfo.password)
        },
        API_HEADER
      );
      return response;
    } catch (error) {
      if (error.response.data.code === 500) {
        return badRequest("You are already registered");
      }

      return internalServerError();
    }
  }

  async getUser(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/user", API_HEADER);

      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async getUserPicture(email) {
    const defaultImg = "images/icons/lunio/lunio-user@100x100.jpg";
    try {
      let crypto = encryptMd5(email);
      let response = await axios.get(
        "https://en.gravatar.com/" + crypto + ".json",
        HEADER_REQUEST
      );

      return response.data.entry[0].thumbnailUrl;
    } catch (error) {
      return defaultImg;
    }
  }
}

export default UserService;
