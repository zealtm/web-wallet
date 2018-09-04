import axios from "axios";
import { BASE_URL, API_HEADER, TESTNET } from "../../constants/apiBaseUrl";
import {
  internalServerError,
  modalError
} from "../../containers/errors/statusCodeMessage";
import { networks } from "../../constants/network";

// COINS
import { BtcTransaction, LunesTransaction } from "./coins";
import CoinService from "../../services/coinService";

// UTILS
import i18n from "../../utils/i18n";
import { convertSmallerCoinUnit } from "../../utils/numbers";

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
      let responde = undefined;
      let coinService = new CoinService();
      let {
        fromAddress,
        toAddress,
        fee,
        amount,
        coin,
        decimalPoint
      } = transaction;
      if (
        !fromAddress ||
        !toAddress ||
        !seed ||
        !fee ||
        !amount ||
        !token ||
        !coin ||
        !decimalPoint
      ) {
        modalError(i18n.t("MESSAGE_TRANSACTION_FAILED"));
        return;
      }

      switch (coin) {
        case "btc":
          let transactionBtc = new BtcTransaction();
          let responseBtc = await transactionBtc.createTransaction({
            fromAddress: fromAddress,
            toAddress: toAddress,
            seed: seed,
            fee: convertSmallerCoinUnit(fee, decimalPoint),
            amount: convertSmallerCoinUnit(amount, decimalPoint),
            coin: coin,
            token: token,
            network: TESTNET ? networks.BTCTESTNET : networks.BTC
          });

          if (responseBtc === "error") {
            return;
          }

          let responseSaveBtc = await coinService.saveTransaction(
            responseBtc,
            coin,
            "Teste"
          );

          return responseSaveBtc;

        case "lunes":
          let transactionLunes = new LunesTransaction();
          let respondeLunes = await transactionLunes.createLunesTransaction({
            network: TESTNET ? networks.LUNES : networks.LNSTESTNET,
            seed: seed,
            fromAddress: fromAddress,
            toAddress: toAddress,
            amount: convertSmallerCoinUnit(amount, decimalPoint),
            fee: convertSmallerCoinUnit(fee, decimalPoint)
          });

          if (respondeLunes === "error") {
            return;
          }

          let responseSaveLunes = await coinService.saveTransaction(
            respondeLunes,
            coin,
            "Teste"
          );

          return responseSaveLunes;
      }
    } catch (error) {
      internalServerError();
      return error;
    }
  }
}

export default TransactionService;
