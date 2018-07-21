export const authenticate = (email, password) => ({
    type: "POST_USER_AUTHENTICATE_API",
    payload: {
        email,
        password
    }
});

export const createTwoFactorAuth = () => ({
    type: "POST_USER_CREATE_2FA_API"
});

export const verifyTwoFactorAuth = (token) => ({
    type: "POST_USER_VERIFY_2FA_API",
    payload: {
        token
    }
});

export const clearUserError = () => ({
    type: "CLEAR_USER_ERROR"
});