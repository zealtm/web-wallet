import _ from "lodash";
import bitcoin from "bitcoinjs-lib";
import coinSelect from "coinselect";
import bip39 from "bip39";

import TransactionService from "../transactionService";

class BtcTransaction {
  getKeyPair(mnemonic, networks) {
    const hdNode = bitcoin.HDNode.fromSeedHex(
      bip39.mnemonicToSeedHex(mnemonic),
      networks.bitcoinjsNetwork
    );

    return hdNode.derivePath(networks.derivePath + "/0");
  }

  async createTransaction(data) {
    try {
      console.warn(data);
      let usdt = false;
      let broadcastResult = undefined;

      if (data.coin === "usdt") usdt = true;

      const transService = new TransactionService();

      const utxos = await transService.utxo(
        data.fromAddress,
        usdt ? "btc" : data.coin,
        data.token
      );

      console.warn(utxos);

      const targets = [
        {
          address: data.toAddress,
          value: data.amount
        }
      ];

      if (data.lunesWallet.address && data.feeLunes) {
        targets.push({
          address: data.lunesWallet.address,
          value: data.feeLunes
        });
      }

      let { inputs, outputs } = coinSelect(
        utxos,
        targets,
        data.feePerByte <= 2 ? 3 : data.feePerByte
      );

      let keyPair = this.getKeyPair(data.seed, data.network);

      let tx = new bitcoin.TransactionBuilder(
        usdt
          ? await this.usdtTransaction(data, keyPair)
          : data.network.bitcoinjsNetwork
      );

      if(!usdt) {
        outputs.forEach(output => {
          if (!output.address) {
            output.address = data.fromAddress;
          }
  
          tx.addOutput(output.address, output.value);
        });
  
        inputs.forEach(input => {
          tx.addInput(input.txId, input.vout);
        });
      }

      tx = this.sign(tx, keyPair);

      const txHex = tx.build().toHex();

      if (usdt) {
        broadcastResult = await transService.pushTx(txHex);
      } else {
        broadcastResult = await transService.broadcast(
          txHex,
          usdt ? "btc" : data.coin,
          data.token
        );
      }

      console.warn(broadcastResult)

      return broadcastResult.data.data.txId;
    } catch (error) {
      console.warn(error);
      return "error";
    }
  }

  sign(tx, keyPair) {
    _.times(tx.inputs.length, i => tx.sign(i, keyPair));
    return tx;
  }

  async usdtTransaction(data, keyPair) {
    try {
      console.warn("data", data);
      console.warn("keyPair", keyPair);

      let pubKey = keyPair.getPublicKeyBuffer().toString("hex");
      console.warn("pubKey", pubKey);

      let params = new URLSearchParams();
      params.append("transaction_version", 1);
      params.append("currency_identifier", 31);
      params.append("fee", data.fee);
      params.append("testnet", data.network.testnet);
      params.append("pubkey", pubKey);
      params.append("amount_to_transfer", data.amount);
      params.append("transaction_from", data.fromAddress);
      params.append("transaction_to", data.toAddress);

      let transService = new TransactionService();
      let response = await transService.getUnsigned(params);
      console.warn("response", response);

      let tx = bitcoin.Transaction.fromHex(response.unsignedhex);
      console.warn("tx", tx);

      return tx;
    } catch (error) {
      console.warn(error);
      return error;
    }
  }
}

export default BtcTransaction;
