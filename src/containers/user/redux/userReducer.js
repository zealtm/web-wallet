const initialState = {
    user: {},
    errors: []
}

const user = (state = initialState, action) => {

    switch (action.type) {
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
            }
        }
    }
};

export default user;

