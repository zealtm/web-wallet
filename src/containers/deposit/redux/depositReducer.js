const initialState = {
  packages: [],
  history: []
};

const deposit = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PACKAGES_REDUCER":
      return {
        ...state,
        packages: action.packages
      };
    case "GET_HISTORY_DEPOSIT_REDUCER":
      return {
        ...state,
        history: action.history
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default deposit;
