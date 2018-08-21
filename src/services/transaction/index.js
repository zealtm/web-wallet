import TransactionBtc from "./coins/btc";
import errorPattern from "../../utils/errorPattern";
import networks from "./networks";

// COINS 
import TransactionBtc from "./coins/btc";

export default (coin, testnet) => {

  try {
    switch(coin){
      case 'btc':
        const network = testnet ? networks.BTCTESTNET : networks.BTC;

        // dados exemplo
        const data = {
          "fromAddress":    "mj1oZJa8pphtdjeo51LvEnzxFKHoMcmtFA",
          "toAddress":      "mhJbcNEzSLsBqJVyzoHJHdutLXAVUBUcxk",
          "amount":         100
        };

        const transaction = new TransactionBtc();

        // get fee
        const transactionFee = await transaction.getFee(data, 'btc', token);

        const transactionResult = await transaction.createTransaction(
          data.fromAddress, 
          data.toAddress, 
          mnemonic, 
          transactionFee,
          data.amount, 
          coin, 
          token
        );
      
        return transactionResult;

      // lunes 
      case 'lunes':
        return;
    }
  }catch(error){
    return errorPattern(
      error.message,
      error.status || 500, 
      error.messageKey || "INTERNAL_SERVER_ERROR",
      error.logMessage || error.stack || ""
    )
  }

}