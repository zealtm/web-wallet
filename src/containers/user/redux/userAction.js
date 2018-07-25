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

export const createUser = () => ({
  type: "POST_USER_CREATE_USER_API",
});

export const resetUser = () => ({
  type: "POST_USER_RESET_USER_API",
});

export const loading = (state = false) => ({
    type: "CHANGE_LOADING_STATE",
    state
});

