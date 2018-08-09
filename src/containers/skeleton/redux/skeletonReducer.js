const initialState = {
  coins: {},
  address: {},
  balance: {},
  loading: false,
  errors: false
};

const skeleton = (state = initialState, action) => {
  switch (action.type) {
    case "GET_AVAILABLE_COINS":
      console.warn(action.coins)
      return {
        ...state,
        coins: action.coins
      };

    case "GET_BALANCE_COINS":
      return {
        ...state,
        coins: action.coins
      };

    case "POST_CREATE_COINS_ADDRESS":
      return {
        ...state,
        coins: action.coins
      };

    case "CHANGE_LOADING_GENERAL_STATE":
      return {
        ...state,
        loading: !state.loading
      };

    case "CHANGE_ERROR_STATE":
      return {
        ...state,
        loading: !state.loading
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default skeleton;
