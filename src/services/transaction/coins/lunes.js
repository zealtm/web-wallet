import { errorPattern } from "../../../utils/errorPattern";
import { BASE_URL, API_HEADER } from "../../../constants/apiBaseUrl";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

import CoinService from "../../coinService";

const LunesApi = require("lunes-js-api");

class LunesTransaction {
  
  async createLunesTransaction(data){
    // nao permitir certos valores 
    if (data.amount <= 0) {
      throw errorPattern('Invalid amount', 401, 'INVALID_AMOUNT')
    }

    if (data.fee < 0) {
      throw errorPattern('Fee cannot be smaller than 0.', 401, 'INVALID_FEE')
    }

    // conferir saldo da origem
    const coinService = new CoinService();
    const userBalance = await coinService.getCoinBalance("lunes", data.fromAddress, data.token);

    
    // prepara a api 
    const Lunes   = LunesApi.create(data.network.APICONFIG);
    const seed    = Lunes.Seed.fromExistingPhrase(data.seed);

    // prepara a payload
    const transferData = { 
      recipient:    data.toAddress,
      assetId:      'WAVES',
      amount:       data.amount,
      fee:          data.fee,
    };
    
    // transacionar
    try {
      const transaction = await Lunes.API.Node.v1.assets.transfer(transferData, seed.keyPair)
      .then((responseData) => {
        return responseData;
      });
      
      console.log(transaction);
      return transaction;
    }catch(error){
      console.log("waves error", error);
      return error;
    }
  }
}

export default LunesTransaction;
