const authToken = "auth.token";
const userSeed = "user.seed";
const userObj = "user.object";


export const setAuthToken = (token) => localStorage.setItem(authToken, JSON.stringify(token));

export const getAuthToken = () => JSON.parse(localStorage.getItem(authToken));

export const setUserSeed = (seed) => localStorage.setItem(userSeed, JSON.stringify(seed));

export const getUserSeed = () => JSON.parse(localStorage.getItem(userSeed));

export const clearAuthToken = () => localStorage.removeItem(authToken);

export const clear = (value) => localStorage.removeItem(value);

export const clearAll = () => localStorage.clear();

export const getUserData = () =>  JSON.parse(localStorage.getItem(authToken));

export const setUserData = (user) => localStorage.setItem(userObj, JSON.stringify(user));