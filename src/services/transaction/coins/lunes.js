import { internalServerError } from "../../../containers/errors/statusCodeMessage";
import { create } from "lunes-js-api";

class LunesTransaction {

  async createLunesTransaction(data) {
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

  async createLeasing(data) {
    let leaseData = {
      sender: data.coinAddress,
      amount: data.amount,
      fee: data.fee,
      recipient: data.recipient,
      timestamp: Date.now()
    };
    let config = apiConfigFactory();

    const transaction = config.lunes.API.Node.v1.leasing.lease(
      leaseData,
      config.see.keyPair
    );

    return transaction;
  }

  async cancelLeasing(transactionId, fee) {
    let leaseData = {
      transactionId,
      fee,
      timestamp: Date.now()
    };

    let config = apiConfigFactory();
    let transaction = config.lunes.API.Node.v1.leasing.cancelLeasing(
      leaseData,
      config.see.keyPair
    );

    return transaction
  }
}

let apiConfigFactory = async (data) => {
  const lunes = await create(data.network.APICONFIG);
  const seed = await lunes.Seed.fromExistingPhrase(data.seed);
  let config = { lunes, seed }
  return config
}
export default LunesTransaction;
