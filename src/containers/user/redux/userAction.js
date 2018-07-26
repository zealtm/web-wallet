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

export const verifyUserPin = pin => ({
  type: "POST_USER_VERIFY_PIN_API",
  pin
});

export const createUserPin = pin => ({
  type: "POST_USER_CREATE_PIN_API",
  pin
});

export const generateUserSeed = () => ({
  type: "GENERATE_USER_SEED_API",
});


export const createUser = () => ({
  type: "POST_USER_CREATE_USER_API"
});

export const resetUser = () => ({
  type: "POST_USER_RESET_USER_API"
});

export const loading = () => ({
  type: "CHANGE_LOADING_STATE"
});
