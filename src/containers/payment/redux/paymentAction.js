export const nomeDaFuncao = () => ({ // nome diferente do Saga pra testar
  type: "GET_TESTE",
  // outros campos necessarios pra atualizar via action
});

export const getCoinsEnabled = () => ({
  type: "GET_API_COINS"
});

export const getPaymentData = (payload) => ({
  type: "VALIDATE_PAYMENT_NUMBER",
  payload
})

export const setPayment = (payload) => ({
  type: "SET_PAYMENT",
  payload
})
