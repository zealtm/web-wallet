const initialState = {
    user: ""
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_AUTHENTICATE":
            return {
                ...state,
                user: action.data
            }

        default:
            return state;
    }
};

export default user;

