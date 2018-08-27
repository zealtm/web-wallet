//import LunesJsAPI from "lunes-js-api";
import axios from 'axios';
//import validateAddress from "./validateAddress";
import { add } from "biggystring";
import { errorPattern } from "../../../utils/errorPattern";
import { BASE_URL, API_HEADER } from "../../../constants/apiBaseUrl";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

class LunesTransaction {

  // mnemonicToSeed(mnemonic, network){
  //   if (mnemonic) {
  //     const Lunes = LunesJsAPI.create(network.APICONFIG)
  //     const seed = Lunes.Seed.fromExistingPhrase(mnemonic)
  //     return seed
  //   }
  
  //   return 'Invalid'
  // }

  async balance(address, network){
    try {
      // const validate = await validateAddress(address, network)
      // if (!validate) {
      //   throw errorPattern(
      //     'Invalid ' + network.coinName + ' Address',
      //     406,
      //     'ADDRESS_INVALID',
      //     'The address ' +
      //       address +
      //       ' is not a valid ' +
      //       network.coinName +
      //       ' address.'
      //   )
      // }
  
      let res = await axios.get(
        network.apiUrl + '/addresses/balance/details/' + address
      )
  
      return {
        network: network.coinSymbol,
        data: {
          address: address,
          confirmed: res.data.available,
          unconfirmed: null
        }
      }
    } catch (error) {
      throw errorPattern(
        error.message || 'Error retrieving balances',
        error.status || 500,
        error.messageKey || 'BALANCE_ERROR',
        error.logMessage || error.stack || ''
      )
    }
  }

  async createLunesTransaction(data){
    try {
      const {token, seed, keyPair, fromAddress, toAddress, transactionAmount, fee, network} = data;

      // Check received address
      // const validate = await validateAddress(toAddress, network)
      // if (!validate) {
      //   throw errorPattern(
      //     'Invalid ' + network.coinName + ' Address',
      //     406,
      //     'ADDRESS_INVALID',
      //     'The address ' +
      //       toAddress +
      //       ' is not a valid ' +
      //       network.coinName +
      //       ' address.'
      //   )
      // }

      const seed2 = this.mnemonicToSeed(seed, network);

      if (transactionAmount <= 0) {
        throw errorPattern("Invalid amount", 401, "INVALID_AMOUNT");
      }
      if (fee < 0) {
        throw errorPattern("Fee cannot be smaller than 0.", 401, "INVALID_FEE");
      }

      // ja existe este servico em CoinService, mas por enquanto temos que usar a TestNet
      const userBalance = await this.balance(fromAddress, network);

      const finalAmount = add(transactionAmount.toString(), fee.toString());
      if (userBalance.data.confirmed < finalAmount) {
        throw errorPattern("Balance too small", 401, "TRANSACTION_LOW_BALANCE");
      }

      // 
      const transactionData = {
        assetId: "WAVES",
        amount: transactionAmount,
        fee: fee,
        recipient: toAddress
      };

      try {
        //const Lunes = LunesJsAPI.create(network.APICONFIG);
        
        API_HEADER.headers.Authorization = token;
        let response = await axios.post(
          `https://lunesnode-testnet.lunes.io/assets/transfer`,
          transactionData,
          API_HEADER
        );
        console.log("LUNES", response);
        /*
        const transaction = await Lunes.API.Node.v1.assets.transfer(transactionData, seed.keyPair)
          .then(res => {
            const result = {
              network: network.coinSymbol,
              data: {
                txID: res.id
              }
            };

            return result;
          });
        */

        return transaction;
     
      } catch (error) {
        console.log("erro2", error);
        throw errorPattern(
          error.data ? error.data.message : "Error on transaction",
          error.status || 500,
          error.messageKey || "ON_TRANSACTION_ERROR",
          ""
        );
      }
    } catch (error) {
      console.log("erro1");
      throw errorPattern(
        error.message || "Error creating transaction",
        error.status || 500,
        error.messageKey || "CREATE_TRANSACTION_ERROR",
        error.logMessage || error.stack || ""
      );
    }
  }
}

export default LunesTransaction;
