import {errorPattern} from "../../utils/errorPattern";
import {networks} from "./network";

// COINS 
import {createTransaction} from "./coins/btc";
import LunesTransaction from "./coins/lunes.js"

import TransactionService from "./transactionService";

/* eslint-disable */
export default async (coin, token, testnet = true) => {

  try {
    switch(coin){
      case 'btc':

        // dados exemplo
        const data = {
          network:        testnet ? networks.BTCTESTNET : networks.BTC,
          seedTeste:      "", // informe aqui uma seed
          fromAddress:    "mrmBsCMa8jw2btb9rTPpYyZHCED5UDPh5N",
          toAddress:      "moNjrdaiwked7d8jYoNxpCTZC4CyheckQH",
          amount:         1, 
          fee: null
        };

        // get fee
        const transactionFee = await TransactionService.getFee(data, coin, token);
        data.fee = transactionFee.low;

        const transactionResult = await createTransaction(
          data.fromAddress, 
          data.toAddress, 
          data.seedTeste, 
          data.fee, // escolher entre: low, medium ...
          data.amount, 
          coin, 
          token, 
          data.network
        );

        // return transactionResult;

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

        const transactionResult = await lunesTransaction.createLunesTransaction(data);

        // return transactionResult;
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