import {
  internalServerError
} from "../../../containers/errors/statusCodeMessage";
import {
  create
} from "lunes-js-api";

class LunesTransaction {
  async createLunesTransaction(data) {
    try {
      const Lunes = await create(data.network.APICONFIG);
      const seed = await Lunes.Seed.fromExistingPhrase(data.seed);
      const transaction = await Lunes.API.Node.v1.assets
        .transfer({
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

      return transaction;
    } catch (error) {
      console.warn(error);
      internalServerError();
      return "error";
    }
  }

  async createLeasing(data) {
    const lunes = await create(data.network.APICONFIG);
    const seed = await lunes.Seed.fromExistingPhrase(data.seed);

    let leaseData = {
      recipient: data.recipient,
      amount: data.amount,
      fee: data.fee
    };
    const transaction = lunes.API.Node.v1.leasing.lease(
      leaseData,
      seed.keyPair
    );

    return transaction;
  }

  async cancelLeasing(data) {
    let leaseData = {
      transactionId: data.transactionId,
      fee: data.fee,
      timestamp: Date.now()
    };

    let lunes = await create(data.network.APICONFIG);
    let seed = await lunes.Seed.fromExistingPhrase(data.seed);
    let transaction = lunes.API.Node.v1.leasing.cancelLeasing(
      leaseData,
      seed.keyPair
    );

    return transaction;
  }

  async createAlias(value) {
    let data = {
      alias: value.alias,
      fee: value.fee,
      timestamp: Date.now()
    };
    console.warn("até aqui funciona");
    let lunes = await create(value.network.APICONFIG);
    console.warn("is lunes", lunes);
    let seed = await lunes.Seed.fromExistingPhrase(value.seed);
    console.warn("seed.keypair", seed);

    let transaction = lunes.API.Node.v1.aliases.createAlias(data, seed.keyPair).then(x => console.warn(x));
    console.warn("Olha aqui mano! ", transaction);

    return transaction;
  }

  async getAliases(value) {
    let lunes = await create(value.network.APICONFIG);
    let transaction = lunes.API.Node.v1.aliases.byAddress(value.address)

    return transaction;
  }
}

export default LunesTransaction;