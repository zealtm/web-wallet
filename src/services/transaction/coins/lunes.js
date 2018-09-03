import { errorPattern } from "../../../utils/errorPattern";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";

// import CoinService from "../../coinService";

import { create, fromExistingPhrase } from "lunes-js-api";

class LunesTransaction {
  async createLunesTransaction(data) {
    console.warn(data);

    // nao permitir certos valores
    if (data.amount <= 0) {
      internalServerError();
      throw errorPattern("Invalid amount", 401, "INVALID_AMOUNT");
    }

    if (data.fee < 0) {
      internalServerError();
      throw errorPattern("Fee cannot be smaller than 0.", 401, "INVALID_FEE");
    }

    // conferir saldo da origem para validar
    // const coinService = new CoinService();
    // const userBalance = await coinService.getCoinBalance("lunes", data.fromAddress, data.token);

    // prepara a api
    const Lunes = await create(data.network.APICONFIG);
    console.warn("lunes", Lunes);

    const seed = await Lunes.Seed.fromExistingPhrase(data.seed);
    console.warn(seed);

    // transacionar
    try {
      const transaction = await Lunes.API.Node.v1.assets
        .transfer(
          {
            recipient: data.toAddress,
            assetId: "WAVES",
            amount: data.amount,
            fee: data.fee
          },
          seed.keyPair
        )
        .then(responseData => {
          return responseData;
        });

      //console.log(transaction);
      return transaction;
    } catch (error) {
      internalServerError();
      return error;
    }
  }
}

export default LunesTransaction;
