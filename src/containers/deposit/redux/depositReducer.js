const initialState = {
  packages: [],
  history: [],
  user: {
    fullName: null,
    document: null,
    address: {
      street: null,
      city: null,
      state: null,
      country: null,
      zipcode: null
    }
  },
  buyID: 0,
  modalStep: 1,
  loading: false,
  paymentMethod: null,
  payloadPayment: {
    service: null, //(descrição do serviço, ex: Deposit, Recarga, Compra)
    packageId: 0,//(endpoint: /deposit/package)
    paymentMethodId: null,//(endpoint: /deposit/paymentMethods)
    userData: this.user
  },
  depositBill: {},
  kyc: {
    data: {},
    kycValidation: false
  },
  loadingState: false,
  loadingCity: false,
  location: {
    states: [],
    city: []
  },
  selectedValue: 0,
  paymentMethods: undefined,
  SelectedPaymentMethod: undefined
};

const deposit = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PACKAGES_REDUCER":
      return {
        ...state,
        packages: action.packages
      };
    case "GET_HISTORY_DEPOSIT_REDUCER":
      return {
        ...state,
        history: action.history
      };
    case "SET_MODAL_STEP":
      return {
        ...state,
        modalStep: action.step
      };
    case "SET_USER_DATA":
      return {
        ...state,
        user: action.user,
        loading: false
      };
    case "SET_LOADING_DEPOSIT":
      return {
        ...state,
        loading: action.loading
      };
    case "SET_PAYMENT_METHODS":
      return {
        ...state,
        paymentMethods: action.response.data
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        SelectedPaymentMethod: action.method
      };
    case "SET_KYC_DATA":
      return {
        ...state,
        kyc: { ...state.kyc, data: action.response.data }
      };
    case "SET_KYC_TRUE":
      return {
        ...state,
        kyc: {
          ...state.kyc,
          kycValidation: true
        }
      };
    case "DEPOSIT_SET_STATE":
      return {
        ...state,
        location: {
          ...state.location,
          states: action.response.data
        },
        loadingState: false
      };
    case "DEPOSIT_SET_CITY":
      return {
        ...state,
        location: {
          ...state.location,
          city: action.response.data
        },
        loadingCity: false
      };
    case "SET_LOADING_DEPOSIT_STATE":
      return {
        ...state,
        loadingState: true
      };
    case "SET_LOADING_DEPOSIT_CITY":
      return {
        ...state,
        loadingCity: true
      };
    case "SET_SELECTED_VALUE":
      return {
        ...state,
        selectedValue: action.value
      };
    case "SET_BUY_ID":
      return {
        ...state,
        buyID: action.id
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default deposit;
