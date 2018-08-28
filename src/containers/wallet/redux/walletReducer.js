import { getDefaultCrypto } from "../../../utils/localStorage";

const initialState = {
  selectedCoin: getDefaultCrypto(),
  coinHistory: {
    loaded: false,
    loading: false,
    history: []
  },
  modal: {
    open: false,
    step: 0,
    address: undefined,
    sendAmount: undefined,
    feeValue: {
      low: 0.001,
      medium: 0.001,
      high: 0.001,
      selectedFee: undefined
    },
    loading: false
  },
  loading: false,
  errors: false
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_COIN":
      return {
        ...state,
        selectedCoin: action.coin,
        loading: false
      };

    case "SET_WALLET_LOADING":
      return {
        selectedCoin: getDefaultCrypto(),
        coinHistory: {
          loaded: false,
          loading: false,
          history: state.coinHistory.history
        },
        modal: {
          open: state.modal.open,
          step: 0,
          address: undefined,
          sendAmount: undefined,
          feeValue: {
            low: 0.001,
            medium: 0.001,
            high: 0.001,
            selectedFee: undefined
          },
          loading: false
        },
        loading: action.state ? action.state : false,
        errors: false
      };

    case "SET_WALLET_HISTORY_LOADING":
      return {
        ...state,
        coinHistory: {
          ...state.coinHistory,
          loading: !state.coinHistory.loading
        }
      };

    case "SET_WALLET_HISTORY":
      return {
        ...state,
        coinHistory: {
          ...state.coinHistory,
          history: action.history,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_OPEN":
      return {
        ...state,
        modal: {
          ...state.modal,
          open: !state.modal.open,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_STEP":
      return {
        ...state,
        modal: {
          ...state.modal,
          step: action.step,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_LOADING":
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: !state.modal.loading
        }
      };

    case "SET_WALLET_MODAL_ADDRESS":
      return {
        ...state,
        modal: {
          ...state.modal,
          address: action.address,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_SEND_AMOUNT":
      return {
        ...state,
        modal: {
          ...state.modal,
          sendAmount: action.amount,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_SEND_FEE":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: action.fee,
          loading: false
        }
      };

    case "SET_WALLET_MODAL_SEND_SELECTED_FEE":
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

    case "SET_WALLET_MODAL_TRANSACTION":
      return {
        ...state,
        modal: {
          ...state.modal,
          feeValue: action.value,
          loading: false
        }
      };

    case "CHANGE_WALLET_ERROR_STATE":
      return {
        ...state,
        error: action.state
      };

    case "CLEAR_WALLET_STATE":
      return {
        selectedCoin: "lunes",
        modal: {
          open: false,
          step: 0,
          address: undefined,
          sendAmount: undefined,
          feeValue: {
            low: 0.001,
            medium: 0.001,
            high: 0.001,
            selectedFee: undefined
          },
          loading: false
        },
        loading: false,
        errors: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default wallet;
