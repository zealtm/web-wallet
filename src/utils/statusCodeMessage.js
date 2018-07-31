const type = "REQUEST_FAILED";

export const internalServerError = () => ({
    type,
    message: "Your request could not be completed. Check your connection or try again later"
})

export const unauthorized = (message) => ({
    type,
    message
});

export const badRequest = (message) => ({
    type,
    message
});

export const forbidden = (message) => ({
    type,
    message
});