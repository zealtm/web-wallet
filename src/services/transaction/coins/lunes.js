//import LunesJsAPI from "lunes-js-api";
import axios from 'axios';
//import validateAddress from "./validateAddress";
import { add } from "biggystring";
import { errorPattern } from "../../../utils/errorPattern";

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
    // try {
    //   const validate = await validateAddress(address, network)
    //   if (!validate) {
    //     throw errorPattern(
    //       'Invalid ' + network.coinName + ' Address',
    //       406,
    //       'ADDRESS_INVALID',
    //       'The address ' +
    //         address +
    //         ' is not a valid ' +
    //         network.coinName +
    //         ' address.'
    //     )
    //   }
  
    //   let res = await axios.get(
    //     network.apiUrl + '/addresses/balance/details/' + address
    //   )
  
    //   return {
    //     network: network.coinSymbol,
    //     data: {
    //       address: address,
    //       confirmed: res.data.available,
    //       unconfirmed: null
    //     }
    //   }
    // } catch (error) {
    //   throw errorPattern(
    //     error.message || 'Error retrieving balances',
    //     error.status || 500,
    //     error.messageKey || 'BALANCE_ERROR',
    //     error.logMessage || error.stack || ''
    //   )
    // }
  }
  

  async createLunesTransaction(data){
    try {
      const {seed, keyPair, fromAddress, toAddress, transactionAmount, fee, network} = data;

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

      if (transactionAmount <= 0) {
        throw errorPattern("Invalid amount", 401, "INVALID_AMOUNT");
      }

      if (fee < 0) {
        throw errorPattern("Fee cannot be smaller than 0.", 401, "INVALID_FEE");
      }

      // 
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
        throw errorPattern(
          error.data ? error.data.message : "Error on transaction",
          error.status || 500,
          error.messageKey || "ON_TRANSACTION_ERROR",
          ""
        );
      }
    } catch (error) {
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
