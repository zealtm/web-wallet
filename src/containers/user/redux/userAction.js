export const authenticate = (email, password) => ({
  type: "POST_USER_AUTHENTICATE_API",
  email,
  password
});

export const createTwoFactorAuth = () => ({
  type: "POST_USER_CREATE_2FA_API"
});

export const verifyTwoFactorAuth = token => ({
  type: "POST_USER_VERIFY_2FA_API",
  token
});

export const verifyUserPin = (pin, seed, password) => ({
  type: "POST_USER_VERIFY_PIN_API",
  user: {
    pin,
    seed,
    password
  }
});

export const createUserPin = (pin, seed, password) => ({
  type: "POST_USER_CREATE_PIN_API",
  user: {
    pin,
    seed,
    password
  }
});

export const getCreateUserInfo = (name, surname, email) => ({
  type: "CHANGE_USER_PERSONAL_INFO",
  user: {
    name,
    surname,
    email
  }
});

export const createUser = (name, surname, email, password) => ({
  type: "POST_USER_CREATE_USER_API",
  user: {
    name,
    surname,
    email,
    password
  }
});

export const setUserSeed = (seed) => ({
  type: "SET_USER_SEED_API",
  payload: {
    seed
  }
});

export const resetUser = () => ({
  type: "POST_USER_RESET_USER_API"
});

export const loading = () => ({
  type: "CHANGE_LOADING_STATE"
});
