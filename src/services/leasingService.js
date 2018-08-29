import axios from "axios";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class LeasingService {
    async getProfessionalNodes() {
        try {
            let response = await axios.get("https://lunes.in/trust.json");

            return response;
        } catch (error) {
            internalServerError();
            return;
        }
    }
}

export default LeasingService;