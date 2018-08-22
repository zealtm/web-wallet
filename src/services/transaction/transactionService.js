import axios from "axios";
import { BASE_URL, API_HEADER } from "../../constants/apiBaseUrl";
import { internalServerError } from "../../containers/errors/statusCodeMessage";

import {errorPattern} from "../../utils/errorPattern";
import {networks} from "./network";

// COINS 
import BtcTransaction from "./coins/btc";
import LunesTransaction from "./coins/lunes"


class TransactionService {

  async getFee(data, coin, token){
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        `${BASE_URL}/coin/${coin}/transaction/fee`,
        data,
        API_HEADER
      );
      //console.log("FEE", response);
      return response.data.data;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async utxo(address, coin, token){
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        `${BASE_URL}/coin/${coin}/transaction/utxo`,
        { fromAddress: address },
        API_HEADER
      );
  
      const utxos = [];
  
      response.data.data.utxos.forEach(utxo => {
        utxos.push({
          txId: utxo.txId,
          vout: utxo.vout,
          value: utxo.value
        });
      });
  
      //console.log("UTXOS", utxos);
      return utxos;
    } catch (error) {
      internalServerError();
      return;
    }
  }  

  async broadcast(txhex, coin, token){
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(
        `${BASE_URL}/coin/${coin}/transaction/broadcast`,
        { txHex: txhex },
        API_HEADER
      );
  
      return response;
    } catch (error) {
      internalServerError();
      return;
    }
  }

  /* eslint-disable */
  async transaction(coin, token, amount, fee, from, to, seed, testnet = true){

    try {
      switch(coin){
        case 'btc':

          const payload = {
            network:        testnet ? networks.BTCTESTNET : networks.BTC,
            seed:           seed,
            fromAddress:    from,
            toAddress:      to,
            amount:         amount, 
            fee:            fee
          };

          const btctrans = new BtcTransaction();
          const transactionBtcResult = await btctrans.createTransaction(
            payload.fromAddress, 
            payload.toAddress, 
            payload.seedTeste, 
            payload.fee,
            payload.amount, 
            coin, 
            token, 
            payload.network
          );

          // return transactionBtcResult;

        // lunes 
        case 'lunes':
          // get fee
          const transactionFee = await TransactionService.getFee(data, coin, token);

          const data = {
            network:        testnet ? networks.LNSTESTNET : networks.LNS,
            seed: "",
            keyPair: "",
            fromAddress: "",
            toAddress: "moNjrdaiwked7d8jYoNxpCTZC4CyheckQH",
            amount: 1,
            fee: transactionFee.low
          }

          const lunesTransaction = new LunesTransaction();

          const transactionLunesResult = await lunesTransaction.createLunesTransaction(data);

          // return transactionLunesResult;
          return;
      }
    }catch(error){
      return errorPattern(
        error.message,
        error.status || 500, 
        error.messageKey || "INTERNAL_SERVER_ERROR",
        error.logMessage || error.stack || ""
      )
    }

  }
  
}

export default TransactionService;