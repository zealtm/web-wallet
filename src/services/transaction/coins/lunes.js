import { internalServerError } from "../../../containers/errors/statusCodeMessage";
import { create } from "lunes-js-api";

class LunesTransaction {
  async createLunesTransaction(data) {
    console.warn(data);

    // prepara a api
    const Lunes = await create(data.network.APICONFIG);
    const seed = await Lunes.Seed.fromExistingPhrase(data.seed);

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
