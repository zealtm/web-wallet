export const authenticate = (email, password) => ({
    type: "POST_USER_AUTHENTICATE_API",
    email,
    password
});

export const clearUserError = () => ({
    type: "CLEAR_USER_ERROR"
});