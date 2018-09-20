export const setModalStep = step => ({
  type: "SET_MODAL_RECHARGE_STEP",
  step
});

export const getCoinsEnabled = () => ({
  type: "GET_API_COINS"
});

export const getOperators = ddd => ({
  type: "GET_OPERADORAS",
  ddd
});

export const getValoresRecarga = (operadora, ddd) => ({
  type: "GET_VALORES_RECARGA",
  operadora, 
  ddd
});

export const setRecharge = payload => ({
  type: "SET_RECHARGE",
  recharge: payload
});

export const getFeeRecharge = (
  coin,
  amount,
  fromAddress,
  toAddress,
  decimalPoint
) => ({
  type: "GET_FEE_RECHARGE",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setFeeRecharge = fee => ({
  type: "SET_FEE_RECHARGE",
  fee
});

export const confirmRecharge = recharge => ({
  type: "CONFIRM_RECHARGE",
  recharge
});






// export const setPayment = pay => ({
//   type: "SET_PAYMENT",
//   pay
// });

// export const getInvoice = number => ({
//   type: "GET_INVOICE",
//   number
// });

// CONFIRMAR ESTAS ACOES 

export const setUserGdpr = user => ({
  type: "SET_USER_GDPR",
  user
});

export const getHistoryRecharge = () => ({
  type: "GET_HISTORY_RECHARGE"
});

