const initialState = {
  user: {
    name: undefined,
    surname: undefined,
    email: undefined,
    pin: undefined
  },
  pages: {
    login: 0,
    create: 0,
    reset: 0
  },
  loading: false,
  errors: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
        user: {
          pin: action.user.pin
        },
        pages: {
          login: action.pages.login,
          create: 0,
          reset: 0
        },
        loading: false
      };

    case "GET_USER_2FA":
      return {
        ...state,
        loading: false
      };

    case "POST_USER_CREATE_2FA":
      return {
        ...state,
        loading: false
      };

    case "POST_USER_VERIFY_2FA":
      return {
        ...state,
        pages: {
          login: action.pages.login,
          create: 0,
          reset: 0
        },
        loading: false
      };

    
    case "CHANGE_USER_PERSONAL_INFO":
      return {
        ...state,
        pages: {
          login: 0,
          create: 1,
          reset: 0
        },
        user: action.user,
        loading: false
      };

    case "POST_USER_CREATE_USER":
      return {
        ...state,
        pages: {
          login: 0,
          create: action.page,
          reset: 0
        },
        user: action.user,
        loading: false
      };

    case "POST_USER_RESET_USER":
      return {
        ...state,
        pages: {
          login: 0,
          create: 0,
          reset: action.page
        },
        user: action.user,
        loading: false
      };

    case "CHANGE_LOADING_STATE":
      return {
        ...state,
        loading: !state.loading
      };

    case "CLEAR_USER_ERROR":
      return {
        ...state,
        errors: []
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default user;
