export const openChat = iduser => ({
  type: "OPEN_CHAT_P2P",
  iduser
});

export const closeChat = () => ({
  type: "CLOSE_CHAT_P2P"
});

export const setModalStep = step => ({
  type: "SET_MODAL_FLOW_STEP",
  step
});

export const openModal = open => ({
  type: "SET_MODAL_OPEN",
  open
});

export const getMyOrders = coin => ({
  type: "GET_P2P_MY_ORDERS",
  coin
});

export const getHistory = coin => ({
  type: "GET_P2P_HISTORY",
  coin
});

export const getFilter = (coin, typeOrder, coinBuy) => ({
  type: "GET_P2P_FILTER",
  coin, 
  typeOrder, 
  coinBuy
});
