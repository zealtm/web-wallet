const initialState = {
  selectedCoin: "lunes",
  loading: true,
  errors: []
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_COIN":
      return {
        ...state,
        wallet: {
          ...state.wallet,
          selectedCoin: action.coin
        },
        loading: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default wallet;
