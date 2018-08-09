import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class CoinService {
    async getAvaliableCoins(token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.get(BASE_URL + "/coin", API_HEADER);
            return response;
        }
        catch (error) {
            internalServerError();
            return;
        }
    }

    async createWalletCoin(coinType, seed, token) {
        try {
            API_HEADER.headers.Authorization = token;
            let response = await axios.post(BASE_URL + "/coin/" + coinType + "/address", { seed }, API_HEADER);

            return response;
        }
        catch (error) {
            internalServerError();
            return;
        }
    }
}

export default CoinService;
