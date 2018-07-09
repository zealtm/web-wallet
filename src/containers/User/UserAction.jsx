export const Authenticate = (value) => ({
    type: "GET_USER_AUTHENTICATE_API",
    email: value.email,
    password: value.password
});