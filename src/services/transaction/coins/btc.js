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
      console.warn(data)
      let usdt = false;
      if(data.coin === "usdt") usdt = true;

      const transService = new TransactionService();

      const utxos = await transService.utxo(
        data.fromAddress,
        usdt ? "btc": data.coin,
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

      let { inputs, outputs } = coinSelect(utxos, targets, data.feePerByte <= 2 ? 3 : data.feePerByte);

      let keyPair = this.getKeyPair(data.seed, data.network);

      let tx = new bitcoin.TransactionBuilder(
        usdt
          ? this.usdtTransaction(data, keyPair)
          : data.network.bitcoinjsNetwork
      );

      outputs.forEach(output => {
        if (!output.address) {
          output.address = data.fromAddress;
        }

        tx.addOutput(output.address, output.value);
      });

      inputs.forEach(input => {
        tx.addInput(input.txId, input.vout);
      });

      tx = this.sign(tx, keyPair);

      const txHex = tx.build().toHex();

      const broadcastResult = await transService.broadcast(
        txHex,
        usdt ? "btc" : data.coin,
        data.token
      );

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

      let transService = new TransactionService();
      let pubKey = keyPair.getPublicKeyBuffer().toString("hex");
      console.warn("pubKey", pubKey);
      let response = await transService.getUnsigned({
        transaction_version: 1,
        currency_identifier: 31,
        fee: data.fee,
        testnet: data.network.testnet,
        pubkey: pubKey,
        amount_to_transfer: data.amount,
        transaction_from: data.fromAddress,
        transaction_to: data.toAddress
      });
      console.warn("response", response)
      let tx = bitcoin.Transaction.fromHex(response);
      console.warn("tx", tx)

      return tx;
    } catch (error) {
      console.warn(error);
      return error;
    }
    
  }
}

export default BtcTransaction;
