const initialState = {
  // LOGIN, 2FA, SEED, PIN
  pages: {
    login: 0,
    create: 0,
    reset: 0
  },
  user: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
        pages: {
          login: action.payload.page,
          create: 0,
          reset: 0
        },
        user: action.payload.user
      };

    case "POST_2FA_AUTHENTICATE":
      return {
        ...state,
        pages: {
          login: action.payload.page,
          create: 0,
          reset: 0
        }
      };

    case "POST_USER_CREATE_USER":
      return {
        ...state,
        pages: {
          login: 0,
          create: action.payload.page,
          reset: 0
        },
        user: action.payload.user
      };

    case "POST_USER_RESET_USER":
      return {
        ...state,
        pages: {
          login: 0,
          create: 0,
          reset: action.payload.page
        },
        user: action.payload.user
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default user;
