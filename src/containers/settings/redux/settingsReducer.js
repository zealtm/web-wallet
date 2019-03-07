const initialState = {
  security: {
    urlImage: undefined
  },
  wallet: {
    modalAlias: false,
    loadingAlias: false
  },
  loading: false,
  errors: [],
  payload: {},
  upload: {},
  loadingKyc: false,
  loadingCreate: false,
  loadingState: false,
  loadingCity: false,
  location: {
    countries: [],
    states: [],
    city: []
  },
  kyc: {}
};

const settings = (state = initialState, action) => {
  
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state
      };

    case "CHANGE_LOADING_SETTINGS":
      return {
        ...state,
        loading: !state.loading
      };

    case "POST_SETTINGS_CREATE_2FA":
      return {
        ...state,
        security: {
          urlImage: action.url
        },
        loading: !state.loading
      };

    case "SET_WALLET_ALIAS_MODAL_OPEN":
      return {
        ...state,
        wallet: {
          modalAlias: !state.wallet.modalAlias,
          loadingAlias: false
        }
      };

    case "SET_WALLET_ALIAS_LOADING":
      return {
        ...state,
        wallet: {
          modalAlias: state.wallet.modalAlias,
          loadingAlias: action.state ? true : false
        }
      };
    case "GET_KYC_REDUCER":
      return {
        ...state,
        kyc: action.kyc
      };

    case "SET_LOADING_KYC":
      return {
        ...state,
        loadingKyc: action.loadingKyc
      };
    case "SET_LOADING_CREATE_KYC":
      return {
        ...state,
        loadingCreate: action.loadingCreate
      };

    case "KYC_CREATE_REDUCER":
      return {
        ...state,
        payload: action.payload,
        loadingCreate: false
      };

    case "KYC_UPLOAD_REDUCER":
      return {
        ...state,
        upload: action.upload,
        loadingKyc: false
      };
    case "KYC_SET_COUNTRIES":
      return {
        ...state,
        location: {
          ...state.location,
          countries: action.response.data
        }
      };
    case "KYC_SET_STATE":
      return {
        ...state,
        location: {
          ...state.location,
          states: action.response.data
        },
        loadingState: false
      };
    case "KYC_SET_CITY":
      return {
        ...state,
        location: {
          ...state.location,
          city: action.response.data
        },
        loadingCity: false
      };
    case "SET_LOADING_STATE":
      return {
        ...state,
        loadingState: true
      };
    case "SET_LOADING_CITY":
      return {
        ...state,
        loadingCity: true
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default settings;
