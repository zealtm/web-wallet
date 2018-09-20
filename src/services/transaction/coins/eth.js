import EthereumUtil from "ethereumjs-util";
import EthereumTx from "ethereumjs-tx";
import hdkey from "ethereumjs-wallet/hdkey";
import Web3 from "web3";
import bip39 from "bip39";

/* eslint-disable */
const bs = require("biggystring");
/* eslint-enable */

class EthTransaction {
  async createTransaction(data) {
    try {
      console.warn(data);
      let wallet = await this.mnemonicToWallet(
        data.network.derivePath,
        data.seed
      );

      let web3 = await new Web3(
        new Web3.providers.HttpProvider(data.network.apiUrl)
      );

      let nonce = await web3.eth.getTransactionCount(
        this.toHex(
          EthereumUtil.addHexPrefix(wallet.getAddress().toString("hex"))
        )
      );
      console.warn(
        this.toHex(data.network.gasLimit),
        this.toHex(data.fee),
        this.toHex(data.amount)
      );
      let txData = {
        nonce: nonce,
        to: data.toAddress,
        gasLimit: this.toHex(data.network.gasLimit),
        gasPrice: this.toHex(data.fee),
        value: this.toHex(data.amount),
        data: ""
      };

      let tx = new EthereumTx(txData);
      console.warn("tx1", tx);

      await tx.sign(wallet.getPrivateKey());
      console.warn("tx2", tx);
      let signedTx = tx;

      signedTx = signedTx.serialize();
      console.warn("signedTx 1", signedTx);

      signedTx = EthereumUtil.bufferToHex(signedTx);

      console.warn("signedTx 2", signedTx);

      let sendResult = await web3.eth.sendSignedTransaction(signedTx);

      return { txID: sendResult };
    } catch (error) {
      console.warn(error);
      return "error";
    }
  }

  toHex(num) {
    if (num.isHex) {
      return num;
    }
    if (!(typeof num === "string" || num instanceof String)) {
      num = num.toString();
    }
    return bs.add(num, "0", 16);
  }

  async sendTx(web3, signedTx) {
    return web3.eth.sendSignedTransaction(signedTx);
  }

  mnemonicToWallet(path, mnemonic) {
    const ethKey = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const wallet = ethKey.derivePath(path).getWallet();
    return wallet;
  }
}

export default EthTransaction;
