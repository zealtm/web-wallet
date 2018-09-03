export const validateLeasingAddress = (coin, address) => ({
  type: "VALIDATE_LEASING_ADDRESS_API",
  coin,
  address
});

export const startNewLeasing = (data) => ({
  type: "START_LEASING_API",
  data
});

export const getLeasingInfo = (coin, address) => ({
  type: "GET_INFO_LEASING_API",
  coin,
  address
});
export const clearState = () => ({
  type: "CLEAR_LEASING_STATE"
});