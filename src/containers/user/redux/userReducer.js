const initialState = {
    user: {
        
    },
    message: ""
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case "POST_USER_AUTHENTICATE":
            return {
                user: action.data
            };

        case "REQUEST_FAILED":
            return {
                errorMessage: action.data
            }
        default:
            return state;
    }
};

export default user;

