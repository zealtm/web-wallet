const initialState = {
  loading: false,
  notifications: []
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS_REDUCER":
      return {
        ...state,
        notifications: action.notifications
      };

    case "SET_LOADING_REDUCER":
      return {
        ...state,
        loading: action.loading
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default notifications;
