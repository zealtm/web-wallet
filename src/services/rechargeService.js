import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../constants/apiBaseUrl";
import { internalServerError } from "../containers/errors/statusCodeMessage";
import { setAuthToken } from "../utils/localStorage";

class RechargeService {

  async getOperadoras(token, ddd) {
    try {
      API_HEADER.headers.Authorization = token;
    
      let response = await axios.get(
        `${BASE_URL}/recharge/operators/`+ddd,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);
      
      if(response.data.code !== 200){
        return internalServerError();
      }

      let operadoras = [];
      response.data.data.operators.map(val=>{
        operadoras.push({ value: val.id, title: val.name });
      });

      return operadoras;

    } catch (error) {
      return internalServerError();
    }
  }

  async getValoresRecarga(token, action) {
    try {
      API_HEADER.headers.Authorization = token;
    
      let response = await axios.get(
        `${BASE_URL}/recharge/price/`+action.operadora+`/`+action.ddd,
        API_HEADER
      );
      setAuthToken(response.headers[HEADER_RESPONSE]);
      
      if(response.data.code !== 200){
        return internalServerError();
      }

      let valores = [];
      response.data.data.prices.map(val=>{
        valores.push({ value: val.value, title: "R$"+val.value });
      });

      return valores;

    } catch (error) {
      return internalServerError();
    }
  }

}


export default RechargeService;