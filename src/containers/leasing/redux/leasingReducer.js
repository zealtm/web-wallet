const initialState = {
  professionalNode: [],
  addressIsValid: false
};

const leasing = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFESSIONAL_NODE":
      return {
        ...state,
        professionalNode: action.professionalNode
      };
    case "VALIDATE_LEASING_ADDRESS":
      return {
        ...state,
        addressIsValid: action.addressIsValid
      };
    case "START_LEASING":
      return {
        ...state,
        // addressIsValid: action.addressIsValid
      };
    case "CLEAR_LEASING_STATE":
      return {
        ...state,
        addressIsValid: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default leasing;
