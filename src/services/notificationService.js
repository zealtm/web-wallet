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

      const response = [...Array(5).keys()].map((notification, id) => {
        return {
          data: {
            notifications: [
              {
                from: {
                  name: 'José Manoel',
                  img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
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
      });

      return response.data;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default NotificationService;
