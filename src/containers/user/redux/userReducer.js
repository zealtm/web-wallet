const initialState = {
  page: {
    step: 0,
    limit: 3
  },
  user: {},
  errors: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload.page
      };
    case "POST_USER_AUTHENTICATE":
      return {
        ...state,
        user: action.payload.user
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
