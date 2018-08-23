export const setSelectedCoin = coin => ({
  type: "SET_SELECTED_COIN",
  coin
});

export const setWalletSendModalOpen = () => ({
  type: "SET_WALLET_MODAL_OPEN"
});

export const setWalletSendModalLoading = () => ({
  type: "SET_WALLET_MODAL_LOADING"
});

export const setWalletModalStep = step => ({
  type: "SET_WALLET_MODAL_STEP",
  step
});

export const setWalletSendModalAmount = amount => ({
  type: "SET_WALLET_MODAL_SEND_AMOUNT",
  amount
});

export const setWalletSendModalFee = fee => ({
  type: "SET_WALLET_MODAL_SEND_FEE",
  fee
});

export const setWalletSendModalSelectedFee = fee => ({
  type: "SET_WALLET_MODAL_SEND_SELECTED_FEE",
  fee
});

export const getValidateAddress = (coin, address) => ({
  type: "GET_WALLET_VALIDATE_ADDRESS_API",
  coin,
  address
});

export const setWalletLoading = state => ({
  type: "SET_WALLET_LOADING",
  state
});

export const clearWalletState = () => ({
  type: "CLEAR_WALLET_STATE"
});

export const shareCoinAddress = (name, address) => ({
  type: "SHARE_COIN_ADRESS_API",
  name,
  address
});