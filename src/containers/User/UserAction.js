export const Authenticate = (value) => ({
    type: "ASYNC_USER_AUTHENTICATE",
    email: value.email,
    password: value.password
});