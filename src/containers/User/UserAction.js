export const authenticate = (value) => ({
    type: "POST_USER_AUTHENTICATE_API",
    email: value.email,
    password: value.password
});