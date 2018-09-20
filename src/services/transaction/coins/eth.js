import EthereumUtil from "ethereumjs-util";
import EthereumTx from "ethereumjs-tx";
import hdkey from "ethereumjs-wallet/hdkey";
import bns from "biggystring";
import * as Web3 from "web3";

class EthTransaction {
  createTransaction(data) {
    try {
      console.warn("-------------------------");
      console.warn("eth.js", data);
      let wallet = this.mnemonicToWallet(data.seed);
      console.warn(wallet);

      let web3 = new Web3(new Web3.providers.HttpProvider(data.network.apiUrl));
      let nonce = web3.eth.getTransactionCount(
        wallet.getAddress().toString("hex")
      );
      nonce = this.toHex(nonce);
      let amount = this.toHex(data.amount);

      let txData = {
        nonce: nonce,
        to: data.toAddress,
        gasLimit: this.toHex(data.network.gasLimit),
        gasPrice: this.toHex(data.fee),
        value: amount,
        data: ""
      };

      console.warn("txData", txData);

      let tx = new EthereumTx(txData);
      console.warn("tx", tx);
      let signedTx = tx.sign(wallet.getPrivateKey());
      console.warn("signedTx", signedTx);
      signedTx = signedTx.serialize();
      signedTx = EthereumUtil.bufferToHex(signedTx);
      const sendResult = web3.eth.sendSignedTransaction(signedTx);
      console.warn("sendResult", sendResult);

      return { txID: sendResult };
    } catch (error) {
      console.warn(error);
      return "error";
    }
  }

  toHEx(num) {
    if (num.isHex) {
      return num;
    }
    if (!(typeof num === "string" || num instanceof String)) {
      num = num.toString();
    }
    return bns.add(num, "0", 16);
  }

  async sendTx(web3, signedTx) {
    return web3.eth.sendSignedTransaction(signedTx);
  }

  mnemonicToWallet(mnemonic) {
    const path = "m/44'/60'/0'/0/0";
    const ethKey = hdkey.fromMasterSeed(mnemonic);
    const wallet = ethKey.derivePath(path).getWallet();
    return wallet;
  }
}

export default EthTransaction;
