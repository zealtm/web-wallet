const initialState = {
    message: {
        type: "",
        active: false,
        message: "teste"
    }
}

const error = (state = initialState, action) => {

    switch (action.type) {

        case "REQUEST_SUCCESS":
            return {
                ...state,
                error: {
                    type: "success",
                    active: true,
                    message: ""
                }
            }

        case "REQUEST_FAILED":
            return {
                ...state,
                error: {
                    type: "error",
                    active: true,
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

