const initialState = {
    user: {}
}

const user = (state = initialState, action) => {
    console.warn("reducer 1 ", action.type, action.data)
    switch (action.type) {
        case "POST_USER_AUTHENTICATE":
            return {
                user: action.data
            };

        default:
            return state;
    }
};

export default user;

