const initialState = {
  chat: {
    iduser: null
  },
  chatOpened: false, 
  loading: false
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

    default: {
      return {
        ...state
      };
    }
  }
};

export default p2p;
