const initialState = {
    user: {},
    error: {
        hasError: false,
        errorMessage: ""
    }
}

const user = (state = initialState, action) => {

    switch (action.type) {
        case "POST_USER_AUTHENTICATE":
            return {
                ...state,
                user: action.payload.user
            };

        case "REQUEST_FAILED":
            console.warn("LEO2 ", action.payload)
            return {
                ...state,
                error: {
                    hasError: true,
                    errorMessage: ""
                }
            };

        default: {
            return {
                ...state
            }
        }
    }
};

export default user;

