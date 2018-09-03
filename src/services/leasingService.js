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
            let urlHistory = BASE_URL + "/coin/" + coin + "/leasing/history/" + address;
            let urlBalance = BASE_URL + "/coin/" + coin + "/leasing/balance/" + address;

            let responseHistory = await axios.get(urlHistory, API_HEADER);
            let responseBalance = await axios.get(urlBalance);


            if (responseHistory.data.code === 200 && responseBalance.data.code === 200) {
                let dataResponse = {
                    balance: responseBalance,
                    history: responseHistory
                }
                console.warn("onj", dataResponse);
                return dataResponse;
            }
            internalServerError();
            return;

        } catch (error) {

            internalServerError();
            return;
        }
    }
}

export default LeasingService;