const initialState = {
  professionalNode: [],
};

const leasing = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFESSIONAL_NODE":
      return {
        ...state,
        professionalNode: action.professionalNode
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default leasing;
