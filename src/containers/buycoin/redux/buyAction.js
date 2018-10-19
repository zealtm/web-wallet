export const openModal = open => ({
  type: "SET_MODAL_OPEN",
  open
});

export const setModalStep = step => ({
  type: "SET_MODAL_BUY_STEP",
  step
});

export const getCoinsEnabled = () => ({
  type: "GET_BUY_COINS_ENABLED"
});

export const getCoinPackage = (id, coin, address) => ({
  type: "GET_COIN_PACKAGE",
  id,
  coin, 
  address
});

export const setClearBuy = () => ({
  type: "SET_CLEAR_BUY"
});

export const setBuyPackage = (id, amount, amountFiat) => ({
  type: "SET_BUY_PACKAGE",
  package: id,
  amount: amount,
  amountFiat: amountFiat
});

export const setCoinSelected = (coin,address) => ({
  type: "SET_BUY_COIN_PAYMENT",
  coin: coin,
  address: address
});

export const getFeeBuy = (
  coin,
  amount,
  fromAddress,
  toAddress,
  decimalPoint
) => ({
  type: "GET_FEE_BUY",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setFeeBuy = fee => ({
  type: "SET_FEE_BUY",
  fee
});

export const setBuy = payload => ({
  type: "SET_BUY",
  payload
});

export const confirmBuy = buy => ({
  type: "CONFIRM_BUY",
  buy
});




export const getHistoryBuy = () => ({
  type: "GET_HISTORY_BUY"
});

