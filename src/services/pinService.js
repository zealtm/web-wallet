import axios from "axios";
import { BASE_URL, API_HEADER_AUTH } from "../constants/apiBaseUrl";


class PinService {

    async consult() {
        try {
            let response = await axios.get(`${BASE_URL}/user/pin`, API_HEADER_AUTH);
    
            return response;
        } catch (error) {
            error.message;
        }
    }

    async create(pin) {
        try {
            let response = await axios.post(`${BASE_URL}/user/pin`, {
                pin
            }, API_HEADER_AUTH);

            return response;
        } catch (error) {
            error.message;
        }
    }

    async verify(pin) {
        try {
            let response = await axios.post(`${BASE_URL}/user/pin/verify`, {
                pin
            }, API_HEADER_AUTH);

            return response;
        } catch (error) {
            error.message;
        }
    }
}

export default PinService;