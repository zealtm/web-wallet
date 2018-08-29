const initialState = {
  professionalNode: [],
};

const leasing = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFESSIONAL_NODE":
      return {
        ...state,
        coins: action.coins
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default leasing;
