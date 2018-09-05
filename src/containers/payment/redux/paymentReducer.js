const initialState = {
  // variaveis necessarias
  // var: type 
  payload: "",
  coins: [],
  payment: {
    coin: "", 
    amount: "", 
    value: "", 
    bank: "", 
    name: "", 
    dateend: "", 
    doc: "",
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
    
    default: {
      return {
        ...state
      };
    }
  }
};

export default payment;