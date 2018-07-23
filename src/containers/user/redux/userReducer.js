const initialState = {
  user: {
    token: undefined,
    hasTwoFactorAuth: undefined
  },
  pages: {
    login: 0,
    create: 0,
    reset: 0
  },
  errors: []
}

const user = (state = initialState, action) => {
  console.warn("ACTION ", action)
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
        user: {

        },
        pages: {
          login: action.page,
          create: 0,
          reset: 0
        }
      };

    case "GET_USER_2FA":
      return {
        ...state,
      };
    case "POST_USER_CREATE_2FA":
      return {
        ...state,
      };

    case "POST_USER_VERIFY_2FA":
      return {
        ...state,
      };

    case "CLEAR_USER_ERROR":
      return {
        ...state,
        errors: []
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
