const initialState = {
    message: {
        type: undefined,
        active: false,
        message: undefined
    }
}

const error = (state = initialState, action) => {

    switch (action.type) {

        case "REQUEST_SUCCESS":
            return {
                ...state,
                message: {
                    type: "success",
                    active: true,
                    message: action.payload.message
                }
            }

        case "REQUEST_FAILED":
            return {
                ...state,
                message: {
                    type: "error",
                    active: true,
                    message: action.payload.message
                }
            }

        case "CLEAR_MESSAGE":
            return {
                ...state,
                message: {
                    type: "",
                    active: false,
                    message: ""
                }
            }

        case "ERROR_INPUT":
            return {
                ...state,
                message: {
                    type: "error",
                    active: false,
                    message: action.payload.message
                }
            }

        default: {
            return {
                ...state
            }
        }
    }
};

export default error;

