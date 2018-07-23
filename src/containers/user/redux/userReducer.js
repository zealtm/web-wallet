const initialState = {
    user: {
        token: undefined,
        hasTwoFactorAuth: undefined
    },
    errors: []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case "POST_USER_AUTHENTICATE":
            return {
                ...state,
                user: {

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

        default: {
            return {
                ...state
            }
        }
    }
};

export default user;

