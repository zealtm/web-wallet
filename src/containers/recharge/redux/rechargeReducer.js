const initialState = {
  coins: [],
  history: [],
  loading: false,
  modalStep: 1,
};

const recharge = (state=initialState, action) => {
  switch(action.type){
      case "SET_MODAL_RECHARGE_STEP_REDUCER":
        return {
          ...state,
          modalStep: action.step
        };
  
      case "SET_LOADING_REDUCER":
        return {
          ...state,
          loading: action.payload
        };
  
      case "GET_COINS_REDUCER":
        return {
          ...state,
          coins: action.coins
        };
  
      case "GET_PAYMENT_DATA_REDUCER":
        return {
          ...state,
          number: action.number
        };
  
      case "SET_PAYMENT_REDUCER":
        return {
          ...state,
          payment: action.payload,
          loading: false
        };
  
      case "GET_FEE_PAYMENT_REDUCER":
        return {
          ...state,
          fee: action.fee,
          loading: false
        };
  
      case "SET_FEE_PAYMENT_REDUCER":
        return {
          ...state,
          payment: {
            ...state.payment,
            fee: action.fee
          }
        };
  
      case "GET_INVOICE_REDUCER":
        return {
          ...state,
          payment: {
            ...state.payment,
            ...action.payment
          }
        };
  
      case "GET_USER_GDPR_REDUCER":
        return {
          ...state,
          user: action.user
        };
  
      case "SET_USER_GDPR_REDUCER":
        return {
          ...state,
          user: action.user
        };
  
      case "GET_HISTORY_PAY_REDUCER":
        return {
          ...state,
          history: action.history
        };
  
      case "SET_CLEAR_PAYMENT_REDUCER":
        return {
          ...initialState
        };

    default: {
      return {
        ...state
      };
    }
  }
};

export default recharge;
