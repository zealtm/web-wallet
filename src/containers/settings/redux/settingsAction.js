export const getFavoriteCoin = () => ({
  type: "GET_FAVORITES_COIN_API"
});

export const loadingSettings = () => ({
  type: "CHANGE_LOADING_SETTINGS"
});

export const getTwoFactorAuth = () => ({
  type: "POST_SETTINGS_CREATE_2FA_API"
});

export const verifyTwoFactorAuthSettings = token => ({
  type: "GET_SETTINGS_2FA_API",
  token
});

export const createAlias = (coin, address, alias, price, password) => ({
  type: "CREATE_ALIAS_ADDRESS_API",
  data: {
    coin,
    address,
    alias,
    price,
    password
  }
});

export const getAliases = address => ({
  type: "GET_ALIAS_ADDRESS_API",
  data: {
    address
  }
});

export const setAliasModal = () => ({
  type: "SET_WALLET_ALIAS_MODAL_OPEN"
});

export const setAliasLoading = state => ({
  type: "SET_WALLET_ALIAS_LOADING",
  state: state
});

export const getSignatures = () => ({
  type: "GET_SIGNATURES_P2P"
})