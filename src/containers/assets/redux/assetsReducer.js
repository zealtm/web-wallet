
//UTILS
import i18n from "../../../utils/i18n";
const initialModalSendState = {
  open: false,
  step: 0,
  address: undefined,
  sendAmount: undefined,
  finalAmount: undefined,
  feeValue: {
    fee: {
      low: 0.001,
      medium: 0.001,
      high: 0.001
    },
    feePerByte: {
      low: 0,
      medium: 0,
      high: 0
    },
    feeLunes: {
      low: 0,
      medium: 0,
      high: 0
    },
    selectedFee: undefined,
    selectedFeePerByte: undefined,
    selectedFeeLunes: undefined
  },
  loading: false
};

const initialState = {
  selectedCoin: undefined,
  isBalanceLoading: false,
  isTxHistoryLoading: false,
  assets: [],
  history: [],
  modal: initialModalSendState,
  utxos: {
    status: "loading",
    message: i18n.t("BTN_SEND_LOADING"),
    data: []
  },
  loading: false,
  errors: false
};

const asset = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RESET_MODAL_SEND":
      return {
        ...state,
        modal: initialModalSendState
      };
    case "SET_ASSET_DATA":
      return {
        ...state,
        isBalanceLoading: action.isBalanceLoading,
        isTxHistoryLoading: action.isTxHistoryLoading,
        assets: action.assets ? action.assets : state.assets
      };

    case "SET_ASSET_HISTORY":
      return {
        ...state,
        isTxHistoryLoading: action.isTxHistoryLoading,
        history: action.history ? action.history : []
      };

    case "POST_ASSETS_SET_SELECTED_COIN":
      return {
        ...state,
        selectedCoin: action.assetId,
        loading: false
      };

    case "SET_MODAL_ASSETS":
      return {
        ...state,
        modal: action.modal
      };

    case "SET_ADDRESS_MODAL_ADDRESS":
      return {
        ...state,
        modal: {
          ...state.modal,
          address: action.address,
          loading: false
        }
      };

    case "SET_ASSETS_MODAL_LOADING":
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: !state.modal.loading
        }
      };
    case "SET_ASSETS_MODAL_OPEN":
      return {
        ...state,
        modal: {
          ...state.modal,
          open: !state.modal.open,
          loading: false
        }
      };

    case "SET_ASSETS_MODAL_RECEIVE_OPEN":
      return {
        ...state,
        modalReceive: {
          ...state.modalReceive,
          open: !state.modalReceive.open,
          loading: false
        }
      };

    case "SET_ADDRESS_MODAL_STEP":
      return {
        ...state,
        modal: {
          ...state.modal,
          step: action.step,
          loading: false
        }
      };
    case "SET_ASSETS_MODAL_SEND_AMOUNT":
      return {
        ...state,
        modal: {
          ...state.modal,
          sendAmount: action.amount
        }
      };

    case "SET_ASSETS_MODAL_FINAL_AMOUNT":
      return {
        ...state,
        modal: {
          ...state.modal,
          finalAmount: action.amount
        }
      };

    case "GET_ASSETS_MODAL_SEND_FEE":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: action.fee,
          loading: false
        }
      };

    case "SET_ASSETS_MODAL_SEND_SELECTED_FEE":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: {
            ...state.modal.feeValue,
            selectedFee: action.fee
          },
          loading: false
        }
      };

    case "SET_ASSETS_MODAL_SEND_SELECTED_FEELUNES":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: {
            ...state.modal.feeValue,
            selectedFeeLunes: action.fee
          },
          loading: false
        }
      };

    case "SET_ASSETS_MODAL_SEND_SELECTED_FEEPERBYTE":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: {
            ...state.modal.feeValue,
            selectedFeePerByte: action.fee
          },
          loading: false
        }
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default asset;
