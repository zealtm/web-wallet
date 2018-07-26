import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";

class PinService {
  async consult(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/user/pin", API_HEADER);

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async create(pin, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/user/pin",
        {
          pin
        },
        API_HEADER
      );

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async verify(pin, token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        BASE_URL + "/user/pin/verify",
        {
          pin
        },
        API_HEADER
      );

      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default PinService;
