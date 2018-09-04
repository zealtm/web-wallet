const initialState = {
  // variaveis necessarias
  // var: type 
  payload: ""
};

const payment = (state=initialState, action) => {
  switch(action.type){
    case "NOME_FUNCAO_REDUCER":
      return {
        ...state, 
        payload: action.payload // atualiza o state inicial "action.payload"
      };
    
    case "API_REDUCER":
      return {
        ...state,
        payload: action.payload
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default payment;