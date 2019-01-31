import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";


class KycService {
  async getKyc(token) {
    try {
      API_HEADER.headers.Authorization = token;
      const request = `${BASE_URL}/kyc`;
      let response = await axios.get(request, API_HEADER);
      
      setAuthToken(response.headers[HEADER_RESPONSE]);
      return response;
    } catch (error) {
      return internalServerError();
    }
  }
}
export default KycService;
