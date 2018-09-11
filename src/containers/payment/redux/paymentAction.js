export const getCoinsEnabled =()=>({
  type: "GET_API_COINS"
});

export const setPayment = (pay) =>({
  type: "SET_PAYMENT",
  pay
});

export const getFeePayment = (coin, amount) => ({
  type: "GET_FEE_PAYMENT",
  coin,
  amount
});

export const setFeePayment = (fee) => ({
  type: "SET_FEE_PAYMENT",
  fee
});

export const getInvoice = (number) => ({
  type: "GET_INVOICE",
  number
});

export const setUserGdpr = (user) => ({
  type: "SET_USER_GDPR",
  user
});

export const getHistoryPay = () => ({
  type: "GET_HISTORY_PAY"
});


// export const calcCoinPayment = (value) => ({
//   type: "CALC_COIN_PAYMENT",
//   value
// })
