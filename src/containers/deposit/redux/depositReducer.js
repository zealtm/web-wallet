const initialState = {
  packages: [],
  history: [],
  modalStep: 1,

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
      case "SET_MODAL_STEP":
      return {
        ...state,
        modalStep: action.step
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default deposit;
