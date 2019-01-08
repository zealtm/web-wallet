const initialState = {
  packages: []
};

const deposit = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PACKAGES_REDUCER":
      return {
        ...state,
        packages: action.packages
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default deposit;