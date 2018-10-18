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

export const getCoinPackage = (coin, address) => ({
  type: "GET_COIN_PACKAGE",
  coin, 
  address
});





export const setBuyPackage = payload => ({
  type: "SET_BUY_PACKAGE",
  package: payload
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

export const confirmBuy = buy => ({
  type: "CONFIRM_BUY",
  buy
});

export const getHistoryBuy = () => ({
  type: "GET_HISTORY_BUY"
});

export const setClearBuy = () => ({
  type: "SET_CLEAR_BUY_REDUCER"
});
