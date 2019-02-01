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
  upload: {}
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

    case "KYC_CREATE_REDUCER":
      return {
        ...state,
        payload: action.payload,
        loadingSent: false
      };

      case "KYC_UPLOAD_REDUCER":
      return {
        ...state,
        upload: action.upload,
        loadingSent: false
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default settings;
