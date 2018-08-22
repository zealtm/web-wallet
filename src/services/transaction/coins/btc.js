import _ from "lodash";
import ValidateAddress from "../../../utils/validateAddress";
import { errorPattern } from "../../../utils/errorPattern";

// LIBS BITCOIN
//import { networks } from "../network"; // configs das redes
import bitcoin from "bitcoinjs-lib";
import coinSelect from "coinselect";
import bip39 from "bip39";

import postBroadcast from "../broadcast";
import getUtxo from "../utxo";

const getKeyPair = (mnemonic,networks) => {
  const hdNode = bitcoin.HDNode.fromSeedHex(
    bip39.mnemonicToSeedHex(mnemonic),
    networks.bitcoinjsNetwork
  );

  return hdNode.derivePath(networks.derivePath + "/0");
};

// entrada e saida
export const getInputOutput = async (
  fromAddress,
  toAddress,
  amount,
  fee,
  coin,
  token
) => {
  const targets = [
    {
      address: toAddress,
      value: amount
    }
  ];

  let utxos = await this.postUtxo(fromAddress, coin, token);

  return coinSelect(utxos, targets, fee);
};

// a transacao
export const createTransaction = async (
  from,
  to,
  mnemonic,
  fee,
  amount,
  coin,
  token, 
  network
) => {
  try {
    // // validacoes
    // if (!ValidateAddress(to, coin, network.BTCTESTNET)) {
    //   throw errorPattern(
    //     "Invalid " + coin + " Address",
    //     406,
    //     "ADDRESS_INVALID",
    //     "The address " + to + " is not a valid " + coin + " address."
    //   );
    // }

    // nao envia valores negativos
    if (amount <= 0) {
      throw errorPattern("Invalid amount", 401, "INVALID_AMOUNT");
    }

    // impede valor fee negativo
    if (fee <= 0) {
      throw errorPattern(
        "Fee per byte cannot be smaller than 0.",
        401,
        "INVALID_FEE"
      );
    }

    const utxos = await getUtxo(from, coin, token);

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

    // .inputs and .outputs will be undefined if no solution was found
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

    //
    let keyPair = getKeyPair(mnemonic, network);

    tx = sign(tx, keyPair);

    const txHex = tx.build().toHex();

    console.log("TX", tx);
    console.log("COIN", txHex);
    return;
    // const broadcastResult = await postBroadcast(txHex, coin, token);

    // return {txID: broadcastResult};
  } catch (error) {
    console.log("TX", "erro");
    //internalServerError();
    return error;
  }
};

const sign = (tx, keyPair) => {
  _.times(tx.inputs.length, i => tx.sign(i, keyPair));
  return tx;
};