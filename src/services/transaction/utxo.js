import axios from "axios";
import { BASE_URL, API_HEADER } from "../../constants/apiBaseUrl";
import { internalServerError } from "../../containers/errors/statusCodeMessage";

// lista as transacoes nao gastas pelo endereco (saida)
export default async (address, coin, token) => {
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
};
