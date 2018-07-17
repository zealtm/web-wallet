import axios from "axios";
import { BASE_URL, API_KEY } from "../constants/apiBaseUrl";
class UserService {


    async userAuthenticate(email, password) {
        try {
            let request = await axios.post(`${BASE_URL}/login`, {
                login: email,
                password
            }, API_KEY);
            
            return request;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;