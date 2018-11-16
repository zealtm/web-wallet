const initialState = {
  chat: {
    iduser: null
  },
  chatOpened: false,
  loading: false,
  modalStep: 1,
  modalOpen: false,
  orders: []
};

const p2p = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_CHAT_P2P_REDUCER":
      return {
        ...state,
        chatOpened: true,
        chat: {
          ...state.chat,
          iduser: action.iduser
        }
      };

    case "CLOSE_CHAT_P2P_REDUCER":
      return {
        ...state,
        chatOpened: false,
      }

    case "SET_MODAL_FLOW_STEP_REDUCER":
      return {
        ...state,
        modalStep: action.step
      };

    case "SET_MODAL_OPEN_REDUCER":
      return {
        ...state,
        modalOpen: action.open
      };

    case "GET_MY_ORDERS_REDUCER":
      return {
        ...state,
        orders: action.orders
      };

    case "GET_HISTORY_REDUCER":
      return {
        ...state,
        orders: action.orders
      };
      
    case "GET_FILTER_REDUCER":
      return {
        ...state,
        orders: action.orders
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default p2p;
