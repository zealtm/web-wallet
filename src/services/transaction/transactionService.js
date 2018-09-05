import axios from "axios";
import { BASE_URL, API_HEADER, TESTNET } from "../../constants/apiBaseUrl";
import {
  internalServerError,
  modalError
} from "../../containers/errors/statusCodeMessage";
import { networks } from "../../constants/network";
// COINS
import { BtcTransaction, LunesTransaction } from "./coins";

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
  async transaction(transaction, seed, token) {
    try {
      let { from, to, fee, amount, coin, network } = transaction;
      if (
        !from ||
        !to ||
        !seed ||
        !fee ||
        !amount ||
        !token ||
        !coin ||
        !network
      ) {
        modalError(i18n.t("MESSAGE_TRANSACTION_FAILED"));
        return;
      }

      switch (coin) {
        case "btc":
          const transactionBtc = new BtcTransaction();
          const responseBtc = await transactionBtc.createTransaction({
            fromAddress: from,
            toAddress: to,
            seed: seed,
            fee: fee,
            amount: amount,
            coin: coin,
            token: token,
            network: TESTNET ? networks.BTCTESTNET : networks.BTC
          });

          return responseBtc;

        case "lunes":
          const transactionLunes = new LunesTransaction();
          const responseLunes = await transactionLunes.createLunesTransaction({
            network: TESTNET ? networks.LUNES : networks.LNSTESTNET,
            seed: seed,
            fromAddress: from,
            toAddress: to,
            amount: amount,
            fee: fee
          });

          return responseLunes;
      }
    } catch (error) {
      internalServerError();
      return;
    }
  }

  async createLeasing(data) {
    let lunes = new LunesTransaction();
    let response = await lunes.createLeasing(data);
    return response;
  }

  async cancelLeasing(data) {
    let lunes = new LunesTransaction();
    let response = await lunes.cancelLeasing(data);
 
    return response;
  }

}

export default TransactionService;
