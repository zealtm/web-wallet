const initialState = {
    user: {},
    errorMessage: ""
}

const user = (state = initialState, action) => {

    switch (action.type) {
        case "POST_USER_AUTHENTICATE":
            return {
                ...state,
                user: action.data
            };

        case "REQUEST_FAILED": 
            console.warn("LEO2 ", action.data)
            return { 
                ...state,
                errorMessage: action.data
            };

        default: {
            return {
                ...state
            }
        }
    }
};

export default user;

