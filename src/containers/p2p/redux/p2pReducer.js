const initialState = {
  chat: {
    iduser: null
  },
  openChat: false, 
  loading: false
};

const p2p = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_CHAT_P2P_REDUCER":
      return {
        ...state,
        openChat: true,
        chat: {
          ...state.chat,
          iduser: action.iduser
        }
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default p2p;
