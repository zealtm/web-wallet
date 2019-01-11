// CONSTANTS
import { API_HEADER } from "../constants/apiBaseUrl";

// ERROS
import { internalServerError } from "../containers/errors/statusCodeMessage";

class DepositService {
  async getPackages(token) {
    try {
      API_HEADER.headers.Authorization = token;

      const packages = [15, 30, 45, 60, 100, 250, 500, 1000];

      return packages;
    } catch (error) {
      return internalServerError();
    }
  }
}

export default DepositService;
