import axios from "axios";
import { BASE_URL } from "../constants/apiBaseUrl";
class UserService {

    async userAuthenticate(email, password) {
        try {
            // console.warn("Leo env ",process.env.REACT_APP_ENV_APIKEY);
            let request = await axios.post(`${BASE_URL}/login`, {
                login: email,
                password
            });
        
            return request;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;