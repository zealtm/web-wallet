import axios from "axios";
import { BASE_URL, API_HEADER, HEADER_RESPONSE } from "../../../constants/apiBaseUrl";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";
import _ from "lodash";
import ValidateAddress from "../../../utils/validateAddress";
import errorPattern from "../../../utils/errorPattern";

// UTILS
import { convertCoin, percentCalc } from "../../../utils/numbers";

// LIBS BITCOIN 
import network        from "../network"; // configs das redes
import bitcoin        from "bitcoinjs-lib";
import coinSelect    from "coinselect";
import bip39          from "bip39";

class TransactionBtc {

  getKeyPair(mnemonic) {
    const hdNode = bitcoin.HDNode.fromSeedHex(
      bip39.mnemonicToSeedHex(mnemonic),
      network.bitcoinjsNetwork
    );
  
    return hdNode.derivePath(
      network.derivePath + '/0'
    );
  }

  // retorno de taxas 
  async getFee(data, coin, token){
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(`${BASE_URL}/coin/${coin}/transaction/fee`, data, API_HEADER);

      return response;
    }catch (error) {
      internalServerError();
      return;
    }
  }

  // lista as transacoes nao gastas pelo endereco (saida)
  async getUtxo(address, coin, token){
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(`${BASE_URL}/coin/${coin}/transaction/utxo`, {address:address}, API_HEADER);

      const utxos = [];

      // confirmar campos de retorno
      response.forEach(utxo => {
        if(utxo.height !== 0){
          utxos.push({
            txId: utxo.tx_hash,
            vout: utxo.tx_pos,
            value: utxo.value
          });
        }
      });

      return utxos;
    }catch(error){
      internalServerError();
      return;
    }
  }

  // entrada e saida 
  async getInputOutput(fromAddress, toAddress, amount, fee, coin, token){
    const targets = [{
      address: toAddress,
      value: amount
    }];

    let utxos = await this.postUtxo(fromAddress, coin, token);
    
    return coinSelect(utxos, targets, fee);
  }

  // trasmissão 
  async postBroadcast(txhex, coin, token){
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.post(`${BASE_URL}/coin/${coin}/transaction/broadcast`, {txHex: txhex}, API_HEADER);

      return response;
    }catch(error){
      internalServerError();
      return;
    }
  }

  // a transacao
  async createTransaction(from, to, mnemonic, fee, amount, coin, token){
    try {

      // validacoes 
      if(!ValidateAddress(to, coin, network.BTCTESTNET)){
        throw errorPattern(
          'Invalid ' + coin + ' Address',
          406,
          'ADDRESS_INVALID',
          'The address ' +
            to +
            ' is not a valid ' +
            coin +
            ' address.'
        );
      }

      // nao envia valores negativos 
      if(amount <= 0){
        throw errorPattern('Invalid amount', 401, 'INVALID_AMOUNT')
      }

      // impede valor fee negativo
      if(fee <= 0){
        throw errorPattern('Fee per byte cannot be smaller than 0.', 401, 'INVALID_FEE')
      }

      let {inputs, outputs} = this.getUtxo(from, coin, token);
      let tx = new bitcoin.TransactionBuilder(network.bitcoinjsnetwork);
  
      outputs.forEach(output =>{
        if(!output.address){
          output.address = from;
        }
  
        tx.addOutput(output.address, output.value);
      });
  
      inputs.forEach(input => {
        tx.addInput(input.txId, input.vout);
      });
  
      //
      let keyPair = this.getKeyPair(mnemonic);
  
      tx = this.sign(tx, keyPair);

      const txHex = tx.build().toHex();
  
      const broadcastResult = await this.postBroadcast(txHex, coin, token);

      return {txID: broadcastResult};
    }catch(error){
      //internalServerError();
      return error;
    }

  }

  sign = (tx, keyPair) => {
    _.times(tx.inputs.length, i => tx.sign(i, keyPair));
    return tx;
  }
}

export default TransactionBtc;