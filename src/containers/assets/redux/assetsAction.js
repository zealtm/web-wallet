export const getAssetGeneralInfo = (lunesAddress) => ({
  type: "GET_ASSET_GENERAL_INFO_API",
  lunesAddress
})
export const getAssetHistory = (assetId, lunesAddress) => ({
  type: "GET_ASSET_HISTORY_API",
  assetId,
  lunesAddress
})
export const setSelectedCoin = assetId => ({
  type: "ASSETS_SET_SELECTED_COIN",
  assetId
});
export const reloadAsset = (assetId, lunesAddress) => ({
  type: "RELOAD_ASSET_API",
  assetId,
  lunesAddress
})
//wallet
export const setAssetSendModalOpen = () => ({
  type: "SET_ASSET_MODAL_OPEN"
});
export const setAssetSendModalLoading = () => ({
  type: "SET_ASSET_MODAL_LOADING"
});

export const setAssetModalStep = step => ({
  type: "SET_ASSET_MODAL_STEP",
  step
});

export const setAssetSendModalFinalAmount = amount => ({
  type: "SET_ASSET_MODAL_FINAL_AMOUNT",
  amount
});

export const resetAssetModalSend = () => ({
  type: "RESET_ASSET_MODAL_SEND"
})
