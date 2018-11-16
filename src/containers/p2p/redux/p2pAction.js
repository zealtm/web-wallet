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

export const setter = data => ({
  type: "SETTER",
  data
})
export const buySetter = data => ({
  type: "BUY_SETTER",
  data
})

export const getPaymentMethodsWhenBuying = coin => ({
  type: "API_GET_PAYMENT_METHODS_WHEN_BUYING",
  coin
})

export const acceptOfferWhenBuying = data => ({
  type: "API_ACCEPT_OFFER_WHEN_BUYING",
  data
})
export const createOfferWhenSelling = data => ({
  type: "API_CREATE_OFFER_WHEN_SELLING",
  data
})
