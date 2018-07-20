export const authenticate = (email, password) => ({
  type: "POST_USER_AUTHENTICATE_API",
  email,
  password
});
