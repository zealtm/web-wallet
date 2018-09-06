const initialState = {
  // variaveis necessarias
  // var: type
  payload: "",
  coins: [ ],
  payment: {
    fee: "",
    number: "",
    coin: "",
    amount: "",
    value: "",
    bank: "",
    name: "",
    dateend: "",
    doc: "",
  },
  fee: {
    low: 0,
    medium: 0,
    hight: 0
  },
  loading: false,
};

const payment = (state=initialState, action) => {
  switch(action.type){
    case "NOME_FUNCAO_REDUCER":
      return {
        ...state,
        payload: action.payload // atualiza o state inicial "action.payload"
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
        payment: action.payload
      }

    case "GET_FEE_PAYMENT_REDUCER":
      return {
        ...state,
        fee: action.fee
      }

    case "SET_FEE_PAYMENT_REDUCER":
      return {
        ...state,
        payment: {
          ...state.payment,
          fee: action.fee
        }
      }

    default: {
      return {
        ...state
      };
    }
  }
};

export default payment;
