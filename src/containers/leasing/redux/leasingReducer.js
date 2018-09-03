const initialState = {
  professionalNode: [],
  addressIsValid: false,
  history: []
};

const leasing = (state = initialState, action) => {
  switch (action.type) {
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

    case "GET_INFO_LEASING":
      return {
        ...state,
        history: action.leasingHistory,
        professionalNode: action.professionalNodes
      };
    case "CLEAR_LEASING_STATE":
      return {
        ...state,
        addressIsValid: false
      };

    default:
      {
        return {
          ...state
        };
      }
  }
};

export default leasing;