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

export const setPaymentMethod = (method) => ({
  type: "SET_PAYMENT_METHOD",
  method
});

export const getKycData = () => ({
  type: "GET_KYC_DATA_API"
});

export const setKycValidation = () => ({
  type: "SET_KYC_TRUE"
});

export const depositGetStates = country => ({
  type: "DEPOSIT_GET_STATES_API",
  country
});

export const depositGetCity = location => ({
  type: "DEPOSIT_GET_CITY_API",
  location
});

export const setSelectedValue = value => ({
  type: "SET_SELECTED_VALUE",
  value
})