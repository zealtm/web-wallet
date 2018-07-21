const initialState = {
  // LOGIN, 2FA, SEED, PIN
  page: 0,
  user: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
        page: action.payload.page,
        user: action.payload.user
      };

    case "POST_2FA_AUTHENTICATE":
      return {
        ...state,
        page: action.payload.page,
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default user;
