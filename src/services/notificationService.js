// import axios from "axios";
// import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";
// import { setAuthToken } from "../utils/localStorage";
// import i18n from "../utils/i18n";

class NotificationService {
  async getNotifications(/*token*/) {
    try {
      // API_HEADER.headers.Authorization = token;

      // let response = await axios.get(
      //   `${BASE_URL}/service/pagamento`,
      //   API_HEADER
      // );
      // setAuthToken(response.headers[HEADER_RESPONSE]);

      const response = {
        data: {
          notifications: [
            {
              from: {
                name: 'José',
                img: ''
              },
              message: {
                title: 'Título teste',
                text: 'Esse é um exemplo de notificação'
              },
              date: '2018-09-28T10:00:00'
            }
          ]
        }
      }

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default NotificationService;
