export const getProfessionalNode = () => ({
  type: "GET_PROFESSIONAL_NODE_API",
});

export const validateLeasingAddress = (coin, address) => ({
  type: "VALIDATE_LEASING_ADDRESS_API",
  coin,
  address
});

export const startNewLeasing = (data) => ({
  type: "START_LEASING_API",
  data
});

export const clearState = () => ({
  type: "CLEAR_LEASING_STATE"
});
