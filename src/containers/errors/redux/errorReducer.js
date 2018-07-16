const initialState = {
    message: {
        type: "",
        active: false,
        message: ""
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

        case "REQUEST_CLEAR":
            return {
                ...state,
                message: {
                    type: "",
                    active: false,
                    message: ""
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

