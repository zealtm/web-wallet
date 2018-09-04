import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";

class PaymentService {
  async getNomeFuncao(){
    try {
      //let response = await axios.get("");
      let response = {
        teste: "teste",
        teste2: "123"
      }
      return response;
    }catch(error){
      internalServerError();
      return;
    }
  }

  async getApiTeste(token){
    console.log("chamando...");
    API_HEADER.headers.Authorization = token;

    let response = await axios.get(
      "https://a.lunes.io/wallet/staging/service/pagamento",
      API_HEADER
    );
    return response.data.data;
  }
}

export default PaymentService;