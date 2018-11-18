
import axios from "axios";

// CONSTANTS
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

// UTILS
import { setAuthToken } from "../utils/localStorage";

class P2pService {
    async setCancelOrder(token, orderId) {
        try {
          API_HEADER.headers.Authorization = token;
          const response = await axios.post(
            `${BASE_URL}/coin/lunes/p2p/order/cancel/${orderId}`,
            null,
            API_HEADER
          );         
          
          setAuthToken(response.headers[HEADER_RESPONSE]);

          if (response.data.code !== 200) {
            return false;
          }
    
          return true;
    
        } catch (error) {
          return internalServerError();
        }
      }
}

export default P2pService;