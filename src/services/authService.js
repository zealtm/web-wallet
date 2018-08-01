import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { unauthorized, internalServerError } from "../utils/statusCodeMessage";
class AuthService {
  async authenticate(email, password) {
    try {
      let response = await axios.post(BASE_URL + "/login", { login: email, password }, API_HEADER);

      if (response.data.code === 401) {
        unauthorized("Inavalid Username/Email or Password");
        return;
      }

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async hasTwoFactorAuth(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/user/2fa", API_HEADER);

      if (response.data.code === 401) {
        unauthorized("Could not verify 2fa");
        return;
      }
      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async createTwoFactorAuth() {
    try {
      let response = await axios.post(BASE_URL + "/user/2fa", {}, API_HEADER);

      if (response.data.code === 500) {
        unauthorized("Could not enable two-factor authentication");
        return;
      }

      return response;
    } catch (error) {
      return internalServerError();
    }
  }

  async verifyTwoFactoryAuth(token) {
    try {
      let response = await axios.post(
        BASE_URL + "/user/2fa/verify", { token }, API_HEADER);

      if (response.data.code === 401) {
        unauthorized("Invalid 2FA token");
        return;
      }

      return response;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default AuthService;
