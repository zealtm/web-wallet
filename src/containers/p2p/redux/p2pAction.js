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

export const setter = data => ({
  type: "SETTER",
  data
});

export const buySetter = data => ({
  type: "BUY_SETTER",
  data
});

export const getPaymentMethodsWhenBuying = coin => ({
  type: "API_GET_PAYMENT_METHODS_WHEN_BUYING",
  coin
});

export const acceptOfferWhenBuying = data => ({
  type: "API_ACCEPT_OFFER_WHEN_BUYING",
  data
});

export const createOfferWhenSelling = data => ({
  type: "API_CREATE_OFFER_WHEN_SELLING",
  data
});

export const setCancelOrder = orderId => ({
  type: "SET_P2P_CANCEL_ORDERS",
  orderId
});
