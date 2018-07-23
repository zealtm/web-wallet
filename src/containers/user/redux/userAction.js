export const authenticate = (email, password) => ({
  type: "POST_USER_AUTHENTICATE_API",
  email,
  password
});

export const twoFactorAuth = () => ({
  type: "POST_2FA_AUTHENTICATE_API"
});

export const createUser = () => ({
  type: "POST_USER_CREATE_USER_API",
});

export const resetUser = () => ({
  type: "POST_USER_RESET_USER_API",
});

