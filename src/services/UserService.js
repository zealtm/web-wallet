import axios from "axios";
import { BASE_URL } from "../constants/ApiBaseUrl";
class UserService {

    async userAuthenticate(email, password) {

        try {
            let request = await axios.post(`${BASE_URL}/login`, {
                login: email,
                password
            });

            console.warn(request);
            return request;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;