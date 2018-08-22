const initialState = {
  selectedCoin: "lunes",
  loading: false,
  errors: []
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
        ...state,
        loading: action.state ? action.state : false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default wallet;
