import axios from "axios";
import { BASE_URL, API_HEADER, TESTNET } from "../../constants/apiBaseUrl";
import { internalServerError } from "../../containers/errors/statusCodeMessage";
import { errorPattern } from "../../utils/errorPattern";
import { networks } from "../../constants/network";

// COINS
import { BtcTransaction, LunesTransaction } from "./coins";
// import { fromSeedBuffer } from "bitcoinjs-lib/src/hdnode";

class TransactionService {
  async utxo(address, coin, token) {
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

  async broadcast(txhex, coin, token) {
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
  async transaction(transaction, coin, token, amount, fee, from, to, seed) {
    try {
      switch (transaction.coin) {
        case "btc":
          const btctrans = new BtcTransaction();
          const transactionBtcResult = await btctrans.createTransaction(
            transaction.from,
            transaction.to,
            transaction.seed,
            transaction.fee,
            transaction.amount,
            transaction.coin,
            transaction.token,
            TESTNET ? networks.BTCTESTNET : networks.BTC
          );

          return transactionBtcResult;

        case "lunes":
          console.warn("FOI");
          const lunesTransaction = new LunesTransaction();
          const transactionLunesResult = await lunesTransaction.createLunesTransaction(
            {
              network: TESTNET ? networks.LUNES : networks.LNSTESTNET,
              seed: transaction.seed,
              fromAddress: transaction.from,
              toAddress: transaction.to,
              amount: transaction.amount,
              coin: transaction.coin,
              fee: transaction.fee,
              token: transaction.token
            }
          );

          // await Promise.all(transactionLunesResult);

          console.warn("transaction", transactionLunesResult);
          return transactionLunesResult;
      }
    } catch (error) {
      return errorPattern(
        error.message,
        error.status || 500,
        error.messageKey || "INTERNAL_SERVER_ERROR",
        error.logMessage || error.stack || ""
      );
    }
  }
}

export default TransactionService;
