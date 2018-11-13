import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";

class InviteService {
  async getInvite(token) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(BASE_URL + "/invite/consult", API_HEADER);

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }

  async getInviteBalance(token, address) {
    try {
      API_HEADER.headers.Authorization = token;

      let response = await axios.get(
        `${BASE_URL}/invite/balance/${address.link}`,
        API_HEADER
      );

      setAuthToken(response.headers[HEADER_RESPONSE]);

      if (response.data.code !== 200) {
        return internalServerError();
      }

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default InviteService;
