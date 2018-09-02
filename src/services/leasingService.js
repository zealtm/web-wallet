import axios from "axios";
import {
    internalServerError
} from "../containers/errors/statusCodeMessage";
import {
    API_HEADER,
    BASE_URL,
    LUNESNODE_URL
} from "../constants/apiBaseUrl";
class LeasingService {

    async getProfessionalNodes() {
        try {
            let response = await axios.get("https://lunes.in/trust.json");

            return response.data.node;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async createLeasing(data) {
        try {
            // LUNESNODE_URL + "/addresses/validate/" + address
            //
            let response = await axios.post(LUNESNODE_URL + "/leasing/lease", {
                sender: data.coinAddress,
                amount: 0,
                fee: 0,
                recipient: "toAddress",
                timestamp: Date.now()
            });

            return response.data.node;
        } catch (error) {
            internalServerError();
            return;
        }
    }

    async getLeasingHistory(coin, address, token) {
        try {
            API_HEADER.headers.Authorization = token;
            let url = BASE_URL + "/coin/" + coin + "/leasing/history/" + address;
            let response = await axios.get(url, API_HEADER);

            if (response.data.code === 200)
                return response;

            internalServerError();
            return;

        } catch (error) {

            internalServerError();
            return;
        }
    }
}

export default LeasingService;