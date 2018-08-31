import _ from "lodash";
import { errorPattern } from "../../../utils/errorPattern";
import bitcoin from "bitcoinjs-lib";
import coinSelect from "coinselect";
import bip39 from "bip39";

import TransactionService from "../transactionService";

class BtcTransaction {

  getKeyPair(mnemonic,networks){
    const hdNode = bitcoin.HDNode.fromSeedHex(
      bip39.mnemonicToSeedHex(mnemonic),
      networks.bitcoinjsNetwork
    );
  
    return hdNode.derivePath(networks.derivePath + "/0");
  }
  
  async createTransaction(
    from,
    to,
    mnemonic,
    fee,
    amount,
    coin,
    token, 
    network
  ){
    try {
      if (amount <= 0) {
        throw errorPattern("Invalid amount", 401, "INVALID_AMOUNT");
      }
  
      if (fee <= 0) {
        throw errorPattern(
          "Fee per byte cannot be smaller than 0.",
          401,
          "INVALID_FEE"
        );
      }
  
      const transService = new TransactionService();
      const utxos = await transService.utxo(from, coin, token);
  
      if (utxos.length === 0) {
        throw errorPattern(
          "Sender has no spendable transactions.",
          401,
          "TRANSACTION_EMPTY_UTXO"
        );
      }
  
      const targets = [
        {
          address: to,
          value: amount
        }
      ];
  
      let { inputs, outputs } = coinSelect(utxos, targets, fee);
  
      if (!inputs || !outputs) {
        throw errorPattern("Balance too small.", 401, "TRANSACTION_LOW_BALANCE");
      }
  
      let tx = new bitcoin.TransactionBuilder(
        network.bitcoinjsNetwork
      );
  
      outputs.forEach(output => {
        if (!output.address) {
          output.address = from;
        }
  
        tx.addOutput(output.address, output.value);
      });
  
      inputs.forEach(input => {
        tx.addInput(input.txId, input.vout);
      });
  
      let keyPair = this.getKeyPair(mnemonic, network);

      tx = this.sign(tx, keyPair);
  
      const txHex = tx.build().toHex();
  
      console.log("TX", tx);
      console.log("COIN", txHex);
      return;
      // const broadcastResult = await TransactionService.broadcast(txHex, coin, token);
  
      // return {txID: broadcastResult};
    } catch (error) {
      return error;
    }
  }
  
  sign(tx, keyPair){
    _.times(tx.inputs.length, i => tx.sign(i, keyPair));
    return tx;
  }
}

export default BtcTransaction;