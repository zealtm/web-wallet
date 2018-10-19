const initialState = {
  coins: [],
  packages: [],
  history: [],
  loadingHistory: false,
  loading: false,
  loadingCoins: false,
  loadingPackages: false,
  modalStep: 1,
  modalOpen: false,
  buypackage: {
    idpack: '',
    coin: {
      address: '',
      abbreviation: '',
    },
    balance: '',
    amount: '',
    operator: '',
    address: ''
  },
  fee: {
    fee: {
      low: 0,
      medium: 0,
      high: 0
    }
  },
  user: {
    gdpr: 'unread'
  },
};

const buy = (state=initialState, action) => {
  switch(action.type){
      case "SET_MODAL_BUY_STEP_REDUCER":
        return {
          ...state,
          modalStep: action.step
        };

      case "SET_MODAL_OPEN_REDUCER":
        return {
          ...state,
          modalOpen: action.open
        };

      case "SET_LOADING_HISTORY":
        return {
          ...state,
          loadingHistory: action.payload
        }
      case "SET_LOADING_COIN_REDUCER":
        return {
          ...state,
          loadingCoins: action.payload
        };

      case "SET_LOADING_REDUCER":
        return {
          ...state,
          loading: action.payload
        };

      case "SET_LOADING_PACK_REDUCER":
        return {
          ...state,
          loadingPackages: action.payload
        };

      case "GET_COINS_REDUCER":
        return {
          ...state,
          coins: action.coins,
          loadingCoins: false
        };

      case "GET_BUY_PACKAGE_REDUCER":
        return {
          ...state,
          packages: action.packages,
          buypackage: {
            ...state.buypackage,
            coin: {
              abbreviation: action.coin,
              address: action.address
            }
          },
          loadingPackages: false
        };

      case "SET_BUY_PACKAGE_REDUCER":
        return {
          ...state,
          buypackage: action.payload,
          loading: false
        }

      case "GET_FEE_BUY_REDUCER":
        return {
          ...state,
          fee: action.fee,
          loading: false
        };

      case "SET_FEE_BUY_REDUCER":
        return {
          ...state,
          buypackage: {
            ...state.recharge,
            fee: action.fee
          }
        };

      case "SET_CLEAR_BUY_REDUCER":
        return {
          ...initialState
        };

      case "GET_HISTORY_BUY_REDUCER":
        return {
          ...state,
          history: action.history,
          loading: false
        };

    default: {
      return {
        ...state
      };
    }
  }
};

export default buy;
