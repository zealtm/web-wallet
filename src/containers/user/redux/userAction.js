export const authenticate = (email, password) => ({
  type: "POST_USER_AUTHENTICATE_API",
  email,
  password
});

export const multiFactorAuth = () => ({
  type: "POST_2FA_AUTHENTICATE_API"
});
