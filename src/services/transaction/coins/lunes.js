import { errorPattern } from "../../../utils/errorPattern";
import { BASE_URL, API_HEADER } from "../../../constants/apiBaseUrl";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

import CoinService from "../../coinService";

const WavesAPI = require('@waves/waves-api');
const bs = require('biggystring')

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
   
    // BIGGYSTRING pra somar grandes valores [ERRO]
    // const finalAmount = bs.add(data.amount, data.fee);
    // if (userBalance.data.data.available < finalAmount) {
    //   throw errorPattern('Balance too small', 401, 'TRANSACTION_LOW_BALANCE')
    // }
    
    // prepara a api 
    const Waves   = WavesAPI.create(data.network.APICONFIG); // usa a api da MAIN ou TESTNET
    const seed    = Waves.Seed.fromExistingPhrase(data.seed); // carga de dados usando a seed
    
    // prepara a payload
    const transferData = { 
      recipient:    data.toAddress,
      assetId:      'WAVES',
      amount:       data.amount,
      //feeAssetId:   data.network.coinSymbol,
      fee:          data.fee,
      //timestamp:    Date.now()
    };
    
    // transacionar
    try {
      const transaction = await Waves.API.Node.transactions.broadcast('transfer', transferData, seed.keyPair)
        .then((responseData) => {
          return responseData;
        }).error((error)=>{
          console.log(error);
          return error;
        });
      console.log(responseData);
      return transaction;
    }catch(error){
      console.log("waves error", error);
      return error;
    }
  }
}

export default LunesTransaction;
