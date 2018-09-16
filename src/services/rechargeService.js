import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { setAuthToken } from "../utils/localStorage";

class RechargeService {

  async getOperadoras(token) {
    try {
      // API_HEADER.headers.Authorization = token;

      // let response = await axios.get(
      //   `${BASE_URL}/service/recharge`,
      //   API_HEADER
      // );
      // setAuthToken(response.headers[HEADER_RESPONSE]);

      // return response.data;

      const data = [
        {
          value: "vivo",
          title: "Vivo",
        },
        {
          value: "claro",
          title: "Claro",
        },
        {
          value: "tim",
          title: "TIM",
        },
      ];

      return data;
    } catch (error) {
      return internalServerError();
    }
  }

}


export default RechargeService;