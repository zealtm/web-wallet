import axios from "axios";

const endpoint = "localhost:4000";

class UserService {

    async userAuthenticate (login, password) {
       
        try {
            let request = await axios.post(`${endpoint}/login`, {
                login,
                password
            });

            return request;
        } catch (error) {
            console.warn(error);
        }
    }
}

export default UserService;