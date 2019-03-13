export const getAssetGeneralInfo = lunesAddress => ({
  type: "GET_ASSET_GENERAL_INFO_API",
  lunesAddress
});
export const getAssetHistory = (assetId, lunesAddress) => ({
  type: "GET_ASSET_HISTORY_API",
  assetId,
  lunesAddress
});
export const setSelectedCoin = assetId => ({
  type: "POST_ASSETS_SET_SELECTED_COIN",
  assetId
});
export const reloadAsset = (assetId, lunesAddress) => ({
  type: "GET_RELOAD_ASSET_API",
  assetId,
  lunesAddress
});

export const setModalAssets = modal => ({
  type: "SET_MODAL_ASSETS",
  modal
});

export const setAssetsSendModalOpen = () => ({
  type: "SET_ASSETS_MODAL_OPEN"
});

export const setAssetsReceiveModalOpen = () => ({
  type: "SET_ASSETS_MODAL_RECEIVE_OPEN"
});

export const setAssetsSendModalLoading = () => ({
  type: "SET_ASSETS_MODAL_LOADING"
});

export const getValidateAddress = (coin, address) => ({
  type: "GET_ADDRESS_VALIDATE_ADDRESS_API",
  coin,
  address
});

export const setAddressModalStep = step => ({
  type: "SET_ADDRESS_MODAL_STEP",
  step
});

export const setAssetsSendModalAmount = amount => ({
  type: "SET_ASSETS_MODAL_SEND_AMOUNT",
  amount
});

export const setAssetsSendModalFinalAmount = amount => ({
  type: "SET_ASSETS_MODAL_FINAL_AMOUNT",
  amount
});

export const getAssetsSendModalFee = (
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
) => ({
  type: "GET_ASSETS_MODAL_SEND_FEE_API",
  coin,
  fromAddress,
  toAddress,
  amount,
  decimalPoint
});

export const setAssetsSendModalSelectedFee = fee => ({
  type: "SET_ASSETS_MODAL_SEND_SELECTED_FEE",
  fee
});

export const setAssetsSendModalSelectedFeeLunes = fee => ({
  type: "SET_ASSETS_MODAL_SEND_SELECTED_FEELUNES",
  fee
});

export const setAssetsSendModalSelectedFeePerByte = fee => ({
  type: "SET_ASSETS_MODAL_SEND_SELECTED_FEEPERBYTE",
  fee
});

export const resetModalSend = () => ({
  type: "SET_RESET_MODAL_SEND"
});

export const shareTokenAddress = (name, address) => ({
  type: "GET_TOKEN_ADRESS_API",
  name,
  address
});

export const setAssetTransaction = (transaction, password) => ({
  type: "SET_ASSET_TRANSACTION_API",
  transaction,
  password
});