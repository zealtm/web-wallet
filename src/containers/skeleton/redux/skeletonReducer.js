const initialState = {
  coins: {},
  loading: false,
  errors: false
};

const skeleton = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
      };

    case "CHANGE_LOADING_GENERAL_STATE":
      return {
        ...state,
        loading: !state.loading
      };

    case "CHANGE_ERROR_STATE":
      return {
        ...state,
        loading: !state.loading
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default skeleton;
