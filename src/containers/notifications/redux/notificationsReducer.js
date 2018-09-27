const initialState = {
  notifications: []
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS_REDUCER":
      return {
        ...state,
        notifications: action.notifications
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default notifications;
