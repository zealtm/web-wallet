export const getPackages = () => ({
  type: "GET_PACKAGES"
});

export const setModalSteps = step => (
  {
    type: "SET_MODAL_STEP",
    step
  }
);

export const setLoading = loading => ({
  type: "SET_LOADING_DEPOSIT",
  loading
});

export const setUserData = user => ({
  type: "SET_USER_DATA",
  user
});

export const getDepositHistory = () => ({
  type: "GET_DEPOSIT_HISTORY"
});

export const getPaymentsMethods = () => ({
  type: "GET_PAYMENT_METHODS_API"
});
export const setPaymentMethod = (method) => ({
  type: "SET_PAYMENT_METHOD",
  method
});