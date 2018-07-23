export const authenticate = (email, password) => ({
  type: "POST_USER_AUTHENTICATE_API",
  email,
  password
});

export const createUser = () => ({
  type: "POST_USER_CREATE_USER_API",
});


export const twoFactorAuth = () => ({
  type: "POST_2FA_AUTHENTICATE_API"
});
