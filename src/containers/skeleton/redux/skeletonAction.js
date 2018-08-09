export const loadingGeneral = () => ({
  type: "CHANGE_LOADING_GENERAL_STATE"
});

export const availableCoins = () => ({
  type: "GET_AVAILABLE_COINS_API"
});

export const createCoinsAddress = (coins) => ({
  type: "POST_CREATE_COINS_ADDRESS_API",
  coins
});

export const balanceCoins = () => ({
  type: "GET_BALANCE_COINS_API"
});