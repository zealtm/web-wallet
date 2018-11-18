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

export const setCancelOrder = orderId => ({
  type: "SET_P2P_CANCEL_ORDERS",
  orderId
});
