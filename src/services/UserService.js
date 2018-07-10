import axios from "axios";

class UserService {

    async userAuthenticate(email, password) {

        try {
            console.warn("service", email, password);
            let request = await axios.post("http://localhost:4000/login", {
                login: email,
                password
            });

            return request;
        } catch (error) {
            console.warn(error);
        }
    }
}

export default UserService;